---
title: Native props and springs
---

# Native props and springs

Springs bind directly to native struct props. Sources change targets; the view is built once.

```csharp
var target = P.Source(Vector2.zero);
var position = P.Spring(() => target.Value, period: .45, dampingRatio: .75);
return P.Button("Move", anchoredPosition: position,
    onClick: () => target.Value = new Vector2(180, 0));
```

`P.ReducedMotion.Value = true` snaps spring targets. Native Selectable color transitions and dropdown fades remain controlled by their own named props and native structs. Scope disposal stops owned animation observers. [Spring reference](../api/spring-reference.md).
