---
title: Bind Unity UI to reactive C# state
sidebar_label: State-to-UI bindings
description: Bind Unity labels, colors, and button state to C# sources and derived values with Pine. Batch related gameplay changes and dispose owned bindings.
---

import InteractiveExample from '@site/src/components/InteractiveExample';

# Bind Unity UI to reactive C# state

Data binding keeps an interface synchronized with explicit state. This example binds a score, a level, a derived rank, a text color, and a reset button.

## Run the example

Install the matching Pine package, then save the script with the filename shown. Create its owner in code with `new GameObject("Example owner").AddComponent<PineBindings>()`, or use your existing component-instantiation flow. Pine creates the Canvas and controls automatically.

<a href="/examples/0.2.0/PineBindings.cs" download="PineBindings.cs" target="_self">Download PineBindings.cs</a>. The source is MIT licensed, like Pine.

```csharp title="PineBindings.cs"
using Pine;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace PineDocs.Examples
{
    public sealed class PineBindings : MonoBehaviour
    {
        public readonly Source<int> Score = UI.Source(0);
        public readonly Source<int> Level = UI.Source(1);

        private void Start() => UI.Mount(Build);

        private Component Build()
        {
            var rank = UI.Derive(() =>
                Score.Value >= 30 ? "Explorer" : "Beginner"
            );
            return UI.Column(
                UI.Name("Data binding"),
                UI.Size(520, 380),
                UI.Padding(new RectOffset(24, 24, 20, 20)),
                UI.Children(
                    UI.Label("Data binding", UI.FontSize(32), UI.Size(472, 48)),
                    UI.Label(
                        () => $"Level {Level.Value} | Score {Score.Value}",
                        UI.Size(472, 40)
                    ),
                    UI.Label(
                        rank,
                        UI.Name("Rank"),
                        UI.Size(472, 40),
                        UI.Set<TextMeshProUGUI, Color>(
                            "Rank color",
                            (label, color) => label.color = color,
                            () =>
                                Score.Value >= 30
                                    ? new Color(0.35f, 0.81f, 0.59f)
                                    : Color.white
                        )
                    ),
                    UI.Button("Gain 10 points", GainPoints, UI.Size(472, 48)),
                    UI.Button("Advance level", AdvanceLevel, UI.Size(472, 48)),
                    UI.Button(
                        "Reset",
                        ResetProgress,
                        UI.Enabled(() => Score.Value != 0 || Level.Value != 1),
                        UI.Size(472, 48)
                    )
                )
            );
        }

        public void GainPoints() => Score.Value += 10;

        public void AdvanceLevel() =>
            UI.Batch(() =>
            {
                Level.Value++;
                Score.Value = 0;
            });

        public void ResetProgress() =>
            UI.Batch(() =>
            {
                Level.Value = 1;
                Score.Value = 0;
            });
    }
}
```

<span id="in-unity"/>

## Interactive browser preview

<InteractiveExample kind="binding" version="0.2.0"/>

## Follow the data flow

Click **Gain 10 points** three times. The score label changes immediately, the derived rank becomes **Explorer**, its text turns green, and Reset becomes interactable. `UI.Set<TextMeshProUGUI, Color>` identifies the native component and value type for the custom color binding.

Each getter collects the sources it actually reads. A later assignment reruns the dependent work. `Configure<T>` is useful for fixed native setup; reactive getters belong in `Label`, a property helper, or `Set<T, TValue>`.

## Batch related changes

**Advance level** updates the level and resets the score inside one `UI.Batch`. Scheduled observers run after the batch completes, so bindings see the combined result. **Reset** uses the same pattern. Derived reads inside a batch can still obtain current values; batching defers scheduled observer execution.

Create derived values and bindings under the mount so their lifetime matches the screen. The tree remains mounted until its root or scene is destroyed. Keep the optional returned Mount only when you need explicit early disposal.

Use `Toggle`, `Slider` and `TextField` with a source for complete two-way controls. `ToggleValue`, `SliderValue` and `InputValue` also bind already-configured external controls. See [standard controls](../api/controls.md).

Continue with [reactive state](../tutorials/reactivity.md), [batching and reactive inputs](../api/utility.md), or [spring animation](spring-animation.md).
