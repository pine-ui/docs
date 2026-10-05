---
title: Conditional UI and keyed lists API
sidebar_label: Dynamic scopes
description: Reference for Pine Show, Switch, Indexes, Values, and Branch APIs for conditional Unity UI, keyed lists, and retained exits.
---

# Conditional UI and keyed lists API

All operators need a stable owner and return `Source<TResult[]>`. Treat result arrays and callback signals as operator-owned state. Bind results with `Children(() => output.Value)`.

| Operator | Identity and constructor inputs |
| --- | --- |
| `Show(condition, build, fallback = null)` | Boolean branch; advanced constructors receive presence. |
| `Show(read, truthy, build, fallback = null)` | Boolean branch retaining the last truthy value; constructor receives filtered value and presence. |
| `Switch(select, build, comparer = null)` | Selected key; advanced constructor receives fixed key and presence. |
| `Switch(select, branches, fallback = null)` | Dictionary of constructors receiving presence. Unmatched keys without fallback produce the default result. |
| `Indexes(keyedGetter, build, comparer = null)` | Fixed key, reactive value and presence. Input is an enumerable of key/value pairs. |
| `Indexes(listGetter, build)` | Fixed zero-based list position, reactive value and optional presence. |
| `Values(listGetter, build, comparer = null)` | Fixed value, reactive zero-based index and optional presence. |

Advanced constructors return `Branch<TResult>(result, exitDelaySeconds = 0)`; a plain result converts implicitly to a zero-delay branch. Convenience overloads return `TResult` directly: `Show(condition, () => result)`, `Switch(select, key => result)`, positional `Indexes(read, (index,value) => result)` and `Values(read, (value,index) => result)`.

```csharp
var visible = UI.Source(true);
var output = UI.Show(() => visible.Value, () => UI.Label("Hello"));
var host = UI.Column(UI.Children(() => output.Value));
```

## Retained exits

When a row departs, presence becomes false. A zero-delay branch is removed immediately. A delayed branch remains in the output until its timer runs; reentry before expiry cancels removal and reuses its scope and result. Departing `Values` rows receive index `-1`.

Active rows follow input order, then retained exiting rows. Output arrays publish only when membership/order changes. Retained row value/index signals can change without publishing another result array.

Keys must be unique and non-null; `Values` requires unique non-null identities as well. Default identity uses `EqualityComparer<T>.Default`; supply a comparer for a different policy. List `Indexes` keys are indices, not item identities. These operators reconcile retained UI by identity.

Immediate removals attempt other removed-row cleanups after one fails. Both immediate and delayed removals publish structural removal despite cleanup failure, then report errors through the scheduler/clock. Disposing the owner attempts all row cleanups. A constructor failure disposes the operator rather than providing transactional rollback.

Exit delays must be finite and non-negative. Automatic unscaled time advances timers; after `UI.Step`, keep advancing the manual clock yourself.
