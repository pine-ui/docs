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
