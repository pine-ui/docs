using Pine;
using UnityEngine;
using UnityEngine.UI;
using UI = Pine.Pine;

namespace PineDocs.Examples
{
    public sealed class PineSpring : MonoBehaviour
    {
        public readonly Source<bool> OnRight = UI.Source(false);
        private MountHandle _mount;

        private void OnEnable()
        {
            _mount = UI.Mount(() =>
            {
                var x = UI.Spring(() => OnRight.Value ? 180f : -180f,
                    period: 0.45, dampingRatio: 0.75);
                return UI.Column(UI.Name("Spring motion"), UI.Size(520, 320),
                    UI.Configure<VerticalLayoutGroup>(g => g.padding = new RectOffset(24, 24, 20, 20)),
                    UI.Label("Spring motion", UI.FontSize(32), UI.PreferredSize(472, 48)),
                    UI.Frame(UI.Name("Motion track"), UI.PreferredSize(472, 120),
                        UI.Image(UI.Name("Moving marker"), UI.Size(40, 40),
                            UI.Position(() => new Vector2(x.Value, 0)),
                            UI.Tint(new Color(0.28f, 0.74f, 0.53f)))),
                    UI.Label(() => OnRight.Value ? "Target: right" : "Target: left", UI.PreferredSize(472, 36)),
                    UI.Button(() => OnRight.Value ? "Move left" : "Move right", Toggle,
                        UI.PreferredSize(472, 48)));
            });
        }

        public void Toggle() => OnRight.Value = !OnRight.Value;

        private void OnDisable()
        {
            _mount?.Dispose();
            _mount = null;
        }
    }
}
