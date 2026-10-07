---
title: Unity uGUI and TextMeshPro component catalog
sidebar_label: Native component catalog
description: Browse Pine factories for Unity uGUI, TextMeshPro, layout, masking and event components, including native placement rules and version-gated availability.
---

# Native component catalog

The catalog covers authorable uGUI/TMP components, layout/masking/effects and event/raycast infrastructure. TMP Text/InputField/Dropdown are the defaults; `LegacyText`, `LegacyInputField` and `LegacyDropdown` explicitly select Unity legacy text. Generated TMP submeshes/carets/animators are owned implementation companions, not separate declaration factories. Removed obsolete TouchInputModule is outside this catalog; use a supported native input module.

| Factory | Native component | Placement | Availability |
| --- | --- | --- | --- |
| `P.Frame` | `UnityEngine.RectTransform` | child | `baseline` |
| `P.Text` | `TMPro.TextMeshProUGUI` | child | `baseline` |
| `P.Image` | `UnityEngine.UI.Image` | child | `baseline` |
| `P.RawImage` | `UnityEngine.UI.RawImage` | child | `baseline` |
| `P.Button` | `UnityEngine.UI.Button` | child | `baseline` |
| `P.Selectable` | `UnityEngine.UI.Selectable` | child | `baseline` |
| `P.Toggle` | `UnityEngine.UI.Toggle` | child | `baseline` |
| `P.Slider` | `UnityEngine.UI.Slider` | child | `baseline` |
| `P.Scrollbar` | `UnityEngine.UI.Scrollbar` | child | `baseline` |
| `P.InputField` | `TMPro.TMP_InputField` | child | `baseline` |
| `P.Dropdown` | `TMPro.TMP_Dropdown` | child | `baseline` |
| `P.LegacyText` | `UnityEngine.UI.Text` | child | `baseline` |
| `P.LegacyInputField` | `UnityEngine.UI.InputField` | child | `baseline` |
| `P.LegacyDropdown` | `UnityEngine.UI.Dropdown` | child | `baseline` |
| `P.ScrollRect` | `UnityEngine.UI.ScrollRect` | child | `baseline` |
| `P.Vertical` | `UnityEngine.UI.VerticalLayoutGroup` | child | `baseline` |
| `P.Horizontal` | `UnityEngine.UI.HorizontalLayoutGroup` | child | `baseline` |
| `P.Grid` | `UnityEngine.UI.GridLayoutGroup` | child | `baseline` |
| `P.Canvas` | `UnityEngine.Canvas` | child | `baseline` |
| `P.CanvasGroup` | `UnityEngine.CanvasGroup` | component | `baseline` |
| `P.CanvasScaler` | `UnityEngine.UI.CanvasScaler` | component | `baseline` |
| `P.GraphicRaycaster` | `UnityEngine.UI.GraphicRaycaster` | component | `baseline` |
| `P.LayoutElement` | `UnityEngine.UI.LayoutElement` | component | `baseline` |
| `P.ContentSizeFitter` | `UnityEngine.UI.ContentSizeFitter` | component | `baseline` |
| `P.AspectRatioFitter` | `UnityEngine.UI.AspectRatioFitter` | component | `baseline` |
| `P.Mask` | `UnityEngine.UI.Mask` | component | `baseline` |
| `P.RectMask2D` | `UnityEngine.UI.RectMask2D` | component | `baseline` |
| `P.Shadow` | `UnityEngine.UI.Shadow` | component | `baseline` |
| `P.Outline` | `UnityEngine.UI.Outline` | component | `baseline` |
| `P.PositionAsUV1` | `UnityEngine.UI.PositionAsUV1` | component | `baseline` |
| `P.ToggleGroup` | `UnityEngine.UI.ToggleGroup` | component | `baseline` |
| `P.CanvasRenderer` | `UnityEngine.CanvasRenderer` | component | `baseline` |
| `P.EventTrigger` | `UnityEngine.EventSystems.EventTrigger` | component | `baseline` |
| `P.EventSystem` | `UnityEngine.EventSystems.EventSystem` | child | `baseline` |
| `P.BaseInput` | `UnityEngine.EventSystems.BaseInput` | component | `baseline` |
| `P.StandaloneInputModule` | `UnityEngine.EventSystems.StandaloneInputModule` | component | `ENABLE_LEGACY_INPUT_MANAGER` |
| `P.InputSystemUIInputModule` | `UnityEngine.InputSystem.UI.InputSystemUIInputModule` | component | `ENABLE_INPUT_SYSTEM` |
| `P.PhysicsRaycaster` | `UnityEngine.EventSystems.PhysicsRaycaster` | component | `baseline` |
| `P.Physics2DRaycaster` | `UnityEngine.EventSystems.Physics2DRaycaster` | component | `baseline` |
| `P.RaycastReceiver` | `UnityEngine.UI.RaycastReceiver` | child | `PINE_UGUI_2_5_OR_NEWER` |
| `P.SafeArea` | `UnityEngine.UI.SafeArea` | component | `PINE_UGUI_2_6_OR_NEWER` |


Omitted settings use native component defaults. Pine wires required references: Selectable graphics, optional button/toggle captions, toggle marks, slider/scrollbar handles, input viewports/text/placeholders, dropdown templates and scroll content/viewport. It does not install a color theme or overwrite Navigation/ColorBlock structs. `Canvas` wires CanvasScaler and GraphicRaycaster. Input System modules receive default actions unless explicit props replace them.

RectTransform and GameObject settings are named props on every factory. UnityEvent settings accept typed callbacks with owned cleanup. Native grouped settings use native Unity types (`ColorBlock`, `Navigation`, `SpriteState`, `RectOffset`, vectors and enums). [Every named prop](controls-reference.md).

## Native structs and settings

Grouped Inspector settings use Unity's own structs. Properties that reference other components accept their native references. Plain getters use `new Value<T>(() => ...)`; `reference` captures a built native object, and `configure` runs once after its props/children are applied.

```csharp
var colors = UnityEngine.UI.ColorBlock.defaultColorBlock;
colors.normalColor = Color.gray;
colors.highlightedColor = Color.white;
colors.fadeDuration = .15f;
var navigation = new UnityEngine.UI.Navigation { mode = UnityEngine.UI.Navigation.Mode.Automatic };
return P.Button(
        "Save",
        colors: colors,
        navigation: navigation,
        transition: UnityEngine.UI.Selectable.Transition.ColorTint,
        onClick: Save
    )
    .With(
        P.Self(P.Image(sprite: background, type: UnityEngine.UI.Image.Type.Sliced)),
        P.LayoutElement(preferredWidth: 200, preferredHeight: 48),
        P.Outline(effectColor: Color.black, effectDistance: new Vector2(2, -2))
    );
```

This fragment assumes `Save` and a `Sprite background` are supplied by the containing renderer. Omitted structs are not replaced by Pine presets. For options/event entries and other native lists, assign a new list to a Source or call its `Notify`; in-place list mutation alone is not observable. Input range/content settings apply before editable values. Native setters remain responsible for validation and clamping.

A `configure` callback is intended for APIs that are methods rather than properties, for example native focus/selection in an appropriate Unity lifecycle callback. Ordinary initialization properties should use named props. Set native component references explicitly when supplying custom templates, graphics or navigation neighbors; automatic wiring supplies a working default when those references are absent.
