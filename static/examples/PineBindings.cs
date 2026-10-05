using Pine;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UI = Pine.Pine;

namespace PineDocs.Examples
{
    public sealed class PineBindings : MonoBehaviour
    {
        public readonly Source<int> Score = UI.Source(0);
        public readonly Source<int> Level = UI.Source(1);
        private MountHandle _mount;

        private void OnEnable()
        {
            _mount = UI.Mount(() =>
            {
                var rank = UI.Derive(() => Score.Value >= 30 ? "Explorer" : "Beginner");
                return UI.Column(UI.Name("Data binding"), UI.Size(520, 380),
                    UI.Configure<VerticalLayoutGroup>(g => g.padding = new RectOffset(24, 24, 20, 20)),
                    UI.Label("Data binding", UI.FontSize(32), UI.PreferredSize(472, 48)),
                    UI.Label(() => $"Level {Level.Value} | Score {Score.Value}", UI.PreferredSize(472, 40)),
                    UI.Label(rank, UI.Name("Rank"), UI.PreferredSize(472, 40),
                        UI.Set<TextMeshProUGUI, Color>("Rank color", (label, color) => label.color = color,
                            () => Score.Value >= 30 ? new Color(0.35f, 0.81f, 0.59f) : Color.white)),
                    UI.Button("Gain 10 points", GainPoints, UI.PreferredSize(472, 48)),
                    UI.Button("Advance level", AdvanceLevel, UI.PreferredSize(472, 48)),
                    UI.Button("Reset", ResetProgress,
                        UI.Enabled(() => Score.Value != 0 || Level.Value != 1), UI.PreferredSize(472, 48)));
            });
        }

        public void GainPoints() => Score.Value += 10;
        public void AdvanceLevel() => UI.Batch(() =>
        {
            Level.Value++;
            Score.Value = 0;
        });
        public void ResetProgress() => UI.Batch(() =>
        {
            Level.Value = 1;
            Score.Value = 0;
        });

        private void OnDisable()
        {
            _mount?.Dispose();
            _mount = null;
        }
    }
}
