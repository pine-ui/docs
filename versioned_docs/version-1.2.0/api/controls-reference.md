---
title: "All native named props (Pine 1.2.0)"
description: "Complete uGUI native factory signatures and named properties for Pine 1.2.0."
---

# All native named props

Factories accept optional native settings and `children: new[] { ... }`. Visual factories also accept `children: () => views` with retained identity. Native component relationships accept `Part<T>`: a declared `View`, an externally owned component, `Ref<T>` or a tracked `Value<T>`. Scalar/asset/struct settings accept `Value<T>`; text also accepts a direct getter. Events accept typed callbacks with scoped cleanup.

`reference` accepts the native callback type or a `P.Ref<T>()`. Typed refs publish before relationships resolve. Ordinary callbacks run after named settings. `configure` remains an optional extension point. GameObject and RectTransform settings apply to the containing native object. Omitted props preserve native defaults; explicit typed null parts suppress their default helper.

Button/Toggle `text` and `caption`, dropdown `item`, and EventTrigger callback props are declarative conveniences. Slider `fill`/`handle` correspond to `fillRect`/`handleRect`; TMP InputField `viewport` corresponds to `textViewport`. Other part names follow their native member. Supplied declarations are owned; supplied objects remain externally owned.

TMP `regexValue` and input-module `sendPointerHoverToParent` use cached native serialized-field lookups and fail clearly if those fields disappear. IL2CPP is unverified. Input assets apply before individual action references; Pine owns independent defaults for omitted input actions.

## P.Frame

Native `UnityEngine.RectTransform`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `sendChildDimensionsChange` | `Value<bool>?` | `baseline` |
| `position` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `eulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `right` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `up` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `forward` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `rotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Text

Native `TMPro.TextMeshProUGUI`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `text` | `Value<string>?` | `baseline` |
| `autoSizeTextContainer` | `Value<bool>?` | `baseline` |
| `maskOffset` | `Value<UnityEngine.Vector4>?` | `baseline` |
| `textPreprocessor` | `Value<TMPro.ITextPreprocessor>?` | `baseline` |
| `isRightToLeftText` | `Value<bool>?` | `baseline` |
| `font` | `Value<TMPro.TMP_FontAsset>?` | `baseline` |
| `fontSharedMaterial` | `Value<UnityEngine.Material>?` | `baseline` |
| `fontSharedMaterials` | `Value<UnityEngine.Material[]>?` | `baseline` |
| `fontMaterial` | `Value<UnityEngine.Material>?` | `baseline` |
| `fontMaterials` | `Value<UnityEngine.Material[]>?` | `baseline` |
| `color` | `Value<UnityEngine.Color>?` | `baseline` |
| `alpha` | `Value<float>?` | `baseline` |
| `enableVertexGradient` | `Value<bool>?` | `baseline` |
| `colorGradient` | `Value<TMPro.VertexGradient>?` | `baseline` |
| `colorGradientPreset` | `Value<TMPro.TMP_ColorGradient>?` | `baseline` |
| `spriteAsset` | `Value<TMPro.TMP_SpriteAsset>?` | `baseline` |
| `tintAllSprites` | `Value<bool>?` | `baseline` |
| `styleSheet` | `Value<TMPro.TMP_StyleSheet>?` | `baseline` |
| `textStyle` | `Value<TMPro.TMP_Style>?` | `baseline` |
| `overrideColorTags` | `Value<bool>?` | `baseline` |
| `faceColor` | `Value<UnityEngine.Color32>?` | `baseline` |
| `outlineColor` | `Value<UnityEngine.Color32>?` | `baseline` |
| `outlineWidth` | `Value<float>?` | `baseline` |
| `fontSize` | `Value<float>?` | `baseline` |
| `fontWeight` | `Value<TMPro.FontWeight>?` | `baseline` |
| `enableAutoSizing` | `Value<bool>?` | `baseline` |
| `fontSizeMin` | `Value<float>?` | `baseline` |
| `fontSizeMax` | `Value<float>?` | `baseline` |
| `fontStyle` | `Value<TMPro.FontStyles>?` | `baseline` |
| `horizontalAlignment` | `Value<TMPro.HorizontalAlignmentOptions>?` | `baseline` |
| `verticalAlignment` | `Value<TMPro.VerticalAlignmentOptions>?` | `baseline` |
| `alignment` | `Value<TMPro.TextAlignmentOptions>?` | `baseline` |
| `characterSpacing` | `Value<float>?` | `baseline` |
| `characterHorizontalScale` | `Value<float>?` | `baseline` |
| `wordSpacing` | `Value<float>?` | `baseline` |
| `lineSpacing` | `Value<float>?` | `baseline` |
| `lineSpacingAdjustment` | `Value<float>?` | `baseline` |
| `paragraphSpacing` | `Value<float>?` | `baseline` |
| `characterWidthAdjustment` | `Value<float>?` | `baseline` |
| `textWrappingMode` | `Value<TMPro.TextWrappingModes>?` | `baseline` |
| `wordWrappingRatios` | `Value<float>?` | `baseline` |
| `overflowMode` | `Value<TMPro.TextOverflowModes>?` | `baseline` |
| `linkedTextComponent` | `Part<TMPro.TMP_Text>?` | `baseline` |
| `fontFeatures` | `Value<System.Collections.Generic.List<UnityEngine.TextCore.OTL_FeatureTag>>?` | `baseline` |
| `extraPadding` | `Value<bool>?` | `baseline` |
| `richText` | `Value<bool>?` | `baseline` |
| `emojiFallbackSupport` | `Value<bool>?` | `baseline` |
| `enableAdvancedText` | `Value<bool>?` | `PINE_UGUI_2_7_OR_NEWER` |
| `parseCtrlCharacters` | `Value<bool>?` | `baseline` |
| `isOverlay` | `Value<bool>?` | `baseline` |
| `isOrthographic` | `Value<bool>?` | `baseline` |
| `enableCulling` | `Value<bool>?` | `baseline` |
| `ignoreVisibility` | `Value<bool>?` | `baseline` |
| `horizontalMapping` | `Value<TMPro.TextureMappingOptions>?` | `baseline` |
| `verticalMapping` | `Value<TMPro.TextureMappingOptions>?` | `baseline` |
| `mappingUvLineOffset` | `Value<float>?` | `baseline` |
| `renderMode` | `Value<TMPro.TextRenderFlags>?` | `baseline` |
| `geometrySortingOrder` | `Value<TMPro.VertexSortingOrder>?` | `baseline` |
| `isTextObjectScaleStatic` | `Value<bool>?` | `baseline` |
| `vertexBufferAutoSizeReduction` | `Value<bool>?` | `baseline` |
| `firstVisibleCharacter` | `Value<int>?` | `baseline` |
| `maxVisibleCharacters` | `Value<int>?` | `baseline` |
| `maxVisibleWords` | `Value<int>?` | `baseline` |
| `maxVisibleLines` | `Value<int>?` | `baseline` |
| `useMaxVisibleDescender` | `Value<bool>?` | `baseline` |
| `pageToDisplay` | `Value<int>?` | `baseline` |
| `margin` | `Value<UnityEngine.Vector4>?` | `baseline` |
| `onCullStateChanged` | `Action<bool>` | `baseline` |
| `maskable` | `Value<bool>?` | `baseline` |
| `isMaskingGraphic` | `Value<bool>?` | `baseline` |
| `raycastTarget` | `Value<bool>?` | `baseline` |
| `raycastPadding` | `Value<UnityEngine.Vector4>?` | `baseline` |
| `material` | `Value<UnityEngine.Material>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `OnPreRenderText` | `Action<TMPro.TMP_TextInfo>` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Image

Native `UnityEngine.UI.Image`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `sprite` | `Value<UnityEngine.Sprite>?` | `baseline` |
| `overrideSprite` | `Value<UnityEngine.Sprite>?` | `baseline` |
| `type` | `Value<UnityEngine.UI.Image.Type>?` | `baseline` |
| `preserveAspect` | `Value<bool>?` | `baseline` |
| `fillCenter` | `Value<bool>?` | `baseline` |
| `fillMethod` | `Value<UnityEngine.UI.Image.FillMethod>?` | `baseline` |
| `fillAmount` | `Value<float>?` | `baseline` |
| `fillClockwise` | `Value<bool>?` | `baseline` |
| `fillOrigin` | `Value<int>?` | `baseline` |
| `alphaHitTestMinimumThreshold` | `Value<float>?` | `baseline` |
| `useSpriteMesh` | `Value<bool>?` | `baseline` |
| `pixelsPerUnitMultiplier` | `Value<float>?` | `baseline` |
| `material` | `Value<UnityEngine.Material>?` | `baseline` |
| `onCullStateChanged` | `Action<bool>` | `baseline` |
| `maskable` | `Value<bool>?` | `baseline` |
| `isMaskingGraphic` | `Value<bool>?` | `baseline` |
| `color` | `Value<UnityEngine.Color>?` | `baseline` |
| `raycastTarget` | `Value<bool>?` | `baseline` |
| `raycastPadding` | `Value<UnityEngine.Vector4>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.RawImage

