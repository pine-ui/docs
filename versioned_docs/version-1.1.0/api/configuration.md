---
title: "Unity UI defaults and configuration (Pine 1.1.0)"
sidebar_label: Native defaults and configuration
description: "Configure Pine native UI defaults, TMP fonts, CanvasOptions and explicit layout sizing. Learn deferred wiring and advanced imperative property settings. Pine 1.1.0 documentation."
---

# Native defaults and configuration

The deferred API always wires required native references. Omitted native props keep constructor defaults; layouts do not silently enable child sizing. Set `childControlWidth`, `childControlHeight`, LayoutElement sizing and expansion explicitly when needed.

`P.DefaultFont` supplies a code-selected TMP font; otherwise Pine resolves its bundled/project TMP fallback. `CanvasOptions` configures automatically created canvases. An explicit `P.Canvas(children: new[] { P.CanvasScaler(...), ... })` uses its own declared native settings. Native structs pass through unchanged.

`P.Strict`, `P.Defaults` and `P.DeferNestedProperties` govern advanced imperative property processing. `Defaults` only controls `Create` wiring; it does not disable wiring for deferred views. Unity-forbidden multiplicity and Graphic conflicts are always rejected; permitted repeated components have separate instances. [Mount reference](mount-reference.md).
