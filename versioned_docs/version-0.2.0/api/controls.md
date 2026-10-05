---
title: Complete Unity controls in Pine
sidebar_label: Standard controls
description: Build buttons, toggles, sliders, text fields, dropdowns, scroll views and progress in typed C# without native component wiring.
---

# Complete Unity controls in Pine

Declare each control once in a `a mount builder` method. Pine creates the native control and required graphics, text, handles, viewports or templates. Mutable inputs accept typed literals, `Source<T>`, `Derived<T>`, `ReadOnly<T>`, `Spring<T>` and `Value<T>` getter adapters. `Label`, `Button` text and `Progress` also accept direct getters.

## Control contracts

| Declaration | Native result | Input behavior |
| --- | --- | --- |
| `Frame(...)`, `Row(...)`, `Column(...)` | `RectTransform` | Plain, horizontal or vertical composition. |
| `Grid(cellSize, columns, ...)` | `GridLayoutGroup` | Reactive uniform cell size and positive column count. |
| `Label(text, ...)` | `TextMeshProUGUI` | One-way text/font/graphic bindings. |
| `Image(...)` | `Image` | Typed sprite and color bindings. |
| `RawImage(...)` | `RawImage` | Typed texture/RenderTexture bindings. |
| `Button(text, click, ...)` | `Button` | Native click and navigation submit; reactive caption. |
| `Toggle(value, text, ...)` | `Toggle` | A boolean source binds two ways; a Value binds one way. |
| `Slider(value, min, max, ...)` | `Slider` | A float source binds two ways and normalizes to native clamping/rounding. Default range is 0–1. |
| `Scrollbar(value, size, ...)` | `Scrollbar` | Normalized float source binds two ways; default handle size is 0.2. |
| `TextField(value, placeholder, ...)` | `TMP_InputField` | String source binds two ways; native caret, selection and keyboard behavior. |
| `Dropdown(selected, options, ...)` | `TMP_Dropdown` | Reactive options; source selection binds two ways and stays normalized. |
| `ScrollView(content, ...)` | `ScrollRect` | Native scrolling with an explicit clipped viewport. Vertical by default. |
| `Progress(value, ...)` | `Image` | Filled horizontal image, clamped to 0–1. |

A Source overload is two-way because native user input writes the source. A literal, getter, derived value or spring has no setter and supplies one-way state. Native user interaction can still change a one-way control temporarily; the next binding update reapplies its controlling value. Choose a source when edits must become application state.

## A settings screen

[Download PineControls.cs](/examples/0.2.0/PineControls.cs). Create its owner in code with `new GameObject("Settings").AddComponent<PineControls>()`, or instantiate it with the application's existing owner lifecycle.

```csharp
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
```

`Icon` and `Preview` can be assigned native assets loaded by application code; no Inspector field is needed. The surrounding ScrollView supplies its viewport and drag surface. The modal is a composed Column controlled by `Show`; opening it constructs one branch, and closing it removes its owned bindings and objects.

## Reactive values and native extensions

Wrap a direct getter when an API accepts `Value<T>`:

```csharp
UI.Toggle(new Value<bool>(() => settings.Value.Music), "Music");
UI.Slider(new Value<float>(() => settings.Value.Volume));
UI.Grid(
    new Value<Vector2>(() =>
        compact.Value ? new Vector2(40, 40) : new Vector2(64, 64)
    ),
    columns,
    UI.Children(UI.Image(), UI.Image())
);
```

Use typed `Configure` for native settings that are not convenience properties:

```csharp
UI.TextField(
    playerName,
    UI.Configure<TMPro.TMP_InputField>(field =>
        field.contentType = TMPro.TMP_InputField.ContentType.Name
    ),
    UI.CharacterLimit(24)
);
```

Use `Set<T,TValue>` to keep custom native settings reactive. Use `On<T>`/`On<T,TValue>` for native events beyond the standard callbacks. Handlers are removed with their scope and retain construction context.

## Navigation and motion

Pine supplies automatic native navigation and visible focus colors. Use `UI.Navigation(...)` for explicit directional links, `UI.Focus()` for initial selection, and `UI.Enabled(...)` to control interaction. Mouse, touch, keyboard and gamepad are delivered by the compatible native input module.

`UI.ReducedMotion.Value = true` snaps spring targets and removes native selectable/dropdown fades. Scaling and safe-area behavior are configured through [mount options](mount-reference.md). World-space and camera-space UI receive their camera reference in code.

Every overload and control-specific property is listed in the [complete controls reference](controls-reference.md).
