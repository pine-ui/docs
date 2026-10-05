---
title: Build a reactive game HUD in Unity
sidebar_label: Reactive game HUD
description: Create a Unity health and coin HUD in C# with Pine sources, derived health-bar width, reactive labels, and scoped button callbacks.
---

import InteractiveExample from '@site/src/components/InteractiveExample';

# Build a reactive game HUD in Unity

A HUD reflects gameplay state. This example renders health, a health bar, and a coin count. Its two buttons simulate gameplay events.

## Run the example

Install the matching Pine package, then save the script with the filename shown. Create its owner in code with `new GameObject("Example owner").AddComponent<PineHud>()`, or use your existing component-instantiation flow. Pine creates the Canvas and controls automatically.

<a href="/examples/0.2.0/PineHud.cs" download="PineHud.cs" target="_self">Download PineHud.cs</a>. The source is MIT licensed, like Pine.

```csharp title="PineHud.cs"
using Pine;
using UnityEngine;
using UnityEngine.UI;

namespace PineDocs.Examples
{
    public sealed class PineHud : MonoBehaviour
    {
        public readonly Source<int> Health = UI.Source(100);
        public readonly Source<int> Coins = UI.Source(0);

        private void Start() => UI.Mount(Build);

        private Component Build()
        {
            var ratio = UI.Derive(() => Mathf.Clamp01(Health.Value / 100f));
            return UI.Column(
                UI.Name("Game HUD"),
                UI.Size(520, 340),
                UI.Padding(new RectOffset(24, 24, 20, 20)),
                UI.Children(
                    UI.Label("Game HUD", UI.FontSize(32), UI.Size(472, 48)),
                    UI.Label(
                        () => $"Health: {Health.Value} / 100",
                        UI.Size(472, 36)
                    ),
                    UI.Frame(
                        UI.Size(472, 24),
                        UI.Children(
                            UI.Image(
                                UI.Name("Health fill"),
                                UI.Configure<Image>(image =>
                                {
                                    image.rectTransform.anchorMin = image
                                        .rectTransform
                                        .anchorMax = new Vector2(0, 0.5f);
                                    image.rectTransform.pivot = new Vector2(
                                        0,
                                        0.5f
                                    );
                                }),
                                UI.Size(() =>
                                    new Vector2(472 * ratio.Value, 24)
                                ),
                                UI.Tint(new Color(0.28f, 0.74f, 0.53f))
                            )
                        )
                    ),
                    UI.Label(() => $"Coins: {Coins.Value}", UI.Size(472, 36)),
                    UI.Button(
                        "Take 10 damage",
                        () => Damage(10),
                        UI.Enabled(() => Health.Value > 0),
                        UI.Size(472, 48)
                    ),
                    UI.Button("Collect a coin", CollectCoin, UI.Size(472, 48))
                )
            );
        }

        public void Damage(int amount) =>
            Health.Value = Mathf.Clamp(Health.Value - amount, 0, 100);

        public void CollectCoin() => Coins.Value++;
    }
}
```

<span id="in-unity"/>

## Interactive browser preview

<InteractiveExample kind="hud" version="0.2.0"/>

## Connect the HUD to gameplay

Keep a reference to `PineHud` from your gameplay controller. Call `Damage(amount)` when a hit lands and `CollectCoin()` when a pickup is collected, on Unity's main thread. The example buttons call these same methods; replace those simulation buttons with your own game events when integrating the HUD.

`Health` and `Coins` are explicit sources. `Label` reads them in getters, while the derived `ratio` calculates health-bar width. Assigning a source updates the dependent bindings; no per-frame HUD polling is needed. The bar has a left-edge pivot so its width grows from the left.

## Ownership and cleanup

`Start` mounts the tree once. Disabling its creating component does not dispose this separate tree or run `Start` again. Scene unload or root destruction releases the bindings, callbacks and derived calculation. Keep the returned `Mount` when you need early disposal.

Read the [reactive state tutorial](../tutorials/reactivity.md), the [creation and bindings API](../api/creation.md), or build a [dynamic inventory list](dynamic-lists.md).
