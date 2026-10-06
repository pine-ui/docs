using Pine;
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
                    sizeDelta: new Vector2(520, 300)
                )
                .With(
                    P.Text(() => $"Level {level.Value} | Score {score.Value}")
                        .With(P.LayoutElement(preferredHeight: 40)),
                    P.Text(
                            rank,
                            color: new Value<Color>(() =>
                                score.Value >= 30 ? Color.green : Color.white
                            )
                        )
                        .With(P.LayoutElement(preferredHeight: 40)),
                    P.Button("Gain 10 points", onClick: () => score.Value += 10)
                        .With(P.LayoutElement(preferredHeight: 40)),
                    P.Button(
                            "Advance level",
                            onClick: () =>
                                P.Batch(() =>
                                {
                                    level.Value++;
                                    score.Value = 0;
                                })
                        )
                        .With(P.LayoutElement(preferredHeight: 40)),
                    P.Button(
                            "Reset",
                            interactable: new Value<bool>(() =>
                                score.Value != 0 || level.Value != 1
                            ),
                            onClick: () =>
                                P.Batch(() =>
                                {
                                    score.Value = 0;
                                    level.Value = 1;
                                })
                        )
                        .With(P.LayoutElement(preferredHeight: 40))
                );
        }
    }
}
