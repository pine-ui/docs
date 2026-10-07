---
title: "Two-way data binding for Unity UI (Pine 1.2.0)"
sidebar_label: Editable native controls
description: "Connect Unity input fields, sliders and toggles to typed C# state with Pine. Explore a browser preview and download the native Unity example. Pine 1.2.0 documentation."
---

import InteractiveExample from '@site/src/components/InteractiveExample';

# Editable native controls

Pass a Source directly to an editable native prop for two-way wiring.

```csharp
var playerName = P.Source("Player");
var volume = P.Source(.5f);
var enabled = P.Source(true);
return P.Vertical(
    P.InputField(text: playerName, characterLimit: 24),
    P.Slider(value: volume, minValue: 0, maxValue: 1),
    P.Toggle("Enabled", isOn: enabled)
);
```

Native edits update the source. Source updates use non-notifying native setters and preserve Unity's validation/clamping. A derived value or getter is one-way. Native event callbacks such as `onValueChanged` remain available alongside source wiring. [Native props](../api/controls-reference.md).

## Choose one-way or two-way binding

Use a writable source for an editable value when user input should update the same application state. In the fragment above, typing edits `playerName`, moving the slider edits `volume`, and changing the toggle edits `enabled`. Keep each source's type matched to the native prop.

Use a getter or derived value for display-only output. The complete example below demonstrates this path: score determines the rank label and its color, while buttons change the underlying sources. Its browser preview models those score and level changes; it does not run Unity input fields.

Click Gain 10 points three times to reach Explorer at 30 points. Advance level increments the level and resets score together using `P.Batch`; Reset restores level one and score zero. If a label stops following state, check whether you passed a literal snapshot instead of a tracked getter. See [reactive props](../tutorials/reactivity.md) for binding and write-back rules.

<InteractiveExample kind="binding" version="1.2.0" />

## Run the example

Import both files into Assets/Examples. Keep one `App.cs` entry. These use the native API; the browser preview models the state changes above.

<a href="/examples/1.2.0/data-binding/PineBindings.cs" download>Download PineBindings.cs</a> · <a href="/examples/1.2.0/data-binding/App.cs" download>Download App.cs</a>

```csharp
using Pine;
using Pine.uGUI;
using UnityEngine;

namespace PineDocs.Examples
{
    public static class PineBindings
    {
        public static View Create()
        {
            var score = P.Source(0);
            var level = P.Source(1);
            var rank = P.Derive(() => score.Value >= 30 ? "Explorer" : "Beginner");
            return P.Vertical(
                spacing: 8,
                childControlWidth: true,
                childControlHeight: true,
                childForceExpandHeight: false,
                sizeDelta: new Vector2(520, 300),
                children: new[]
                {
                    P.Text(
                        () => $"Level {level.Value} | Score {score.Value}",
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Text(
                        rank,
                        color: new Value<Color>(() =>
                            score.Value >= 30 ? Color.green : Color.white
                        ),
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Button(
                        "Gain 10 points",
                        onClick: () => score.Value += 10,
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Button(
                        "Advance level",
                        onClick: () =>
                            P.Batch(() =>
                            {
                                level.Value++;
                                score.Value = 0;
                            }),
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Button(
                        "Reset",
                        interactable: new Value<bool>(() => score.Value != 0 || level.Value != 1),
                        onClick: () =>
                            P.Batch(() =>
                            {
                                score.Value = 0;
                                level.Value = 1;
                            }),
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                }
            );
        }
    }
}
```
