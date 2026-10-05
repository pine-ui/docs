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
