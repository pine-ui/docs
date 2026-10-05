---
title: Pine unity behaviour composition API
sidebar_label: Unity behaviour composition
description: Complete typed reference with overloads, parameters, ownership and examples for Pine unity behaviour composition.
---

# Unity behaviour composition

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `UI.Root(...)` unless they only create state/configuration. Explicit `UI.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `UI.Component`

```text
public static TView Component<TBehaviour, TView>(Func<TBehaviour, TView> render)
```

Creates an owned Unity behaviour and renders its native UI in a child reactive scope. Generated Components factories call this helper automatically. The behaviour is a layout-ignored child of the returned UI, so disabling or destroying that UI also affects the behaviour. Render initializes the instance before Unity invokes Awake and OnEnable. The renderer executes once; bindings update retained native objects.

| Type parameter | Meaning |
| --- | --- |
| `TBehaviour` | A concrete, non-generic MonoBehaviour used by this component. |
| `TView` | The native component returned by the renderer. |

| Parameter | Meaning |
| --- | --- |
| `render` | Typed instance renderer, called once inside its owned scope. |

**Returns:** The renderer's native UI root, ready to compose with other components.

**Ownership:** Usually call the generated Components factory instead. This helper requires a live construction scope. It cleans up both the behaviour and all rendered bindings when the view or enclosing scope ends.

```csharp
// A generated factory has this shape; ordinary application code calls Components.Counter().
var view = UI.Component<Counter, UnityEngine.RectTransform>(render: counter =>
    counter.Create()
);
```
