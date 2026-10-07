---
title: "Build a reactive Unity UI counter (Pine 1.2.0)"
sidebar_label: Counter
description: "Build a working Unity uGUI counter in C# with Pine sources, reactive text, native buttons and automatic startup. Download the complete App.cs example. Pine 1.2.0 documentation."
---

# Counter

Pine 1.2.0 provides native uGUI declarations. Import `using Pine;` and `using Pine.uGUI;` and use `P` directly. `View` is a declaration; `UnityEngine.Component` is the native object built from it. `App.Mount()` runs once. Sources update retained native components through tracked getters.

```csharp
using Pine;
using Pine.uGUI;
using UnityEngine;

public static class App
{
    public static View Mount()
    {
        var count = P.Source(0);
        return P.Vertical(
            spacing: 12,
            childControlWidth: true,
            childControlHeight: true,
            childForceExpandHeight: false,
            sizeDelta: new Vector2(240, 160),
            children: new[]
            {
                P.Text(
                    () => $"Count: {count.Value}",
                    fontSize: 24,
                    children: new[] { P.LayoutElement(preferredHeight: 40) }
                ),
                P.Button(
                    "Increment",
                    onClick: () => count.Value++,
                    children: new[] { P.LayoutElement(preferredHeight: 40) }
                ),
                P.Button(
                    "Reset",
                    onClick: () => count.Value = 0,
                    interactable: new Value<bool>(() => count.Value > 0),
                    children: new[] { P.LayoutElement(preferredHeight: 40) }
                ),
            }
        );
    }
}
```

`P.Button` creates a real `UnityEngine.UI.Button` and wires its background `Image`. Supplying text adds a TMP caption. Layout sizing uses native `LayoutElement` settings. Omitted props retain native component defaults, so this example explicitly enables layout child sizing.

## Run the example

[Download App.cs](pathname:///examples/1.2.0/Counter/App.cs). Keep one `App.cs` entry in a project.

After [installing Pine](installation.md), save the script in your project and enter Play mode. The label starts at `Count: 0`; Reset starts disabled. Click Increment twice to see `Count: 2`, then Reset to return to zero and disable Reset again.

## How the counter updates

`count` is writable state. The text getter reads `count.Value`, so Pine tracks that dependency and updates the existing TMP component when a button changes the source. The Reset binding reads the same source to update the native button's `interactable` property. The event handlers write the source; they do not rebuild the view tree or search the scene for labels.

Keep the getter in `P.Text(() => $"Count: {count.Value}")`. Passing a completed string such as `P.Text($"Count: {count.Value}")` supplies a literal snapshot, which will not follow later changes. The [reactive props tutorial](reactivity.md) explains literals, getters and editable source write-back.

The mounted root owns the text and button bindings. Destroying that root ends its scope and removes the owned bindings and handlers. See [state and ownership](../api/core.md) before moving calculations into a service or a custom component.
