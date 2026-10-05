---
title: Reactive state and lifetime scopes API
sidebar_label: Core
description: Reference for Pine Source, Derived, Effect, Scope, and Root APIs, including dependency tracking, ownership, and disposal.
---

# Reactive state and lifetime scopes API

Examples use only `using Pine;`, then call `UI.Source`, `UI.Mount` and the other PascalCase methods. These pages document **Pine 0.2.0**. Install its matching v0.2.0 package.

| API | Behavior |
| --- | --- |
| `Source<T>(value = default, comparer = null)` | Mutable typed state. Read/write `.Value`; `.Set(value)` returns the assigned value. A source can be created outside a scope. |
| `Source<T>.Peek()` | Read without tracking. |
| `Source<T>.Notify()` | Notify observers after an in-place change. |
| `Derive<T>(compute, comparer = null)` | Eager cached calculation; `.Value` tracks reads. Equal output suppresses downstream updates. `.Dispose()` releases dependencies. |
| `Effect(Action)` | Run immediately, then synchronously after tracked updates. Returns `IDisposable`. |
| `Effect<T>(Func<T,T>, initial)` | Pass the previous callback result to the next evaluation. |
| `Root(Action)` | Create an independent `Scope`. |
| `Root(Action<Action>)` | Supply the root's disposal callback to its builder. |
| `Root<T>(Func<Action,T>)` | Return `(Scope Scope, T Value)`. |
| `Cleanup(Action)` / `Cleanup(IDisposable)` | Register cleanup with the current scope. |
| `Cleanup(UnityEngine.Object)` | Destroy a Unity object when the owning scope cleans up. |

Create observers in a stable root or mount. Keep derived calculations pure. Run Pine synchronously on Unity's main thread.

## Ownership

`Scope.Run(Action)` and `Scope.Run<T>(Func<T>)` enter an existing live scope. `Own<T>(resource)` registers a disposable and returns it. `IsDisposed` reports lifetime state. Disposal is idempotent; cleanup attempts every owned resource in reverse order and aggregates failures.

Roots remain independent even when created inside another root: dispose each explicitly. Context providers and dynamic row scopes are parent-owned. Effects clean up resources from their previous execution before rerunning.

## Equality and batching

Equal value types, strings and nulls suppress notifications by default. Assigning a non-null mutable reference notifies even when it is the same object. A custom `IEqualityComparer<T>` replaces this policy.

`Batch` settles derived calculations before effects. Reading a derived value inside a batch settles its upstream calculations immediately, while effects still wait for the batch to finish.

## Errors

The scheduler attempts independent queued calculations and effects after an observer fails, then throws `AggregateException`. Clock callbacks follow the same policy. Creation-time failures propagate to the caller. Feedback-loop guards detect work that fails to settle.

If an effect's cleanup fails, its previous subscriptions remain available for retry on a later dependency change. Cleanup resources are attempted once; a retry reruns the effect rather than repeating already-attempted cleanup.

## Typed inputs and framework-owned values

`Value<T>` holds a typed literal or tracked getter. `Source<T>`, `Derived<T>`, `Spring<T>` and `ReadOnly<T>` convert implicitly; use `new Value<T>(() => ...)` for direct getter input when a factory does not provide a dedicated getter overload. `Value<T>.Read()` and `UI.Read(...)` retain normal tracking.

`ReadOnly<T>` exposes `.Value` and `.Peek()` without a public setter. Dynamic results, row values, indices and presence use it because their ownership belongs to the operator. Update the controlling source collection/selector instead.

`UI.Mount(build)` creates the entire tree once in its own scope. Call it from `Start()` for scene-lived UI and ignore its optional return value. Scene unload or root destruction disposes native objects, bindings and handlers. Disabling the creating component does not remove or remount the interface. Retain the returned `Mount` only for early disposal; a helper named `Build()` is optional. [The counter](../tutorials/counter.md) shows a complete owner created without Inspector wiring.