Native `UnityEngine.UI.RawImage`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `texture` | `Value<UnityEngine.Texture>?` | `baseline` |
| `uvRect` | `Value<UnityEngine.Rect>?` | `baseline` |
| `onCullStateChanged` | `Action<bool>` | `baseline` |
| `maskable` | `Value<bool>?` | `baseline` |
| `isMaskingGraphic` | `Value<bool>?` | `baseline` |
| `color` | `Value<UnityEngine.Color>?` | `baseline` |
| `raycastTarget` | `Value<bool>?` | `baseline` |
| `raycastPadding` | `Value<UnityEngine.Vector4>?` | `baseline` |
| `material` | `Value<UnityEngine.Material>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Button

Native `UnityEngine.UI.Button`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `text` | `Value<string>?` | `baseline` |
| `onClick` | `Action` | `baseline` |
| `navigation` | `Value<UnityEngine.UI.Navigation>?` | `baseline` |
| `transition` | `Value<UnityEngine.UI.Selectable.Transition>?` | `baseline` |
| `colors` | `Value<UnityEngine.UI.ColorBlock>?` | `baseline` |
| `spriteState` | `Value<UnityEngine.UI.SpriteState>?` | `baseline` |
| `animationTriggers` | `Value<UnityEngine.UI.AnimationTriggers>?` | `baseline` |
| `targetGraphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `interactable` | `Value<bool>?` | `baseline` |
| `image` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |
| `caption` | `Part<TMPro.TMP_Text>?` | `baseline` |

## P.Selectable

