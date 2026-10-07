---
title: "Unity UI defaults and configuration (Pine 1.1.0)"
sidebar_label: Native defaults and configuration
description: "Configure Pine native UI defaults, TMP fonts, CanvasOptions and explicit layout sizing. Learn deferred wiring and advanced imperative property settings. Pine 1.1.0 documentation."
---

# Native defaults and configuration

The deferred API always wires required native references. Omitted native props keep constructor defaults; layouts do not silently enable child sizing. Set `childControlWidth`, `childControlHeight`, LayoutElement sizing and expansion explicitly when needed.

`P.DefaultFont` supplies a code-selected TMP font; otherwise Pine resolves its bundled/project TMP fallback. `CanvasOptions` configures automatically created canvases. An explicit `P.Canvas(children: new[] { P.CanvasScaler(...), ... })` uses its own declared native settings. Native structs pass through unchanged.

`P.Strict`, `P.Defaults` and `P.DeferNestedProperties` govern advanced imperative property processing. `Defaults` only controls `Create` wiring; it does not disable wiring for deferred views. Unity-forbidden multiplicity and Graphic conflicts are always rejected; permitted repeated components have separate instances. [Mount reference](mount-reference.md).

## Make layout ownership explicit

Set container dimensions with native transform props such as `sizeDelta`, then decide whether the layout controls its children's width and height. Give children `P.LayoutElement` declarations for their preferred sizing. Set expansion separately: controlling height and forcing children to expand are different native layout choices.

The [counter example](../tutorials/counter.md) uses a vertical container with `childControlWidth` and `childControlHeight` enabled, `childForceExpandHeight` disabled, and a preferred height for each child. Copy that complete example when diagnosing a zero-sized interface; changing state bindings does not fix native layout sizing.

## Automatic or explicit canvas

Use the generated `App.Mount` host when you want Pine to supply the canvas and compatible EventSystem. Return an explicit `P.Canvas` root when the view needs its own declared canvas and scaler settings. `CanvasOptions` applies to automatically created canvases, while a declared canvas uses the props you supplied. The [mount reference](mount-reference.md) lists those options, including persistence across scene changes. The [installation tutorial](../tutorials/installation.md) covers automatic startup and existing input ownership.

For native Inspector settings and their Unity version gates, use the [controls reference](controls-reference.md). Advanced imperative switches do not change the deferred API's required wiring or allow conflicting same-object declarations.
