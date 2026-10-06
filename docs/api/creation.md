---
title: Declarations and native access
---

# Declarations and native access

`P.Text`, `P.Button`, `P.Vertical`, `P.Horizontal` and every catalog factory return deferred `View` declarations. Mount builds each occurrence once, then applies props and references before activation.

| API | Behavior |
| --- | --- |
| `view.With(params View[])` | Immutable child/modifier composition. |
| `view.With(Func<IEnumerable<View>>)` | Tracked child collection with retained declaration identity. |
| `P.Self(view)` | Explicit same-GameObject placement. |
| `P.Declare<T>(configure, reference, modifier, active)` | Custom native component using the same ownership rules. |
| `P.Mount(view)` / `P.Mount(Func<View>)` | Explicit mount with scope, native root and canvas. |
| `reference: Action<NativeType>` | Capture the built native component before activation. |
| `configure: Action<NativeType>` | One-time native configuration after named props and children. |

```csharp
UnityEngine.UI.Button native = null;
var view = P.Button("Save", reference: button => native = button);
using var mount = P.Mount(view);
native.onClick.Invoke();
```

The imperative `P.Create<T>`, `P.Apply`, `P.Bind`, typed property groups and custom native events remain available for advanced integration. They return live native components and require an ownership scope. Their `TextProperty`, `VerticalProperty` and `HorizontalProperty` helpers have distinct names from the new view factories. Do not mix imperative property entries into `.With`; use named props or `configure` instead.
