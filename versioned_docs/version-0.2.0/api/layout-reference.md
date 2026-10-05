---
title: Pine exact, flexible and content sizing API
sidebar_label: Exact, flexible and content sizing
description: Complete typed reference with overloads, parameters, ownership and examples for Pine exact, flexible and content sizing.
---

# Exact, flexible and content sizing

This reference documents every public declaration in this part of the working API. Examples run inside `UI.Mount(...)` or `UI.Root(...)` unless they only create state/configuration. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `UI.Size`

```text
public static IProperty<Component> Size(Value<Vector2> size)
```

Requests exact non-negative finite width and height in both RectTransform and native LayoutElement. Rows and columns preserve this minimum and preferred size even when the parent is smaller; overflow remains visible until Clip or ScrollView is declared. Uniform grids reject conflicting exact dimensions. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `size` | The typed size input (Value&lt;Vector2&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Size(360, 48));
```

```text
public static IProperty<Component> Size(float width, float height)
```

Requests exact non-negative finite width and height in both RectTransform and native LayoutElement. Rows and columns preserve this minimum and preferred size even when the parent is smaller; overflow remains visible until Clip or ScrollView is declared. Uniform grids reject conflicting exact dimensions. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `width` | Finite non-negative exact width in canvas units. |
| `height` | Finite non-negative exact height in canvas units. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Size(360, 48));
```

```text
public static IProperty<Component> Size(Func<Vector2> size)
```

Requests exact non-negative finite width and height in both RectTransform and native LayoutElement. Rows and columns preserve this minimum and preferred size even when the parent is smaller; overflow remains visible until Clip or ScrollView is declared. Uniform grids reject conflicting exact dimensions. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `size` | The typed size input (Func&lt;Vector2&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Size(360, 48));
```

## `UI.Width`

```text
public static IProperty<Component> Width(Value<float> width)
```

Requests one exact non-negative finite axis in both native rect and layout sizing. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `width` | Finite non-negative exact width in canvas units. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Width(360f));
```

```text
public static IProperty<Component> Width(Func<float> width)
```

Requests one exact non-negative finite axis in both native rect and layout sizing. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `width` | Finite non-negative exact width in canvas units. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Width(360f));
```

## `UI.Height`

```text
public static IProperty<Component> Height(Value<float> height)
```

Requests one exact non-negative finite axis in both native rect and layout sizing. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `height` | Finite non-negative exact height in canvas units. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Height(48f));
```

```text
public static IProperty<Component> Height(Func<float> height)
```

Requests one exact non-negative finite axis in both native rect and layout sizing. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `height` | Finite non-negative exact height in canvas units. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Height(48f));
```

## `UI.Fill`

```text
public static IProperty<Component> Fill()
```

Explicitly fills available space on both axes, using layout flexibility under a layout group and stretching under a plain parent.

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Fill());
```

## `UI.FillWidth`

```text
public static IProperty<Component> FillWidth()
```

Fills available width, using native layout flexibility or parent stretching.

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.FillWidth());
```

## `UI.FillHeight`

```text
public static IProperty<Component> FillHeight()
```

Fills available height, using native layout flexibility or parent stretching.

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.FillHeight());
```

## `UI.Auto`

```text
public static IProperty<Component> Auto()
```

Sizes both axes from native content preference rather than specifying exact dimensions.

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Auto());
```

## `UI.AutoWidth`

```text
public static IProperty<Component> AutoWidth()
```

Sizes width from native content preference.

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.AutoWidth());
```

## `UI.AutoHeight`

```text
public static IProperty<Component> AutoHeight()
```

Sizes height from native content preference.

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.AutoHeight());
```

## `UI.PreferredSize`

```text
public static IProperty<Component> PreferredSize(Value<Vector2> size)
```

Sets native LayoutElement preferred dimensions without imposing exact minima. This is an advanced native layout operation; ordinary fixed declarations use Size. Fill and Auto express flexible and content-derived sizing explicitly. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `size` | The typed size input (Value&lt;Vector2&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.PreferredSize(360, 48));
```

```text
public static IProperty<Component> PreferredSize(float width, float height)
```

Sets native LayoutElement preferred dimensions without imposing exact minima. This is an advanced native layout operation; ordinary fixed declarations use Size. Fill and Auto express flexible and content-derived sizing explicitly. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `width` | Finite non-negative exact width in canvas units. |
| `height` | Finite non-negative exact height in canvas units. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.PreferredSize(360, 48));
```

```text
public static IProperty<Component> PreferredSize(Func<Vector2> size)
```

Sets native LayoutElement preferred dimensions without imposing exact minima. This is an advanced native layout operation; ordinary fixed declarations use Size. Fill and Auto express flexible and content-derived sizing explicitly. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `size` | The typed size input (Func&lt;Vector2&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.PreferredSize(360, 48));
```

