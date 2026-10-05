---
title: Pine mounts and canvas options API
sidebar_label: Mounts and canvas options
description: Complete typed reference with overloads, parameters, ownership and examples for Pine mounts and canvas options.
---

# Mounts and canvas options

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `UI.Root(...)` unless they only create state/configuration. Explicit `UI.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `CanvasOptions`

```text
CanvasOptions
```

Typed reactive configuration for a Pine-owned canvas. Fields accept literals, sources, derived values, springs and Value-wrapped getters. Options only configure canvases created by Pine; an explicit parent retains ownership of its existing canvas. Camera and world-space rendering are selected in code.

```csharp
UI.Mount(
    () => UI.Label(text: "Overlay"),
    options: new CanvasOptions
    {
        ReferenceResolution = new UnityEngine.Vector2(x: 1280, y: 720),
        SafeArea = true,
    }
);
```

## `CanvasOptions.Persistent`

```text
bool Persistent
```

Whether a Pine-owned canvas survives scene changes. Defaults to true and is read once when mounting. Set false for scene-lived UI. Persistence never takes ownership of an external parent or canvas; explicitly requesting it with an external parent is rejected.

```csharp
var options = new CanvasOptions { Persistent = false };
```

## `CanvasOptions.Name`

```text
Value<string> Name
```

Reactive name for a Pine-owned canvas; defaults to Canvas.

```csharp
var options = new CanvasOptions { Name = "HUD" };
```

## `CanvasOptions.ReferenceResolution`

```text
Value<Vector2> ReferenceResolution
```

Reactive positive reference resolution for native canvas scaling; defaults to 1920 by 1080 with a 0.5 width/height match.

```csharp
var options = new CanvasOptions
{
    ReferenceResolution = new UnityEngine.Vector2(x: 1280, y: 720),
};
```

## `CanvasOptions.SortOrder`

```text
Value<int> SortOrder
```

Reactive native Canvas sorting order; defaults to 100.

```csharp
var options = new CanvasOptions { SortOrder = 200 };
```

## `CanvasOptions.RenderMode`

```text
Value<RenderMode> RenderMode
```

Reactive rendering mode: overlay by default, camera or world-space when explicitly selected.

```csharp
var options = new CanvasOptions
{
    RenderMode = UnityEngine.RenderMode.ScreenSpaceOverlay,
};
```

## `CanvasOptions.Camera`

```text
Value<Camera> Camera
```

Reactive native camera reference. Camera-space mounts require an explicit live camera; world-space input can also use this reference.

```csharp
var options = new CanvasOptions { Camera = camera };
```

## `CanvasOptions.Scale`

```text
Value<float> Scale
```

Reactive positive UI scale multiplier; it adjusts reference scaling for screen canvases and local transform scale for world canvases. Defaults to one.

```csharp
var options = new CanvasOptions { Scale = 1.25f };
```

## `CanvasOptions.SafeArea`

```text
Value<bool> SafeArea
```

Reactive opt-in safe-area handling for the Pine-owned screen-space surface. Defaults to true; world-space canvases bypass screen safe areas.

```csharp
var options = new CanvasOptions { SafeArea = true };
```

## `CanvasOptions.WorldPosition`

```text
Value<Vector3> WorldPosition
```

Reactive world canvas position, applied in WorldSpace mode. Defaults to world zero.

```csharp
var options = new CanvasOptions
{
    WorldPosition = new UnityEngine.Vector3(x: 0, y: 1, z: 2),
};
```

## `CanvasOptions.WorldRotation`

```text
Value<Quaternion> WorldRotation
```

Reactive world canvas rotation, applied in WorldSpace mode. Defaults to identity.

```csharp
var options = new CanvasOptions
{
    WorldRotation = UnityEngine.Quaternion.identity,
};
```

## `CanvasOptions.WorldSize`

```text
Value<Vector2> WorldSize
```

Reactive finite non-negative world canvas dimensions before its scale multiplier. Defaults to 800 by 600.

```csharp
var options = new CanvasOptions
{
    WorldSize = new UnityEngine.Vector2(x: 200, y: 100),
};
```

## `UI.DefaultFont`

```text
TMP_FontAsset DefaultFont
```

Configures Pine's code-supplied default TMP font for subsequent text construction. Null reuses the project-owned copy of the bundled Latin fallback, then the package fallback, then the project TMP default if both are unavailable. Existing created labels retain their font unless a reactive Font property is bound.

```csharp
UI.DefaultFont = localizedFont;
```

## `UI.Mount`

```text
public static Mount Mount(Func<Component> component, Transform parent = null, CanvasOptions options = null)
```

An explicit mounted interface lifetime. Scope owns bindings and created native objects; Root identifies the returned interface and Canvas identifies its containing canvas. Dispose removes the interface; destroying Root also disposes its scope. App.Mount returns the whole tree once at startup; generated startup calls this method automatically. Pine-owned canvases persist across scenes by default. CanvasOptions.Persistent=false opts into scene lifetime. Destroying the root or disposing the result ends its scope; disabling a caller does not rebuild UI.

| Parameter | Meaning |
| --- | --- |
| `component` | Builder returning the live native root in the mount scope. |
| `parent` | Optional external native parent; null creates a Pine-owned canvas. |
| `options` | Code-configured typed reactive canvas options, used only for Pine-owned canvases. |

**Returns:** The mounted tree’s scope, native root and containing canvas. Keep this optional result only for explicit early disposal. Persistence is configured with CanvasOptions.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
Mount mount = UI.Mount(component: () => UI.Label(text: "Hello"));
mount.Dispose();
```

