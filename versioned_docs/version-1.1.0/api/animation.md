---
title: "Unity UI spring animation API (Pine 1.1.0)"
sidebar_label: Animation
description: "Use P.Spring to animate scalar values and Unity structs. Configure period and damping, advance springs manually and snap targets for reduced motion. Pine 1.1.0 documentation."
---

# Animation

`P.Spring` interpolates scalar values or native Unity structs through their registered spring spaces. Bind the spring directly to a named native prop. Period and damping configure the spring; `P.Step` supports manual advancement. Reduced motion snaps spring targets. [Example](../tutorials/animation.md). [Full reference](spring-reference.md).

## Animate a target source

Create the spring inside an owned renderer such as `App.Mount`. This fragment binds a `Vector2` spring to the button's native `anchoredPosition`:

```csharp
var target = P.Source(Vector2.zero);
var position = P.Spring(() => target.Value, period: .45, dampingRatio: .75);
return P.Button(
    "Move",
    anchoredPosition: position,
    onClick: () => target.Value = new Vector2(180, 0)
);
```

Changing the source changes the target; the button's native instance remains mounted. Pass the spring itself to the prop so the binding observes its changing value. Reading its value into a literal before constructing the view captures only that moment.

## Motion and lifetime

Use `period` and `dampingRatio` to choose how the spring approaches its target. Set `P.ReducedMotion.Value = true` when the application should snap spring targets. This setting does not replace native Selectable color transition or dropdown fade settings; configure those on their native props.

Disposing the owning scope stops owned animation observers. Custom value types need a suitable `SpringSpace<T>`; the [spring reference](spring-reference.md) explains packing, unpacking and supported spaces. For a complete downloadable interface and the relationship between target state and animation, follow the [spring animation guide](../guides/spring-animation.md).
