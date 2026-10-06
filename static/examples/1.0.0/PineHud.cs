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
