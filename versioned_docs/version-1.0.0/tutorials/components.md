---
title: Compose reusable Unity UI components in C#
sidebar_label: Components and properties
description: Mount one root interface and compose typed component functions with local or shared state, caller-provided children and owned dynamic branches.
---

# Compose reusable Unity UI components in C#

Return your application tree from `App.Mount()` in **App.cs**. Components in other files return native UI and can call other components at any depth. They do not mount themselves. Use plain functions for UI-only components, or `MonoBehaviour` when you need Unity callbacks.

## Run the example

Download <a href="/examples/1.0.0/App.cs" download="App.cs" target="_self">App.cs</a>, <a href="/examples/1.0.0/Counter.cs" download="Counter.cs" target="_self">Counter.cs</a>, <a href="/examples/1.0.0/Card.cs" download="Card.cs" target="_self">Card.cs</a> and <a href="/examples/1.0.0/Actions.cs" download="Actions.cs" target="_self">Actions.cs</a>. Place these four files under Assets and press Play. The package's **Component composition** sample contains the same files. Keep only one App.cs entry in a project; compose this example into an existing app instead of adding a second entry.

### App.cs

This is the only automatic entry. It returns the whole tree directly. Independent counters receive local state; the second pair shares one explicit source.

```csharp title="App.cs"
using Pine;
using UnityEngine;

namespace PineComposition.Examples
{
    public static class App
    {
        public static RectTransform Mount()
        {
            var shared = UI.Source(value: 0);
            return UI.Column(
                UI.Name(name: "Pine Composition"),
                UI.Size(width: 420, height: 640),
                UI.Vertical(spacing: 12),
                UI.Children(
                    UI.Label(
                        text: "Component composition",
                        UI.Size(width: 420, height: 40)
                    ),
                    Card.Create(
                        title: "Independent counters",
                        Components.Counter(title: "First"),
                        Components.Counter(title: "Second")
                    ),
                    Card.Create(
                        title: "Shared state",
                        Components.Counter(title: "Shared A", count: shared),
                        Components.Counter(title: "Shared B", count: shared)
                    ),
                    Actions.Save(
                        canSave: UI.Derive(compute: () => shared.Value > 0),
                        save: () => shared.Value = 0
                    )
                )
            );
        }
    }
}
```

### Counter.cs

Declare the behaviour's UI with a public instance `Create(...)` method. Pine generates `Components.Counter(...)` from its signature, preserving parameter names, types and optional defaults. Each call creates an independent behaviour and reactive scope; you never write the generated wrapper or a render lambda.

```csharp title="Counter.cs"
using Pine;
using UnityEngine;

namespace PineComposition.Examples
{
    public sealed class Counter : MonoBehaviour
    {
        public RectTransform Create(
            Value<string> title,
            Source<int> count = null
        )
        {
            count ??= UI.Source(value: 0);
            return UI.Column(
                gap: 8,
                UI.Label(
                    text: () => $"{title.Read()}: {count.Value}",
                    UI.Size(width: 420, height: 32)
                ),
                UI.Button(
                    text: "Increment",
                    click: () => count.Value++,
                    UI.Size(width: 420, height: 40)
                )
            );
        }
    }
}
```

`Value<string> title` accepts a literal, source, derived value, spring or wrapped getter. `title.Read()` observes its current value inside the label binding. Use an ordinary `string` instead when the title should be fixed. `Source<int> count` is writable shared state; omitting it creates independent local state.

### Unity callbacks

A generated factory creates its behaviour inactive, calls `Create(...)` to initialize props and the native tree, then activates the behaviour. `Awake` and `OnEnable` therefore see the initialized instance. `Start`, `Update`, `OnDisable` and `OnDestroy` remain normal Unity callbacks. The behaviour is a layout-ignored child of its returned UI root: deactivating that root stops Unity updates; reactivating it retains state. Destroying the root disposes its owned scope and behaviour.

Use source writes for UI updates from callbacks. Declarations such as `UI.Label` require a live construction scope; callbacks do not automatically rebuild the tree. Event subscriptions made directly in your own callbacks still need normal unsubscription, or register an unsubscription with `UI.Cleanup` during `Create`.

For example, a timer uses a normal Unity update callback without any mounting hooks:

```csharp title="Clock.cs"
using Pine;
using UnityEngine;

public sealed class Clock : MonoBehaviour
{
    private readonly Source<float> _elapsed = UI.Source(value: 0f);

    public Component Create() =>
        UI.Label(text: () => $"Seconds: {_elapsed.Value:F1}");

    private void Update() => _elapsed.Value += Time.deltaTime;
}
```

