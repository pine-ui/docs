---
title: All native named props
---

# All native named props

Every listed prop is optional. Non-events use `Value<NativeType>?`; event props use typed `Action` callbacks. `configure` and `reference` accept the factory's native component type. Settings apply in dependency order, with editable values after their ranges/options/content configuration. Every declaration also has `name`, `active`, `layer`, `isStatic` and RectTransform settings. Factory settings accept literals or explicit `Value<T>` getters; text has a direct getter overload. `text` on Button/Toggle creates a caption; it is a convenience setting rather than a native Button/Toggle member.

TMP InputField's `regexValue` and input-module `sendPointerHoverToParent` map native serialized Inspector settings using cached field lookups, because Unity exposes no public setters. They fail clearly if a future native version removes those fields. This path has Editor/runtime checks, but has not been verified in IL2CPP.

## P.Frame

Native `UnityEngine.RectTransform`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `sendChildDimensionsChange` | `bool` | `baseline` |
| `position` | `UnityEngine.Vector3` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `eulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `right` | `UnityEngine.Vector3` | `baseline` |
| `up` | `UnityEngine.Vector3` | `baseline` |
| `forward` | `UnityEngine.Vector3` | `baseline` |
| `rotation` | `UnityEngine.Quaternion` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Text

Native `TMPro.TextMeshProUGUI`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `text` | `string` | `baseline` |
| `textPreprocessor` | `TMPro.ITextPreprocessor` | `baseline` |
| `isRightToLeftText` | `bool` | `baseline` |
| `font` | `TMPro.TMP_FontAsset` | `baseline` |
| `fontSharedMaterial` | `UnityEngine.Material` | `baseline` |
| `fontSharedMaterials` | `UnityEngine.Material[]` | `baseline` |
| `fontMaterial` | `UnityEngine.Material` | `baseline` |
| `fontMaterials` | `UnityEngine.Material[]` | `baseline` |
| `color` | `UnityEngine.Color` | `baseline` |
| `alpha` | `float` | `baseline` |
| `enableVertexGradient` | `bool` | `baseline` |
| `colorGradient` | `TMPro.VertexGradient` | `baseline` |
| `colorGradientPreset` | `TMPro.TMP_ColorGradient` | `baseline` |
| `spriteAsset` | `TMPro.TMP_SpriteAsset` | `baseline` |
| `tintAllSprites` | `bool` | `baseline` |
| `styleSheet` | `TMPro.TMP_StyleSheet` | `baseline` |
| `textStyle` | `TMPro.TMP_Style` | `baseline` |
| `overrideColorTags` | `bool` | `baseline` |
| `faceColor` | `UnityEngine.Color32` | `baseline` |
| `outlineColor` | `UnityEngine.Color32` | `baseline` |
| `outlineWidth` | `float` | `baseline` |
| `fontSize` | `float` | `baseline` |
| `fontWeight` | `TMPro.FontWeight` | `baseline` |
| `enableAutoSizing` | `bool` | `baseline` |
| `fontSizeMin` | `float` | `baseline` |
| `fontSizeMax` | `float` | `baseline` |
| `fontStyle` | `TMPro.FontStyles` | `baseline` |
| `horizontalAlignment` | `TMPro.HorizontalAlignmentOptions` | `baseline` |
| `verticalAlignment` | `TMPro.VerticalAlignmentOptions` | `baseline` |
| `alignment` | `TMPro.TextAlignmentOptions` | `baseline` |
| `characterSpacing` | `float` | `baseline` |
| `characterHorizontalScale` | `float` | `baseline` |
| `wordSpacing` | `float` | `baseline` |
| `lineSpacing` | `float` | `baseline` |
| `lineSpacingAdjustment` | `float` | `baseline` |
| `paragraphSpacing` | `float` | `baseline` |
| `characterWidthAdjustment` | `float` | `baseline` |
| `textWrappingMode` | `TMPro.TextWrappingModes` | `baseline` |
| `wordWrappingRatios` | `float` | `baseline` |
| `overflowMode` | `TMPro.TextOverflowModes` | `baseline` |
| `linkedTextComponent` | `TMPro.TMP_Text` | `baseline` |
| `fontFeatures` | `System.Collections.Generic.List<UnityEngine.TextCore.OTL_FeatureTag>` | `baseline` |
| `extraPadding` | `bool` | `baseline` |
| `richText` | `bool` | `baseline` |
| `emojiFallbackSupport` | `bool` | `baseline` |
| `enableAdvancedText` | `bool` | `PINE_UGUI_2_7_OR_NEWER` |
| `parseCtrlCharacters` | `bool` | `baseline` |
| `isOrthographic` | `bool` | `baseline` |
| `enableCulling` | `bool` | `baseline` |
| `ignoreVisibility` | `bool` | `baseline` |
| `horizontalMapping` | `TMPro.TextureMappingOptions` | `baseline` |
| `verticalMapping` | `TMPro.TextureMappingOptions` | `baseline` |
| `mappingUvLineOffset` | `float` | `baseline` |
| `renderMode` | `TMPro.TextRenderFlags` | `baseline` |
| `geometrySortingOrder` | `TMPro.VertexSortingOrder` | `baseline` |
| `isTextObjectScaleStatic` | `bool` | `baseline` |
| `vertexBufferAutoSizeReduction` | `bool` | `baseline` |
| `firstVisibleCharacter` | `int` | `baseline` |
| `maxVisibleCharacters` | `int` | `baseline` |
| `maxVisibleWords` | `int` | `baseline` |
| `maxVisibleLines` | `int` | `baseline` |
| `useMaxVisibleDescender` | `bool` | `baseline` |
| `pageToDisplay` | `int` | `baseline` |
| `margin` | `UnityEngine.Vector4` | `baseline` |
| `onCullStateChanged` | `Action<bool>` | `baseline` |
| `maskable` | `bool` | `baseline` |
| `isMaskingGraphic` | `bool` | `baseline` |
| `raycastTarget` | `bool` | `baseline` |
| `raycastPadding` | `UnityEngine.Vector4` | `baseline` |
| `material` | `UnityEngine.Material` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Image

Native `UnityEngine.UI.Image`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `sprite` | `UnityEngine.Sprite` | `baseline` |
| `overrideSprite` | `UnityEngine.Sprite` | `baseline` |
| `type` | `UnityEngine.UI.Image.Type` | `baseline` |
| `preserveAspect` | `bool` | `baseline` |
| `fillCenter` | `bool` | `baseline` |
| `fillMethod` | `UnityEngine.UI.Image.FillMethod` | `baseline` |
| `fillAmount` | `float` | `baseline` |
| `fillClockwise` | `bool` | `baseline` |
| `fillOrigin` | `int` | `baseline` |
| `alphaHitTestMinimumThreshold` | `float` | `baseline` |
| `useSpriteMesh` | `bool` | `baseline` |
| `pixelsPerUnitMultiplier` | `float` | `baseline` |
| `material` | `UnityEngine.Material` | `baseline` |
| `onCullStateChanged` | `Action<bool>` | `baseline` |
| `maskable` | `bool` | `baseline` |
| `isMaskingGraphic` | `bool` | `baseline` |
| `color` | `UnityEngine.Color` | `baseline` |
| `raycastTarget` | `bool` | `baseline` |
| `raycastPadding` | `UnityEngine.Vector4` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.RawImage

Native `UnityEngine.UI.RawImage`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `texture` | `UnityEngine.Texture` | `baseline` |
| `uvRect` | `UnityEngine.Rect` | `baseline` |
| `onCullStateChanged` | `Action<bool>` | `baseline` |
| `maskable` | `bool` | `baseline` |
| `isMaskingGraphic` | `bool` | `baseline` |
| `color` | `UnityEngine.Color` | `baseline` |
| `raycastTarget` | `bool` | `baseline` |
| `raycastPadding` | `UnityEngine.Vector4` | `baseline` |
| `material` | `UnityEngine.Material` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Button

Native `UnityEngine.UI.Button`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `text` | `string` | `baseline` |
| `onClick` | `Action` | `baseline` |
| `navigation` | `UnityEngine.UI.Navigation` | `baseline` |
| `transition` | `UnityEngine.UI.Selectable.Transition` | `baseline` |
| `colors` | `UnityEngine.UI.ColorBlock` | `baseline` |
| `spriteState` | `UnityEngine.UI.SpriteState` | `baseline` |
| `animationTriggers` | `UnityEngine.UI.AnimationTriggers` | `baseline` |
| `targetGraphic` | `UnityEngine.UI.Graphic` | `baseline` |
| `interactable` | `bool` | `baseline` |
| `image` | `UnityEngine.UI.Image` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Selectable

Native `UnityEngine.UI.Selectable`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `navigation` | `UnityEngine.UI.Navigation` | `baseline` |
| `transition` | `UnityEngine.UI.Selectable.Transition` | `baseline` |
| `colors` | `UnityEngine.UI.ColorBlock` | `baseline` |
| `spriteState` | `UnityEngine.UI.SpriteState` | `baseline` |
| `animationTriggers` | `UnityEngine.UI.AnimationTriggers` | `baseline` |
| `targetGraphic` | `UnityEngine.UI.Graphic` | `baseline` |
| `interactable` | `bool` | `baseline` |
| `image` | `UnityEngine.UI.Image` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Toggle

Native `UnityEngine.UI.Toggle`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `text` | `string` | `baseline` |
| `group` | `UnityEngine.UI.ToggleGroup` | `baseline` |
| `navigation` | `UnityEngine.UI.Navigation` | `baseline` |
| `transition` | `UnityEngine.UI.Selectable.Transition` | `baseline` |
| `colors` | `UnityEngine.UI.ColorBlock` | `baseline` |
| `spriteState` | `UnityEngine.UI.SpriteState` | `baseline` |
| `animationTriggers` | `UnityEngine.UI.AnimationTriggers` | `baseline` |
| `targetGraphic` | `UnityEngine.UI.Graphic` | `baseline` |
| `interactable` | `bool` | `baseline` |
| `image` | `UnityEngine.UI.Image` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `toggleTransition` | `UnityEngine.UI.Toggle.ToggleTransition` | `baseline` |
| `graphic` | `UnityEngine.UI.Graphic` | `baseline` |
| `onValueChanged` | `Action<bool>` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |
| `isOn` | `bool` | `baseline` |

## P.Slider

Native `UnityEngine.UI.Slider`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `minValue` | `float` | `baseline` |
| `maxValue` | `float` | `baseline` |
| `wholeNumbers` | `bool` | `baseline` |
| `fillRect` | `UnityEngine.RectTransform` | `baseline` |
| `handleRect` | `UnityEngine.RectTransform` | `baseline` |
| `direction` | `UnityEngine.UI.Slider.Direction` | `baseline` |
| `normalizedValue` | `float` | `baseline` |
| `onValueChanged` | `Action<float>` | `baseline` |
| `navigation` | `UnityEngine.UI.Navigation` | `baseline` |
| `transition` | `UnityEngine.UI.Selectable.Transition` | `baseline` |
| `colors` | `UnityEngine.UI.ColorBlock` | `baseline` |
| `spriteState` | `UnityEngine.UI.SpriteState` | `baseline` |
| `animationTriggers` | `UnityEngine.UI.AnimationTriggers` | `baseline` |
| `targetGraphic` | `UnityEngine.UI.Graphic` | `baseline` |
| `interactable` | `bool` | `baseline` |
| `image` | `UnityEngine.UI.Image` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |
| `value` | `float` | `baseline` |

## P.Scrollbar

Native `UnityEngine.UI.Scrollbar`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `handleRect` | `UnityEngine.RectTransform` | `baseline` |
| `direction` | `UnityEngine.UI.Scrollbar.Direction` | `baseline` |
| `size` | `float` | `baseline` |
| `numberOfSteps` | `int` | `baseline` |
| `onValueChanged` | `Action<float>` | `baseline` |
| `navigation` | `UnityEngine.UI.Navigation` | `baseline` |
| `transition` | `UnityEngine.UI.Selectable.Transition` | `baseline` |
| `colors` | `UnityEngine.UI.ColorBlock` | `baseline` |
| `spriteState` | `UnityEngine.UI.SpriteState` | `baseline` |
| `animationTriggers` | `UnityEngine.UI.AnimationTriggers` | `baseline` |
| `targetGraphic` | `UnityEngine.UI.Graphic` | `baseline` |
| `interactable` | `bool` | `baseline` |
| `image` | `UnityEngine.UI.Image` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |
| `value` | `float` | `baseline` |

## P.InputField

Native `TMPro.TMP_InputField`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `text` | `string` | `baseline` |
| `contentType` | `TMPro.TMP_InputField.ContentType` | `baseline` |
| `lineType` | `TMPro.TMP_InputField.LineType` | `baseline` |
| `shouldActivateOnSelect` | `bool` | `baseline` |
| `shouldHideMobileInput` | `bool` | `baseline` |
| `shouldHideSoftKeyboard` | `bool` | `baseline` |
| `caretBlinkRate` | `float` | `baseline` |
| `caretWidth` | `int` | `baseline` |
| `textViewport` | `UnityEngine.RectTransform` | `baseline` |
| `textComponent` | `TMPro.TMP_Text` | `baseline` |
| `placeholder` | `UnityEngine.UI.Graphic` | `baseline` |
| `verticalScrollbar` | `UnityEngine.UI.Scrollbar` | `baseline` |
| `scrollSensitivity` | `float` | `baseline` |
| `caretColor` | `UnityEngine.Color` | `baseline` |
| `customCaretColor` | `bool` | `baseline` |
| `selectionColor` | `UnityEngine.Color` | `baseline` |
| `onEndEdit` | `Action<string>` | `baseline` |
| `onSubmit` | `Action<string>` | `baseline` |
| `onSelect` | `Action<string>` | `baseline` |
| `onDeselect` | `Action<string>` | `baseline` |
| `onTextSelection` | `Action<string, int, int>` | `baseline` |
| `onEndTextSelection` | `Action<string, int, int>` | `baseline` |
| `onValueChanged` | `Action<string>` | `baseline` |
| `onTouchScreenKeyboardStatusChanged` | `Action<UnityEngine.TouchScreenKeyboard.Status>` | `baseline` |
| `onValidateInput` | `TMPro.TMP_InputField.OnValidateInput` | `baseline` |
| `characterLimit` | `int` | `baseline` |
| `pointSize` | `float` | `baseline` |
| `fontAsset` | `TMPro.TMP_FontAsset` | `baseline` |
| `onFocusSelectAll` | `bool` | `baseline` |
| `resetOnDeActivation` | `bool` | `baseline` |
| `keepTextSelectionVisible` | `bool` | `baseline` |
| `restoreOriginalTextOnEscape` | `bool` | `baseline` |
| `isRichTextEditingAllowed` | `bool` | `baseline` |
| `lineLimit` | `int` | `baseline` |
| `inputType` | `TMPro.TMP_InputField.InputType` | `baseline` |
| `keyboardType` | `UnityEngine.TouchScreenKeyboardType` | `baseline` |
| `characterValidation` | `TMPro.TMP_InputField.CharacterValidation` | `baseline` |
| `inputValidator` | `TMPro.TMP_InputValidator` | `baseline` |
| `readOnly` | `bool` | `baseline` |
| `richText` | `bool` | `baseline` |
| `asteriskChar` | `char` | `baseline` |
| `caretPosition` | `int` | `baseline` |
| `selectionAnchorPosition` | `int` | `baseline` |
| `selectionFocusPosition` | `int` | `baseline` |
| `stringPosition` | `int` | `baseline` |
| `selectionStringAnchorPosition` | `int` | `baseline` |
| `selectionStringFocusPosition` | `int` | `baseline` |
| `navigation` | `UnityEngine.UI.Navigation` | `baseline` |
| `transition` | `UnityEngine.UI.Selectable.Transition` | `baseline` |
| `colors` | `UnityEngine.UI.ColorBlock` | `baseline` |
| `spriteState` | `UnityEngine.UI.SpriteState` | `baseline` |
| `animationTriggers` | `UnityEngine.UI.AnimationTriggers` | `baseline` |
| `targetGraphic` | `UnityEngine.UI.Graphic` | `baseline` |
| `interactable` | `bool` | `baseline` |
| `image` | `UnityEngine.UI.Image` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `isAlert` | `bool` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |
| `regexValue` | `string` | `baseline` |

## P.Dropdown

Native `TMPro.TMP_Dropdown`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `options` | `System.Collections.Generic.List<TMPro.TMP_Dropdown.OptionData>` | `baseline` |
| `template` | `UnityEngine.RectTransform` | `baseline` |
| `captionText` | `TMPro.TMP_Text` | `baseline` |
| `captionImage` | `UnityEngine.UI.Image` | `baseline` |
| `placeholder` | `UnityEngine.UI.Graphic` | `baseline` |
| `itemText` | `TMPro.TMP_Text` | `baseline` |
| `itemImage` | `UnityEngine.UI.Image` | `baseline` |
| `onValueChanged` | `Action<int>` | `baseline` |
| `alphaFadeSpeed` | `float` | `baseline` |
| `MultiSelect` | `bool` | `baseline` |
| `navigation` | `UnityEngine.UI.Navigation` | `baseline` |
| `transition` | `UnityEngine.UI.Selectable.Transition` | `baseline` |
| `colors` | `UnityEngine.UI.ColorBlock` | `baseline` |
| `spriteState` | `UnityEngine.UI.SpriteState` | `baseline` |
| `animationTriggers` | `UnityEngine.UI.AnimationTriggers` | `baseline` |
| `targetGraphic` | `UnityEngine.UI.Graphic` | `baseline` |
| `interactable` | `bool` | `baseline` |
| `image` | `UnityEngine.UI.Image` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |
| `value` | `int` | `baseline` |

## P.LegacyText

Native `UnityEngine.UI.Text`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `text` | `string` | `baseline` |
| `font` | `UnityEngine.Font` | `baseline` |
| `supportRichText` | `bool` | `baseline` |
| `resizeTextForBestFit` | `bool` | `baseline` |
| `resizeTextMinSize` | `int` | `baseline` |
| `resizeTextMaxSize` | `int` | `baseline` |
| `alignment` | `UnityEngine.TextAnchor` | `baseline` |
| `alignByGeometry` | `bool` | `baseline` |
| `fontSize` | `int` | `baseline` |
| `horizontalOverflow` | `UnityEngine.HorizontalWrapMode` | `baseline` |
| `verticalOverflow` | `UnityEngine.VerticalWrapMode` | `baseline` |
| `lineSpacing` | `float` | `baseline` |
| `fontStyle` | `UnityEngine.FontStyle` | `baseline` |
| `onCullStateChanged` | `Action<bool>` | `baseline` |
| `maskable` | `bool` | `baseline` |
| `isMaskingGraphic` | `bool` | `baseline` |
| `color` | `UnityEngine.Color` | `baseline` |
| `raycastTarget` | `bool` | `baseline` |
| `raycastPadding` | `UnityEngine.Vector4` | `baseline` |
| `material` | `UnityEngine.Material` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.LegacyInputField

Native `UnityEngine.UI.InputField`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `text` | `string` | `baseline` |
| `contentType` | `UnityEngine.UI.InputField.ContentType` | `baseline` |
| `lineType` | `UnityEngine.UI.InputField.LineType` | `baseline` |
| `shouldHideMobileInput` | `bool` | `baseline` |
| `shouldActivateOnSelect` | `bool` | `baseline` |
| `caretBlinkRate` | `float` | `baseline` |
| `caretWidth` | `int` | `baseline` |
| `textComponent` | `UnityEngine.UI.Text` | `baseline` |
| `placeholder` | `UnityEngine.UI.Graphic` | `baseline` |
| `caretColor` | `UnityEngine.Color` | `baseline` |
| `customCaretColor` | `bool` | `baseline` |
| `selectionColor` | `UnityEngine.Color` | `baseline` |
| `onEndEdit` | `Action<string>` | `baseline` |
| `onSubmit` | `Action<string>` | `baseline` |
| `onValueChanged` | `Action<string>` | `baseline` |
| `onValidateInput` | `UnityEngine.UI.InputField.OnValidateInput` | `baseline` |
| `characterLimit` | `int` | `baseline` |
| `inputType` | `UnityEngine.UI.InputField.InputType` | `baseline` |
| `keyboardType` | `UnityEngine.TouchScreenKeyboardType` | `baseline` |
| `characterValidation` | `UnityEngine.UI.InputField.CharacterValidation` | `baseline` |
| `readOnly` | `bool` | `baseline` |
| `asteriskChar` | `char` | `baseline` |
| `caretPosition` | `int` | `baseline` |
| `selectionAnchorPosition` | `int` | `baseline` |
| `selectionFocusPosition` | `int` | `baseline` |
| `navigation` | `UnityEngine.UI.Navigation` | `baseline` |
| `transition` | `UnityEngine.UI.Selectable.Transition` | `baseline` |
| `colors` | `UnityEngine.UI.ColorBlock` | `baseline` |
| `spriteState` | `UnityEngine.UI.SpriteState` | `baseline` |
| `animationTriggers` | `UnityEngine.UI.AnimationTriggers` | `baseline` |
| `targetGraphic` | `UnityEngine.UI.Graphic` | `baseline` |
| `interactable` | `bool` | `baseline` |
| `image` | `UnityEngine.UI.Image` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.LegacyDropdown

Native `UnityEngine.UI.Dropdown`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `options` | `System.Collections.Generic.List<UnityEngine.UI.Dropdown.OptionData>` | `baseline` |
| `template` | `UnityEngine.RectTransform` | `baseline` |
| `captionText` | `UnityEngine.UI.Text` | `baseline` |
| `captionImage` | `UnityEngine.UI.Image` | `baseline` |
| `itemText` | `UnityEngine.UI.Text` | `baseline` |
| `itemImage` | `UnityEngine.UI.Image` | `baseline` |
| `onValueChanged` | `Action<int>` | `baseline` |
| `alphaFadeSpeed` | `float` | `baseline` |
| `navigation` | `UnityEngine.UI.Navigation` | `baseline` |
| `transition` | `UnityEngine.UI.Selectable.Transition` | `baseline` |
| `colors` | `UnityEngine.UI.ColorBlock` | `baseline` |
| `spriteState` | `UnityEngine.UI.SpriteState` | `baseline` |
| `animationTriggers` | `UnityEngine.UI.AnimationTriggers` | `baseline` |
| `targetGraphic` | `UnityEngine.UI.Graphic` | `baseline` |
| `interactable` | `bool` | `baseline` |
| `image` | `UnityEngine.UI.Image` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |
| `value` | `int` | `baseline` |

## P.ScrollRect

Native `UnityEngine.UI.ScrollRect`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `content` | `UnityEngine.RectTransform` | `baseline` |
| `horizontal` | `bool` | `baseline` |
| `vertical` | `bool` | `baseline` |
| `movementType` | `UnityEngine.UI.ScrollRect.MovementType` | `baseline` |
| `elasticity` | `float` | `baseline` |
| `inertia` | `bool` | `baseline` |
| `decelerationRate` | `float` | `baseline` |
| `scrollSensitivity` | `float` | `baseline` |
| `viewport` | `UnityEngine.RectTransform` | `baseline` |
| `horizontalScrollbar` | `UnityEngine.UI.Scrollbar` | `baseline` |
| `verticalScrollbar` | `UnityEngine.UI.Scrollbar` | `baseline` |
| `horizontalScrollbarVisibility` | `UnityEngine.UI.ScrollRect.ScrollbarVisibility` | `baseline` |
| `verticalScrollbarVisibility` | `UnityEngine.UI.ScrollRect.ScrollbarVisibility` | `baseline` |
| `horizontalScrollbarSpacing` | `float` | `baseline` |
| `verticalScrollbarSpacing` | `float` | `baseline` |
| `onValueChanged` | `Action<UnityEngine.Vector2>` | `baseline` |
| `velocity` | `UnityEngine.Vector2` | `baseline` |
| `normalizedPosition` | `UnityEngine.Vector2` | `baseline` |
| `horizontalNormalizedPosition` | `float` | `baseline` |
| `verticalNormalizedPosition` | `float` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Vertical

Native `UnityEngine.UI.VerticalLayoutGroup`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `spacing` | `float` | `baseline` |
| `childForceExpandWidth` | `bool` | `baseline` |
| `childForceExpandHeight` | `bool` | `baseline` |
| `childControlWidth` | `bool` | `baseline` |
| `childControlHeight` | `bool` | `baseline` |
| `childScaleWidth` | `bool` | `baseline` |
| `childScaleHeight` | `bool` | `baseline` |
| `reverseArrangement` | `bool` | `baseline` |
| `padding` | `UnityEngine.RectOffset` | `baseline` |
| `childAlignment` | `UnityEngine.TextAnchor` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Horizontal

Native `UnityEngine.UI.HorizontalLayoutGroup`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `spacing` | `float` | `baseline` |
| `childForceExpandWidth` | `bool` | `baseline` |
| `childForceExpandHeight` | `bool` | `baseline` |
| `childControlWidth` | `bool` | `baseline` |
| `childControlHeight` | `bool` | `baseline` |
| `childScaleWidth` | `bool` | `baseline` |
| `childScaleHeight` | `bool` | `baseline` |
| `reverseArrangement` | `bool` | `baseline` |
| `padding` | `UnityEngine.RectOffset` | `baseline` |
| `childAlignment` | `UnityEngine.TextAnchor` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Grid

Native `UnityEngine.UI.GridLayoutGroup`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `startCorner` | `UnityEngine.UI.GridLayoutGroup.Corner` | `baseline` |
| `startAxis` | `UnityEngine.UI.GridLayoutGroup.Axis` | `baseline` |
| `cellSize` | `UnityEngine.Vector2` | `baseline` |
| `spacing` | `UnityEngine.Vector2` | `baseline` |
| `constraint` | `UnityEngine.UI.GridLayoutGroup.Constraint` | `baseline` |
| `constraintCount` | `int` | `baseline` |
| `padding` | `UnityEngine.RectOffset` | `baseline` |
| `childAlignment` | `UnityEngine.TextAnchor` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Canvas

Native `UnityEngine.Canvas`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `renderMode` | `UnityEngine.RenderMode` | `baseline` |
| `scaleFactor` | `float` | `baseline` |
| `referencePixelsPerUnit` | `float` | `baseline` |
| `overridePixelPerfect` | `bool` | `baseline` |
| `vertexColorAlwaysGammaSpace` | `bool` | `baseline` |
| `useReflectionProbes` | `bool` | `UNITY_6000_4_OR_NEWER` |
| `pixelPerfect` | `bool` | `baseline` |
| `planeDistance` | `float` | `baseline` |
| `overrideSorting` | `bool` | `baseline` |
| `sortingOrder` | `int` | `baseline` |
| `targetDisplay` | `int` | `baseline` |
| `sortingLayerID` | `int` | `baseline` |
| `additionalShaderChannels` | `UnityEngine.AdditionalCanvasShaderChannels` | `baseline` |
| `sortingLayerName` | `string` | `baseline` |
| `updateRectTransformForStandalone` | `UnityEngine.StandaloneRenderResize` | `baseline` |
| `worldCamera` | `UnityEngine.Camera` | `baseline` |
| `normalizedSortingGridSize` | `float` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.CanvasGroup

Native `UnityEngine.CanvasGroup`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `alpha` | `float` | `baseline` |
| `interactable` | `bool` | `baseline` |
| `blocksRaycasts` | `bool` | `baseline` |
| `ignoreParentGroups` | `bool` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.CanvasScaler

Native `UnityEngine.UI.CanvasScaler`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `uiScaleMode` | `UnityEngine.UI.CanvasScaler.ScaleMode` | `baseline` |
| `referencePixelsPerUnit` | `float` | `baseline` |
| `scaleFactor` | `float` | `baseline` |
| `referenceResolution` | `UnityEngine.Vector2` | `baseline` |
| `screenMatchMode` | `UnityEngine.UI.CanvasScaler.ScreenMatchMode` | `baseline` |
| `matchWidthOrHeight` | `float` | `baseline` |
| `physicalUnit` | `UnityEngine.UI.CanvasScaler.Unit` | `baseline` |
| `fallbackScreenDPI` | `float` | `baseline` |
| `defaultSpriteDPI` | `float` | `baseline` |
| `dynamicPixelsPerUnit` | `float` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.GraphicRaycaster

Native `UnityEngine.UI.GraphicRaycaster`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `ignoreReversedGraphics` | `bool` | `baseline` |
| `blockingObjects` | `UnityEngine.UI.GraphicRaycaster.BlockingObjects` | `baseline` |
| `blockingMask` | `UnityEngine.LayerMask` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.LayoutElement

Native `UnityEngine.UI.LayoutElement`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `ignoreLayout` | `bool` | `baseline` |
| `minWidth` | `float` | `baseline` |
| `minHeight` | `float` | `baseline` |
| `maxWidth` | `float` | `PINE_UGUI_2_6_OR_NEWER` |
| `maxHeight` | `float` | `PINE_UGUI_2_6_OR_NEWER` |
| `preferredWidth` | `float` | `baseline` |
| `preferredHeight` | `float` | `baseline` |
| `flexibleWidth` | `float` | `baseline` |
| `flexibleHeight` | `float` | `baseline` |
| `layoutPriority` | `int` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.ContentSizeFitter

Native `UnityEngine.UI.ContentSizeFitter`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `horizontalFit` | `UnityEngine.UI.ContentSizeFitter.FitMode` | `baseline` |
| `verticalFit` | `UnityEngine.UI.ContentSizeFitter.FitMode` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.AspectRatioFitter

Native `UnityEngine.UI.AspectRatioFitter`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `aspectMode` | `UnityEngine.UI.AspectRatioFitter.AspectMode` | `baseline` |
| `aspectRatio` | `float` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Mask

Native `UnityEngine.UI.Mask`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `showMaskGraphic` | `bool` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.RectMask2D

Native `UnityEngine.UI.RectMask2D`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `padding` | `UnityEngine.Vector4` | `baseline` |
| `softness` | `UnityEngine.Vector2Int` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Shadow

Native `UnityEngine.UI.Shadow`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `effectColor` | `UnityEngine.Color` | `baseline` |
| `effectDistance` | `UnityEngine.Vector2` | `baseline` |
| `useGraphicAlpha` | `bool` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Outline

Native `UnityEngine.UI.Outline`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `effectColor` | `UnityEngine.Color` | `baseline` |
| `effectDistance` | `UnityEngine.Vector2` | `baseline` |
| `useGraphicAlpha` | `bool` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.PositionAsUV1

Native `UnityEngine.UI.PositionAsUV1`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.ToggleGroup

Native `UnityEngine.UI.ToggleGroup`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `allowSwitchOff` | `bool` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.CanvasRenderer

Native `UnityEngine.CanvasRenderer`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `hasPopInstruction` | `bool` | `baseline` |
| `materialCount` | `int` | `baseline` |
| `popMaterialCount` | `int` | `baseline` |
| `cullTransparentMesh` | `bool` | `baseline` |
| `cull` | `bool` | `baseline` |
| `clippingSoftness` | `UnityEngine.Vector2` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.EventTrigger

Native `UnityEngine.EventSystems.EventTrigger`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `triggers` | `System.Collections.Generic.List<UnityEngine.EventSystems.EventTrigger.Entry>` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.EventSystem

Native `UnityEngine.EventSystems.EventSystem`; placement: **child**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `sendNavigationEvents` | `bool` | `baseline` |
| `pixelDragThreshold` | `int` | `baseline` |
| `firstSelectedGameObject` | `UnityEngine.GameObject` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.BaseInput

Native `UnityEngine.EventSystems.BaseInput`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `imeCompositionMode` | `UnityEngine.IMECompositionMode` | `baseline` |
| `compositionCursorPos` | `UnityEngine.Vector2` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.StandaloneInputModule

Native `UnityEngine.EventSystems.StandaloneInputModule`; placement: **component**. Available with `ENABLE_LEGACY_INPUT_MANAGER`.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `inputActionsPerSecond` | `float` | `baseline` |
| `repeatDelay` | `float` | `baseline` |
| `horizontalAxis` | `string` | `baseline` |
| `verticalAxis` | `string` | `baseline` |
| `submitButton` | `string` | `baseline` |
| `cancelButton` | `string` | `baseline` |
| `inputOverride` | `UnityEngine.EventSystems.BaseInput` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `sendPointerHoverToParent` | `bool` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.InputSystemUIInputModule

Native `UnityEngine.InputSystem.UI.InputSystemUIInputModule`; placement: **component**. Available with `ENABLE_INPUT_SYSTEM`.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `deselectOnBackgroundClick` | `bool` | `baseline` |
| `pointerBehavior` | `UnityEngine.InputSystem.UI.UIPointerBehavior` | `baseline` |
| `cursorLockBehavior` | `UnityEngine.InputSystem.UI.InputSystemUIInputModule.CursorLockBehavior` | `baseline` |
| `scrollDeltaPerTick` | `float` | `baseline` |
| `moveRepeatDelay` | `float` | `baseline` |
| `moveRepeatRate` | `float` | `baseline` |
| `xrTrackingOrigin` | `UnityEngine.Transform` | `baseline` |
| `trackedDeviceDragThresholdMultiplier` | `float` | `baseline` |
| `point` | `UnityEngine.InputSystem.InputActionReference` | `baseline` |
| `scrollWheel` | `UnityEngine.InputSystem.InputActionReference` | `baseline` |
| `leftClick` | `UnityEngine.InputSystem.InputActionReference` | `baseline` |
| `middleClick` | `UnityEngine.InputSystem.InputActionReference` | `baseline` |
| `rightClick` | `UnityEngine.InputSystem.InputActionReference` | `baseline` |
| `move` | `UnityEngine.InputSystem.InputActionReference` | `baseline` |
| `submit` | `UnityEngine.InputSystem.InputActionReference` | `baseline` |
| `cancel` | `UnityEngine.InputSystem.InputActionReference` | `baseline` |
| `trackedDeviceOrientation` | `UnityEngine.InputSystem.InputActionReference` | `baseline` |
| `trackedDevicePosition` | `UnityEngine.InputSystem.InputActionReference` | `baseline` |
| `actionsAsset` | `UnityEngine.InputSystem.InputActionAsset` | `baseline` |
| `inputOverride` | `UnityEngine.EventSystems.BaseInput` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `sendPointerHoverToParent` | `bool` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.PhysicsRaycaster

Native `UnityEngine.EventSystems.PhysicsRaycaster`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `eventMask` | `UnityEngine.LayerMask` | `baseline` |
| `maxRayIntersections` | `int` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.Physics2DRaycaster

Native `UnityEngine.EventSystems.Physics2DRaycaster`; placement: **component**.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `eventMask` | `UnityEngine.LayerMask` | `baseline` |
| `maxRayIntersections` | `int` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.RaycastReceiver

Native `UnityEngine.UI.RaycastReceiver`; placement: **child**. Available with `PINE_UGUI_2_5_OR_NEWER`.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `material` | `UnityEngine.Material` | `baseline` |
| `color` | `UnityEngine.Color` | `baseline` |
| `raycastTarget` | `bool` | `baseline` |
| `raycastPadding` | `UnityEngine.Vector4` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |

## P.SafeArea

Native `UnityEngine.UI.SafeArea`; placement: **component**. Available with `PINE_UGUI_2_6_OR_NEWER`.

| Named prop | Native type or event signature | Availability |
| --- | --- | --- |
| `ReferenceOrientation` | `UnityEngine.ScreenOrientation` | `baseline` |
| `Edges` | `UnityEngine.UI.SafeArea.SafeAreaMode` | `baseline` |
| `Alignment` | `UnityEngine.UI.SafeArea.AlignmentMode` | `baseline` |
| `enabled` | `bool` | `baseline` |
| `tag` | `string` | `baseline` |
| `name` | `string` | `baseline` |
| `hideFlags` | `UnityEngine.HideFlags` | `baseline` |
| `anchorMin` | `UnityEngine.Vector2` | `baseline` |
| `anchorMax` | `UnityEngine.Vector2` | `baseline` |
| `pivot` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition` | `UnityEngine.Vector2` | `baseline` |
| `anchoredPosition3D` | `UnityEngine.Vector3` | `baseline` |
| `sizeDelta` | `UnityEngine.Vector2` | `baseline` |
| `offsetMin` | `UnityEngine.Vector2` | `baseline` |
| `offsetMax` | `UnityEngine.Vector2` | `baseline` |
| `localPosition` | `UnityEngine.Vector3` | `baseline` |
| `localRotation` | `UnityEngine.Quaternion` | `baseline` |
| `localEulerAngles` | `UnityEngine.Vector3` | `baseline` |
| `localScale` | `UnityEngine.Vector3` | `baseline` |
| `active` | `bool` | `baseline` |
| `layer` | `int` | `baseline` |
| `isStatic` | `bool` | `baseline` |
