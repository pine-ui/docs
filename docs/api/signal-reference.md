---
title: Pine typed reactive values API
sidebar_label: Typed reactive values
description: Complete typed reference with overloads, parameters, ownership and examples for Pine typed reactive values.
---

# Typed reactive values

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `Value`

```text
Value<T>
```

A typed literal-or-getter adapter for mutable UI inputs.

```text
public Value(T literal)
```

Constructs this value with the supplied typed arguments.

```text
public Value(Func<T> read)
```

Constructs this value with the supplied typed arguments.

## `Value.IsDynamic`

```text
bool IsDynamic
```

Reports whether this adapter wraps a getter.

## `Value.Read`

```text
public T Read()
```

Returns the literal or invokes its getter with normal dependency tracking.

## `Value.implicit`

```text
public static implicit operator Value<T>(T value)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter.

```text
public static implicit operator Value<T>(Func<T> getter)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter.

```text
public static implicit operator Value<T>(Source<T> source)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter.

```text
public static implicit operator Value<T>(ReadOnly<T> source)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter.

```text
public static implicit operator Value<T>(Derived<T> source)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter.

```text
public static implicit operator Value<T>(Spring<T> source)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter.

## `ReadOnly`

```text
ReadOnly<T>
```

A framework-owned reactive value that callers can observe without replacing it.

## `ReadOnly.Value`

```text
T Value
```

Reads the framework-owned value with dependency tracking.

## `ReadOnly.Peek`

```text
public T Peek()
```

Reads the framework-owned snapshot without collecting a dependency.

## `Source`

```text
Source<T>
```

Mutable typed reactive state.

## `Source.Value`

```text
T Value
```

Reads with dependency tracking and writes with notifications under the source equality policy.

## `Source.Peek`

```text
public T Peek()
```

Returns a source snapshot without collecting a dependency.

## `Source.Set`

```text
public T Set(T value)
```

Assigns the typed source value and returns the value supplied.

## `Source.Notify`

```text
public void Notify()
```

Explicitly notifies observers after mutating a referenced value in place.

## `Derived`

```text
Derived<T>
```

An owned cached pure calculation with dynamically tracked dependencies.

## `Derived.Value`

```text
T Value
```

Returns the current cached pure result and tracks downstream reads.

## `Derived.Dispose`

```text
public void Dispose()
```

Ends this owned lifetime idempotently.
