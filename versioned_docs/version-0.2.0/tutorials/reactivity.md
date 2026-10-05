---
title: Reactive state and data binding in Unity
sidebar_label: Sources and derived state
description: Use Pine sources, derived state, effects, and batching to keep Unity UI synchronized with explicit typed C# state.
---

# Reactive state and data binding in Unity

Sources hold mutable state; derived values cache reusable calculations.

```csharp
using Pine;

var count = UI.Source(0);
using var scope = UI.Root(() =>
{
    var doubled = UI.Derive(() => count.Value * 2);
    UI.Effect(() => UnityEngine.Debug.Log(doubled.Value));
});
count.Value = 3;
```

Calculations track values actually read, replacing conditional dependencies on successful reevaluation. Keep calculations pure and create them in stable scopes.

Effects run immediately and after dependencies change. Cleanup inside an effect runs before its next execution and when it is disposed. A failed cleanup retains prior subscriptions so a later dependency change can retry the effect. Independent queued work continues after observer failures; errors are aggregated after draining.

## Batch related changes

```csharp
var firstName = UI.Source("");
var lastName = UI.Source("");
UI.Batch(() =>
{
    firstName.Value = "Ada";
    lastName.Value = "Lovelace";
});
```

Effects wait until the outermost batch ends. A derived read inside the batch settles its upstream calculations and sees current inputs immediately.

## Equality and mutable values

Equal value types, strings and nulls suppress notification by default. Non-null mutable reference assignments notify, including the same object. Supply an `IEqualityComparer<T>` to change the policy. Call `Notify()` after an in-place edit that otherwise performs no source assignment. Use explicit sources for observable application state.

Use `.Peek()` or `UI.Untrack(...)` for non-tracking reads. Prefer explicit immutable/replacement state where convenient; list operators still reconcile by their chosen identities.

## Ownership

Create UI, effects and derived values under `Root` or `Mount`. Roots are independent, including nested roots; dispose each. Dynamic branches/context providers are parent-owned. `Scope.Run` reenters an existing live scope. Operations run synchronously on Unity's main thread.

Continue with [components](components.md).

Try [state-to-UI bindings](../guides/data-binding.md) in a complete Unity component.
