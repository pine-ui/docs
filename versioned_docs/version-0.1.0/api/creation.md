---
title: Unity UI creation and bindings API
sidebar_label: Creation
description: Reference for Pine Mount, native component builders, reactive properties, events, and two-way Unity control bindings.
---

# Unity UI creation and bindings API

## Mounts and native components

| API | Behavior |
| --- | --- |
| `Mount(Func<Component>, parent = null, options = null)` | Build and mount a scoped component. Returns `MountHandle`. |
| `Mount(Func<GameObject>, parent = null, options = null)` | Build and mount a GameObject result. |
| `Create<T>(params Property[])` | Own a new GameObject, RectTransform and native component `T`. |
| `Clone<T>(template, params Property[])` | Own a clone retaining the template's settings and apply properties. |
| `Apply<T>(target, params Property[])` | Bind an existing component without owning/destroying it. |
| `Group(params Property[])` | Compose reusable property groups. |
| `Configure<T>(Action<T>)` | Configure the required native component once. |
| `Action<T>(Action<T>, priority = 1)` | Run an ordered action against the required native component. |
| `Set<T,TValue>(name, setter, Value<TValue>)` / getter overload | Bind a typed literal or reactive value to the required native component. |

`Property` is the common property type. Each operation addresses a native component on the target GameObject. Use text operations on `TextMeshProUGUI`, layout operations on its `RectTransform`, and control operations on the corresponding native control.

`MountHandle` exposes `Scope`, `Root` and `Canvas`; `Dispose()` disposes its scope. Destroying the mounted root also disposes that scope. Unity object destruction is deferred in Play Mode and immediate in Edit Mode.

Every mount ensures the shared runtime/input host, including mounts supplied with a parent. A parentless mount owns an overlay Canvas, CanvasScaler and GraphicRaycaster. `CanvasOptions` has `Name = "Canvas"`, `ReferenceResolution = (1920,1080)` and `SortOrder = 100`; the scaler matches width/height at `0.5`. With a parent, Pine uses its nearest ancestor Canvas. Pass a native Canvas parent to mount within an existing overlay, camera or world-space hierarchy.

Pine reuses an existing EventSystem or creates one with `InputSystemUIInputModule`. Enable the Input System backend in your project settings. The shared host/input objects remain for the runtime session.

## Composition and helpers

| Helper | Native behavior |
| --- | --- |
| `Frame(properties...)` | Create a RectTransform. |
| `Column(properties...)` / `Row(properties...)` | Frame with vertical/horizontal layout. |
| `Label(text, properties...)` | Create TextMeshProUGUI; text accepts `Value<string>` or a getter. |
| `Image(properties...)` | Create a native uGUI Image. |
| `Button(text, click, properties...)` | Create a Button and centered, stretched TMP label; text accepts a value or getter. |
| `Name(string)` | Set a fixed GameObject name. |
| `Active(value)` / `Parent(value)` | Bind GameObject activity / Transform parent. |
| `Text(value)` / `FontSize(value)` | Bind TMP text / font size. |
| `Tint(value)` | Bind a Graphic's color. |
| `Size(value)` / `Position(value)` | Bind RectTransform sizeDelta / anchoredPosition. |
| `Enabled(value)` | Bind a Selectable's interactable property. |
| `Opacity(value)` | Add/reuse a CanvasGroup and bind clamped alpha. |
| `Stretch()` | Set anchors to zero/one and offsets to zero once. |
| `Vertical(spacing = 8)` / `Horizontal(spacing = 8)` | Add/reuse the corresponding native LayoutGroup. |
| `PreferredSize(value)` | Add/reuse LayoutElement and bind preferred width/height. |

All value helpers above except `Name` accept their typed `Value<T>` and direct getter lambdas. `Size(width,height)`, `Position(x,y)` and `PreferredSize(width,height)` also accept numeric pairs. `Stretch`, layout spacing and names are fixed configuration inputs today.

A returned `Component` converts implicitly to a child `Property`, allowing `UI.Column(UI.Label("Hello"), UI.Button("OK", callback))`.

`Children(params Component[])` attaches fixed children once. Reactive overloads accept `Func<IEnumerable<Component>>` or `Func<IEnumerable<GameObject>>`, reconcile membership/order and avoid unchanged parent/sibling writes. Null children are ignored; Strict mode rejects repeated child transforms. Removed children detach; their creation scope determines destruction. Applying to external objects does not transfer ownership.

## Events and bindings

`OnClick`, `On<T>` and `On<T,TValue>` subscribe native UnityEvents and unregister on cleanup. Later callbacks run untracked inside a batch.

`Changed<T,TValue>(read, callback, events = null, comparer = null)` invokes the initial callback, then suppresses equal updates. With an event, it observes event values. Without one, only that explicitly observed property is polled on the shared clock.

`ToggleValue(Source<bool>)`, `SliderValue(Source<float>)` and `InputValue(Source<string>)` bind Toggle, Slider and TMP_InputField in both directions with notification-free setters. Apply these bindings to native controls configured with their child graphics, handles and text viewports. `component.Bind(read, apply)` creates a scoped getter binding and returns the component.

## Ordering and defaults

Actions run first in ascending priority; ordinary properties follow; parenting/children operations run last. Deferred groups follow their outer group's properties within these phases; inline groups retain their position. Strict detects duplicate named properties within each group. Multiple independently applied reactive bindings to one property remain independent observers.

Creation defaults set RectTransform size to `(160,40)`, TMP font from `TMP_Settings.defaultFontAsset`, font size `24`, white text and non-raycast text. Buttons get a green Image target graphic. Standalone Images are decorative by default (`raycastTarget = false`). Configure TMP settings and its default font before text creation. Disable `Defaults` to supply your own creation setup. Defaults run before creation properties.
