---
title: Pine state and configuration API
sidebar_label: State and configuration
description: Reference Pine reactive state and configuration APIs, including typed declarations, parameters, scope ownership and C# usage examples.
---

# State and configuration

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `P`

```text
P
```

Creates retained Unity UI and reactive state in typed C# declarations.

## `P.Version`

```text
Version Version
```

Returns the API version.

## `P.ReducedMotion`

```text
Source<bool> ReducedMotion
```

Global explicit reactive motion preference.

## `P.Strict`

```text
bool Strict
```

Controls duplicate named-property diagnostics within groups and duplicate child transform diagnostics.

## `P.Defaults`

```text
bool Defaults
```

Controls required native wiring for the imperative Create API.

## `P.DeferNestedProperties`

```text
bool DeferNestedProperties
```

Controls whether nested groups are traversed after outer declarations within property ordering phases.

## `P.Source`

```text
public static Source<T> Source<T>(T value = default, IEqualityComparer<T> comparer = null)
```

Creates mutable typed state, usable outside any ownership scope.

## `P.Read`

```text
public static T Read<T>(Value<T> value)
```

Reads a typed literal or reactive adapter.

```text
public static T Read<T>(Func<T> getter)
```

Reads a typed literal or reactive adapter.

```text
public static T Read<T>(Source<T> source)
```

Reads a typed literal or reactive adapter.

```text
public static T Read<T>(ReadOnly<T> source)
```

Reads a typed literal or reactive adapter.

```text
public static T Read<T>(Derived<T> derived)
```

Reads a typed literal or reactive adapter.

```text
public static T Read<T>(T value)
```

Reads a typed literal or reactive adapter.

## `P.Derive`

```text
public static Derived<T> Derive<T>(Func<T> compute, IEqualityComparer<T> comparer = null)
```

Creates an owned eager cached calculation.

## `P.Effect`

```text
public static IDisposable Effect(Action action)
```

Runs an owned side effect immediately and again after its tracked inputs change.

```text
public static IDisposable Effect<T>(Func<T, T> action, T initial)
```

Runs an owned side effect immediately and again after its tracked inputs change.

## `P.Root`

```text
public static Scope Root(Action build)
```

Constructs an independent ownership scope and runs its builder without dependency tracking.

```text
public static Scope Root(Action<Action> build)
```

Constructs an independent ownership scope and runs its builder without dependency tracking.

```text
public static (Scope Scope, T Value) Root<T>(Func<Action, T> build)
```

Constructs an independent ownership scope and runs its builder without dependency tracking.

## `P.Context`

```text
public static Context<T> Context<T>(T fallback = default)
```

A scoped typed dependency with a fallback outside providers.

## `P.Cleanup`

```text
public static void Cleanup(Action cleanup)
```

Registers a callback, disposable or Unity object with the active scope.

```text
public static void Cleanup(IDisposable disposable)
```

Registers a callback, disposable or Unity object with the active scope.

## `P.Batch`

```text
public static void Batch(Action action)
```

Runs several writes as one synchronous update transaction.

## `P.Untrack`

```text
public static T Untrack<T>(Func<T> read)
```

Runs a read or action with dependency collection temporarily suspended.

```text
public static void Untrack(Action action)
```

Runs a read or action with dependency collection temporarily suspended.

## `P.Step`

```text
public static void Step(double deltaTime)
```

Advances the shared spring/polling/exit-delay clock manually by a finite non-negative number of seconds.
