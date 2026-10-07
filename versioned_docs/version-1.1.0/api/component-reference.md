---
title: "Pine unity behaviour composition API (Pine 1.1.0)"
sidebar_label: Unity behaviour composition
description: "Reference Pine MonoBehaviour composition with P.Component. Check generic signatures, renderer ownership and native component integration. Pine 1.1.0 documentation."
---

# Unity behaviour composition

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `P.Component`

```text
public static View Component<TBehaviour>(Func<TBehaviour, View> render, View[] children = null)
    where TBehaviour : MonoBehaviour
```

Declares an owned Unity behaviour and its deferred UI.

```text
public static TView Component<TBehaviour, TView>(Func<TBehaviour, TView> render)
    where TBehaviour : MonoBehaviour
    where TView : Component
```

Creates an owned Unity behaviour and renders its native UI in a child reactive scope.
