---
title: Build your first reactive Unity UI
sidebar_label: Your first counter
description: Build a typed reactive counter with a single tree mount and exact sizing.
---

# Build your first reactive Unity UI

A source holds state. A text getter follows it; a native button callback changes it. `UI.Mount` owns the generated hierarchy and removes bindings when its root is destroyed.

```csharp
using Pine;
using UnityEngine;

public sealed class Counter : MonoBehaviour
{
    private readonly Source<int> _count = UI.Source(0);

    [RuntimeInitializeOnLoadMethod]
    private static void StartUI()
    {
        new GameObject("Counter owner").AddComponent<Counter>();
    }

    private void Start() => UI.Mount(Build);

    private Component Build()
    {
        return UI.Column(
            UI.Name("Counter"),
            UI.Size(360, 180),
            UI.Vertical(12),
            UI.Children(
                UI.Label(() => $"Count: {_count.Value}", UI.Size(360, 48)),
                UI.Button("Increment", () => _count.Value++, UI.Size(360, 48)),
                UI.Button(
                    "Reset",
                    () => _count.Value = 0,
                    UI.Enabled(() => _count.Value > 0),
                    UI.Size(360, 48)
                )
            )
        );
    }
}
```

`using Pine;` exposes the `UI` class, reactive types and mount configuration. `UI.Children(...)` separates native children from typed property operations. `UI.Size` requests exact rect/layout dimensions; `UI.FillWidth()` and `UI.AutoHeight()` express flexible/content sizing separately.

`Start()` calls `UI.Mount(Build)` once. Changes to `_count` update the retained TMP text and enabled-state binding; the interface is not rebuilt. Disabling or re-enabling the creating component does not affect this independent UI tree. Scene unload or root destruction disposes bindings and native handlers automatically. Retain the returned `Mount` only when you need early disposal.

The startup method creates the owner without Inspector setup. If a scene already instantiates the component, omit the startup method to avoid two owners. Keep application ownership explicit: scene objects disappear with their scene; For persistent UI, retain the mount and apply `DontDestroyOnLoad(mount.Canvas.gameObject)` to its owned canvas; persisting only the creating component does not persist the separate UI tree.

Continue with [reactivity](reactivity.md) and [typed composition](components.md).