Native `UnityEngine.UI.Selectable`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `navigation` | `Value<UnityEngine.UI.Navigation>?` | `baseline` |
| `transition` | `Value<UnityEngine.UI.Selectable.Transition>?` | `baseline` |
| `colors` | `Value<UnityEngine.UI.ColorBlock>?` | `baseline` |
| `spriteState` | `Value<UnityEngine.UI.SpriteState>?` | `baseline` |
| `animationTriggers` | `Value<UnityEngine.UI.AnimationTriggers>?` | `baseline` |
| `targetGraphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `interactable` | `Value<bool>?` | `baseline` |
| `image` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Toggle

Native `UnityEngine.UI.Toggle`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `text` | `Value<string>?` | `baseline` |
| `group` | `Part<UnityEngine.UI.ToggleGroup>?` | `baseline` |
| `navigation` | `Value<UnityEngine.UI.Navigation>?` | `baseline` |
| `transition` | `Value<UnityEngine.UI.Selectable.Transition>?` | `baseline` |
| `colors` | `Value<UnityEngine.UI.ColorBlock>?` | `baseline` |
| `spriteState` | `Value<UnityEngine.UI.SpriteState>?` | `baseline` |
| `animationTriggers` | `Value<UnityEngine.UI.AnimationTriggers>?` | `baseline` |
| `targetGraphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `interactable` | `Value<bool>?` | `baseline` |
| `image` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `toggleTransition` | `Value<UnityEngine.UI.Toggle.ToggleTransition>?` | `baseline` |
| `graphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `onValueChanged` | `Action<bool>` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |
| `caption` | `Part<TMPro.TMP_Text>?` | `baseline` |
| `isOn` | `Value<bool>?` | `baseline` |

## P.Slider

Native `UnityEngine.UI.Slider`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `minValue` | `Value<float>?` | `baseline` |
| `maxValue` | `Value<float>?` | `baseline` |
| `wholeNumbers` | `Value<bool>?` | `baseline` |
| `fill` | `Part<UnityEngine.RectTransform>?` | `baseline` |
| `handle` | `Part<UnityEngine.RectTransform>?` | `baseline` |
| `direction` | `Value<UnityEngine.UI.Slider.Direction>?` | `baseline` |
| `normalizedValue` | `Value<float>?` | `baseline` |
| `onValueChanged` | `Action<float>` | `baseline` |
| `navigation` | `Value<UnityEngine.UI.Navigation>?` | `baseline` |
| `transition` | `Value<UnityEngine.UI.Selectable.Transition>?` | `baseline` |
| `colors` | `Value<UnityEngine.UI.ColorBlock>?` | `baseline` |
| `spriteState` | `Value<UnityEngine.UI.SpriteState>?` | `baseline` |
| `animationTriggers` | `Value<UnityEngine.UI.AnimationTriggers>?` | `baseline` |
| `targetGraphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `interactable` | `Value<bool>?` | `baseline` |
| `image` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |
| `value` | `Value<float>?` | `baseline` |

## P.Scrollbar

Native `UnityEngine.UI.Scrollbar`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `handle` | `Part<UnityEngine.RectTransform>?` | `baseline` |
| `direction` | `Value<UnityEngine.UI.Scrollbar.Direction>?` | `baseline` |
| `size` | `Value<float>?` | `baseline` |
| `numberOfSteps` | `Value<int>?` | `baseline` |
| `onValueChanged` | `Action<float>` | `baseline` |
| `navigation` | `Value<UnityEngine.UI.Navigation>?` | `baseline` |
| `transition` | `Value<UnityEngine.UI.Selectable.Transition>?` | `baseline` |
| `colors` | `Value<UnityEngine.UI.ColorBlock>?` | `baseline` |
| `spriteState` | `Value<UnityEngine.UI.SpriteState>?` | `baseline` |
| `animationTriggers` | `Value<UnityEngine.UI.AnimationTriggers>?` | `baseline` |
| `targetGraphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `interactable` | `Value<bool>?` | `baseline` |
| `image` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |
| `value` | `Value<float>?` | `baseline` |

## P.InputField

Native `TMPro.TMP_InputField`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `text` | `Value<string>?` | `baseline` |
| `contentType` | `Value<TMPro.TMP_InputField.ContentType>?` | `baseline` |
| `lineType` | `Value<TMPro.TMP_InputField.LineType>?` | `baseline` |
| `shouldActivateOnSelect` | `Value<bool>?` | `baseline` |
| `shouldHideMobileInput` | `Value<bool>?` | `baseline` |
| `shouldHideSoftKeyboard` | `Value<bool>?` | `baseline` |
| `caretBlinkRate` | `Value<float>?` | `baseline` |
| `caretWidth` | `Value<int>?` | `baseline` |
| `viewport` | `Part<UnityEngine.RectTransform>?` | `baseline` |
| `textComponent` | `Part<TMPro.TMP_Text>?` | `baseline` |
| `placeholder` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `verticalScrollbar` | `Part<UnityEngine.UI.Scrollbar>?` | `baseline` |
| `scrollSensitivity` | `Value<float>?` | `baseline` |
| `caretColor` | `Value<UnityEngine.Color>?` | `baseline` |
| `customCaretColor` | `Value<bool>?` | `baseline` |
| `selectionColor` | `Value<UnityEngine.Color>?` | `baseline` |
| `onEndEdit` | `Action<string>` | `baseline` |
| `onSubmit` | `Action<string>` | `baseline` |
| `onSelect` | `Action<string>` | `baseline` |
| `onDeselect` | `Action<string>` | `baseline` |
| `onTextSelection` | `Action<string, int, int>` | `baseline` |
| `onEndTextSelection` | `Action<string, int, int>` | `baseline` |
| `onValueChanged` | `Action<string>` | `baseline` |
| `onTouchScreenKeyboardStatusChanged` | `Action<UnityEngine.TouchScreenKeyboard.Status>` | `baseline` |
| `onValidateInput` | `Value<TMPro.TMP_InputField.OnValidateInput>?` | `baseline` |
| `characterLimit` | `Value<int>?` | `baseline` |
| `pointSize` | `Value<float>?` | `baseline` |
| `fontAsset` | `Value<TMPro.TMP_FontAsset>?` | `baseline` |
| `onFocusSelectAll` | `Value<bool>?` | `baseline` |
| `resetOnDeActivation` | `Value<bool>?` | `baseline` |
| `keepTextSelectionVisible` | `Value<bool>?` | `baseline` |
| `restoreOriginalTextOnEscape` | `Value<bool>?` | `baseline` |
| `isRichTextEditingAllowed` | `Value<bool>?` | `baseline` |
| `lineLimit` | `Value<int>?` | `baseline` |
| `inputType` | `Value<TMPro.TMP_InputField.InputType>?` | `baseline` |
| `keyboardType` | `Value<UnityEngine.TouchScreenKeyboardType>?` | `baseline` |
| `characterValidation` | `Value<TMPro.TMP_InputField.CharacterValidation>?` | `baseline` |
| `inputValidator` | `Value<TMPro.TMP_InputValidator>?` | `baseline` |
| `readOnly` | `Value<bool>?` | `baseline` |
| `richText` | `Value<bool>?` | `baseline` |
| `asteriskChar` | `Value<char>?` | `baseline` |
| `caretPosition` | `Value<int>?` | `baseline` |
| `selectionAnchorPosition` | `Value<int>?` | `baseline` |
| `selectionFocusPosition` | `Value<int>?` | `baseline` |
| `stringPosition` | `Value<int>?` | `baseline` |
| `selectionStringAnchorPosition` | `Value<int>?` | `baseline` |
| `selectionStringFocusPosition` | `Value<int>?` | `baseline` |
| `navigation` | `Value<UnityEngine.UI.Navigation>?` | `baseline` |
| `transition` | `Value<UnityEngine.UI.Selectable.Transition>?` | `baseline` |
| `colors` | `Value<UnityEngine.UI.ColorBlock>?` | `baseline` |
| `spriteState` | `Value<UnityEngine.UI.SpriteState>?` | `baseline` |
| `animationTriggers` | `Value<UnityEngine.UI.AnimationTriggers>?` | `baseline` |
| `targetGraphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `interactable` | `Value<bool>?` | `baseline` |
| `image` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `isAlert` | `Value<bool>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |
| `regexValue` | `Value<string>?` | `baseline` |

## P.Dropdown

Native `TMPro.TMP_Dropdown`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `options` | `Value<System.Collections.Generic.List<TMPro.TMP_Dropdown.OptionData>>?` | `baseline` |
| `template` | `Part<UnityEngine.RectTransform>?` | `baseline` |
| `captionText` | `Part<TMPro.TMP_Text>?` | `baseline` |
| `captionImage` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `placeholder` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `itemText` | `Part<TMPro.TMP_Text>?` | `baseline` |
| `itemImage` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `onValueChanged` | `Action<int>` | `baseline` |
| `alphaFadeSpeed` | `Value<float>?` | `baseline` |
| `MultiSelect` | `Value<bool>?` | `baseline` |
| `navigation` | `Value<UnityEngine.UI.Navigation>?` | `baseline` |
| `transition` | `Value<UnityEngine.UI.Selectable.Transition>?` | `baseline` |
| `colors` | `Value<UnityEngine.UI.ColorBlock>?` | `baseline` |
| `spriteState` | `Value<UnityEngine.UI.SpriteState>?` | `baseline` |
| `animationTriggers` | `Value<UnityEngine.UI.AnimationTriggers>?` | `baseline` |
| `targetGraphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `interactable` | `Value<bool>?` | `baseline` |
| `image` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |
| `item` | `Part<UnityEngine.UI.Toggle>?` | `baseline` |
| `value` | `Value<int>?` | `baseline` |

