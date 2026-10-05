---
title: Runnable Pine feature examples
sidebar_label: All-feature examples
description: Run Pine examples for sources, effects, context, native composition, properties, events, branches, lists, mounts and springs.
---

# Runnable Pine feature examples

[Download PineFeatureExamples.cs](/examples/0.2.0/PineFeatureExamples.cs). Import it into a project containing Pine and run `PineDocs.Examples.PineFeatureExamples.Run()` on the Unity main thread. It creates explicit ownership roots and disposes the resources of every example. It is an execution/reference suite; use MonoBehaviour for a lasting application screen.

The suite runs these complete examples:

| Method | Features demonstrated |
| --- | --- |
| `SourcesAndDerived` | Primitive/reference equality, custom comparers, eager cached derivation, mutation notification and batching. |
| `EffectHistory` | Effects, previous results, untracked reads and per-execution cleanup. |
| `ScopeOwnership` | All Root shapes, scoped Run results, owned disposables and cleanup ordering. |
| `ContextProviders` | Fallback, nearest provider, returning providers and retained callback/effect context. |
| `ReactiveInputs` | Literal/getter Value adapters, source/derived/spring conversions and Read overloads. |
| `NativeComposition` | Typed groups, generic Create, native Clone, Apply, Bind, named setters, configuration and action priority. |
| `LayoutAndGraphics` | Rows, columns, fixed/reactive dimensions and positions, opacity, activity, enabled controls and colors. |
| `EventsAndTwoWayBindings` | Native click/value events, control source bindings and notification-free updates. |
| `ChangedAndPolling` | Initial/distinct native values through events and clock polling. |
| `ReactiveChildren` | Retained native children, membership/order updates and external ownership. |
| `ConditionalBranches` | Show, Switch, truthy filtering, dictionary fallbacks, presence and delayed exits. |
| `KeyedLists` | Positional/keyed Indexes, Values identity, reorder, replacement and exits. |
| `MountSurfaces` | Owned overlay and externally parented camera/world canvas lifetimes. |
| `SpringsAndSpaces` | Reactive spring settings, manual stepping, controls, custom spaces and Unity value spaces. |
| `CreationFlags` | Strict diagnostics, defaults and nested group ordering. |

The [settings screen](../api/controls.md) demonstrates every standard control and MonoBehaviour ownership. The complete reference includes an example for every public/protected declaration, including [explicit mount options](../api/mount-reference.md), [exact/fill/content layout](../api/layout-reference.md) and [read-only operator values](../api/signal-reference.md).

Each method is an ordinary C# function. Keep the portions needed by your application; running the suite switches to manual clock advancement through UI.Step, so run it in a dedicated test session rather than during an automatically animated game.
