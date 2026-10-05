---
title: Pine dynamic branches and lists API
sidebar_label: Dynamic branches and lists
description: Complete typed reference with overloads, parameters, ownership and examples for Pine dynamic branches and lists.
---

# Dynamic branches and lists

This reference documents every public declaration in this part of the working API. Examples run inside `UI.Mount(...)` or `UI.Root(...)` unless they only create state/configuration. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `Branch.Branch`

```text
Branch<T>
```

A constructed dynamic result and its optional exit retention delay in seconds. Presence becomes false immediately on removal while the result remains alive for ExitDelay; reentry before expiration cancels removal and reuses its scope. Zero delay removes immediately. Delays must be finite and non-negative.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

```csharp
UI.Show(
    () => true,
    present => new Branch<UnityEngine.Component>(
        UI.Label(() => present.Value ? "Present" : "Leaving"),
        0.2
    )
);
```

## `Branch.Value`

```text
T Value
```

The native or custom result retained by this branch's scope.

```csharp
UnityEngine.Component result = branch.Value;
```

## `Branch.ExitDelay`

```text
double ExitDelay
```

Finite non-negative seconds to retain an exiting branch after its presence becomes false. Zero removes immediately.

```csharp
double seconds = branch.ExitDelay;
```

## `Branch.Branch`

```text
public Branch(T value, double exitDelay = 0)
```

Constructs this value with the supplied typed arguments. A constructed dynamic result and its optional exit retention delay in seconds. Presence becomes false immediately on removal while the result remains alive for ExitDelay; reentry before expiration cancels removal and reuses its scope. Zero delay removes immediately. Delays must be finite and non-negative.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `exitDelay` | Finite non-negative seconds to retain a branch after presence becomes false. |

```csharp
UI.Show(
    () => true,
    present => new Branch<UnityEngine.Component>(
        UI.Label(() => present.Value ? "Present" : "Leaving"),
        0.2
    )
);
```

## `Branch.implicit`

```text
public static implicit operator Branch<T>(T value)
```

Converts a constructed result into a branch with zero exit delay. Use the explicit constructor for retained exit animation.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |

**Returns:** A typed Value adapter that reads this reactive value when evaluated; the conversion does not write to its source.

```csharp
Branch<string> branch = "Ready";
```

## `UI.Show`

```text
public static ReadOnly<IReadOnlyList<TResult>> Show<TResult>(Func<bool> condition, Func<TResult> build, Func<TResult> fallback = null)
```

Constructs an owned conditional branch while its condition is true, with an optional fallback. The predicate overload retains the last truthy value for its branch. Results and presence are read-only; exit delays retain native results while presence is false, and reentry reuses unexpired scopes.

| Type parameter | Meaning |
| --- | --- |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `condition` | Reactive visibility predicate; its reads establish the controlling dependencies. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |
| `fallback` | Optional construction callback used when the selected primary branch is absent. |

**Returns:** An observable, immutable list of current and retained-exit branch results.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var result = UI.Show(() => visible.Value, () => UI.Label("Visible"));
UI.Frame(UI.Children(() => result.Value));
```

## `UI.Switch`

```text
public static ReadOnly<IReadOnlyList<TResult>> Switch<TKey, TResult>(Func<TKey> select, Func<TKey, TResult> build, IEqualityComparer<TKey> comparer = null)
```

Retains the selected keyed branch and optionally its exiting predecessor. Selection keys must be non-null; a comparer controls identity. Dictionary overloads support a fallback. Branch callbacks run only when creating that keyed scope, and returned presence/output are read-only.

| Type parameter | Meaning |
| --- | --- |
| `TKey` | Typed value, native result or identity contract; see the summary for its role. |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `select` | Native event selector or reactive branch selector, as specified by this overload. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |
| `comparer` | Optional equality/identity comparer; null selects the documented default policy. |

**Returns:** An observable, immutable list of selected and retained-exit branch results.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var result = UI.Switch(() => page.Value, key => UI.Label(key));
UI.Frame(UI.Children(() => result.Value));
```

## `UI.Indexes`

```text
public static ReadOnly<IReadOnlyList<TResult>> Indexes<TValue, TResult>(Func<IReadOnlyList<TValue>> read, Func<int, ReadOnly<TValue>, TResult> build)
```