## P.LegacyText

Native `UnityEngine.UI.Text`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `text` | `Value<string>?` | `baseline` |
| `font` | `Value<UnityEngine.Font>?` | `baseline` |
| `supportRichText` | `Value<bool>?` | `baseline` |
| `resizeTextForBestFit` | `Value<bool>?` | `baseline` |
| `resizeTextMinSize` | `Value<int>?` | `baseline` |
| `resizeTextMaxSize` | `Value<int>?` | `baseline` |
| `alignment` | `Value<UnityEngine.TextAnchor>?` | `baseline` |
| `alignByGeometry` | `Value<bool>?` | `baseline` |
| `fontSize` | `Value<int>?` | `baseline` |
| `horizontalOverflow` | `Value<UnityEngine.HorizontalWrapMode>?` | `baseline` |
| `verticalOverflow` | `Value<UnityEngine.VerticalWrapMode>?` | `baseline` |
| `lineSpacing` | `Value<float>?` | `baseline` |
| `fontStyle` | `Value<UnityEngine.FontStyle>?` | `baseline` |
| `onCullStateChanged` | `Action<bool>` | `baseline` |
| `maskable` | `Value<bool>?` | `baseline` |
| `isMaskingGraphic` | `Value<bool>?` | `baseline` |
| `color` | `Value<UnityEngine.Color>?` | `baseline` |
| `raycastTarget` | `Value<bool>?` | `baseline` |
| `raycastPadding` | `Value<UnityEngine.Vector4>?` | `baseline` |
| `material` | `Value<UnityEngine.Material>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.LegacyInputField

Native `UnityEngine.UI.InputField`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `text` | `Value<string>?` | `baseline` |
| `contentType` | `Value<UnityEngine.UI.InputField.ContentType>?` | `baseline` |
| `lineType` | `Value<UnityEngine.UI.InputField.LineType>?` | `baseline` |
| `shouldHideMobileInput` | `Value<bool>?` | `baseline` |
| `shouldActivateOnSelect` | `Value<bool>?` | `baseline` |
| `caretBlinkRate` | `Value<float>?` | `baseline` |
| `caretWidth` | `Value<int>?` | `baseline` |
| `textComponent` | `Part<UnityEngine.UI.Text>?` | `baseline` |
| `placeholder` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `caretColor` | `Value<UnityEngine.Color>?` | `baseline` |
| `customCaretColor` | `Value<bool>?` | `baseline` |
| `selectionColor` | `Value<UnityEngine.Color>?` | `baseline` |
| `onEndEdit` | `Action<string>` | `baseline` |
| `onSubmit` | `Action<string>` | `baseline` |
| `onValueChanged` | `Action<string>` | `baseline` |
| `onValidateInput` | `Value<UnityEngine.UI.InputField.OnValidateInput>?` | `baseline` |
| `characterLimit` | `Value<int>?` | `baseline` |
| `inputType` | `Value<UnityEngine.UI.InputField.InputType>?` | `baseline` |
| `keyboardType` | `Value<UnityEngine.TouchScreenKeyboardType>?` | `baseline` |
| `characterValidation` | `Value<UnityEngine.UI.InputField.CharacterValidation>?` | `baseline` |
| `readOnly` | `Value<bool>?` | `baseline` |
| `asteriskChar` | `Value<char>?` | `baseline` |
| `caretPosition` | `Value<int>?` | `baseline` |
| `selectionAnchorPosition` | `Value<int>?` | `baseline` |
| `selectionFocusPosition` | `Value<int>?` | `baseline` |
| `navigation` | `Value<UnityEngine.UI.Navigation>?` | `baseline` |
| `transition` | `Value<UnityEngine.UI.Selectable.Transition>?` | `baseline` |
| `colors` | `Value<UnityEngine.UI.ColorBlock>?` | `baseline` |
| `spriteState` | `Value<UnityEngine.UI.SpriteState>?` | `baseline` |
| `animationTriggers` | `Value<UnityEngine.UI.AnimationTriggers>?` | `baseline` |
| `targetGraphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `interactable` | `Value<bool>?` | `baseline` |
| `image` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.LegacyDropdown