```text
public static Mount Mount(Func<GameObject> component, Transform parent = null, CanvasOptions options = null)
```

An explicit mounted interface lifetime. Scope owns bindings and created native objects; Root identifies the returned interface and Canvas identifies its containing canvas. Dispose removes the interface; destroying Root also disposes its scope. App.Mount returns the whole tree once at startup; generated startup calls this method automatically. Pine-owned canvases persist across scenes by default. CanvasOptions.Persistent=false opts into scene lifetime. Destroying the root or disposing the result ends its scope; disabling a caller does not rebuild UI.

| Parameter | Meaning |
| --- | --- |
| `component` | Builder returning the live native root in the mount scope. |
| `parent` | Optional external native parent; null creates a Pine-owned canvas. |
| `options` | Code-configured typed reactive canvas options, used only for Pine-owned canvases. |

**Returns:** The mounted tree’s scope, native root and containing canvas. Keep this optional result only for explicit early disposal. Persistence is configured with CanvasOptions.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
Mount mount = UI.Mount(component: () => UI.Label(text: "Hello"));
mount.Dispose();
```

## `UnitySpringSpaces`

```text
UnitySpringSpaces
```

Built-in spring mappings for Unity vectors, colors, rectangles, quaternions and poses. Colors are clamped on unpack; quaternions are normalized and packed into a consistent hemisphere. UI.Spring automatically selects these mappings for their supported types.

```csharp
UI.Spring(() => UnityEngine.Vector3.one, space: UnitySpringSpaces.Vector3);
```

## `UnitySpringSpaces.Vector2`

```text
SpringSpace<Vector2> Vector2
```

Built-in fixed-lane mapping for Vector2. Use the matching space when declaring a spring; Unity mappings normalize rotations and clamp color output as documented.

```csharp
UI.Spring(() => target.Value, space: UnitySpringSpaces.Vector2);
```

## `UnitySpringSpaces.Vector3`

```text
SpringSpace<Vector3> Vector3
```

Built-in fixed-lane mapping for Vector3. Use the matching space when declaring a spring; Unity mappings normalize rotations and clamp color output as documented.

```csharp
UI.Spring(() => target.Value, space: UnitySpringSpaces.Vector3);
```

## `UnitySpringSpaces.Vector4`

```text
SpringSpace<Vector4> Vector4
```

Built-in fixed-lane mapping for Vector4. Use the matching space when declaring a spring; Unity mappings normalize rotations and clamp color output as documented.

```csharp
UI.Spring(() => target.Value, space: UnitySpringSpaces.Vector4);
```

## `UnitySpringSpaces.Color`

```text
SpringSpace<Color> Color
```

Built-in fixed-lane mapping for Color. Use the matching space when declaring a spring; Unity mappings normalize rotations and clamp color output as documented.

```csharp
UI.Spring(() => target.Value, space: UnitySpringSpaces.Color);
```

## `UnitySpringSpaces.Rect`

```text
SpringSpace<Rect> Rect
```

Built-in fixed-lane mapping for Rect. Use the matching space when declaring a spring; Unity mappings normalize rotations and clamp color output as documented.

```csharp
UI.Spring(() => target.Value, space: UnitySpringSpaces.Rect);
```

## `UnitySpringSpaces.Quaternion`

```text
SpringSpace<Quaternion> Quaternion
```

Built-in fixed-lane mapping for Quaternion. Use the matching space when declaring a spring; Unity mappings normalize rotations and clamp color output as documented.

```csharp
UI.Spring(() => target.Value, space: UnitySpringSpaces.Quaternion);
```

## `UnitySpringSpaces.Pose`

```text
SpringSpace<Pose> Pose
```

Built-in fixed-lane mapping for Pose. Use the matching space when declaring a spring; Unity mappings normalize rotations and clamp color output as documented.

```csharp
UI.Spring(() => target.Value, space: UnitySpringSpaces.Pose);
```
