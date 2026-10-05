---
title: Utility
---

# Utility

| API | Behavior |
| --- | --- |
| `Batch(Action)` | Defer scheduled execution until the outermost batch ends; explicit derived reads remain current. |
| `Untrack<T>(Func<T>)` / `Untrack(Action)` | Suppress dependency collection while retaining ownership context. |
| `Read<T>(Value<T>)` | Read a literal/getter wrapper. |
| `Read<T>(Func<T>)`, `Read<T>(Source<T>)`, `Read<T>(Derived<T>)`, `Read<T>(T)` | Read the corresponding getter, source, derived value or literal. |
| `Context<T>(fallback = default)` | Create a typed context key. |
| `context.Value` | Read the nearest provider in the ownership chain, otherwise the fallback. |
| `context.Provide(value, Action)` | Build under a parent-owned provider scope. |
| `context.Provide<TResult>(value, Func<TResult>)` | Build under a provider and return a result. |

```csharp
using Pine;
using UI = Pine.Pine;

var theme = UI.Context("forest");
using var scope = UI.Root(() =>
    theme.Provide("night", () =>
        UI.Effect(() => UnityEngine.Debug.Log(theme.Value))));
```

Observers retain their provider context during later reevaluation. Independent roots start separate context chains. Use `Scope.Run` when entering an existing ownership context explicitly.

## Reactive inputs

`Value<T>` wraps a literal or `Func<T>`. Its public constructors accept either; `IsDynamic` distinguishes them and `Read()` returns the value. Literals, typed getter variables, `Source<T>`, `Derived<T>` and `Spring<T>` convert implicitly.

Common property helpers also provide `Func<T>` overloads, so direct lambdas work:

```csharp
var count = UI.Source(0);
using var scope = UI.Root(() =>
{
    var label = UI.Label(() => $"Count: {count.Value}");
});
```

For parameters accepting `Value<T>`, wrap a getter as `new Value<T>(() => ...)`. Reactive spring period/damping parameters accept this form. Read spring output through `spring.Value` or a `Value<T>` wrapper.
