---
title: "Reactive Unity UI props and state (Pine 1.1.0)"
sidebar_label: Reactive props
description: "Bind Unity UI props to Pine sources, derived values and tracked getters. Learn one-way bindings, editable source write-back, batching and scope ownership. Pine 1.1.0 documentation."
---

# Reactive props

Native props accept `Value<T>`: a literal, `Source<T>`, derived value, read-only row value or spring. Wrap other getters explicitly; text also has a direct getter overload.

```csharp
var count = P.Source(0);
var enabled = P.Derive(() => count.Value > 0);
return P.Vertical(
    P.Text(() => $"Count: {count.Value}"),
    P.Button("Reset", onClick: () => count.Value = 0, interactable: enabled)
);
```

```csharp
var position = new Value<Vector2>(() => new Vector2(count.Value * 10, 0));
return P.Text("Moving", anchoredPosition: position);
```

Construct owned calculations inside `App.Mount`, `P.Mount`, an owned component renderer or `P.Root`. Getters track source reads, then update the same native instance. Event callbacks are batched and untracked and retain their declaration context. Disposal removes bindings and handlers. `P.Batch` groups related writes.

Omitting a nullable prop preserves its native default. For an explicit null reference, pass a typed literal such as `new Value<Sprite>((Sprite)null)`; bare `null` means omitted. Editable `text`, `value` and `isOn` props write back when supplied a `Source<T>`. Derived/read-only/getter props are one-way.
