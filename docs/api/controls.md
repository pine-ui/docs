---
title: Complete Unity controls in Pine
sidebar_label: Standard controls
description: Build buttons, toggles, sliders, text fields, dropdowns, scroll views and progress in typed C# without native component wiring.
---

# Complete Unity controls in Pine

Declare each control once inside `App.Mount()` or a reusable component. Pine creates the native control and required graphics, text, handles, viewports or templates. Mutable inputs accept typed literals, `Source<T>`, `Derived<T>`, `ReadOnly<T>`, `Spring<T>` and `Value<T>` getter adapters. `Label`, `Button` text and `Progress` also accept direct getters.

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

## Run the example

Save the component and **App.cs** under Assets, then press Play. Pine starts the app and constructs the component automatically. If your project already has App.cs, put `Components.PineControls()` in its returned tree instead of adding another entry.

<a href="/examples/1.0.0/controls/App.cs" download="App.cs" target="_self">Download App.cs</a> · <a href="/examples/1.0.0/controls/PineControls.cs" download="PineControls.cs" target="_self">Download PineControls.cs</a>. Sources are MIT licensed.

```csharp title="App.cs"
using UnityEngine;

namespace PineDocs.Examples
{
    public static class App
    {
        public static Component Mount() => Components.PineControls();
    }
}
```

```csharp title="PineControls.cs"
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
```

`Icon` and `Preview` can be assigned native assets loaded by application code; no Inspector field is needed. The surrounding ScrollView supplies its viewport and drag surface. The modal is a composed Column controlled by `Show`; opening it constructs one branch, and closing it removes its owned bindings and objects.

## Reactive values and native extensions

Wrap a direct getter when an API accepts `Value<T>`:

```csharp
UI.Toggle(value: new Value<bool>(() => settings.Value.Music), text: "Music");
UI.Slider(value: new Value<float>(() => settings.Value.Volume));
UI.Grid(
    cellSize: new Value<Vector2>(() =>
        compact.Value ? new Vector2(x: 40, y: 40) : new Vector2(x: 64, y: 64)
    ),
    columns: columns,
    UI.Children(UI.Image(), UI.Image())
);
```

Use typed `Configure` for native settings that are not convenience properties:

```csharp
UI.TextField(
    value: playerName,
    UI.Configure<TMPro.TMP_InputField>(configure: field =>
        field.contentType = TMPro.TMP_InputField.ContentType.Name
    ),
    UI.CharacterLimit(limit: 24)
);
```

Use `Set<T,TValue>` to keep custom native settings reactive. Use `On<T>`/`On<T,TValue>` for native events beyond the standard callbacks. Handlers are removed with their scope and retain construction context.

## Navigation and motion

Pine supplies automatic native navigation and visible focus colors. Use `UI.Navigation(...)` for explicit directional links, `UI.Focus()` for initial selection, and `UI.Enabled(...)` to control interaction. Mouse, touch, keyboard and gamepad are delivered by the compatible native input module.

`UI.ReducedMotion.Value = true` snaps spring targets and removes native selectable/dropdown fades. Scaling and safe-area behavior are configured through [mount options](mount-reference.md). World-space and camera-space UI receive their camera reference in code.

Every overload and control-specific property is listed in the [complete controls reference](controls-reference.md).
