---
title: Bind Unity UI to reactive C# state
sidebar_label: State-to-UI bindings
description: Bind Unity labels, colors, and button state to C# sources and derived values with Pine. Batch related gameplay changes and dispose owned bindings.
---

# Bind Unity UI to reactive C# state

Data binding keeps an interface synchronized with explicit state. This example binds a score, a level, a derived rank, a text color, and a reset button.

## Run the example

Save the component and **App.cs** under Assets, then press Play. Pine starts the app and constructs the component automatically. If your project already has App.cs, put `Components.PineBindings()` in its returned tree instead of adding another entry.

<a href="/examples/0.2.0/data-binding/App.cs" download="App.cs" target="_self">Download App.cs</a> · <a href="/examples/0.2.0/data-binding/PineBindings.cs" download="PineBindings.cs" target="_self">Download PineBindings.cs</a>. Sources are MIT licensed.

```csharp title="App.cs"
using UnityEngine;

namespace PineDocs.Examples
{
    public static class App
    {
        public static Component Mount() => Components.PineBindings();
    }
}
```

```csharp title="PineBindings.cs"
using Pine;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace PineDocs.Examples
{
    public sealed class PineBindings : MonoBehaviour
    {
        public readonly Source<int> Score = UI.Source(value: 0);
        public readonly Source<int> Level = UI.Source(value: 1);

        public Component Create()
        {
            var rank = UI.Derive(compute: () =>
                Score.Value >= 30 ? "Explorer" : "Beginner"
            );
            return UI.Column(
                UI.Name(name: "Data binding"),
                UI.Size(width: 520, height: 380),
                UI.Padding(
                    padding: new RectOffset(
                        left: 24,
                        right: 24,
                        top: 20,
                        bottom: 20
                    )
                ),
                UI.Children(
                    UI.Label(
                        text: "Data binding",
                        UI.FontSize(size: 32),
                        UI.Size(width: 472, height: 48)
                    ),
                    UI.Label(
                        text: () =>
                            $"Level {Level.Value} | Score {Score.Value}",
                        UI.Size(width: 472, height: 40)
                    ),
                    UI.Label(
                        text: rank,
                        UI.Name(name: "Rank"),
                        UI.Size(width: 472, height: 40),
                        UI.Set<TextMeshProUGUI, Color>(
                            name: "Rank color",
                            set: (label, color) => label.color = color,
                            read: () =>
                                Score.Value >= 30
                                    ? new Color(r: 0.35f, g: 0.81f, b: 0.59f)
                                    : Color.white
                        )
                    ),
                    UI.Button(
                        text: "Gain 10 points",
                        click: GainPoints,
                        UI.Size(width: 472, height: 48)
                    ),
                    UI.Button(
                        text: "Advance level",
                        click: AdvanceLevel,
                        UI.Size(width: 472, height: 48)
                    ),
                    UI.Button(
                        text: "Reset",
                        click: ResetProgress,
                        UI.Enabled(enabled: () =>
                            Score.Value != 0 || Level.Value != 1
                        ),
                        UI.Size(width: 472, height: 48)
                    )
                )
            );
        }

        public void GainPoints() => Score.Value += 10;

        public void AdvanceLevel() =>
            UI.Batch(action: () =>
            {
                Level.Value++;
                Score.Value = 0;
            });

        public void ResetProgress() =>
            UI.Batch(action: () =>
            {
                Level.Value = 1;
                Score.Value = 0;
            });
    }
}
```

## In Unity

<img src="/img/guides/data-binding.png" alt="A Pine data-binding example rendered in Unity with Level 1, Score 30, a green Explorer rank, and gameplay buttons." width="960" height="720" loading="lazy" decoding="async"/>

## Follow the data flow

Click **Gain 10 points** three times. The score label changes immediately, the derived rank becomes **Explorer**, its text turns green, and Reset becomes interactable. `UI.Set<TextMeshProUGUI, Color>` identifies the native component and value type for the custom color binding.

Each getter collects the sources it actually reads. A later assignment reruns the dependent work. `Configure<T>` is useful for fixed native setup; reactive getters belong in `Label`, a property helper, or `Set<T, TValue>`.

## Batch related changes

**Advance level** updates the level and resets the score inside one `UI.Batch`. Scheduled observers run after the batch completes, so bindings see the combined result. **Reset** uses the same pattern. Derived reads inside a batch can still obtain current values; batching defers scheduled observer execution.

Create derived values and bindings under the mount so their lifetime matches the screen. The tree remains mounted until its root is destroyed. The application persists across scenes by default; configure `CanvasOptions.Persistent = false` for scene lifetime. Explicit mounts remain available for early disposal.

Use `Toggle`, `Slider` and `TextField` with a source for complete two-way controls. `ToggleValue`, `SliderValue` and `InputValue` also bind already-configured external controls. See [standard controls](../api/controls.md).

Continue with [reactive state](../tutorials/reactivity.md), [batching and reactive inputs](../api/utility.md), or [spring animation](spring-animation.md).
