---
title: Pine mounts and canvas options API
sidebar_label: Mounts and canvas options
description: Complete typed reference with overloads, parameters, ownership and examples for Pine mounts and canvas options.
---

# Mounts and canvas options

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `CanvasOptions`

```text
CanvasOptions
```

Typed reactive configuration for a Pine-owned canvas.

## `CanvasOptions.Persistent`

```text
bool Persistent
```

Whether a Pine-owned canvas survives scene changes.

## `CanvasOptions.Name`

```text
Value<string> Name
```

Reactive name for a Pine-owned canvas; defaults to Canvas.

## `CanvasOptions.ReferenceResolution`

```text
Value<Vector2> ReferenceResolution
```

Reactive positive reference resolution for native canvas scaling; defaults to 1920 by 1080 with a 0.5 width/height match.

## `CanvasOptions.SortOrder`

```text
Value<int> SortOrder
```

Reactive native Canvas sorting order; defaults to 100.

## `CanvasOptions.RenderMode`

```text
Value<RenderMode> RenderMode
```

Reactive rendering mode: overlay by default, camera or world-space when explicitly selected.

## `CanvasOptions.Camera`

```text
Value<Camera> Camera
```

Reactive native camera reference.

## `CanvasOptions.Scale`

```text
Value<float> Scale
```

Reactive positive UI scale multiplier; it adjusts reference scaling for screen canvases and local transform scale for world canvases.

## `CanvasOptions.SafeArea`

```text
Value<bool> SafeArea
```

Reactive opt-in safe-area handling for the Pine-owned screen-space surface.

## `CanvasOptions.WorldPosition`

```text
Value<Vector3> WorldPosition
```

Reactive world canvas position, applied in WorldSpace mode.

## `CanvasOptions.WorldRotation`

```text
Value<Quaternion> WorldRotation
```

Reactive world canvas rotation, applied in WorldSpace mode.

## `CanvasOptions.WorldSize`

```text
Value<Vector2> WorldSize
```

Reactive finite non-negative world canvas dimensions before its scale multiplier.

## `P.DefaultFont`

```text
TMP_FontAsset DefaultFont
```

Configures Pine's code-supplied default TMP font for subsequent text construction.

## `P.Mount`

```text
public static Mount Mount(
    Func<Component> component,
    Transform parent = null,
    CanvasOptions options = null
)
```

An explicit mounted interface lifetime.

```text
public static Mount Mount(
    Func<GameObject> component,
    Transform parent = null,
    CanvasOptions options = null
)
```

An explicit mounted interface lifetime.

## `UnitySpringSpaces`

```text
UnitySpringSpaces
```

Built-in spring mappings for Unity vectors, colors, rectangles, quaternions and poses.

## `UnitySpringSpaces.Vector2`

```text
SpringSpace<Vector2> Vector2
```

Built-in fixed-lane mapping for Vector2.

## `UnitySpringSpaces.Vector3`

```text
SpringSpace<Vector3> Vector3
```

Built-in fixed-lane mapping for Vector3.

## `UnitySpringSpaces.Vector4`

```text
SpringSpace<Vector4> Vector4
```

Built-in fixed-lane mapping for Vector4.

## `UnitySpringSpaces.Color`

```text
SpringSpace<Color> Color
```

Built-in fixed-lane mapping for Color.

## `UnitySpringSpaces.Rect`

```text
SpringSpace<Rect> Rect
```

Built-in fixed-lane mapping for Rect.

## `UnitySpringSpaces.Quaternion`

```text
SpringSpace<Quaternion> Quaternion
```

Built-in fixed-lane mapping for Quaternion.

## `UnitySpringSpaces.Pose`

```text
SpringSpace<Pose> Pose
```

Built-in fixed-lane mapping for Pose.
