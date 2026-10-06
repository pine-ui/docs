---
title: Pine dynamic branches and lists API
sidebar_label: Dynamic branches and lists
description: Complete typed reference with overloads, parameters, ownership and examples for Pine dynamic branches and lists.
---

# Dynamic branches and lists

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `Branch`

```text
Branch<T>
```

A constructed dynamic result and its optional exit retention delay in seconds.

## `Branch.Value`

```text
T Value
```

The native or custom result retained by this branch's scope.

## `Branch.ExitDelay`

```text
double ExitDelay
```

Finite non-negative seconds to retain an exiting branch after its presence becomes false.

## `Branch.Branch`

```text
public Branch(T value, double exitDelay = 0)
```

Constructs this value with the supplied typed arguments.

## `Branch.implicit`

```text
public static implicit operator Branch<T>(T value)
```

Converts a constructed result into a branch with zero exit delay.

## `P.Show`

```text
public static ReadOnly<IReadOnlyList<TResult>> Show<TResult>(
    Func<bool> condition,
    Func<TResult> build,
    Func<TResult> fallback = null
)
```

Constructs an owned conditional branch while its condition is true, with an optional fallback.

## `P.Switch`

```text
public static ReadOnly<IReadOnlyList<TResult>> Switch<TKey, TResult>(
    Func<TKey> select,
    Func<TKey, TResult> build,
    IEqualityComparer<TKey> comparer = null
)
```

Retains the selected keyed branch and optionally its exiting predecessor.

## `P.Indexes`

```text
public static ReadOnly<IReadOnlyList<TResult>> Indexes<TValue, TResult>(
    Func<IReadOnlyList<TValue>> read,
    Func<int, ReadOnly<TValue>, TResult> build
)
```

Retains rows by index or explicit dictionary key, updating each row's read-only reactive value.

## `P.Values`

```text
public static ReadOnly<IReadOnlyList<TResult>> Values<TValue, TResult>(
    Func<IReadOnlyList<TValue>> read,
    Func<TValue, ReadOnly<int>, TResult> build,
    IEqualityComparer<TValue> comparer = null
)
```

Retains rows by value identity and exposes each current index as a read-only reactive value.

## `P.Switch`

```text
public static ReadOnly<IReadOnlyList<TResult>> Switch<TKey, TResult>(
    Func<TKey> select,
    Func<TKey, ReadOnly<bool>, Branch<TResult>> build,
    IEqualityComparer<TKey> comparer = null
)
```

Retains the selected keyed branch and optionally its exiting predecessor.

```text
public static ReadOnly<IReadOnlyList<TResult>> Switch<TKey, TResult>(
    Func<TKey> select,
    IReadOnlyDictionary<TKey, Func<ReadOnly<bool>, Branch<TResult>>> branches,
    Func<ReadOnly<bool>, Branch<TResult>> fallback = null
)
```

Retains the selected keyed branch and optionally its exiting predecessor.

## `P.Show`

```text
public static ReadOnly<IReadOnlyList<TResult>> Show<TResult>(
    Func<bool> condition,
    Func<ReadOnly<bool>, Branch<TResult>> build,
    Func<ReadOnly<bool>, Branch<TResult>> fallback = null
)
```

Constructs an owned conditional branch while its condition is true, with an optional fallback.

```text
public static ReadOnly<IReadOnlyList<TResult>> Show<T, TResult>(
    Func<T> read,
    Predicate<T> truthy,
    Func<ReadOnly<T>, ReadOnly<bool>, Branch<TResult>> build,
    Func<ReadOnly<bool>, Branch<TResult>> fallback = null
)
```

Constructs an owned conditional branch while its condition is true, with an optional fallback.

## `P.Indexes`

```text
public static ReadOnly<IReadOnlyList<TResult>> Indexes<TKey, TValue, TResult>(
    Func<IEnumerable<KeyValuePair<TKey, TValue>>> read,
    Func<TKey, ReadOnly<TValue>, ReadOnly<bool>, Branch<TResult>> build,
    IEqualityComparer<TKey> comparer = null
)
```

Retains rows by index or explicit dictionary key, updating each row's read-only reactive value.

```text
public static ReadOnly<IReadOnlyList<TResult>> Indexes<TValue, TResult>(
    Func<IReadOnlyList<TValue>> read,
    Func<int, ReadOnly<TValue>, ReadOnly<bool>, Branch<TResult>> build
)
```

Retains rows by index or explicit dictionary key, updating each row's read-only reactive value.

## `P.Values`

```text
public static ReadOnly<IReadOnlyList<TResult>> Values<TValue, TResult>(
    Func<IReadOnlyList<TValue>> read,
    Func<TValue, ReadOnly<int>, ReadOnly<bool>, Branch<TResult>> build,
    IEqualityComparer<TValue> comparer = null
)
```

Retains rows by value identity and exposes each current index as a read-only reactive value.
