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
