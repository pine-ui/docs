---
title: "Reactive Unity UI children and lists (Pine 1.2.0)"
sidebar_label: Tracked children
description: "Show, switch and reorder Unity UI children with Pine tracked collections. Retain native objects by declaration identity and dispose removed bindings. Pine 1.2.0 documentation."
---

# Tracked children

Use `children: () => views` inside a factory for reactive children. Reuse each declaration to retain its native identity across reordering. Removed views dispose their native objects and bindings. The getter must yield unique, non-null visual views; modifiers and Self entries are static. Declare one tracked getter on the containing visual view; for owned behaviours, put it on the view returned by Create rather than appending it to the generated Components factory.

```csharp
var visible = P.Source(true);
var content = P.Show(() => visible.Value, () => P.Text("Visible"));
return P.Vertical(children: () => content.Value);
```

```csharp
var items = P.Source<IReadOnlyList<string>>(new[] { "A", "B" });
var rows = P.Values(() => items.Value, (item, index) => P.Text(() => $"{index.Value}: {item}"));
return P.Vertical(children: () => rows.Value);
```

`Values` retains by identity; `Indexes` retains by index or explicit key. `Show` and `Switch` retain selected branches. Their immutable results and row indices/presence remain read-only. Retained exit branches remain mounted until their branch lifetime ends. Creating fresh declarations on every getter run rebuilds those children; create them through these retained operators.
