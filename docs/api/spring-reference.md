---
title: Pine springs and custom value spaces API
sidebar_label: Springs and custom value spaces
description: Complete typed reference with overloads, parameters, ownership and examples for Pine springs and custom value spaces.
---

# Springs and custom value spaces

This reference documents every public declaration in this part of the working API. Examples run inside `UI.Mount(...)` or `UI.Root(...)` unless they only create state/configuration. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `SpringSpace.SpringSpace`

```text
SpringSpace<T>
```

A typed mapping between a custom value and a fixed number of finite double lanes. Pack and Unpack must agree on component order and lane count; the lane count cannot change during a spring lifetime. Pass an explicit space for a custom struct rather than relying on reflection.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

```csharp
var space = new SpringSpace<float>(
    v => new[] { (double)v },
    lanes => (float)lanes[0]
);
UI.Spring(() => 10f, space: space);
```

## `SpringSpace.Pack`

```text
Func<T, double[]> Pack
```

Maps the typed value into a fixed number of finite double lanes. Lane order must agree with Unpack.

```csharp
double[] lanes = space.Pack(10f);
```

## `SpringSpace.Unpack`

```text
Func<double[], T> Unpack
```

Reconstructs the typed value from the fixed lane order produced by Pack.

```csharp
float value = space.Unpack(new[] { 10d });
```

## `SpringSpace.SpringSpace`

```text
public SpringSpace(Func<T, double[]> pack, Func<double[], T> unpack)
```

Constructs this value with the supplied typed arguments. A typed mapping between a custom value and a fixed number of finite double lanes. Pack and Unpack must agree on component order and lane count; the lane count cannot change during a spring lifetime. Pass an explicit space for a custom struct rather than relying on reflection.

| Parameter | Meaning |
| --- | --- |
| `pack` | Mapping to a fixed number of finite double lanes. |
| `unpack` | Mapping from those same ordered lanes back to the typed value. |

```csharp
var space = new SpringSpace<float>(
    v => new[] { (double)v },
    lanes => (float)lanes[0]
);
UI.Spring(() => 10f, space: space);
```

## `SpringSpaces.SpringSpaces`

```text
SpringSpaces
```

Built-in lane mappings for scalar floats, doubles and fixed-length double arrays. Arrays are copied when packed/unpacked to protect solver storage. Use UnitySpringSpaces for Unity vector, color, rectangle, rotation and pose values.

```csharp
UI.Spring(() => 1f, space: SpringSpaces.Float);
```

## `SpringSpaces.Float`

```text
SpringSpace<float> Float
```

Built-in fixed-lane mapping for Float. Use the matching space when declaring a spring; Unity mappings normalize rotations and clamp color output as documented.

```csharp
UI.Spring(() => target.Value, space: SpringSpaces.Float);
```

## `SpringSpaces.Double`

```text
SpringSpace<double> Double
```

Built-in fixed-lane mapping for Double. Use the matching space when declaring a spring; Unity mappings normalize rotations and clamp color output as documented.

```csharp
UI.Spring(() => target.Value, space: SpringSpaces.Double);
```

## `SpringSpaces.Array`

```text
SpringSpace<double[]> Array
```

Built-in fixed-lane mapping for Array. Use the matching space when declaring a spring; Unity mappings normalize rotations and clamp color output as documented.

```csharp
UI.Spring(() => target.Value, space: SpringSpaces.Array);
```

## `UI.Spring`

```text
public static Spring<T> Spring<T>(Func<T> target, Value<double>? period = null, Value<double>? dampingRatio = null, SpringSpace<T> space = null)
```

An owned reactive analytic spring whose output moves toward a tracked target. Period and damping accept typed reactive inputs. Automatic runtime updates use unscaled time; UI.Step selects explicit manual clock advancement. ReducedMotion snaps changing targets without animated travel. Dispose releases its watch and clock listener.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `target` | The existing native component or tracked target getter, as specified by this overload. |
| `period` | Reactive positive finite spring period in seconds; null uses the default. |
| `dampingRatio` | Reactive finite non-negative damping; null uses the default. |
| `space` | Optional fixed-lane mapping for the spring value type. |

**Returns:** An owned animated value in the selected fixed-lane space; its output tracks reactive reads.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var target = UI.Source(0f);
var motion = UI.Spring(() => target.Value, period: 0.4, dampingRatio: 0.8);
UI.Image(UI.Position(() => new UnityEngine.Vector2(motion.Value, 0)));
```

## `Spring.Spring`

```text
Spring<T>
```

An owned reactive analytic spring whose output moves toward a tracked target. Period and damping accept typed reactive inputs. Automatic runtime updates use unscaled time; UI.Step selects explicit manual clock advancement. ReducedMotion snaps changing targets without animated travel. Dispose releases its watch and clock listener.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

```csharp
var target = UI.Source(0f);
var motion = UI.Spring(() => target.Value, period: 0.4, dampingRatio: 0.8);
UI.Image(UI.Position(() => new UnityEngine.Vector2(motion.Value, 0)));
```

## `Spring.Value`

```text
T Value
```

Reads reactive spring output. Assigning sets an immediate position and clears velocity; subsequent target changes can resume motion. Access after disposal throws.

```csharp
motion.Value = 20f;
```

## `Spring.Control`

```text
public void Control(Value<T>? position = null, Value<T>? velocity = null, Value<T>? impulse = null)
```

Sets position and/or velocity and adds an impulse using the spring's fixed typed space. Lane counts must agree and values must be finite. Reduced motion applies explicit positions without velocity animation.

| Parameter | Meaning |
| --- | --- |
| `position` | Typed immediate position or reactive native position, as specified by this overload. |
| `velocity` | Optional finite velocity input expressed through the same fixed spring space. |
| `impulse` | Optional finite velocity increment expressed through the same fixed spring space. |

```csharp
motion.Control(impulse: new Value<float>(10f));
```

## `Spring.Dispose`

```text
public void Dispose()
```

Ends this owned lifetime idempotently. Dependencies and native event/clock registrations are released; Scope/Mount cleanup attempts all resources and aggregates failures. Application code disposes a mount when its owner ends.

```csharp
motion.Dispose();
```