Compose it with `Components.Clock()` in your returned tree. The generator supplies the typed factory; you write only the state, declaration and callback that the timer needs.

Component files opt into generation by importing `Pine` (including a UI alias/static import), living in the Pine namespace, or directly calling its qualified UI methods. Unrelated existing `Create` methods are left alone.

The behaviour must be public, concrete, non-generic and top-level. `Create` must be public, non-static, non-generic, return a native `Component` subtype, and take ordinary by-value props. Factories are generated in the behaviour's namespace. A handwritten class named `Components` in that namespace must be `public static partial`.

### Plain functions

For components without Unity callbacks, write a plain function. It needs no behaviour, wrapper or registration:

```csharp title="Components.cs"
using Pine;
using UnityEngine;

public static partial class Components
{
    public static RectTransform Header(string title) =>
        UI.Column(gap: 8, UI.Label(text: title, UI.FontSize(size: 28)));
}
```

Call `Components.Header(title: "Inventory")` directly inside any component. Plain functions inherit the surrounding construction scope and may have any method name. `Create` is required only for the generated MonoBehaviour convention.

### Card.cs

Containers can accept children supplied by callers, including nested components.

```csharp title="Card.cs"
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
                gap: 8,
                UI.Label(
                    text: title,
                    UI.FontSize(size: 24),
                    UI.Size(width: 420, height: 36)
                ),
                UI.Column(gap: 8, children)
            );
        }
    }
}
```

### Actions.cs

Typed reactive inputs and callbacks let the caller own application state and operations.

```csharp title="Actions.cs"
using System;
using Pine;
using UnityEngine.UI;

namespace PineComposition.Examples
{
    public static class Actions
    {
        public static Button Save(Value<bool> canSave, Action save)
        {
            return UI.Button(
                text: "Save",
                click: save,
                UI.Enabled(enabled: canSave),
                UI.Size(width: 420, height: 40)
            );
        }
    }
}
```

## Container shorthand and advanced properties

Use `UI.Column(gap: 12, childA, childB)` and `UI.Row(gap: 8, childA, childB)` for ordinary fixed-spacing composition. Child order matches argument order. The shorthand uses the same native layout and ownership as the property declarations.

Use the property overload when declaring reactive spacing, sizing or dynamic child membership:

```csharp
var gap = UI.Source(value: 12f);
var panel = UI.Column(
    UI.Vertical(gap),
    UI.Size(width: 420, height: 240),
    UI.Children(
        Components.Counter(title: "First"),
        Components.Counter(title: "Second")
    )
);
```

You can also save a shorthand container and apply compatible properties with `UI.Apply`, when you need to bind a saved result. Child factories run first in the active scope, then the container attaches their native results.

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
        return UI.Button(
            text: "Save",
            click: save,
            UI.Enabled(enabled: canSave),
            UI.Size(width: 420, height: 40)
        );
    }
}
```

Within your root builder:

```csharp
var changes = UI.Source(value: 0);
var canSave = UI.Derive(compute: () => changes.Value > 0);
var save = Actions.Save(canSave, () => changes.Value = 0);
```

Keep persistent application state outside a branch that can be removed. Passing the same source into multiple component calls shares state intentionally; placing `UI.Source` inside the factory gives each invocation its own state.

## Hide an instance without removing it

Bind `UI.Active` to a visibility source. Setting it false deactivates the native subtree while retaining its state and scoped bindings. Showing it again uses the same objects and does not rerun its factory.

```csharp
var visible = UI.Source(value: true);
var counter = Components.Counter(title: "Retained");
UI.Apply(target: counter, UI.Active(active: visible));

var panel = UI.Column(
    gap: 12,
    UI.Button(text: "Show / hide", click: () => visible.Value = !visible.Value),
    counter
);
```

An inactive component remains part of the mounted interface and is cleaned up when its owning scope ends.

## Remove and recreate a component

Use `UI.Show` for conditional construction. Its builder establishes an owned branch scope. Removing the branch cleans up its objects, observers, handlers and registered callbacks. Returning later constructs a new instance with fresh local state.

```csharp
var visible = UI.Source(value: true);
var branch = UI.Show(
    condition: () => visible.Value,
    build: () => Components.Counter(title: "Fresh each time")
);

var panel = UI.Column(UI.Vertical(12), UI.Children(read: () => branch.Value));
```

For state that survives removal, supply a source created outside the branch:

```csharp
var count = UI.Source(value: 0);
var visible = UI.Source(value: true);
var branch = UI.Show(
    condition: () => visible.Value,
    build: () => Components.Counter(title: "Persistent count", count: count)
);

