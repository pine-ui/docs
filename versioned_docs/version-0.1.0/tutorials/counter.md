---
title: Build your first reactive Unity UI
sidebar_label: Your first counter
description: Create a Unity UI counter in C# with Pine sources, reactive text, button callbacks, and a mount that owns cleanup.
---

# Build your first reactive Unity UI

Sources hold state. A getter binding reads state, and a button callback changes it.

```csharp
using Pine;
using UnityEngine;
using UI = Pine.Pine;

public sealed class Counter : MonoBehaviour
{
    private readonly Source<int> _count = UI.Source(0);
    private MountHandle _mount;

    private void OnEnable()
    {
        _mount = UI.Mount(() =>
            UI.Column(
                UI.Name("Counter"),
                UI.Size(360, 180),
                UI.Vertical(12),
                UI.Label(
                    () => $"Count: {_count.Value}",
                    UI.PreferredSize(360, 48)
                ),
                UI.Button(
                    "Increment",
                    () => _count.Value++,
                    UI.PreferredSize(360, 48)
                ),
                UI.Button(
                    "Reset",
                    () => _count.Value = 0,
                    UI.Enabled(() => _count.Value > 0),
                    UI.PreferredSize(360, 48)
                )
            )
        );
    }

    private void OnDisable()
    {
        _mount?.Dispose();
        _mount = null;
    }
}
```

Attach `Counter` to a GameObject if using this component lifecycle. The source survives disabling/re-enabling; each mount owns its bindings and native objects. You can also start UI from a static `[RuntimeInitializeOnLoadMethod]` instead of attaching a component, as the imported sample does with `-pine-example` or `PINE_EXAMPLE=1`.

Mounts create their hierarchy, overlay Canvas and input host in code. Configure text using the [installation steps](installation.md). Destroying a mounted root disposes its scope; explicit disposal removes the generated UI and subscriptions.

`Label` and `Enabled` accept direct getter lambdas. Literal text such as `"Increment"` is fixed. `new Value<T>(() => ...)` remains valid when you want an explicit wrapper.

Continue with [reactivity](reactivity.md).

Build a [reactive game HUD](../guides/reactive-hud.md) using the same source and mount pattern.
