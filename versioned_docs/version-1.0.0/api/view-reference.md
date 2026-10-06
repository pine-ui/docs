---
title: Pine views and composition API
sidebar_label: Views and composition
description: Complete typed reference with overloads, parameters, ownership and examples for Pine views and composition.
---

# Views and composition

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `View`

```text
View
```

A deferred native UI declaration.

## `View.With`

```text
public View With(params View[] entries)
```

Returns a declaration with the supplied entries appended in order.

```text
public View With(Func<IEnumerable<View>> children)
```

Appends tracked children.

## `P.Self`

```text
public static View Self(View view)
```

Places a visual declaration's component on its containing GameObject.

## `P.Declare`

```text
public static View Declare<T>(Action<T> configure = null, Action<T> reference = null,             bool modifier = false, Value<bool>? active = null) where T : Component
```

Declares a custom native component using the same ownership and composition rules as built-in factories.

## `P.Mount`

```text
public static Mount Mount(Func<View> component, Transform parent = null, CanvasOptions options = null)
```

Builds and mounts a deferred view once.

```text
public static Mount Mount(View view, Transform parent = null, CanvasOptions options = null)
```

Builds and mounts an existing reusable declaration once.

## `P.Vertical`

```text
public static View Vertical(View first, params View[] rest)
```

Composes vertical children without a settings block.

## `P.Horizontal`

```text
public static View Horizontal(View first, params View[] rest)
```

Composes horizontal children without a settings block.
