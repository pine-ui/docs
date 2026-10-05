using Pine;
using UnityEngine;
using UnityEngine.UI;

namespace PineDocs.Examples
{
    public sealed class PineSpring : MonoBehaviour
    {
        public readonly Source<bool> OnRight = UI.Source(value: false);

        public Component Create()
        {
            var x = UI.Spring(
                target: () => OnRight.Value ? 180f : -180f,
                period: 0.45,
                dampingRatio: 0.75
            );
            return UI.Column(
                UI.Name(name: "Spring motion"),
                UI.Size(width: 520, height: 320),
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
                        text: "Spring motion",
                        UI.FontSize(size: 32),
                        UI.Size(width: 472, height: 48)
                    ),
                    UI.Frame(
                        UI.Name(name: "Motion track"),
                        UI.Size(width: 472, height: 120),
                        UI.Children(
                            UI.Image(
                                UI.Name(name: "Moving marker"),
                                UI.Size(width: 40, height: 40),
                                UI.Position(position: () =>
                                    new Vector2(x: x.Value, y: 0)
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
                        text: () =>
                            OnRight.Value ? "Target: right" : "Target: left",
                        UI.Size(width: 472, height: 36)
                    ),
                    UI.Button(
                        text: () => OnRight.Value ? "Move left" : "Move right",
                        click: Toggle,
                        UI.Size(width: 472, height: 48)
                    )
                )
            );
        }

        public void Toggle() => OnRight.Value = !OnRight.Value;
    }
}
