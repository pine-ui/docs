---
title: Compose reusable Unity UI components in C#
sidebar_label: Components and properties
description: Mount one root interface and compose typed component functions with local or shared state, caller-provided children and owned dynamic branches.
---

# Compose reusable Unity UI components in C#

Mount your root once. Declare the rest of your interface as ordinary C# functions in separate files: each function returns a native component and can call other component functions. Nest these calls as deeply as the interface needs. C# namespaces provide imports; Pine requires no registration or component base class.

## Run the example

This runnable example uses five files. Download <a href="/examples/0.2.0/Root.cs" download="Root.cs" target="_self">Root.cs</a>, <a href="/examples/0.2.0/App.cs" download="App.cs" target="_self">App.cs</a>, <a href="/examples/0.2.0/Counter.cs" download="Counter.cs" target="_self">Counter.cs</a>, <a href="/examples/0.2.0/Card.cs" download="Card.cs" target="_self">Card.cs</a> and <a href="/examples/0.2.0/Actions.cs" download="Actions.cs" target="_self">Actions.cs</a>, and place all five in your Unity project's Assets folder. The root uses Unity's startup attribute, so this example needs no Inspector wiring. It mounts once when Play Mode starts; the scene owns the resulting interface. Importing the package's **Component composition** sample supplies the same files.

### Root.cs

The root is the only file that calls `UI.Mount`. Passing a method group keeps the entry point short.

```csharp
using Pine;
using UnityEngine;

namespace PineComposition.Examples
{
    public static class Root
    {
        [RuntimeInitializeOnLoadMethod(
            RuntimeInitializeLoadType.AfterSceneLoad
        )]
        private static void Start() => UI.Mount(App.Create);
    }
}
```

### App.cs

The root component assembles the interface. The two independent counters get local state; the second pair receives the same source explicitly.

```csharp
using Pine;
using UnityEngine;

namespace PineComposition.Examples
{
    public static class App
    {
        public static RectTransform Create()
        {
            var shared = UI.Source(0);
            var panel = UI.Column(
                12,
                UI.Label("Component composition", UI.Size(420, 40)),
                Card.Create(
                    "Independent counters",
                    Counter.Create("First"),
                    Counter.Create("Second")
                ),
                Card.Create(
                    "Shared state",
                    Counter.Create("Shared A", shared),
                    Counter.Create("Shared B", shared)
                ),
                Actions.Save(
                    UI.Derive(() => shared.Value > 0),
                    () => shared.Value = 0
                )
            );

            UI.Apply(panel, UI.Name("Pine Composition"), UI.Size(420, 640));
            return panel;
        }
    }
}
```

### Counter.cs

Each call creates a fresh instance. Local state belongs to that occurrence; supplying a source shares the caller’s state. The factory returns its native container.

```csharp
using Pine;
using UnityEngine;

namespace PineComposition.Examples
{
    public static class Counter
    {
        public static RectTransform Create(
            string title = "Counter",
            Source<int> count = null
        )
        {
            count ??= UI.Source(0);
            return UI.Column(
                8,
                UI.Label(() => $"{title}: {count.Value}", UI.Size(420, 32)),
                UI.Button("Increment", () => count.Value++, UI.Size(420, 40))
            );
        }
    }
}
```

### Card.cs

A custom container accepts caller-provided native children and can add its own heading. Those children may themselves contain other components.

```csharp
using Pine;
using UnityEngine;

namespace PineComposition.Examples
{
    public static class Card
    {
        public static RectTransform Create(
            string title,
            params Component[] children
        )
        {
            return UI.Column(
                8,
                UI.Label(title, UI.FontSize(24), UI.Size(420, 36)),
                UI.Column(8, children)
            );
        }
    }
}
```

`Create` is a naming convention in this example. A function named `BuildHud` or `Inventory` works equally well. Component functions execute during construction inside the mount or an owned dynamic branch. They do not mount themselves. Reactive getters such as the counter label update existing native instances when their dependencies change; they do not rerun `Counter.Create`.

## Container shorthand and advanced properties

Use `UI.Column(gap, children...)` and `UI.Row(gap, children...)` for ordinary fixed-spacing composition. Child order matches argument order. The shorthand uses the same native layout and ownership as the property declarations.

Use the property overload when declaring reactive spacing, sizing or dynamic child membership:

```csharp
var gap = UI.Source(12f);
var panel = UI.Column(
    UI.Vertical(gap),
    UI.Size(420, 240),
    UI.Children(Counter.Create("First"), Counter.Create("Second"))
);
```

You can also save a shorthand container and apply compatible properties with `UI.Apply`, as `App.Create` does above. Child factories run first in the active scope, then the container attaches their native results.

## Typed inputs and callbacks

Use ordinary typed parameters and optional defaults. A writable `Source<T>` makes editing shared state explicit. A `Value<T>` accepts literal or reactive inputs without exposing a source setter; an action parameter lets the caller own the operation. `ReadOnly<T>` is also used for framework-owned list and branch inputs.

```csharp
using System;
using Pine;
using UnityEngine.UI;

public static class Actions
{
    public static Button Save(Value<bool> canSave, Action save)
    {
        return UI.Button("Save", save, UI.Enabled(canSave), UI.Size(420, 40));
    }
}
```

Within your root builder:

```csharp
var changes = UI.Source(0);
var canSave = UI.Derive(() => changes.Value > 0);
var save = Actions.Save(canSave, () => changes.Value = 0);
```

Keep persistent application state outside a branch that can be removed. Passing the same source into multiple component calls shares state intentionally; placing `UI.Source` inside the factory gives each invocation its own state.

## Hide an instance without removing it

Bind `UI.Active` to a visibility source. Setting it false deactivates the native subtree while retaining its state and scoped bindings. Showing it again uses the same objects and does not rerun its factory.