Native `UnityEngine.UI.Dropdown`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `options` | `Value<System.Collections.Generic.List<UnityEngine.UI.Dropdown.OptionData>>?` | `baseline` |
| `template` | `Part<UnityEngine.RectTransform>?` | `baseline` |
| `captionText` | `Part<UnityEngine.UI.Text>?` | `baseline` |
| `captionImage` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `itemText` | `Part<UnityEngine.UI.Text>?` | `baseline` |
| `itemImage` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `onValueChanged` | `Action<int>` | `baseline` |
| `alphaFadeSpeed` | `Value<float>?` | `baseline` |
| `navigation` | `Value<UnityEngine.UI.Navigation>?` | `baseline` |
| `transition` | `Value<UnityEngine.UI.Selectable.Transition>?` | `baseline` |
| `colors` | `Value<UnityEngine.UI.ColorBlock>?` | `baseline` |
| `spriteState` | `Value<UnityEngine.UI.SpriteState>?` | `baseline` |
| `animationTriggers` | `Value<UnityEngine.UI.AnimationTriggers>?` | `baseline` |
| `targetGraphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `interactable` | `Value<bool>?` | `baseline` |
| `image` | `Part<UnityEngine.UI.Image>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |
| `item` | `Part<UnityEngine.UI.Toggle>?` | `baseline` |
| `value` | `Value<int>?` | `baseline` |

## P.ScrollRect

Native `UnityEngine.UI.ScrollRect`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `content` | `Part<UnityEngine.RectTransform>?` | `baseline` |
| `horizontal` | `Value<bool>?` | `baseline` |
| `vertical` | `Value<bool>?` | `baseline` |
| `movementType` | `Value<UnityEngine.UI.ScrollRect.MovementType>?` | `baseline` |
| `elasticity` | `Value<float>?` | `baseline` |
| `inertia` | `Value<bool>?` | `baseline` |
| `decelerationRate` | `Value<float>?` | `baseline` |
| `scrollSensitivity` | `Value<float>?` | `baseline` |
| `viewport` | `Part<UnityEngine.RectTransform>?` | `baseline` |
| `horizontalScrollbar` | `Part<UnityEngine.UI.Scrollbar>?` | `baseline` |
| `verticalScrollbar` | `Part<UnityEngine.UI.Scrollbar>?` | `baseline` |
| `horizontalScrollbarVisibility` | `Value<UnityEngine.UI.ScrollRect.ScrollbarVisibility>?` | `baseline` |
| `verticalScrollbarVisibility` | `Value<UnityEngine.UI.ScrollRect.ScrollbarVisibility>?` | `baseline` |
| `horizontalScrollbarSpacing` | `Value<float>?` | `baseline` |
| `verticalScrollbarSpacing` | `Value<float>?` | `baseline` |
| `onValueChanged` | `Action<UnityEngine.Vector2>` | `baseline` |
| `velocity` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `normalizedPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `horizontalNormalizedPosition` | `Value<float>?` | `baseline` |
| `verticalNormalizedPosition` | `Value<float>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Vertical

Native `UnityEngine.UI.VerticalLayoutGroup`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `spacing` | `Value<float>?` | `baseline` |
| `childForceExpandWidth` | `Value<bool>?` | `baseline` |
| `childForceExpandHeight` | `Value<bool>?` | `baseline` |
| `childControlWidth` | `Value<bool>?` | `baseline` |
| `childControlHeight` | `Value<bool>?` | `baseline` |
| `childScaleWidth` | `Value<bool>?` | `baseline` |
| `childScaleHeight` | `Value<bool>?` | `baseline` |
| `reverseArrangement` | `Value<bool>?` | `baseline` |
| `padding` | `Value<UnityEngine.RectOffset>?` | `baseline` |
| `childAlignment` | `Value<UnityEngine.TextAnchor>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Horizontal

Native `UnityEngine.UI.HorizontalLayoutGroup`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `spacing` | `Value<float>?` | `baseline` |
| `childForceExpandWidth` | `Value<bool>?` | `baseline` |
| `childForceExpandHeight` | `Value<bool>?` | `baseline` |
| `childControlWidth` | `Value<bool>?` | `baseline` |
| `childControlHeight` | `Value<bool>?` | `baseline` |
| `childScaleWidth` | `Value<bool>?` | `baseline` |
| `childScaleHeight` | `Value<bool>?` | `baseline` |
| `reverseArrangement` | `Value<bool>?` | `baseline` |
| `padding` | `Value<UnityEngine.RectOffset>?` | `baseline` |
| `childAlignment` | `Value<UnityEngine.TextAnchor>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Grid

