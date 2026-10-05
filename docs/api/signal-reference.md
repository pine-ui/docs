---
title: Pine typed reactive values API
sidebar_label: Typed reactive values
description: Complete typed reference with overloads, parameters, ownership and examples for Pine typed reactive values.
---

# Typed reactive values

This reference documents every public declaration in this part of the working API. Examples run inside `UI.Mount(...)` or `UI.Root(...)` unless they only create state/configuration. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `Value.Value`

```text
Value<T>
```

A typed literal-or-getter adapter for mutable UI inputs. A literal is applied once; a getter is evaluated in an owned reactive effect and tracks the sources it reads. Source, ReadOnly, Derived and Spring convert implicitly. Structural native types and identity keys are declared separately.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

```csharp
var width = UI.Source(240f);
Value<UnityEngine.Vector2> size = new(() =>
    new UnityEngine.Vector2(width.Value, 48)
);
UI.Frame(UI.Size(size));
```

```text
public Value(T literal)
```

Constructs this value with the supplied typed arguments. A typed literal-or-getter adapter for mutable UI inputs. A literal is applied once; a getter is evaluated in an owned reactive effect and tracks the sources it reads. Source, ReadOnly, Derived and Spring convert implicitly. Structural native types and identity keys are declared separately.

| Parameter | Meaning |
| --- | --- |
| `literal` | The typed literal input (T); literals and supported reactive adapters follow this overload's documented behavior. |

```csharp
var width = UI.Source(240f);
Value<UnityEngine.Vector2> size = new(() =>
    new UnityEngine.Vector2(width.Value, 48)
);
UI.Frame(UI.Size(size));
```

```text
public Value(Func<T> read)
```

Constructs this value with the supplied typed arguments. A typed literal-or-getter adapter for mutable UI inputs. A literal is applied once; a getter is evaluated in an owned reactive effect and tracks the sources it reads. Source, ReadOnly, Derived and Spring convert implicitly. Structural native types and identity keys are declared separately.

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |

```csharp
var width = UI.Source(240f);
Value<UnityEngine.Vector2> size = new(() =>
    new UnityEngine.Vector2(width.Value, 48)
);
UI.Frame(UI.Size(size));
```

## `Value.IsDynamic`

```text
bool IsDynamic
```

Reports whether this adapter wraps a getter. Sources, derived values, springs and read-only values convert to dynamic adapters.

```csharp
bool reactive = value.IsDynamic;
```

## `Value.Read`

```text
public T Read()
```

Returns the literal or invokes its getter with normal dependency tracking.

**Returns:** The literal or getter result; getter reads participate in the active observer’s dependency tracking.

```csharp
var current = value.Read();
```

## `Value.implicit`

```text
public static implicit operator Value<T>(T value)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter. Conversions preserve the value type and reactive dependency reads.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |

**Returns:** A typed Value adapter that reads this reactive value when evaluated; the conversion does not write to its source.

```csharp
Value<int> value = UI.Source(0);
```

```text
public static implicit operator Value<T>(Func<T> getter)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter. Conversions preserve the value type and reactive dependency reads.

| Parameter | Meaning |
| --- | --- |
| `getter` | The typed getter to evaluate with normal dependency tracking. |

**Returns:** A typed Value adapter that reads this reactive value when evaluated; the conversion does not write to its source.

```csharp
Value<int> value = UI.Source(0);
```

```text
public static implicit operator Value<T>(Source<T> source)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter. Conversions preserve the value type and reactive dependency reads.

| Parameter | Meaning |
| --- | --- |
| `source` | The source, derived, spring or read-only value to observe through this adapter. This conversion preserves reads and does not grant write access. |

**Returns:** A typed Value adapter that reads this reactive value when evaluated; the conversion does not write to its source.

```csharp
Value<int> value = UI.Source(0);
```

```text
public static implicit operator Value<T>(ReadOnly<T> source)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter. Conversions preserve the value type and reactive dependency reads.

| Parameter | Meaning |
| --- | --- |
| `source` | The source, derived, spring or read-only value to observe through this adapter. This conversion preserves reads and does not grant write access. |

**Returns:** A typed Value adapter that reads this reactive value when evaluated; the conversion does not write to its source.

```csharp
Value<int> value = UI.Source(0);
```

