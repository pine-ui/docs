---
title: Pine state and configuration API
sidebar_label: State and configuration
description: Complete typed reference with overloads, parameters, ownership and examples for Pine state and configuration.
---

# State and configuration

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `UI.Root(...)` unless they only create state/configuration. Explicit `UI.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `UI`

```text
UI
```

Creates retained Unity UI and reactive state in typed C# declarations. Import the Pine namespace and call its static members. Construct owned UI inside UI.Mount or UI.Root; mutable bindings update native components without rebuilding the declaration.

```csharp
var count = UI.Source(value: 0);
UI.Mount(component: () => UI.Label(text: () => count.Value.ToString()));
```

## `UI.Version`

```text
Version Version
```

Returns the working API base version; prerelease distribution metadata lives in package.json.

```csharp
UnityEngine.Debug.Log(UI.Version);
```

## `UI.ReducedMotion`

```text
Source<bool> ReducedMotion
```

Global explicit reactive motion preference. True snaps spring targets and removes native selectable/dropdown transition fades; false allows declared motion. Applications can bind their settings/platform preference to this source.

```csharp
UI.ReducedMotion.Value = true;
```

## `UI.Strict`

```text
bool Strict
```

Controls duplicate named-property diagnostics within groups and duplicate child transform diagnostics. It defaults to true and does not disable compiler target/value safety or reactive ownership guards.

```csharp
UI.Strict = true;
```

## `UI.Defaults`

```text
bool Defaults
```

Controls native defaults for newly created components, including text/font/raycast and selectable graphics/navigation. Set false before creation only when configuring those native requirements explicitly. Default is true.

```csharp
UI.Defaults = true;
```

## `UI.DeferNestedProperties`

```text
bool DeferNestedProperties
```

Controls whether nested groups are traversed after outer declarations within property ordering phases. Actions always follow priority and parenting remains after ordinary assignments. Default is true.

```csharp
UI.DeferNestedProperties = true;
```

## `UI.Source`

```text
public static Source<T> Source<T>(T value = default, IEqualityComparer<T> comparer = null)
```

Creates mutable typed state, usable outside any ownership scope. Value reads track dependencies; writes notify under the default or supplied equality policy. Store sources on the application owner to preserve state across remounting.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `comparer` | Optional equality/identity comparer; null selects the documented default policy. |

**Returns:** A new mutable typed source; sources can be stored independently of a UI scope.

```csharp
var count = UI.Source(value: 0);
count.Value++;
```

## `UI.Read`

```text
public static T Read<T>(Value<T> value)
```

Reads a typed literal or reactive adapter. Getter/source/derived/read-only overloads retain normal dependency tracking; use Peek or Untrack when a snapshot must not subscribe. A Value getter is invoked rather than returning its wrapper.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |

**Returns:** The current typed input value. Getter/source reads establish dependencies in the active observer.

```csharp
int current = UI.Read(count);
```

```text
public static T Read<T>(Func<T> getter)
```

Reads a typed literal or reactive adapter. Getter/source/derived/read-only overloads retain normal dependency tracking; use Peek or Untrack when a snapshot must not subscribe. A Value getter is invoked rather than returning its wrapper.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `getter` | The typed getter to evaluate with normal dependency tracking. |

**Returns:** The current typed input value. Getter/source reads establish dependencies in the active observer.

```csharp
int current = UI.Read(count);
```

```text
public static T Read<T>(Source<T> source)
```

Reads a typed literal or reactive adapter. Getter/source/derived/read-only overloads retain normal dependency tracking; use Peek or Untrack when a snapshot must not subscribe. A Value getter is invoked rather than returning its wrapper.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `source` | Mutable typed source used by this two-way native binding. |

**Returns:** The current typed input value. Getter/source reads establish dependencies in the active observer.

```csharp
int current = UI.Read(count);
```

```text
public static T Read<T>(ReadOnly<T> source)
```

Reads a typed literal or reactive adapter. Getter/source/derived/read-only overloads retain normal dependency tracking; use Peek or Untrack when a snapshot must not subscribe. A Value getter is invoked rather than returning its wrapper.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `source` | Mutable typed source used by this two-way native binding. |

**Returns:** The current typed input value. Getter/source reads establish dependencies in the active observer.

```csharp
int current = UI.Read(count);
```

```text
public static T Read<T>(Derived<T> derived)
```

Reads a typed literal or reactive adapter. Getter/source/derived/read-only overloads retain normal dependency tracking; use Peek or Untrack when a snapshot must not subscribe. A Value getter is invoked rather than returning its wrapper.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `derived` | The typed derived input (Derived&lt;T&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** The current typed input value. Getter/source reads establish dependencies in the active observer.

```csharp
int current = UI.Read(count);
```

```text
public static T Read<T>(T value)
```

Reads a typed literal or reactive adapter. Getter/source/derived/read-only overloads retain normal dependency tracking; use Peek or Untrack when a snapshot must not subscribe. A Value getter is invoked rather than returning its wrapper.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |

**Returns:** The current typed input value. Getter/source reads establish dependencies in the active observer.

```csharp
int current = UI.Read(count);
```

## `UI.Derive`

```text
public static Derived<T> Derive<T>(Func<T> compute, IEqualityComparer<T> comparer = null)
```

Creates an owned eager cached calculation. Dependencies are discovered from reads and refreshed each evaluation; equal outputs suppress downstream observers. The getter must be pure: writing sources from a derived calculation throws. Construction requires a stable scope.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `compute` | The pure calculation whose tracked reads establish dependencies; source writes are rejected. |
| `comparer` | Optional equality/identity comparer; null selects the documented default policy. |

**Returns:** An owned cached derived value whose dependencies are tracked and released on disposal.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var total = UI.Derive(compute: () => count.Value * 2);
```

