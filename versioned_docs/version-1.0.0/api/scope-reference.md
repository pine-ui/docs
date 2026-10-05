---
title: Pine scopes and context API
sidebar_label: Scopes and context
description: Complete typed reference with overloads, parameters, ownership and examples for Pine scopes and context.
---

# Scopes and context

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `UI.Root(...)` unless they only create state/configuration. Explicit `UI.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `Scope`

```text
Scope
```

A lifetime container for reactive observers, callbacks and native resources. Run temporarily enters this scope so new operations inherit its ownership and context. Dispose is idempotent, attempts resources in reverse registration order, and aggregates cleanup failures. Independent Root scopes require explicit disposal.

```csharp
using var scope = UI.Root(build: () =>
    UI.Effect(action: () => UnityEngine.Debug.Log("Ready"))
);
scope.Run(() => UI.Cleanup(cleanup: () => UnityEngine.Debug.Log("Disposed")));
```

## `Scope.IsDisposed`

```text
bool IsDisposed
```

Reports whether cleanup has begun/completed for this scope. Disposal is idempotent.

```csharp
if (!mount.Scope.IsDisposed)
    mount.Scope.Run(() => UI.Apply(target: label, UI.Text(text: "Live")));
```

## `Scope.Run`

```text
public void Run(Action action)
```

Temporarily enters this live scope, preserving ownership and scoped context, and restores the previous scope afterward. Operations throw after disposal. The generic overload returns the callback result.

| Parameter | Meaning |
| --- | --- |
| `action` | Callback/action executed in the documented phase or event scope. |

```csharp
mount.Scope.Run(() => UI.Apply(target: label, UI.Text(text: "Updated")));
```

```text
public T Run<T>(Func<T> action)
```

Temporarily enters this live scope, preserving ownership and scoped context, and restores the previous scope afterward. Operations throw after disposal. The generic overload returns the callback result.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `action` | Callback/action executed in the documented phase or event scope. |

**Returns:** The typed result described above; reactive reads participate in the active observer.

```csharp
mount.Scope.Run(() => UI.Apply(target: label, UI.Text(text: "Updated")));
```

## `Scope.Own`

```text
public T Own<T>(T resource) where T : IDisposable
```

Registers an IDisposable for reverse-order cleanup and returns the same resource. A disposed scope rejects further ownership.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `resource` | The typed resource input (T); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** The same disposable resource, now registered for reverse-order cleanup by this scope.

```csharp
scope.Own(subscription);
```

## `Scope.Dispose`

```text
public void Dispose()
```

Ends this owned lifetime idempotently. Dependencies and native event/clock registrations are released; Scope/Mount cleanup attempts all resources and aggregates failures. Explicit owners may dispose their mount early; automatic applications end when their root is destroyed.

```csharp
scope.Dispose();
```

## `Context`

```text
Context<T>
```

A scoped typed dependency with a fallback outside providers. Provide creates a parent-owned scope whose value is available to declarations and later effects or native callbacks created inside it. The nearest provider wins; context values are not reactive by themselves. Supply reactive state as the context value when needed.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

```csharp
var theme = UI.Context(fallback: UnityEngine.Color.white);
theme.Provide(
    UnityEngine.Color.green,
    () => UI.Label(text: "Theme", UI.Tint(color: theme.Value))
);
```

## `Context.Value`

```text
T Value
```

Returns the nearest scoped provider value or the configured fallback. It does not independently track reactive dependencies; a reactive context value can expose its own tracked state.

```csharp
UI.Label(text: "Theme", UI.Tint(color: theme.Value));
```

## `Context.Provide`

```text
public void Provide(T value, Action build)
```

Constructs a parent-owned provider scope with this typed value. The nearest provider is retained by created effects and native callbacks. An exception during construction disposes the provider scope.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |

```csharp
theme.Provide(
    UnityEngine.Color.green,
    () => UI.Label(text: "Theme", UI.Tint(color: theme.Value))
);
```

```text
public TResult Provide<TResult>(T value, Func<TResult> build)
```

Constructs a parent-owned provider scope with this typed value. The nearest provider is retained by created effects and native callbacks. An exception during construction disposes the provider scope.

| Type parameter | Meaning |
| --- | --- |
| `TResult` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |

**Returns:** The typed result described above; reactive reads participate in the active observer.

```csharp
theme.Provide(
    UnityEngine.Color.green,
    () => UI.Label(text: "Theme", UI.Tint(color: theme.Value))
);
```