Retains rows by index or explicit dictionary key, updating each row's read-only reactive value. Use explicit stable item IDs to preserve rows across reordering or immutable item replacement. Keys must be unique and non-null. Presence supports delayed exits through Branch.

| Type parameter | Meaning |
| --- | --- |
| `TValue` | Typed value, native result or identity contract; see the summary for its role. |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |

**Returns:** An observable, immutable ordered list of row results; retained rows keep native identity.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var rows = UI.Indexes(
    () => items.Value,
    (index, item) => UI.Label(() => item.Value)
);
UI.Column(UI.Children(() => rows.Value));
```

## `UI.Values`

```text
public static ReadOnly<IReadOnlyList<TResult>> Values<TValue, TResult>(Func<IReadOnlyList<TValue>> read, Func<TValue, ReadOnly<int>, TResult> build, IEqualityComparer<TValue> comparer = null)
```

Retains rows by value identity and exposes each current index as a read-only reactive value. Reordering preserves constructed rows; removed rows report index -1 and false presence during delayed exit. Duplicate or null identity values are rejected, and an optional comparer controls identity.

| Type parameter | Meaning |
| --- | --- |
| `TValue` | Typed value, native result or identity contract; see the summary for its role. |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |
| `comparer` | Optional equality/identity comparer; null selects the documented default policy. |

**Returns:** An observable, immutable ordered list of row results; indices are read-only operator-owned state.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var rows = UI.Values(
    () => items.Value,
    (item, index) => UI.Label(() => $"{index.Value}: {item}")
);
UI.Column(UI.Children(() => rows.Value));
```

## `UI.Switch`

```text
public static ReadOnly<IReadOnlyList<TResult>> Switch<TKey, TResult>(Func<TKey> select, Func<TKey, ReadOnly<bool>, Branch<TResult>> build, IEqualityComparer<TKey> comparer = null)
```

Retains the selected keyed branch and optionally its exiting predecessor. Selection keys must be non-null; a comparer controls identity. Dictionary overloads support a fallback. Branch callbacks run only when creating that keyed scope, and returned presence/output are read-only.

| Type parameter | Meaning |
| --- | --- |
| `TKey` | Typed value, native result or identity contract; see the summary for its role. |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `select` | Native event selector or reactive branch selector, as specified by this overload. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |
| `comparer` | Optional equality/identity comparer; null selects the documented default policy. |

**Returns:** An observable, immutable list of selected and retained-exit branch results.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var result = UI.Switch(() => page.Value, key => UI.Label(key));
UI.Frame(UI.Children(() => result.Value));
```

```text
public static ReadOnly<IReadOnlyList<TResult>> Switch<TKey, TResult>(Func<TKey> select, IReadOnlyDictionary<TKey, Func<ReadOnly<bool>, Branch<TResult>>> branches, Func<ReadOnly<bool>, Branch<TResult>> fallback = null)
```

Retains the selected keyed branch and optionally its exiting predecessor. Selection keys must be non-null; a comparer controls identity. Dictionary overloads support a fallback. Branch callbacks run only when creating that keyed scope, and returned presence/output are read-only.

| Type parameter | Meaning |
| --- | --- |
| `TKey` | Typed value, native result or identity contract; see the summary for its role. |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `select` | Native event selector or reactive branch selector, as specified by this overload. |
| `branches` | Construction callbacks indexed by non-null identity keys. |
| `fallback` | Optional construction callback used when the selected primary branch is absent. |

**Returns:** An observable, immutable list of selected and retained-exit branch results.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var result = UI.Switch(() => page.Value, key => UI.Label(key));
UI.Frame(UI.Children(() => result.Value));
```

## `UI.Show`

```text
public static ReadOnly<IReadOnlyList<TResult>> Show<TResult>(Func<bool> condition, Func<ReadOnly<bool>, Branch<TResult>> build, Func<ReadOnly<bool>, Branch<TResult>> fallback = null)
```

Constructs an owned conditional branch while its condition is true, with an optional fallback. The predicate overload retains the last truthy value for its branch. Results and presence are read-only; exit delays retain native results while presence is false, and reentry reuses unexpired scopes.