## `UI.Effect`

```text
public static IDisposable Effect(Action action)
```

Runs an owned side effect immediately and again after its tracked inputs change. Prior execution cleanup runs before reevaluation. The previous-result overload passes the last callback result into the next run. Independent observer failures are aggregated after queued work is attempted.

| Parameter | Meaning |
| --- | --- |
| `action` | Callback/action executed in the documented phase or event scope. |

**Returns:** The owned effect subscription. Dispose stops observation and cleans up resources created by its latest execution.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Effect(action: () => UnityEngine.Debug.Log(count.Value));
```

```text
public static IDisposable Effect<T>(Func<T, T> action, T initial)
```

Runs an owned side effect immediately and again after its tracked inputs change. Prior execution cleanup runs before reevaluation. The previous-result overload passes the last callback result into the next run. Independent observer failures are aggregated after queued work is attempted.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `action` | Callback/action executed in the documented phase or event scope. |
| `initial` | Initial previous-result value passed to the first evaluation. |

**Returns:** The owned effect subscription. Dispose stops observation and cleans up resources created by its latest execution.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Effect(action: () => UnityEngine.Debug.Log(count.Value));
```

## `UI.Root`

```text
public static Scope Root(Action build)
```

Constructs an independent ownership scope and runs its builder without dependency tracking. Dispose the returned scope explicitly; roots do not become parent-owned merely because they were created inside another root. Callback overloads supply the disposal action and the result overload also returns the built value.

| Parameter | Meaning |
| --- | --- |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |

**Returns:** An independent scope, or a tuple containing that scope and the builder result. Dispose the scope explicitly.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
using var root = UI.Root(build: () =>
    UI.Effect(action: () => UnityEngine.Debug.Log("Active"))
);
```

```text
public static Scope Root(Action<Action> build)
```

Constructs an independent ownership scope and runs its builder without dependency tracking. Dispose the returned scope explicitly; roots do not become parent-owned merely because they were created inside another root. Callback overloads supply the disposal action and the result overload also returns the built value.

| Parameter | Meaning |
| --- | --- |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |

**Returns:** An independent scope, or a tuple containing that scope and the builder result. Dispose the scope explicitly.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
using var root = UI.Root(build: () =>
    UI.Effect(action: () => UnityEngine.Debug.Log("Active"))
);
```

```text
public static (Scope Scope, T Value) Root<T>(Func<Action, T> build)
```

