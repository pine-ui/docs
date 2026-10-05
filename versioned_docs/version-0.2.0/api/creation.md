---
title: Native Unity UI declarations and lifetime
sidebar_label: Creation
description: Build and bind retained native Unity UI through typed factories, nested components, groups and whole-tree mount ownership.
---

# Native Unity UI declarations and lifetime

Call `UI.Mount(App.Create)` once at startup for the complete interface. Nested component functions inherit the active scope and return native components without separate mounts. The returned `Mount` is optional for early disposal. Scene unload or mounted-root destruction ends its scope; disabling the starting script keeps the tree mounted. See [component composition](../tutorials/components.md).

```csharp
using Pine;
using UnityEngine;

var size = UI.Source(new Vector2(360, 180));
Mount mount = UI.Mount(() =>
{
    var frame = UI.Frame(UI.Name("Panel"));
    var label = UI.Label("Hello", UI.Size(360, 48));
    return UI.Apply(frame, UI.Size(size), UI.Vertical(), UI.Children(label));
});

size.Value = new Vector2(480, 240);
mount.Scope.Run(() =>
    UI.Apply(mount.Root.GetComponent<RectTransform>(), UI.Name("Updated"))
);
mount.Dispose();
```

The builder runs once. Sources update individual bindings on retained components. `Mount.Scope`, `.Root` and `.Canvas` expose its ownership scope and native results. Dispose is idempotent; destroying Root also disposes the scope. Native destruction is deferred in Play Mode and immediate in Edit Mode.

## Typed creation and composition

| API | Ownership and target |
| --- | --- |
| `Create<T>(IProperty<T>[])` | Own a new GameObject, RectTransform and native component T. |
| `Clone<T>(template, IProperty<T>[])` | Own a serialized native clone; declare new bindings explicitly. |
| `Apply<T>(target, IProperty<T>[])` | Bind an existing compatible component; external objects remain externally owned. |
| `Group<T>(IProperty<T>[])` | Reusable target-typed declarations. |
| `Column(gap, children...)`, `Row(gap, children...)` | Fixed-spacing native containers with ordered child components. |
| `Children(...)` | Explicit fixed/reactive child membership and order. |
| `Configure<T>(callback)` | One-time typed native assignment. |
| `Set<T,TValue>(name, setter, value/getter)` | Named typed literal/reactive property assignment. |
| `Bind(getter, setter)` | Owned reactive binding on a saved native result. |
| `On<T>`, `On<T,TValue>` | Owned native events with captured scope/context. |
| `Changed<T,TValue>` | Initial/distinct native value observation via event or shared-clock polling. |

`IProperty<T>` is contravariant: a text-base group can configure TextMeshProUGUI, while a text operation cannot configure a frame. `Tint` has a shared Graphic/Selectable contract. Custom widgets are ordinary functions returning native components, and custom operations implement IProperty or use Set. See [typed composition](../tutorials/components.md).

## Sizing

`Size`, `Width` and `Height` request exact native rect/layout dimensions. `Fill`, `FillWidth`, `FillHeight` consume available space; `Auto`, `AutoWidth`, `AutoHeight` use native content preference. Rows/columns preserve exact sizes even when a parent is narrower. Overflow stays visible until `Clip(true)` or `ScrollView` requests clipping. Grid owns uniform reactive `CellSize` and rejects contradictory exact child sizes.

`PreferredSize` remains an advanced native LayoutElement preference. Use `Size` for ordinary exact declarations. `Position`, `Anchors`, `Pivot` and `Stretch` configure native geometry; parent layout groups still drive child positions.

## Rendering and accessibility

```csharp
UI.Mount(
    () => UI.Label("Camera UI"),
    options: new CanvasOptions
    {
        RenderMode = RenderMode.ScreenSpaceCamera,
        Camera = camera,
        ReferenceResolution = new Vector2(1280, 720),
        Scale = 1.25f,
        SafeArea = true,
    }
);
```

World-space uses RenderMode.WorldSpace with Camera, WorldPosition, WorldRotation, WorldSize and Scale in code. Overlay is the default. Explicit parents retain their native canvas settings.

`Navigation`, `Focus` and `Enabled` configure native focus and interaction. Safe-area followers refresh screen anchors when screen/safe-area dimensions change. `ReducedMotion` controls springs and native fades. [Standard controls](controls.md) supply native input wiring, including text fields and dropdown templates.

Browse every overload, parameter and example in the [native declaration reference](native-reference.md), [layout reference](layout-reference.md) and [mount reference](mount-reference.md).