Native `UnityEngine.UI.GridLayoutGroup`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `startCorner` | `Value<UnityEngine.UI.GridLayoutGroup.Corner>?` | `baseline` |
| `startAxis` | `Value<UnityEngine.UI.GridLayoutGroup.Axis>?` | `baseline` |
| `cellSize` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `spacing` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `constraint` | `Value<UnityEngine.UI.GridLayoutGroup.Constraint>?` | `baseline` |
| `constraintCount` | `Value<int>?` | `baseline` |
| `padding` | `Value<UnityEngine.RectOffset>?` | `baseline` |
| `childAlignment` | `Value<UnityEngine.TextAnchor>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Canvas

Native `UnityEngine.Canvas`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `renderMode` | `Value<UnityEngine.RenderMode>?` | `baseline` |
| `scaleFactor` | `Value<float>?` | `baseline` |
| `referencePixelsPerUnit` | `Value<float>?` | `baseline` |
| `overridePixelPerfect` | `Value<bool>?` | `baseline` |
| `vertexColorAlwaysGammaSpace` | `Value<bool>?` | `baseline` |
| `useReflectionProbes` | `Value<bool>?` | `UNITY_6000_4_OR_NEWER` |
| `pixelPerfect` | `Value<bool>?` | `baseline` |
| `planeDistance` | `Value<float>?` | `baseline` |
| `overrideSorting` | `Value<bool>?` | `baseline` |
| `sortingOrder` | `Value<int>?` | `baseline` |
| `targetDisplay` | `Value<int>?` | `baseline` |
| `sortingLayerID` | `Value<int>?` | `baseline` |
| `additionalShaderChannels` | `Value<UnityEngine.AdditionalCanvasShaderChannels>?` | `baseline` |
| `sortingLayerName` | `Value<string>?` | `baseline` |
| `updateRectTransformForStandalone` | `Value<UnityEngine.StandaloneRenderResize>?` | `baseline` |
| `worldCamera` | `Part<UnityEngine.Camera>?` | `baseline` |
| `normalizedSortingGridSize` | `Value<float>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.CanvasGroup

Native `UnityEngine.CanvasGroup`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `alpha` | `Value<float>?` | `baseline` |
| `interactable` | `Value<bool>?` | `baseline` |
| `blocksRaycasts` | `Value<bool>?` | `baseline` |
| `ignoreParentGroups` | `Value<bool>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.CanvasScaler

Native `UnityEngine.UI.CanvasScaler`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `uiScaleMode` | `Value<UnityEngine.UI.CanvasScaler.ScaleMode>?` | `baseline` |
| `referencePixelsPerUnit` | `Value<float>?` | `baseline` |
| `scaleFactor` | `Value<float>?` | `baseline` |
| `referenceResolution` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `screenMatchMode` | `Value<UnityEngine.UI.CanvasScaler.ScreenMatchMode>?` | `baseline` |
| `matchWidthOrHeight` | `Value<float>?` | `baseline` |
| `physicalUnit` | `Value<UnityEngine.UI.CanvasScaler.Unit>?` | `baseline` |
| `fallbackScreenDPI` | `Value<float>?` | `baseline` |
| `defaultSpriteDPI` | `Value<float>?` | `baseline` |
| `dynamicPixelsPerUnit` | `Value<float>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.GraphicRaycaster

Native `UnityEngine.UI.GraphicRaycaster`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `ignoreReversedGraphics` | `Value<bool>?` | `baseline` |
| `blockingObjects` | `Value<UnityEngine.UI.GraphicRaycaster.BlockingObjects>?` | `baseline` |
| `blockingMask` | `Value<UnityEngine.LayerMask>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.LayoutElement

Native `UnityEngine.UI.LayoutElement`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `ignoreLayout` | `Value<bool>?` | `baseline` |
| `minWidth` | `Value<float>?` | `baseline` |
| `minHeight` | `Value<float>?` | `baseline` |
| `maxWidth` | `Value<float>?` | `PINE_UGUI_2_6_OR_NEWER` |
| `maxHeight` | `Value<float>?` | `PINE_UGUI_2_6_OR_NEWER` |
| `preferredWidth` | `Value<float>?` | `baseline` |
| `preferredHeight` | `Value<float>?` | `baseline` |
| `flexibleWidth` | `Value<float>?` | `baseline` |
| `flexibleHeight` | `Value<float>?` | `baseline` |
| `layoutPriority` | `Value<int>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.ContentSizeFitter

Native `UnityEngine.UI.ContentSizeFitter`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `horizontalFit` | `Value<UnityEngine.UI.ContentSizeFitter.FitMode>?` | `baseline` |
| `verticalFit` | `Value<UnityEngine.UI.ContentSizeFitter.FitMode>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.AspectRatioFitter

Native `UnityEngine.UI.AspectRatioFitter`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `aspectMode` | `Value<UnityEngine.UI.AspectRatioFitter.AspectMode>?` | `baseline` |
| `aspectRatio` | `Value<float>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Mask

Native `UnityEngine.UI.Mask`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `showMaskGraphic` | `Value<bool>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.RectMask2D

Native `UnityEngine.UI.RectMask2D`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `padding` | `Value<UnityEngine.Vector4>?` | `baseline` |
| `softness` | `Value<UnityEngine.Vector2Int>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Shadow

Native `UnityEngine.UI.Shadow`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `effectColor` | `Value<UnityEngine.Color>?` | `baseline` |
| `effectDistance` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `useGraphicAlpha` | `Value<bool>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Outline

Native `UnityEngine.UI.Outline`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `effectColor` | `Value<UnityEngine.Color>?` | `baseline` |
| `effectDistance` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `useGraphicAlpha` | `Value<bool>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.PositionAsUV1

Native `UnityEngine.UI.PositionAsUV1`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.ToggleGroup

