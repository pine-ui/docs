---
title: Build a reactive game HUD in Unity
sidebar_label: Reactive game HUD
description: Create a Unity health and coin HUD in C# with Pine sources, derived health-bar width, reactive labels, and scoped button callbacks.
---

# Build a reactive game HUD in Unity

A HUD reflects gameplay state. This example renders health, a health bar, and a coin count. Its two buttons simulate gameplay events.

## Run the example

Save the component and **App.cs** under Assets, then press Play. Pine starts the app and constructs the component automatically. If your project already has App.cs, put `Components.PineHud()` in its returned tree instead of adding another entry.

<a href="/examples/0.2.0/reactive-hud/App.cs" download="App.cs" target="_self">Download App.cs</a> · <a href="/examples/0.2.0/reactive-hud/PineHud.cs" download="PineHud.cs" target="_self">Download PineHud.cs</a>. Sources are MIT licensed.

```csharp title="App.cs"
using UnityEngine;

namespace PineDocs.Examples
{
    public static class App
    {
        public static Component Mount() => Components.PineHud();
    }
}
```

```csharp title="PineHud.cs"
using Pine;
using UnityEngine;
using UnityEngine.UI;

namespace PineDocs.Examples
{
    public sealed class PineHud : MonoBehaviour
    {
        public readonly Source<int> Health = UI.Source(value: 100);
        public readonly Source<int> Coins = UI.Source(value: 0);

        public Component Create()
        {
            var ratio = UI.Derive(compute: () =>
                Mathf.Clamp01(Health.Value / 100f)
            );
            return UI.Column(
                UI.Name(name: "Game HUD"),
                UI.Size(width: 520, height: 340),
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
                        text: "Game HUD",
                        UI.FontSize(size: 32),
                        UI.Size(width: 472, height: 48)
                    ),
                    UI.Label(
                        text: () => $"Health: {Health.Value} / 100",
                        UI.Size(width: 472, height: 36)
                    ),
                    UI.Frame(
                        UI.Size(width: 472, height: 24),
                        UI.Children(
                            UI.Image(
                                UI.Name(name: "Health fill"),
                                UI.Configure<Image>(configure: image =>
                                {
                                    image.rectTransform.anchorMin = image
                                        .rectTransform
                                        .anchorMax = new Vector2(x: 0, y: 0.5f);
                                    image.rectTransform.pivot = new Vector2(
                                        x: 0,
                                        y: 0.5f
                                    );
                                }),
                                UI.Size(size: () =>
                                    new Vector2(x: 472 * ratio.Value, y: 24)
                                ),
                                UI.Tint(
                                    color: new Color(
                                        r: 0.28f,
                                        g: 0.74f,
                                        b: 0.53f
                                    )
                                )
                            )
                        )
                    ),
                    UI.Label(
                        text: () => $"Coins: {Coins.Value}",
                        UI.Size(width: 472, height: 36)
                    ),
                    UI.Button(
                        text: "Take 10 damage",
                        click: () => Damage(10),
                        UI.Enabled(enabled: () => Health.Value > 0),
                        UI.Size(width: 472, height: 48)
                    ),
                    UI.Button(
                        text: "Collect a coin",
                        click: CollectCoin,
                        UI.Size(width: 472, height: 48)
                    )
                )
            );
        }

        public void Damage(int amount) =>
            Health.Value = Mathf.Clamp(Health.Value - amount, 0, 100);

        public void CollectCoin() => Coins.Value++;
    }
}
```

## In Unity

<img src="/img/guides/reactive-hud.png" alt="A Pine HUD rendered in Unity with health at 70 of 100, a green health bar, three coins, and damage and collect buttons." width="960" height="720" loading="lazy" decoding="async"/>

## Connect the HUD to gameplay

Find the created `PineHud` with `Object.FindFirstObjectByType<PineHud>()`, or connect gameplay-owned sources through typed component props. Call `Damage(amount)` when a hit lands and `CollectCoin()` when a pickup is collected, on Unity's main thread. The example buttons call these same methods; replace those simulation buttons with your own game events when integrating the HUD.

`Health` and `Coins` are explicit sources. `Label` reads them in getters, while the derived `ratio` calculates health-bar width. Assigning a source updates the dependent bindings; no per-frame HUD polling is needed. The bar has a left-edge pivot so its width grows from the left.

## Ownership

`Components.PineHud()` creates a behaviour and its owned native tree once. Hiding its UI retains sources and bindings and stops Unity updates; showing it again resumes callbacks without rebuilding. Destroying its returned root releases the component scope. The application canvas persists across scenes by default; opt out with `CanvasOptions.Persistent = false`.

Read the [reactive state tutorial](../tutorials/reactivity.md), the [creation and bindings API](../api/creation.md), or build a [dynamic inventory list](dynamic-lists.md).
