---
title: Pine scopes and context API
sidebar_label: Scopes and context
description: Reference Pine reactive scopes, cleanup, roots and context APIs. Check ownership rules and typed signatures for scoped Unity UI work.
---

# Scopes and context

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `Scope`

```text
Scope
```

A lifetime container for reactive observers, callbacks and native resources.

## `Scope.IsDisposed`

```text
bool IsDisposed
```

Reports whether cleanup has begun/completed for this scope.

## `Scope.Run`

```text
public void Run(Action action)
```

Temporarily enters this live scope, preserving ownership and scoped context, and restores the previous scope afterward.

```text
public T Run<T>(Func<T> action)
```

Temporarily enters this live scope, preserving ownership and scoped context, and restores the previous scope afterward.

## `Scope.Own`

```text
public T Own<T>(T resource)
    where T : IDisposable
```

Registers an IDisposable for reverse-order cleanup and returns the same resource.

## `Scope.Dispose`

```text
public void Dispose()
```

Ends this owned lifetime idempotently.

## `Context`

```text
Context<T>
```

A scoped typed dependency with a fallback outside providers.

## `Context.Value`

```text
T Value
```

Returns the nearest scoped provider value or the configured fallback.

## `Context.Provide`

```text
public void Provide(T value, Action build)
```

Constructs a parent-owned provider scope with this typed value.

```text
public TResult Provide<TResult>(T value, Func<TResult> build)
```

Constructs a parent-owned provider scope with this typed value.
