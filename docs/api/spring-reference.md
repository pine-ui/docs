---
title: Pine springs and custom value spaces API
sidebar_label: Springs and custom value spaces
description: Reference Pine typed springs and custom spring value spaces. Check animation parameters, value operations and scope ownership.
---

# Springs and custom value spaces

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `SpringSpace`

```text
SpringSpace<T>
```

A typed mapping between a custom value and a fixed number of finite double lanes.

## `SpringSpace.Pack`

```text
Func<T, double[]> Pack
```

Maps the typed value into a fixed number of finite double lanes.

## `SpringSpace.Unpack`

```text
Func<double[], T> Unpack
```

Reconstructs the typed value from the fixed lane order produced by Pack.

## `SpringSpace.SpringSpace`

```text
public SpringSpace(Func<T, double[]> pack, Func<double[], T> unpack)
```

Constructs this value with the supplied typed arguments.

## `SpringSpaces`

```text
SpringSpaces
```

Built-in lane mappings for scalar floats, doubles and fixed-length double arrays.

## `SpringSpaces.Float`

```text
SpringSpace<float> Float
```

Built-in fixed-lane mapping for Float.

## `SpringSpaces.Double`

```text
SpringSpace<double> Double
```

Built-in fixed-lane mapping for Double.

## `SpringSpaces.Array`

```text
SpringSpace<double[]> Array
```

Built-in fixed-lane mapping for Array.

## `P.Spring`

```text
public static Spring<T> Spring<T>(
    Func<T> target,
    Value<double>? period = null,
    Value<double>? dampingRatio = null,
    SpringSpace<T> space = null
)
```

An owned reactive analytic spring whose output moves toward a tracked target.

## `Spring`

```text
Spring<T>
```

An owned reactive analytic spring whose output moves toward a tracked target.

## `Spring.Value`

```text
T Value
```

Reads reactive spring output.

## `Spring.Control`

```text
public void Control(
    Value<T>? position = null,
    Value<T>? velocity = null,
    Value<T>? impulse = null
)
```

Sets position and/or velocity and adds an impulse using the spring's fixed typed space.

## `Spring.Dispose`

```text
public void Dispose()
```

Ends this owned lifetime idempotently.
