---
title: "Native Unity UI integration API (Pine 1.2.0)"
sidebar_label: Native integration
description: "Integrate Pine with native Unity components using reference, configure, Bind, Set, Apply and On. Declare custom components inside the owning reactive scope. Pine 1.2.0 documentation."
---

# Native integration

Use named factory props for native Inspector settings. `reference` captures a built component; `configure` handles one-time native work. For additional reactive native integration, use `P.Bind`, `P.Set`, `P.Apply` and `P.On` inside the owning scope. `P.Declare<T>` supports user-authored native components without reflection dispatch or a registration table. [Imperative integration reference](native-reference.md).

## Choose the integration point

| Need | Integration |
| --- | --- |
| Set a supported native property | Supply its named factory prop, using a literal or reactive value. |
| Capture the built component | Supply `reference`; it receives the actual native component. |
| Perform one-time setup after props and children | Supply `configure`. |
| Bind additional native state reactively | Use `P.Bind` or `P.Set` inside the owning scope. |
| Apply imperative property declarations | Use `P.Apply` on the native target. |
| Declare a user-authored Unity component | Use `P.Declare<T>` with the native component type. |

Capturing a reference does not make later reads reactive. Use a binding when the native property must follow changing state; use `configure` for work that should run once. The [deferred creation API](creation.md) explains when references and configuration run during mounting.

## Keep native objects and declarations separate

`View` describes what Pine will mount. A `UnityEngine.Component` reference is the object created from that declaration. Deferred factory `children` composition accepts declarations and modifiers; advanced imperative `Create`, `Apply` and `Bind` operate on native objects. Choose the path that matches what you already own, then keep its observers and event handlers inside the same live scope.

The [native integration reference](native-reference.md) contains signatures and constraints. Start with [native controls](controls.md) and [reactive props](../tutorials/reactivity.md) when a named prop already covers the setting you need.