## `UI.Position`

```text
public static IProperty<Component> Position(Value<Vector2> position)
```

Binds RectTransform.anchoredPosition. A parent layout group can drive positions; use a plain frame for freely positioned children. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `position` | Typed immediate position or reactive native position, as specified by this overload. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Image(UI.Position(20, 30));
```

```text
public static IProperty<Component> Position(float x, float y)
```

Binds RectTransform.anchoredPosition. A parent layout group can drive positions; use a plain frame for freely positioned children. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `x` | The typed x input (float); literals and supported reactive adapters follow this overload's documented behavior. |
| `y` | The typed y input (float); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Image(UI.Position(20, 30));
```

```text
public static IProperty<Component> Position(Func<Vector2> position)
```

Binds RectTransform.anchoredPosition. A parent layout group can drive positions; use a plain frame for freely positioned children. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `position` | Typed immediate position or reactive native position, as specified by this overload. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Image(UI.Position(20, 30));
```

## `UI.Anchors`

```text
public static IProperty<Component> Anchors(Value<Vector2> minimum, Value<Vector2> maximum)
```

Binds normalized minimum and maximum anchors. Size fixes its configured axes; Stretch/Fill and custom anchors explicitly control parent-relative geometry. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `minimum` | Reactive finite lower bound; negative values are supported. |
| `maximum` | Reactive finite upper bound, at least the lower bound. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Anchors(UnityEngine.Vector2.zero, UnityEngine.Vector2.one));
```

## `UI.Pivot`

```text
public static IProperty<Component> Pivot(Value<Vector2> pivot)
```

Binds the normalized native RectTransform pivot. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `pivot` | The typed pivot input (Value&lt;Vector2&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Pivot(new UnityEngine.Vector2(0, 1)));
```

```text
public static IProperty<Component> Pivot(Func<Vector2> pivot)
```

Binds the normalized native RectTransform pivot. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `pivot` | The typed pivot input (Func&lt;Vector2&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Pivot(new UnityEngine.Vector2(0, 1)));
```

## `UI.Stretch`

```text
public static IProperty<Component> Stretch()
```

Sets anchors to zero/one and offsets to zero once. Parent-relative dimensions follow the parent rect.

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Stretch());
```

## `UI.Clip`

```text
public static IProperty<Component> Clip(Value<bool> enabled)
```

Adds or reuses RectMask2D and binds its enabled state. Clipping is opt-in; the ordinary frame keeps overflow visible. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `enabled` | The typed enabled input (Value&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Clip(true));
```

```text
public static IProperty<Component> Clip(Func<bool> enabled)
```

Adds or reuses RectMask2D and binds its enabled state. Clipping is opt-in; the ordinary frame keeps overflow visible. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `enabled` | The typed enabled input (Func&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Clip(true));
```

## `UI.Padding`

```text
public static IProperty<RectTransform> Padding(Value<RectOffset> padding)
```

Binds native horizontal/vertical layout padding on a frame. It uses an existing compatible layout group, or adds a vertical group when absent. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `padding` | The typed padding input (Value&lt;RectOffset&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Column(UI.Padding(new UnityEngine.RectOffset(12, 12, 8, 8)));
```

```text
public static IProperty<RectTransform> Padding(Func<RectOffset> padding)
```