Native `UnityEngine.UI.ToggleGroup`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `allowSwitchOff` | `Value<bool>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.CanvasRenderer

Native `UnityEngine.CanvasRenderer`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `hasPopInstruction` | `Value<bool>?` | `baseline` |
| `materialCount` | `Value<int>?` | `baseline` |
| `popMaterialCount` | `Value<int>?` | `baseline` |
| `cullTransparentMesh` | `Value<bool>?` | `baseline` |
| `cull` | `Value<bool>?` | `baseline` |
| `clippingSoftness` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Animator

Native `UnityEngine.Animator`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `runtimeAnimatorController` | `Value<UnityEngine.RuntimeAnimatorController>?` | `baseline` |
| `rootPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `rootRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `applyRootMotion` | `Value<bool>?` | `baseline` |
| `animatePhysics` | `Value<bool>?` | `baseline` |
| `updateMode` | `Value<UnityEngine.AnimatorUpdateMode>?` | `baseline` |
| `bodyPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `bodyRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `stabilizeFeet` | `Value<bool>?` | `baseline` |
| `feetPivotActive` | `Value<float>?` | `baseline` |
| `speed` | `Value<float>?` | `baseline` |
| `cullingMode` | `Value<UnityEngine.AnimatorCullingMode>?` | `baseline` |
| `playbackTime` | `Value<float>?` | `baseline` |
| `recorderStartTime` | `Value<float>?` | `baseline` |
| `recorderStopTime` | `Value<float>?` | `baseline` |
| `avatar` | `Value<UnityEngine.Avatar>?` | `baseline` |
| `layersAffectMassCenter` | `Value<bool>?` | `baseline` |
| `logWarnings` | `Value<bool>?` | `baseline` |
| `fireEvents` | `Value<bool>?` | `baseline` |
| `keepAnimatorStateOnDisable` | `Value<bool>?` | `baseline` |
| `writeDefaultValuesOnDisable` | `Value<bool>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.EventTrigger

Native `UnityEngine.EventSystems.EventTrigger`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `triggers` | `Value<System.Collections.Generic.List<UnityEngine.EventSystems.EventTrigger.Entry>>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |
| `onPointerEnter` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onPointerExit` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onPointerDown` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onPointerUp` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onPointerClick` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onDrag` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onDrop` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onScroll` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onUpdateSelected` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onSelect` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onDeselect` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onMove` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onInitializePotentialDrag` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onBeginDrag` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onEndDrag` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onSubmit` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |
| `onCancel` | `Action<UnityEngine.EventSystems.BaseEventData>` | `baseline` |

## P.EventSystem

Native `UnityEngine.EventSystems.EventSystem`; placement: **child**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `sendNavigationEvents` | `Value<bool>?` | `baseline` |
| `pixelDragThreshold` | `Value<int>?` | `baseline` |
| `firstSelectedGameObject` | `Part<UnityEngine.GameObject>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.BaseInput

Native `UnityEngine.EventSystems.BaseInput`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `imeCompositionMode` | `Value<UnityEngine.IMECompositionMode>?` | `baseline` |
| `compositionCursorPos` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.PlayerInput

Native `UnityEngine.InputSystem.PlayerInput`; placement: **component**. Available with `ENABLE_INPUT_SYSTEM`.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `actions` | `Value<UnityEngine.InputSystem.InputActionAsset>?` | `baseline` |
| `defaultControlScheme` | `Value<string>?` | `baseline` |
| `neverAutoSwitchControlSchemes` | `Value<bool>?` | `baseline` |
| `currentActionMap` | `Value<UnityEngine.InputSystem.InputActionMap>?` | `baseline` |
| `defaultActionMap` | `Value<string>?` | `baseline` |
| `notificationBehavior` | `Value<UnityEngine.InputSystem.PlayerNotifications>?` | `baseline` |
| `actionEvents` | `Value<UnityEngine.InputSystem.Utilities.ReadOnlyArray<UnityEngine.InputSystem.PlayerInput.ActionEvent>>?` | `baseline` |
| `deviceLostEvent` | `Action<UnityEngine.InputSystem.PlayerInput>` | `baseline` |
| `deviceRegainedEvent` | `Action<UnityEngine.InputSystem.PlayerInput>` | `baseline` |
| `controlsChangedEvent` | `Action<UnityEngine.InputSystem.PlayerInput>` | `baseline` |
| `camera` | `Part<UnityEngine.Camera>?` | `baseline` |
| `uiInputModule` | `Part<UnityEngine.InputSystem.UI.InputSystemUIInputModule>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `onActionTriggered` | `Action<UnityEngine.InputSystem.InputAction.CallbackContext>` | `baseline` |
| `onDeviceLost` | `Action<UnityEngine.InputSystem.PlayerInput>` | `baseline` |
| `onDeviceRegained` | `Action<UnityEngine.InputSystem.PlayerInput>` | `baseline` |
| `onControlsChanged` | `Action<UnityEngine.InputSystem.PlayerInput>` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.MultiplayerEventSystem

Native `UnityEngine.InputSystem.UI.MultiplayerEventSystem`; placement: **child**. Available with `ENABLE_INPUT_SYSTEM`.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `playerRoot` | `Part<UnityEngine.GameObject>?` | `baseline` |
| `sendNavigationEvents` | `Value<bool>?` | `baseline` |
| `pixelDragThreshold` | `Value<int>?` | `baseline` |
| `firstSelectedGameObject` | `Part<UnityEngine.GameObject>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.TrackedDeviceRaycaster

Native `UnityEngine.InputSystem.UI.TrackedDeviceRaycaster`; placement: **component**. Available with `ENABLE_INPUT_SYSTEM`.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `blockingMask` | `Value<UnityEngine.LayerMask>?` | `baseline` |
| `checkFor3DOcclusion` | `Value<bool>?` | `baseline` |
| `checkFor2DOcclusion` | `Value<bool>?` | `baseline` |
| `ignoreReversedGraphics` | `Value<bool>?` | `baseline` |
| `maxDistance` | `Value<float>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.VirtualMouseInput

