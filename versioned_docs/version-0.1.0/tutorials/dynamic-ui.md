---
title: Conditional Unity UI and dynamic lists
sidebar_label: Conditional UI and lists
description: Build conditional Unity interfaces and dynamic lists with Pine Show, Indexes, Values, stable row identity, and retained exit transitions.
---

# Conditional Unity UI and dynamic lists

Dynamic helpers return retained component results. Bind them as children under a stable mount/root.

```csharp
var visible = UI.Source(true);
var message = UI.Show(() => visible.Value, () => UI.Label("Hello"));
var container = UI.Column(UI.Children(() => message.Value));
```

The selected branch is retained while its identity stays the same. Switching identity removes the old branch immediately unless an advanced constructor supplies an exit delay.

## Choose row identity

`Indexes` preserves fixed keys and exposes reactive row values. Its list overload uses array positions as keys. For editable records, supply permanent IDs through its keyed key/value-pair overload.

`Values` preserves values and exposes reactive indices. Values must be unique and non-null under the chosen comparer.

```csharp
var names = UI.Source<string[]>(new[] { "Ada", "Grace" });
var rows = UI.Values<string, TMPro.TextMeshProUGUI>(
    () => names.Value,
    (name, index) => UI.Label(() => $"{index.Value + 1}. {name}")
);
var list = UI.Column(UI.Children(() => rows.Value));
```

Membership/order changes publish new output arrays. Existing row signals can update without rebuilding those arrays. These lists retain and reconcile UI by identity.

## Retained exits

Advanced constructors receive a presence source and return `Branch<T>`. For a fading branch:

```csharp
var fading = UI.Show<UnityEngine.Component>(
    () => visible.Value,
    present =>
    {
        var alpha = UI.Spring(() => present.Value ? 1f : 0f, period: 0.18);
        return new Branch<UnityEngine.Component>(
            UI.Label("Hello", UI.Opacity(alpha)),
            0.35
        );
    }
);
var host = UI.Column(UI.Children(() => fading.Value));
```

Presence becomes false on departure. The branch remains for `0.35` seconds; reentry cancels removal and reuses it. Departing `Values` rows receive index `-1`, so format indices with exit state in mind. Active rows appear before exiting rows.

Row scopes own their resources. Failed cleanup does not leave removed results published; other removals are attempted before aggregate errors are reported. Dispose the parent owner to release all rows.

Continue with [animation](animation.md).

Build a [dynamic inventory list with stable IDs](../guides/dynamic-lists.md).