var panel = UI.Column(UI.Children(read: () => branch.Value));
```

The branch's native UI is reconstructed, while the externally held count remains. Build component instances in the `Show` callback; the reactive `Children` getter reads the existing branch results.

## Preserve component instances in keyed lists

Use explicit stable keys when items can reorder or receive replacement data objects. The keyed `UI.Indexes` overload retains each instance by key and supplies a read-only reactive value. Retained items update their data and move to the new display position without losing local state.

```csharp
using System.Collections.Generic;

var items = UI.Source(
    value: new[]
    {
        new KeyValuePair<int, string>(101, "Potion"),
        new KeyValuePair<int, string>(202, "Shield"),
    }
);

var rows = UI.Indexes(
    read: () => items.Value,
    build: (id, item, present) =>
    {
        var row = UI.Column(
            gap: 8,
            UI.Label(text: () => $"{id}: {item.Value}"),
            Components.Counter(title: "Quantity")
        );
        return new Branch<RectTransform>(row);
    }
);

var list = UI.Column(UI.Children(read: () => rows.Value));

items.Value = new[]
{
    new KeyValuePair<int, string>(202, "Upgraded shield"),
    new KeyValuePair<int, string>(101, "Potion"),
};
```

Keys are unique and stable, independent of position. Removing an item ends its branch scope; adding it again constructs a new instance. Keep quantities or other persistent game state outside removed rows when they must survive reinsertion. For [retained exits and other list operators](dynamic-ui.md), see dynamic UI.

## Ownership across component files

Plain function and file boundaries do not introduce lifetimes: these factories inherit the mount or branch scope. `UI.Cleanup` registers with that active scope. Generated MonoBehaviour factories add an owned child scope, so destroying their returned native root releases their bindings and behaviour independently. Conditional and keyed-list builders also provide owned scopes for removable content.

Destroying the application root ends the complete interface. The canvas persists by default; `App.Options` can set `Persistent = false` for scene lifetime. Hiding native UI retains bindings and state; it does not reconstruct components. Removing a `Show` branch or keyed item disposes its scope and native objects.

## Typed properties

`IProperty<T>` accepts only compatible native targets. `UI.Text` accepts TMP text; `UI.Enabled` accepts Selectables; `UI.CellSize` accepts GridLayoutGroup. `UI.Frame(UI.Text("Invalid"))` fails compilation. Common operations such as Name, Size, Children and Opacity apply to UI-created components.

```csharp
var headingStyle = UI.Group<TMPro.TMP_Text>(
    UI.FontSize(size: 28),
    UI.Tint(color: Color.white)
);

var heading = UI.Label(
    text: "Welcome",
    headingStyle,
    UI.Configure<TMPro.TextMeshProUGUI>(configure: text =>
        text.alignment = TMPro.TextAlignmentOptions.Center
    )
);
```

`Group<T>` preserves target compatibility through nested groups. `Configure<T>` runs once against the result's compatible native type. `Set<T,TValue>` creates a named typed literal/reactive assignment. Getter dependencies are tracked; setter work is untracked.

```csharp
var spacing = UI.Source(value: 2f);
UI.Apply(
    target: heading,
    UI.Set<TMPro.TMP_Text, float>(
        name: "Character spacing",
        set: (text, value) => text.characterSpacing = value,
        spacing
    )
);
```

## Save and reuse native results

```csharp
var size = UI.Source(value: new Vector2(x: 360, y: 180));
var frame = UI.Frame(UI.Name(name: "Saved panel"));
UI.Apply(target: frame, UI.Size(size: size));
frame.anchoredPosition = new Vector2(x: 12, y: 24);

var label = UI.Label(text: "Retained label", UI.Size(width: 360, height: 48));
UI.Apply(target: frame, UI.Vertical(), UI.Children(label));
```

A direct native assignment sets a value once. A bound property may overwrite it on its next dependency update. Use a plain Frame for free positioning; rows/columns/grid drive native child positions.

`Create<T>` and `Clone<T>` own their new native objects. `Apply<T>` binds an existing component without destroying external objects on cleanup. `label.Bind(getter, setter)` binds a saved result. Additional declarations after construction run through the original live `mount.Scope.Run(...)`.

## Events and full controls

`OnClick`, `On<T>` and `On<T,TValue>` register owned native handlers. Callbacks retain construction scope/context and batch writes without tracking dependencies. `Changed` observes a native value via its supplied UnityEvent or the shared clock.

Use [complete controls](../api/controls.md) for buttons, toggles, sliders, scrollbars, text fields, dropdowns, scrolling and progress. Pine wires their required native graphics, handles, viewports, templates and text. `ToggleValue`, `SliderValue` and `InputValue` remain available for binding already-configured external controls.

Continue with [dynamic UI](dynamic-ui.md).
