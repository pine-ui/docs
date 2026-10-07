---
title: Build a reactive Unity game HUD
sidebar_label: Reactive HUD
description: Create a Unity game HUD with Pine sources, reactive text and native UI controls. Preview state changes and download the complete C# example.
---

import InteractiveExample from '@site/src/components/InteractiveExample';

# Reactive HUD

Bind game state through sources or tracked getters. Build the hierarchy once in `App.Mount`, then update sources from game events.

```csharp
var health = P.Source(100);
return P.Horizontal(
    P.Text(() => $"Health: {health.Value}"),
    P.Button("Damage", onClick: () => health.Value = Mathf.Max(0, health.Value - 10))
);
```

Use native layout props for sizing. [Counter source](../tutorials/counter.md).

## Keep display state separate from editable state

The complete HUD below starts with 100 health and zero coins. Take 10 damage decreases health without going below zero; that button disables when health reaches zero. Collect a coin changes the coin source independently. These controls make it possible to check each state update without connecting a game system first.

The health slider is display-only: it receives a getter through `Value<float>` and has `interactable: false`. A writable source passed directly to an editable native prop would allow user changes to write back. Use that distinction when connecting a HUD to gameplay state. See [editable native controls](data-binding.md) for two-way wiring.

Keep reads inside tracked getters so labels and the slider update the existing native components. When adapting this example, write sources from your gameplay events on the Unity main thread and retain their scope ownership. The [state and ownership API](../api/core.md) explains what stops when the mounted root is destroyed. The browser preview models these state changes; use the downloaded C# files for the Unity interface.

<InteractiveExample kind="hud" version="1.0.0" />

## Run the example

Import both files into Assets/Examples. Keep one `App.cs` entry. These use the native API; the browser preview models the state changes above.

<a href="/examples/1.0.0/reactive-hud/PineHud.cs" download>Download PineHud.cs</a> · <a href="/examples/1.0.0/reactive-hud/App.cs" download>Download App.cs</a>

```csharp
using Pine;
using UnityEngine;

namespace PineDocs.Examples
{
    public static class PineHud
    {
        public static View Create()
        {
            var health = P.Source(100);
            var coins = P.Source(0);
            return P.Vertical(
                    spacing: 8,
                    childControlWidth: true,
                    childControlHeight: true,
                    childForceExpandHeight: false,
                    sizeDelta: new Vector2(520, 300)
                )
                .With(
                    P.Text("Game HUD").With(P.LayoutElement(preferredHeight: 40)),
                    P.Text(() => $"Health: {health.Value} / 100")
                        .With(P.LayoutElement(preferredHeight: 40)),
                    P.Slider(
                            value: new Value<float>(() => health.Value),
                            minValue: 0,
                            maxValue: 100,
                            interactable: false
                        )
                        .With(P.LayoutElement(preferredHeight: 24)),
                    P.Text(() => $"Coins: {coins.Value}")
                        .With(P.LayoutElement(preferredHeight: 40)),
                    P.Button(
                            "Take 10 damage",
                            interactable: new Value<bool>(() => health.Value > 0),
                            onClick: () => health.Value = Mathf.Max(0, health.Value - 10)
                        )
                        .With(P.LayoutElement(preferredHeight: 40)),
                    P.Button("Collect a coin", onClick: () => coins.Value++)
                        .With(P.LayoutElement(preferredHeight: 40))
                );
        }
    }
}
```
