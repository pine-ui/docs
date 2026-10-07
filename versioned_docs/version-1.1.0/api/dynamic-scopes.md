---
title: "Retained UI branches and lists (Pine 1.1.0)"
sidebar_label: Retained branches and lists
description: "Retain Unity UI branch and row state with P.Show, P.Switch, P.Indexes and P.Values. Learn stable identity, tracked children and branch exit lifetimes. Pine 1.1.0 documentation."
---

# Retained branches and lists

`P.Show`, `P.Switch`, `P.Indexes` and `P.Values` retain branch/row state. Return View declarations and pass their results as `children: () => result.Value`. Outputs, row indices and presence are read-only. `Branch.Exit` retains a departing branch for its requested lifetime. Keep stable identity keys to retain rows across reordering. [Tracked children](../tutorials/dynamic-ui.md). [Full operator reference](dynamic-reference.md).

## Choose a retained operator

| Operator | Use it for |
| --- | --- |
| `P.Show` | Conditional content with an optional fallback branch. |
| `P.Switch` | Selecting content from a changing key. |
| `P.Indexes` | Rows retained by list position or an explicit key. |
| `P.Values` | Rows retained by value identity, with a reactive read-only index. |

Choose identity to match the data. A positional list is appropriate when each position is the identity you want to retain. Use stable item identity or explicit keys when rows must follow their items across reordering. See the [operator reference](dynamic-reference.md) for the overloads and equality comparer options.

## Append retained rows

Inside an owned renderer, supply the operator's result through a tracked children getter:

```csharp
var items = P.Source<IReadOnlyList<string>>(new[] { "A", "B" });
var rows = P.Values(() => items.Value, (item, index) => P.Text(() => $"{index.Value}: {item}"));
return P.Vertical(children: () => rows.Value);
```

Import `System.Collections.Generic` for `IReadOnlyList<T>`. The row builder creates declarations, and the containing view reads the retained result. Put layout sizing on the native layout and rows as shown in the [dynamic lists guide](../guides/dynamic-lists.md).

## Avoid rebuilding every row

Creating fresh declarations every time a children getter runs replaces their native identities. Reuse declarations or create them through a retained operator. Tracked children must be unique, non-null visual views; keep modifiers and `Self` entries static. Removed rows dispose their objects and bindings once any requested exit lifetime ends. The [tracked children tutorial](../tutorials/dynamic-ui.md) explains placement and disposal rules.