```csharp
var visible = UI.Source(true);
var counter = Counter.Create("Retained");
UI.Apply(counter, UI.Active(visible));

var panel = UI.Column(
    12,
    UI.Button("Show / hide", () => visible.Value = !visible.Value),
    counter
);
```

An inactive component remains part of the mounted interface and is cleaned up when its owning scope ends.

## Remove and recreate a component

Use `UI.Show` for conditional construction. Its builder establishes an owned branch scope. Removing the branch cleans up its objects, observers, handlers and registered callbacks. Returning later constructs a new instance with fresh local state.

```csharp
var visible = UI.Source(true);
var branch = UI.Show(
    () => visible.Value,
    () => Counter.Create("Fresh each time")
);

var panel = UI.Column(UI.Vertical(12), UI.Children(() => branch.Value));
```

For state that survives removal, supply a source created outside the branch:

```csharp
var count = UI.Source(0);
var visible = UI.Source(true);
var branch = UI.Show(
    () => visible.Value,
    () => Counter.Create("Persistent count", count)
);

var panel = UI.Column(UI.Children(() => branch.Value));
```

The branch's native UI is reconstructed, while the externally held count remains. Build component instances in the `Show` callback; the reactive `Children` getter reads the existing branch results.

## Preserve component instances in keyed lists

Use explicit stable keys when items can reorder or receive replacement data objects. The keyed `UI.Indexes` overload retains each instance by key and supplies a read-only reactive value. Retained items update their data and move to the new display position without losing local state.

```csharp
using System.Collections.Generic;

var items = UI.Source(
    new[]
    {
        new KeyValuePair<int, string>(101, "Potion"),
        new KeyValuePair<int, string>(202, "Shield"),
    }
);

var rows = UI.Indexes(
    () => items.Value,
    (id, item, present) =>
    {
        var row = UI.Column(
            8,
            UI.Label(() => $"{id}: {item.Value}"),
            Counter.Create("Quantity")
        );
        return new Branch<RectTransform>(row);
    }
);

var list = UI.Column(UI.Children(() => rows.Value));

items.Value = new[]
{
    new KeyValuePair<int, string>(202, "Upgraded shield"),
    new KeyValuePair<int, string>(101, "Potion"),
};
```

Keys are unique and stable, independent of position. Removing an item ends its branch scope; adding it again constructs a new instance. Keep quantities or other persistent game state outside removed rows when they must survive reinsertion. For [retained exits and other list operators](dynamic-ui.md), see dynamic UI.

## Ownership across component files

Function and file boundaries do not introduce lifetimes. Ordinary nested factories inherit the mount or branch scope in which they execute. `UI.Cleanup` registers with that active scope. Conditional and keyed-list builders provide the cleanup boundaries for independently removable content. Native Unity object destruction and Pine scope disposal are distinct: destroying an arbitrary nested GameObject leaves its enclosing Pine scope alive. Remove independent components through their Pine branch or list membership to end their subscriptions along with their objects.

Destroying the mounted root or unloading its owning scene ends the complete mounted interface. Keep the returned `Mount` only for early disposal or explicit persistence. Disabling the script that initially mounted the interface does not rebuild or remove the tree.

## Typed properties

`IProperty<T>` accepts only compatible native targets. `UI.Text` accepts TMP text; `UI.Enabled` accepts Selectables; `UI.CellSize` accepts GridLayoutGroup. `UI.Frame(UI.Text("Invalid"))` fails compilation. Common operations such as Name, Size, Children and Opacity apply to UI-created components.

```csharp
var headingStyle = UI.Group<TMPro.TMP_Text>(
    UI.FontSize(28),
    UI.Tint(Color.white)
);

var heading = UI.Label(
    "Welcome",
    headingStyle,
    UI.Configure<TMPro.TextMeshProUGUI>(text =>
        text.alignment = TMPro.TextAlignmentOptions.Center
    )
);
```

`Group<T>` preserves target compatibility through nested groups. `Configure<T>` runs once against the result's compatible native type. `Set<T,TValue>` creates a named typed literal/reactive assignment. Getter dependencies are tracked; setter work is untracked.

```csharp
var spacing = UI.Source(2f);
UI.Apply(
    heading,
    UI.Set<TMPro.TMP_Text, float>(
        "Character spacing",
        (text, value) => text.characterSpacing = value,
        spacing
    )
);
```

## Save and reuse native results

```csharp
var size = UI.Source(new Vector2(360, 180));
var frame = UI.Frame(UI.Name("Saved panel"));
UI.Apply(frame, UI.Size(size));
frame.anchoredPosition = new Vector2(12, 24);

var label = UI.Label("Retained label", UI.Size(360, 48));
UI.Apply(frame, UI.Vertical(), UI.Children(label));
```

A direct native assignment sets a value once. A bound property may overwrite it on its next dependency update. Use a plain Frame for free positioning; rows/columns/grid drive native child positions.

`Create<T>` and `Clone<T>` own their new native objects. `Apply<T>` binds an existing component without destroying external objects on cleanup. `label.Bind(getter, setter)` binds a saved result. Additional declarations after construction run through the original live `mount.Scope.Run(...)`.

## Events and full controls

`OnClick`, `On<T>` and `On<T,TValue>` register owned native handlers. Callbacks retain construction scope/context and batch writes without tracking dependencies. `Changed` observes a native value via its supplied UnityEvent or the shared clock.

Use [complete controls](../api/controls.md) for buttons, toggles, sliders, scrollbars, text fields, dropdowns, scrolling and progress. Pine wires their required native graphics, handles, viewports, templates and text. `ToggleValue`, `SliderValue` and `InputValue` remain available for binding already-configured external controls.

Continue with [dynamic UI](dynamic-ui.md).
