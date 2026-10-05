using Pine;
using UnityEngine;

namespace PineDocs.Examples
{
    public sealed class PineControls : MonoBehaviour
    {
        public readonly Source<bool> Music = UI.Source(value: true);
        public readonly Source<float> Volume = UI.Source(value: 0.5f);
        public readonly Source<string> PlayerName = UI.Source(value: "");
        public readonly Source<int> Quality = UI.Source(value: 1);
        public readonly Source<string[]> Qualities = UI.Source(
            value: new[] { "Low", "Medium", "High" }
        );
        public readonly Source<float> Scroll = UI.Source(value: 0f);
        public readonly Source<Sprite> Icon = UI.Source<Sprite>();
        public readonly Source<Texture> Preview = UI.Source<Texture>();
        public readonly Source<bool> ModalOpen = UI.Source(value: false);

        public Component Create()
        {
            var modal = UI.Show(
                condition: () => ModalOpen.Value,
                build: () =>
                    UI.Column(
                        UI.Name(name: "Modal"),
                        UI.Size(width: 360, height: 96),
                        UI.Children(
                            UI.Label(
                                text: "Saved",
                                UI.Size(width: 360, height: 40)
                            ),
                            UI.Button(
                                text: "Close",
                                click: () => ModalOpen.Value = false,
                                UI.Size(width: 360, height: 40)
                            )
                        )
                    )
            );

            var content = UI.Column(
                UI.Name(name: "Settings content"),
                UI.FillWidth(),
                UI.AutoHeight(),
                UI.Vertical(12),
                UI.Children(
                    UI.Label(
                        text: "Settings",
                        UI.FontSize(size: 32),
                        UI.Size(width: 360, height: 48)
                    ),
                    UI.Image(
                        UI.Sprite(sprite: Icon),
                        UI.Size(width: 48, height: 48)
                    ),
                    UI.RawImage(
                        UI.Texture(texture: Preview),
                        UI.Size(width: 160, height: 90)
                    ),
                    UI.Toggle(
                        value: Music,
                        text: "Music",
                        UI.Size(width: 360, height: 40)
                    ),
                    UI.Slider(
                        value: Volume,
                        minimum: 0f,
                        maximum: 1f,
                        UI.Size(width: 360, height: 40)
                    ),
                    UI.Label(
                        text: () => $"Volume: {Volume.Value:P0}",
                        UI.Size(width: 360, height: 32)
                    ),
                    UI.Progress(value: Volume, UI.Size(width: 360, height: 16)),
                    UI.TextField(
                        value: PlayerName,
                        placeholder: "Player name",
                        UI.CharacterLimit(limit: 24),
                        UI.Size(width: 360, height: 48)
                    ),
                    UI.Dropdown(
                        selected: Quality,
                        options: Qualities,
                        UI.Size(width: 360, height: 48)
                    ),
                    UI.Scrollbar(
                        value: Scroll,
                        UI.Size(width: 360, height: 24)
                    ),
                    UI.Toggle(
                        value: UI.ReducedMotion,
                        text: "Reduced motion",
                        UI.Size(width: 360, height: 40)
                    ),
                    UI.Button(
                        text: "Save",
                        click: () => ModalOpen.Value = true,
                        UI.Size(width: 360, height: 48)
                    ),
                    UI.Column(
                        UI.AutoHeight(),
                        UI.FillWidth(),
                        UI.Children(read: () => modal.Value)
                    )
                )
            );
            return UI.ScrollView(
                content: content,
                UI.Size(width: 400, height: 600)
            );
        }
    }
}
