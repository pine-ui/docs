---
title: Build your first reactive Unity UI
sidebar_label: Your first counter
description: Build a typed reactive counter in App.cs with automatic startup, named inputs and retained bindings.
---

# Build your first reactive Unity UI

Create **App.cs**. This is the entire application: the source holds state, labels read it, and buttons change it.

```csharp title="App.cs"
using Pine;
using UnityEngine;

public static class App
{
    public static RectTransform Mount()
    {
        var count = UI.Source(value: 0);

        return UI.Column(
            gap: 12,
            UI.Label(text: () => $"Count: {count.Value}"),
            UI.Button(text: "Increment", click: () => count.Value++),
            UI.Button(
                text: "Reset",
                click: () => count.Value = 0,
                UI.Enabled(enabled: () => count.Value > 0)
            )
        );
    }
}
```

Pine calls `App.Mount()` once and mounts its returned native tree automatically. `count` is local to this application construction and remains captured by the bindings and button callbacks. Assigning `count.Value` updates the existing text and reset button; it does not rerun `Mount()` or recreate the controls.

`using Pine;` exposes `UI`, reactive types and canvas configuration. Named parameters show what each value means. `gap: 12` selects the compact column overload; children stay in their argument order. Use `UI.Children(...)` with the property overload when you need explicit styling or reactive membership.

The default canvas persists across scenes. Destroying its root ends the tree's bindings and handlers. An optional `App.Options` property returning `new CanvasOptions { Persistent = false }` makes it scene-lived. You need a `Mount` variable only for explicit early disposal, not ordinary startup.

Use `UI.Size(width: 360, height: 48)` for exact dimensions, `UI.FillWidth()` for available width, and `UI.AutoHeight()` for content height. Exact children may overflow a small parent; clipping and scrolling are explicit.

Continue with [reactivity](reactivity.md) and [reusable components](components.md).
