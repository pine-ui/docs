---
title: "Reactive state and scope ownership (Pine 1.2.0)"
sidebar_label: State and ownership
description: "Use Pine sources, derived values, effects, batching and untracked reads. Learn which reactive operations require scopes and how disposal owns Unity UI bindings. Pine 1.2.0 documentation."
---

# State and ownership

Import `using Pine;` and `using Pine.uGUI;`. `P.Source<T>` creates writable state; `P.Derive` caches tracked calculations; `P.Effect` observes changes. `P.Batch` groups writes and `P.Untrack` reads without subscriptions. Sources can exist independently; calculations, effects and cleanup require an owned scope.

`P.Root` creates an explicit scope. `P.Mount` owns a native tree. `Scope.Run` enters a live scope; disposal attempts all cleanup in reverse order. `P.Cleanup` owns callbacks, disposables and native Unity objects. Context providers remain visible to deferred views and their event callbacks. See [state](state-reference.md), [scope](scope-reference.md) and [signal](signal-reference.md) references.

## Choose a state operation

| Operation | Use it for |
| --- | --- |
| `P.Source` | Writable state changed by application code or UI callbacks. |
| `P.Derive` | A cached calculation that follows its tracked source reads. |
| `P.Effect` | Owned work that must run when its tracked dependencies change. |
| `P.Batch` | Related writes that should notify observers together. |
| `P.Untrack` | Reading state without adding that read as a dependency. |

Create owned calculations inside `App.Mount`, a mounted component renderer or an explicit `P.Root`. A source may outlive one interface, but its observers need a live owner so they can stop when the interface disappears. Use Pine's Unity UI operations on the Unity main thread.

## Bind a calculation to a native control

This fragment belongs inside an owned renderer such as `App.Mount`:

```csharp
var count = P.Source(0);
var enabled = P.Derive(() => count.Value > 0);
return P.Vertical(
    P.Text(() => $"Count: {count.Value}"),
    P.Button("Reset", onClick: () => count.Value = 0, interactable: enabled)
);
```

The getter and derived calculation track `count.Value`. A write updates the retained native components. Passing a literal value instead reads only once; see the complete [counter tutorial](../tutorials/counter.md) for startup and layout sizing.

## Diagnose a missing update

Check that the binding reads the source inside a getter, rather than passing an already calculated literal. If you mutate an object held by a source in place, use `Source.Notify()` to notify observers explicitly; assigning an equal value can be suppressed by the source's equality comparer. If an observer has stopped, check whether its owning scope was disposed. The [signal reference](signal-reference.md) documents tracked reads, untracked `Peek()` and notification behaviour.
