---
title: "Pine native parts and relationships API (Pine 1.2.0)"
sidebar_label: Native parts and relationships
description: "Complete typed reference with overloads, parameters, ownership and examples for Pine native parts and relationships. Pine 1.2.0 documentation."
---

# Native parts and relationships

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `Part`

```text
Part<T>
```

A declared native part, supplied target, or tracked native relationship.

## `Part.implicit`

```text
public static implicit operator Part<T>(View view)
```

Declares and owns a custom part inside the control.

```text
public static implicit operator Part<T>(T target)
```

Uses an externally owned native target.

```text
public static implicit operator Part<T>(Value<T> value)
```

Uses a tracked native target.

```text
public static implicit operator Part<T>(Ref<T> reference)
```

Uses a lifetime-aware typed reference.

```text
public static implicit operator Part<T>(Source<T> source)
```

Uses explicit mutable native state as a relationship.

```text
public static implicit operator Part<T>(ReadOnly<T> source)
```

Uses a retained read-only native target.

```text
public static implicit operator Part<T>(Derived<T> source)
```

Uses a derived native target.
