using Pine;
using UnityEngine;

namespace PineDocs.Examples
{
    public sealed class PineControls : MonoBehaviour
    {
        public readonly Source<bool> Music = UI.Source(true);
        public readonly Source<float> Volume = UI.Source(0.5f);
        public readonly Source<string> PlayerName = UI.Source("");
        public readonly Source<int> Quality = UI.Source(1);
        public readonly Source<string[]> Qualities = UI.Source(
            new[] { "Low", "Medium", "High" }
        );
        public readonly Source<float> Scroll = UI.Source(0f);
        public readonly Source<Sprite> Icon = UI.Source<Sprite>();
        public readonly Source<Texture> Preview = UI.Source<Texture>();
        public readonly Source<bool> ModalOpen = UI.Source(false);

        private void Start() => UI.Mount(Build);

        private Component Build()
        {
            var modal = UI.Show(
                () => ModalOpen.Value,
                () =>
                    UI.Column(
                        UI.Name("Modal"),
                        UI.Size(360, 96),
                        UI.Children(
                            UI.Label("Saved", UI.Size(360, 40)),
                            UI.Button(
                                "Close",
                                () => ModalOpen.Value = false,
                                UI.Size(360, 40)
                            )
                        )
                    )
            );

            var content = UI.Column(
                UI.Name("Settings content"),
                UI.FillWidth(),
                UI.AutoHeight(),
                UI.Vertical(12),
                UI.Children(
                    UI.Label("Settings", UI.FontSize(32), UI.Size(360, 48)),
                    UI.Image(UI.Sprite(Icon), UI.Size(48, 48)),
                    UI.RawImage(UI.Texture(Preview), UI.Size(160, 90)),
                    UI.Toggle(Music, "Music", UI.Size(360, 40)),
                    UI.Slider(Volume, 0f, 1f, UI.Size(360, 40)),
                    UI.Label(
                        () => $"Volume: {Volume.Value:P0}",
                        UI.Size(360, 32)
                    ),
                    UI.Progress(Volume, UI.Size(360, 16)),
                    UI.TextField(
                        PlayerName,
                        "Player name",
                        UI.CharacterLimit(24),
                        UI.Size(360, 48)
                    ),
                    UI.Dropdown(Quality, Qualities, UI.Size(360, 48)),
                    UI.Scrollbar(Scroll, UI.Size(360, 24)),
                    UI.Toggle(
                        UI.ReducedMotion,
                        "Reduced motion",
                        UI.Size(360, 40)
                    ),
                    UI.Button(
                        "Save",
                        () => ModalOpen.Value = true,
                        UI.Size(360, 48)
                    ),
                    UI.Column(
                        UI.AutoHeight(),
                        UI.FillWidth(),
                        UI.Children(() => modal.Value)
                    )
                )
            );
            return UI.ScrollView(content, UI.Size(400, 600));
        }
    }
}
