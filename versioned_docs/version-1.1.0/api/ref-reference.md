---
title: "Pine typed native references API (Pine 1.1.0)"
sidebar_label: Typed native references
description: "Complete typed reference with overloads, parameters, ownership and examples for Pine typed native references. Pine 1.1.0 documentation."
---

# Typed native references

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `Ref`

```text
Ref<T>
```

A reactive, single-target native reference cleared by its owner's lifetime.

## `Ref.Value`

```text
T Value
```

Reads the current target and tracks its replacement or removal.

## `Ref.implicit`

```text
public static implicit operator Action<T>(Ref<T> reference)
```

Captures this reference through a native factory's reference argument.

```text
public static implicit operator Value<T>(Ref<T> reference)
```

Uses this reference as a tracked native property value.

## `P.Ref`

```text
public static Ref<T> Ref<T>()
    where T : UnityEngine.Object
```

Creates a typed native reference for forward, cyclic and conditional links.