| Type parameter | Meaning |
| --- | --- |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `condition` | Reactive visibility predicate; its reads establish the controlling dependencies. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |
| `fallback` | Optional construction callback used when the selected primary branch is absent. |

**Returns:** An observable, immutable list of current and retained-exit branch results.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var result = UI.Show(() => visible.Value, () => UI.Label("Visible"));
UI.Frame(UI.Children(() => result.Value));
```

```text
public static ReadOnly<IReadOnlyList<TResult>> Show<T, TResult>(Func<T> read, Predicate<T> truthy, Func<ReadOnly<T>, ReadOnly<bool>, Branch<TResult>> build, Func<ReadOnly<bool>, Branch<TResult>> fallback = null)
```

Constructs an owned conditional branch while its condition is true, with an optional fallback. The predicate overload retains the last truthy value for its branch. Results and presence are read-only; exit delays retain native results while presence is false, and reentry reuses unexpired scopes.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |
| `truthy` | Predicate determining whether the read value belongs to the visible branch. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |
| `fallback` | Optional construction callback used when the selected primary branch is absent. |

**Returns:** An observable, immutable list of current and retained-exit branch results.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var result = UI.Show(() => visible.Value, () => UI.Label("Visible"));
UI.Frame(UI.Children(() => result.Value));
```

## `UI.Indexes`

```text
public static ReadOnly<IReadOnlyList<TResult>> Indexes<TKey, TValue, TResult>(Func<IEnumerable<KeyValuePair<TKey, TValue>>> read, Func<TKey, ReadOnly<TValue>, ReadOnly<bool>, Branch<TResult>> build, IEqualityComparer<TKey> comparer = null)
```

Retains rows by index or explicit dictionary key, updating each row's read-only reactive value. Use explicit stable item IDs to preserve rows across reordering or immutable item replacement. Keys must be unique and non-null. Presence supports delayed exits through Branch.

| Type parameter | Meaning |
| --- | --- |
| `TKey` | Typed value, native result or identity contract; see the summary for its role. |
| `TValue` | Typed value, native result or identity contract; see the summary for its role. |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |
| `comparer` | Optional equality/identity comparer; null selects the documented default policy. |

**Returns:** An observable, immutable ordered list of row results; retained rows keep native identity.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var rows = UI.Indexes(
    () => items.Value,
    (index, item) => UI.Label(() => item.Value)
);
UI.Column(UI.Children(() => rows.Value));
```

```text
public static ReadOnly<IReadOnlyList<TResult>> Indexes<TValue, TResult>(Func<IReadOnlyList<TValue>> read, Func<int, ReadOnly<TValue>, ReadOnly<bool>, Branch<TResult>> build)
```

Retains rows by index or explicit dictionary key, updating each row's read-only reactive value. Use explicit stable item IDs to preserve rows across reordering or immutable item replacement. Keys must be unique and non-null. Presence supports delayed exits through Branch.

| Type parameter | Meaning |
| --- | --- |
| `TValue` | Typed value, native result or identity contract; see the summary for its role. |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |

**Returns:** An observable, immutable ordered list of row results; retained rows keep native identity.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var rows = UI.Indexes(
    () => items.Value,
    (index, item) => UI.Label(() => item.Value)
);
UI.Column(UI.Children(() => rows.Value));
```

## `UI.Values`

```text
public static ReadOnly<IReadOnlyList<TResult>> Values<TValue, TResult>(Func<IReadOnlyList<TValue>> read, Func<TValue, ReadOnly<int>, ReadOnly<bool>, Branch<TResult>> build, IEqualityComparer<TValue> comparer = null)
```

Retains rows by value identity and exposes each current index as a read-only reactive value. Reordering preserves constructed rows; removed rows report index -1 and false presence during delayed exit. Duplicate or null identity values are rejected, and an optional comparer controls identity.

| Type parameter | Meaning |
| --- | --- |
| `TValue` | Typed value, native result or identity contract; see the summary for its role. |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |
| `comparer` | Optional equality/identity comparer; null selects the documented default policy. |

**Returns:** An observable, immutable ordered list of row results; indices are read-only operator-owned state.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var rows = UI.Values(
    () => items.Value,
    (item, index) => UI.Label(() => $"{index.Value}: {item}")
);
UI.Column(UI.Children(() => rows.Value));
```