Native `UnityEngine.InputSystem.UI.VirtualMouseInput`; placement: **component**. Available with `ENABLE_INPUT_SYSTEM`.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `cursorTransform` | `Part<UnityEngine.RectTransform>?` | `baseline` |
| `cursorSpeed` | `Value<float>?` | `baseline` |
| `cursorMode` | `Value<UnityEngine.InputSystem.UI.VirtualMouseInput.CursorMode>?` | `baseline` |
| `cursorGraphic` | `Part<UnityEngine.UI.Graphic>?` | `baseline` |
| `scrollSpeed` | `Value<float>?` | `baseline` |
| `stickAction` | `Value<UnityEngine.InputSystem.InputActionProperty>?` | `baseline` |
| `leftButtonAction` | `Value<UnityEngine.InputSystem.InputActionProperty>?` | `baseline` |
| `rightButtonAction` | `Value<UnityEngine.InputSystem.InputActionProperty>?` | `baseline` |
| `middleButtonAction` | `Value<UnityEngine.InputSystem.InputActionProperty>?` | `baseline` |
| `forwardButtonAction` | `Value<UnityEngine.InputSystem.InputActionProperty>?` | `baseline` |
| `backButtonAction` | `Value<UnityEngine.InputSystem.InputActionProperty>?` | `baseline` |
| `scrollWheelAction` | `Value<UnityEngine.InputSystem.InputActionProperty>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.StandaloneInputModule

Native `UnityEngine.EventSystems.StandaloneInputModule`; placement: **component**. Available with `ENABLE_LEGACY_INPUT_MANAGER`.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `inputActionsPerSecond` | `Value<float>?` | `baseline` |
| `repeatDelay` | `Value<float>?` | `baseline` |
| `horizontalAxis` | `Value<string>?` | `baseline` |
| `verticalAxis` | `Value<string>?` | `baseline` |
| `submitButton` | `Value<string>?` | `baseline` |
| `cancelButton` | `Value<string>?` | `baseline` |
| `inputOverride` | `Part<UnityEngine.EventSystems.BaseInput>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `sendPointerHoverToParent` | `Value<bool>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.InputSystemUIInputModule

Native `UnityEngine.InputSystem.UI.InputSystemUIInputModule`; placement: **component**. Available with `ENABLE_INPUT_SYSTEM`.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `actionsAsset` | `Value<UnityEngine.InputSystem.InputActionAsset>?` | `baseline` |
| `deselectOnBackgroundClick` | `Value<bool>?` | `baseline` |
| `pointerBehavior` | `Value<UnityEngine.InputSystem.UI.UIPointerBehavior>?` | `baseline` |
| `cursorLockBehavior` | `Value<UnityEngine.InputSystem.UI.InputSystemUIInputModule.CursorLockBehavior>?` | `baseline` |
| `scrollDeltaPerTick` | `Value<float>?` | `baseline` |
| `moveRepeatDelay` | `Value<float>?` | `baseline` |
| `moveRepeatRate` | `Value<float>?` | `baseline` |
| `xrTrackingOrigin` | `Part<UnityEngine.Transform>?` | `baseline` |
| `trackedDeviceDragThresholdMultiplier` | `Value<float>?` | `baseline` |
| `point` | `Value<UnityEngine.InputSystem.InputActionReference>?` | `baseline` |
| `scrollWheel` | `Value<UnityEngine.InputSystem.InputActionReference>?` | `baseline` |
| `leftClick` | `Value<UnityEngine.InputSystem.InputActionReference>?` | `baseline` |
| `middleClick` | `Value<UnityEngine.InputSystem.InputActionReference>?` | `baseline` |
| `rightClick` | `Value<UnityEngine.InputSystem.InputActionReference>?` | `baseline` |
| `move` | `Value<UnityEngine.InputSystem.InputActionReference>?` | `baseline` |
| `submit` | `Value<UnityEngine.InputSystem.InputActionReference>?` | `baseline` |
| `cancel` | `Value<UnityEngine.InputSystem.InputActionReference>?` | `baseline` |
| `trackedDeviceOrientation` | `Value<UnityEngine.InputSystem.InputActionReference>?` | `baseline` |
| `trackedDevicePosition` | `Value<UnityEngine.InputSystem.InputActionReference>?` | `baseline` |
| `inputOverride` | `Part<UnityEngine.EventSystems.BaseInput>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `sendPointerHoverToParent` | `Value<bool>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.PhysicsRaycaster

Native `UnityEngine.EventSystems.PhysicsRaycaster`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `eventMask` | `Value<UnityEngine.LayerMask>?` | `baseline` |
| `maxRayIntersections` | `Value<int>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.Physics2DRaycaster

Native `UnityEngine.EventSystems.Physics2DRaycaster`; placement: **component**.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `eventMask` | `Value<UnityEngine.LayerMask>?` | `baseline` |
| `maxRayIntersections` | `Value<int>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.RaycastReceiver

Native `UnityEngine.UI.RaycastReceiver`; placement: **child**. Available with `PINE_UGUI_2_5_OR_NEWER`.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `material` | `Value<UnityEngine.Material>?` | `baseline` |
| `color` | `Value<UnityEngine.Color>?` | `baseline` |
| `raycastTarget` | `Value<bool>?` | `baseline` |
| `raycastPadding` | `Value<UnityEngine.Vector4>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |

## P.SafeArea

Native `UnityEngine.UI.SafeArea`; placement: **component**. Available with `PINE_UGUI_2_6_OR_NEWER`.

| Named prop | Accepted type or event signature | Availability |
| --- | --- | --- |
| `ReferenceOrientation` | `Value<UnityEngine.ScreenOrientation>?` | `baseline` |
| `Edges` | `Value<UnityEngine.UI.SafeArea.SafeAreaMode>?` | `baseline` |
| `Alignment` | `Value<UnityEngine.UI.SafeArea.AlignmentMode>?` | `baseline` |
| `enabled` | `Value<bool>?` | `baseline` |
| `tag` | `Value<string>?` | `baseline` |
| `name` | `Value<string>?` | `baseline` |
| `hideFlags` | `Value<UnityEngine.HideFlags>?` | `baseline` |
| `anchorMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchorMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `pivot` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `anchoredPosition3D` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `sizeDelta` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMin` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `offsetMax` | `Value<UnityEngine.Vector2>?` | `baseline` |
| `localPosition` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localRotation` | `Value<UnityEngine.Quaternion>?` | `baseline` |
| `localEulerAngles` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `localScale` | `Value<UnityEngine.Vector3>?` | `baseline` |
| `active` | `Value<bool>?` | `baseline` |
| `layer` | `Value<int>?` | `baseline` |
| `isStatic` | `Value<bool>?` | `baseline` |
