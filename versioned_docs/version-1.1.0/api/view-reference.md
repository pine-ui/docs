---
title: "Pine views and composition API (Pine 1.1.0)"
sidebar_label: Views and composition
description: "Complete typed reference with overloads, parameters, ownership and examples for Pine views and composition. Pine 1.1.0 documentation."
---

# Views and composition

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `View`

```text
View
```

A deferred native UI declaration.

## `P.Self`

```text
public static View Self(View view)
```



## `P.Declare`

```text
public static View Declare<T>(
    Action<T> configure = null,
    Action<T> reference = null,
    bool modifier = false,
    Value<bool>? active = null,
    View[] children = null,
    View[] components = null
)
    where T : Component
```



```text
public static View Declare<T>(
    Func<IEnumerable<View>> children,
    Action<T> configure = null,
    Action<T> reference = null,
    Value<bool>? active = null,
    View[] components = null
)
    where T : Component
```



## `P.Mount`

```text
public static Mount Mount(
    Func<View> component,
    Transform parent = null,
    CanvasOptions options = null
)
```



```text
public static Mount Mount(View view, Transform parent = null, CanvasOptions options = null)
```
