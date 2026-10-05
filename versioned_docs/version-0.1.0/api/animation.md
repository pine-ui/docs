---
title: Animation
---

# Animation

`Spring<T>(Func<T> target, Value<double>? period = null, Value<double>? dampingRatio = null, SpringSpace<T> space = null)` creates a spring in a stable scope. Defaults are period `1` second and damping ratio `1`.

Core spaces support `float`, `double` and `double[]`. Unity spaces support `Vector2`, `Vector3`, `Vector4`, `Color`, `Rect`, `Quaternion` and `Pose`. Supply `SpringSpace<T>(pack,unpack)` for another type. Its public `Pack` and `Unpack` delegates translate to numeric lanes; lane count must stay constant and values must be finite.

| Member | Behavior |
| --- | --- |
| `spring.Value` getter | Read current output reactively; a disposed spring throws. |
| `spring.Value` setter | Jump immediately and clear velocity, retaining the existing target. |
| `spring.Control(position,velocity,impulse)` | Change internal motion; omitted controls remain unchanged. Output publishes on a later clock update. Impulse adds to velocity. |
| `spring.Dispose()` | Release target observation and clock updates. Idempotent. |
| `Step(deltaTime)` | Advance the shared clock and enter manual mode. |

Targets, period and damping are tracked. Period must be finite and positive; damping finite and non-negative. Use a `Source<double>` or explicit `Value<double>` getter for reactive parameters. Control inputs are read when the method is called.

The Unity host advances unscaled frame time. Springs use an analytic damped solver at fixed `1/120` second substeps and unregister from the clock when settled. Independent clock tasks continue after failures, followed by an aggregate error.

Color clamps RGBA; Rect packs min/max; quaternion/pose rotations normalize and canonicalize input quaternion sign. Rotation uses component-based motion. `SpringSpaces.Float`, `.Double`, `.Array` and `UnitySpringSpaces` expose built-in mappings.

Step durations must be finite and non-negative. The first explicit step switches the runtime session to manual time, so continue stepping springs, delayed branch exits and polled properties. 