Constructs an independent ownership scope and runs its builder without dependency tracking. Dispose the returned scope explicitly; roots do not become parent-owned merely because they were created inside another root. Callback overloads supply the disposal action and the result overload also returns the built value.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `build` | Construction callback executed in its documented ownership scope; declare owned resources here. |

**Returns:** An independent scope, or a tuple containing that scope and the builder result. Dispose the scope explicitly.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
using var root = UI.Root(build: () =>
    UI.Effect(action: () => UnityEngine.Debug.Log("Active"))
);
```

## `UI.Context`

```text
public static Context<T> Context<T>(T fallback = default)
```

A scoped typed dependency with a fallback outside providers. Provide creates a parent-owned scope whose value is available to declarations and later effects or native callbacks created inside it. The nearest provider wins; context values are not reactive by themselves. Supply reactive state as the context value when needed.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `fallback` | Optional construction callback used when the selected primary branch is absent. |

**Returns:** A typed context key with its fallback value; providers resolve through the active scope.

```csharp
var theme = UI.Context(fallback: UnityEngine.Color.white);
theme.Provide(
    UnityEngine.Color.green,
    () => UI.Label(text: "Theme", UI.Tint(color: theme.Value))
);
```

## `UI.Cleanup`

```text
public static void Cleanup(Action cleanup)
```

Registers a callback, disposable or Unity object with the active scope. Cleanup occurs in reverse registration order when the scope ends or an effect reruns. Unity objects are destroyed at the end of the frame in Play Mode and immediately in Edit Mode; callback failures do not skip other resources.

| Parameter | Meaning |
| --- | --- |
| `cleanup` | Callback attempted when the active scope cleans up. |

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Cleanup(cleanup: () => UnityEngine.Debug.Log("Interface removed"));
```

```text
public static void Cleanup(IDisposable disposable)
```

Registers a callback, disposable or Unity object with the active scope. Cleanup occurs in reverse registration order when the scope ends or an effect reruns. Unity objects are destroyed at the end of the frame in Play Mode and immediately in Edit Mode; callback failures do not skip other resources.

| Parameter | Meaning |
| --- | --- |
| `disposable` | Resource disposed by the active scope in reverse registration order. |

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Cleanup(cleanup: () => UnityEngine.Debug.Log("Interface removed"));
```

## `UI.Batch`

```text
public static void Batch(Action action)
```

Runs several writes as one synchronous update transaction. Derived calculations settle before effects, and effects are deferred until the outermost batch finishes. Reads of derived values inside the batch still observe current upstream values. It batches notifications rather than rolling back writes on failure.

| Parameter | Meaning |
| --- | --- |
| `action` | Callback/action executed in the documented phase or event scope. |

```csharp
UI.Batch(action: () =>
{
    count.Value++;
    score.Value = 0;
});
```

## `UI.Untrack`

```text
public static T Untrack<T>(Func<T> read)
```

Runs a read or action with dependency collection temporarily suspended. Scope ownership and context remain active. Use for one-time native operations or event callbacks that should not become dependencies of an enclosing observer.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |

**Returns:** The typed result described above; reactive reads participate in the active observer.

```csharp
int snapshot = UI.Untrack(() => count.Value);
```

```text
public static void Untrack(Action action)
```

Runs a read or action with dependency collection temporarily suspended. Scope ownership and context remain active. Use for one-time native operations or event callbacks that should not become dependencies of an enclosing observer.

| Parameter | Meaning |
| --- | --- |
| `action` | Callback/action executed in the documented phase or event scope. |

```csharp
int snapshot = UI.Untrack(() => count.Value);
```

## `UI.Step`

```text
public static void Step(double deltaTime)
```

Advances the shared spring/polling/exit-delay clock manually by a finite non-negative number of seconds. Once manual stepping is selected, automatic RuntimeHost stepping is disabled until subsystem reset. Use a fixed simulation delta for deterministic tests rather than mixing manual and automatic advancement.

| Parameter | Meaning |
| --- | --- |
| `deltaTime` | Finite non-negative seconds by which to advance the shared clock manually. |

```csharp
UI.Step(deltaTime: 1.0 / 60.0);
```