```text
public static implicit operator Value<T>(Derived<T> source)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter. Conversions preserve the value type and reactive dependency reads.

| Parameter | Meaning |
| --- | --- |
| `source` | The source, derived, spring or read-only value to observe through this adapter. This conversion preserves reads and does not grant write access. |

**Returns:** A typed Value adapter that reads this reactive value when evaluated; the conversion does not write to its source.

```csharp
Value<int> value = UI.Source(0);
```

```text
public static implicit operator Value<T>(Spring<T> source)
```

Converts a typed literal, getter or supported reactive value into a literal-or-getter adapter. Conversions preserve the value type and reactive dependency reads.

| Parameter | Meaning |
| --- | --- |
| `source` | The source, derived, spring or read-only value to observe through this adapter. This conversion preserves reads and does not grant write access. |

**Returns:** A typed Value adapter that reads this reactive value when evaluated; the conversion does not write to its source.

```csharp
Value<int> value = UI.Source(0);
```

## `ReadOnly.ReadOnly`

```text
ReadOnly<T>
```

A framework-owned reactive value that callers can observe without replacing it. Dynamic operators expose their output, row values, indices and presence through this type. Value tracks dependency reads; Peek reads without tracking. Change the source collection or selection to update these values.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

```csharp
var rows = UI.Values(
    () => new[] { "A" },
    (value, index) => UI.Label(() => $"{index.Value}: {value}")
);
UI.Column(UI.Children(() => rows.Value));
```

## `ReadOnly.Value`

```text
T Value
```

Reads the framework-owned value with dependency tracking. There is no public setter; update the controlling collection or selector instead.

```csharp
UI.Label(() => index.Value.ToString());
```

## `ReadOnly.Peek`

```text
public T Peek()
```

Reads the framework-owned snapshot without collecting a dependency.

**Returns:** The current value without registering a dependency on this read.

```csharp
int snapshot = index.Peek();
```

## `Source.Source`

```text
Source<T>
```

Mutable typed reactive state. Reading Value inside an observer registers a dependency; assigning Value notifies observers under the configured equality policy. Sources can be stored on an owner outside any UI lifetime. Equal values and strings are suppressed by default, while mutable reference assignments notify unless a comparer changes that behavior.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

```csharp
var count = UI.Source(0);
UI.Label(() => count.Value.ToString());
count.Value++;
```

## `Source.Value`

```text
T Value
```

Reads with dependency tracking and writes with notifications under the source equality policy. Writes from a derived calculation are rejected.

```csharp
count.Value++;
```

## `Source.Peek`

```text
public T Peek()
```

Returns a source snapshot without collecting a dependency. Use Value when a reactive binding should follow changes.

**Returns:** The current value without registering a dependency on this read.

```csharp
int snapshot = count.Peek();
```

## `Source.Set`

```text
public T Set(T value)
```

Assigns the typed source value and returns the value supplied. The same equality and notification policy as the Value setter applies.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |

**Returns:** The assigned value, after synchronously notifying observers outside a batch.

```csharp
int next = count.Set(10);
```

## `Source.Notify`

```text
public void Notify()
```

Explicitly notifies observers after mutating a referenced value in place. It increments the source revision and settles tracked observers synchronously outside a batch.

```csharp
items.Peek().Add("New");
items.Notify();
```

## `Derived.Derived`

```text
Derived<T>
```

An owned cached pure calculation with dynamically tracked dependencies. Reading Value tracks downstream consumers; equal outputs suppress their reruns. Create in a stable ownership scope and keep the calculation free of source writes. Disposal releases dependencies and is idempotent.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

```csharp
var count = UI.Source(2);
var doubled = UI.Derive(() => count.Value * 2);
UI.Label(() => doubled.Value.ToString());
```

## `Derived.Value`

```text
T Value
```

Returns the current cached pure result and tracks downstream reads. Within a batch it first settles stale upstream derived calculations.

```csharp
UI.Label(() => total.Value.ToString());
```

## `Derived.Dispose`

```text
public void Dispose()
```

Ends this owned lifetime idempotently. Dependencies and native event/clock registrations are released; Scope/Mount cleanup attempts all resources and aggregates failures. Application code disposes a mount when its owner ends.

```csharp
total.Dispose();
```