Binds native horizontal/vertical layout padding on a frame. It uses an existing compatible layout group, or adds a vertical group when absent. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `padding` | The typed padding input (Func&lt;RectOffset&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Column(UI.Padding(new UnityEngine.RectOffset(12, 12, 8, 8)));
```

## `UI.Vertical`

```text
public static IProperty<RectTransform> Vertical()
```

Adds or reuses a vertical native layout group with controlled child sizing and explicit flexible expansion. Spacing is reactive; no-argument spacing is eight units. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Column(UI.Vertical(12));
```

```text
public static IProperty<RectTransform> Vertical(Value<float> spacing)
```

Adds or reuses a vertical native layout group with controlled child sizing and explicit flexible expansion. Spacing is reactive; no-argument spacing is eight units. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `spacing` | The typed spacing input (Value&lt;float&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Column(UI.Vertical(12));
```

```text
public static IProperty<RectTransform> Vertical(Func<float> spacing)
```

Adds or reuses a vertical native layout group with controlled child sizing and explicit flexible expansion. Spacing is reactive; no-argument spacing is eight units. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `spacing` | The typed spacing input (Func&lt;float&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Column(UI.Vertical(12));
```

## `UI.Horizontal`

```text
public static IProperty<RectTransform> Horizontal()
```

Adds or reuses a horizontal native layout group with controlled child sizing and explicit flexible expansion. Spacing is reactive; no-argument spacing is eight units. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Row(UI.Horizontal(12));
```

```text
public static IProperty<RectTransform> Horizontal(Value<float> spacing)
```

Adds or reuses a horizontal native layout group with controlled child sizing and explicit flexible expansion. Spacing is reactive; no-argument spacing is eight units. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `spacing` | The typed spacing input (Value&lt;float&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Row(UI.Horizontal(12));
```

```text
public static IProperty<RectTransform> Horizontal(Func<float> spacing)
```

Adds or reuses a horizontal native layout group with controlled child sizing and explicit flexible expansion. Spacing is reactive; no-argument spacing is eight units. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `spacing` | The typed spacing input (Func&lt;float&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Row(UI.Horizontal(12));
```

## `UI.Grid`

```text
public static GridLayoutGroup Grid(Value<Vector2> cellSize, Value<int> columns, params IProperty<GridLayoutGroup>[] properties)
```

Creates an owned native uniform GridLayoutGroup with reactive shared cell dimensions and column count. The native result allows grid-specific properties to reject plain frames at compilation. Columns must be positive, and conflicting exact child sizes report an error.

| Parameter | Meaning |
| --- | --- |
| `cellSize` | Reactive non-negative finite shared grid cell dimensions. |
| `columns` | Reactive positive native grid column count. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Grid(
    new UnityEngine.Vector2(48, 48),
    4,
    UI.Children(UI.Image(), UI.Image())
);
```

## `UI.CellSize`

```text
public static IProperty<GridLayoutGroup> CellSize(Value<Vector2> size)
```

Binds uniform grid dimensions shared by every cell. Dimensions must be finite and non-negative; children with a contradictory exact Size are rejected rather than silently overridden. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `size` | The typed size input (Value&lt;Vector2&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Grid(new UnityEngine.Vector2(48, 48), 4, UI.CellSize(cellSize));
```

```text
public static IProperty<GridLayoutGroup> CellSize(Func<Vector2> size)
```

Binds uniform grid dimensions shared by every cell. Dimensions must be finite and non-negative; children with a contradictory exact Size are rejected rather than silently overridden. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `size` | The typed size input (Func&lt;Vector2&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Grid(new UnityEngine.Vector2(48, 48), 4, UI.CellSize(cellSize));
```

## `UI.GridSpacing`

```text
public static IProperty<GridLayoutGroup> GridSpacing(Value<Vector2> spacing)
```

Binds horizontal and vertical native grid spacing. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `spacing` | The typed spacing input (Value&lt;Vector2&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Grid(
    new UnityEngine.Vector2(48, 48),
    4,
    UI.GridSpacing(new UnityEngine.Vector2(4, 4))
);
```

```text
public static IProperty<GridLayoutGroup> GridSpacing(Func<Vector2> spacing)
```

Binds horizontal and vertical native grid spacing. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `spacing` | The typed spacing input (Func&lt;Vector2&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Grid(
    new UnityEngine.Vector2(48, 48),
    4,
    UI.GridSpacing(new UnityEngine.Vector2(4, 4))
);
```

## `UI.GridPadding`

```text
public static IProperty<GridLayoutGroup> GridPadding(Value<RectOffset> padding)
```

Binds native uniform-grid padding. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `padding` | The typed padding input (Value&lt;RectOffset&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Grid(
    new UnityEngine.Vector2(48, 48),
    4,
    UI.GridPadding(new UnityEngine.RectOffset(8, 8, 8, 8))
);
```

## `UI.SafeArea`

```text
public static IProperty<Component> SafeArea(Value<bool> enabled)
```

Adds or reuses an allocation-free native safe-area follower, with reactive enablement. It refreshes anchors when the screen dimensions or safe area change; mount defaults apply this to non-world canvases. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `enabled` | The typed enabled input (Value&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.SafeArea(true), UI.Children(UI.Label("Safe")));
```

```text
public static IProperty<Component> SafeArea(Func<bool> enabled)
```

Adds or reuses an allocation-free native safe-area follower, with reactive enablement. It refreshes anchors when the screen dimensions or safe area change; mount defaults apply this to non-world canvases. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `enabled` | The typed enabled input (Func&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.SafeArea(true), UI.Children(UI.Label("Safe")));
```

