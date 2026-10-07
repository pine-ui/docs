---
title: "Pine exact, flexible and content sizing API (Pine 1.1.0)"
sidebar_label: Exact, flexible and content sizing
description: "Reference Pine exact, flexible and content sizing APIs for Unity UI. Check typed parameters, native layout behavior and scoped examples. Pine 1.1.0 documentation."
---

# Exact, flexible and content sizing

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `P.Size`

```text
public static IProperty<Component> Size(Value<Vector2> size)
```

Requests exact non-negative finite width and height in both RectTransform and native LayoutElement.

```text
public static IProperty<Component> Size(float width, float height)
```

Requests exact non-negative finite width and height in both RectTransform and native LayoutElement.

```text
public static IProperty<Component> Size(Func<Vector2> size)
```

Requests exact non-negative finite width and height in both RectTransform and native LayoutElement.

## `P.Width`

```text
public static IProperty<Component> Width(Value<float> width)
```

Requests one exact non-negative finite axis in both native rect and layout sizing.

```text
public static IProperty<Component> Width(Func<float> width)
```

Requests one exact non-negative finite axis in both native rect and layout sizing.

## `P.Height`

```text
public static IProperty<Component> Height(Value<float> height)
```

Requests one exact non-negative finite axis in both native rect and layout sizing.

```text
public static IProperty<Component> Height(Func<float> height)
```

Requests one exact non-negative finite axis in both native rect and layout sizing.

## `P.Fill`

```text
public static IProperty<Component> Fill()
```

Explicitly fills available space on both axes, using layout flexibility under a layout group and stretching under a plain parent.

## `P.FillWidth`

```text
public static IProperty<Component> FillWidth()
```

Fills available width, using native layout flexibility or parent stretching.

## `P.FillHeight`

```text
public static IProperty<Component> FillHeight()
```

Fills available height, using native layout flexibility or parent stretching.

## `P.Auto`

```text
public static IProperty<Component> Auto()
```

Sizes both axes from native content preference rather than specifying exact dimensions.

## `P.AutoWidth`

```text
public static IProperty<Component> AutoWidth()
```

Sizes width from native content preference.

## `P.AutoHeight`

```text
public static IProperty<Component> AutoHeight()
```

Sizes height from native content preference.

## `P.PreferredSize`

```text
public static IProperty<Component> PreferredSize(Value<Vector2> size)
```

Sets native LayoutElement preferred dimensions without imposing exact minima.

```text
public static IProperty<Component> PreferredSize(float width, float height)
```

Sets native LayoutElement preferred dimensions without imposing exact minima.

```text
public static IProperty<Component> PreferredSize(Func<Vector2> size)
```

Sets native LayoutElement preferred dimensions without imposing exact minima.

## `P.Position`

```text
public static IProperty<Component> Position(Value<Vector2> position)
```

Binds RectTransform.anchoredPosition.

```text
public static IProperty<Component> Position(float x, float y)
```

Binds RectTransform.anchoredPosition.

```text
public static IProperty<Component> Position(Func<Vector2> position)
```

Binds RectTransform.anchoredPosition.

## `P.Anchors`

```text
public static IProperty<Component> Anchors(Value<Vector2> minimum, Value<Vector2> maximum)
```

Binds normalized minimum and maximum anchors.

## `P.Pivot`

```text
public static IProperty<Component> Pivot(Value<Vector2> pivot)
```

Binds the normalized native RectTransform pivot.

```text
public static IProperty<Component> Pivot(Func<Vector2> pivot)
```

Binds the normalized native RectTransform pivot.

## `P.Stretch`

```text
public static IProperty<Component> Stretch()
```

Sets anchors to zero/one and offsets to zero once.

## `P.Clip`

```text
public static IProperty<Component> Clip(Value<bool> enabled)
```

Adds or reuses RectMask2D and binds its enabled state.

```text
public static IProperty<Component> Clip(Func<bool> enabled)
```

Adds or reuses RectMask2D and binds its enabled state.

## `P.Padding`

```text
public static IProperty<RectTransform> Padding(Value<RectOffset> padding)
```

Binds native horizontal/vertical layout padding on a frame.

```text
public static IProperty<RectTransform> Padding(Func<RectOffset> padding)
```

Binds native horizontal/vertical layout padding on a frame.

## `P.VerticalProperty`

```text
public static IProperty<RectTransform> VerticalProperty()
```

Adds or reuses a vertical native layout group with controlled child sizing and explicit flexible expansion.

```text
public static IProperty<RectTransform> VerticalProperty(Value<float> spacing)
```

Adds or reuses a vertical native layout group with controlled child sizing and explicit flexible expansion.

```text
public static IProperty<RectTransform> VerticalProperty(Func<float> spacing)
```

Adds or reuses a vertical native layout group with controlled child sizing and explicit flexible expansion.

## `P.HorizontalProperty`

```text
public static IProperty<RectTransform> HorizontalProperty()
```

Adds or reuses a horizontal native layout group with controlled child sizing and explicit flexible expansion.

```text
public static IProperty<RectTransform> HorizontalProperty(Value<float> spacing)
```

Adds or reuses a horizontal native layout group with controlled child sizing and explicit flexible expansion.

```text
public static IProperty<RectTransform> HorizontalProperty(Func<float> spacing)
```

Adds or reuses a horizontal native layout group with controlled child sizing and explicit flexible expansion.

## `P.CellSize`

```text
public static IProperty<GridLayoutGroup> CellSize(Value<Vector2> size)
```

Binds uniform grid dimensions shared by every cell.

```text
public static IProperty<GridLayoutGroup> CellSize(Func<Vector2> size)
```

Binds uniform grid dimensions shared by every cell.

## `P.GridSpacing`

```text
public static IProperty<GridLayoutGroup> GridSpacing(Value<Vector2> spacing)
```

Binds horizontal and vertical native grid spacing.

```text
public static IProperty<GridLayoutGroup> GridSpacing(Func<Vector2> spacing)
```

Binds horizontal and vertical native grid spacing.

## `P.GridPadding`

```text
public static IProperty<GridLayoutGroup> GridPadding(Value<RectOffset> padding)
```

Binds native uniform-grid padding.

## `P.SafeAreaProperty`

```text
public static IProperty<Component> SafeAreaProperty(Value<bool> enabled)
```

Adds or reuses an allocation-free native safe-area follower, with reactive enablement.

```text
public static IProperty<Component> SafeAreaProperty(Func<bool> enabled)
```

Adds or reuses an allocation-free native safe-area follower, with reactive enablement.
