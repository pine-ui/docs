---
title: Native defaults and configuration
---

# Native defaults and configuration

The deferred API always wires required native references. Omitted native props keep constructor defaults; layouts do not silently enable child sizing. Set `childControlWidth`, `childControlHeight`, LayoutElement sizing and expansion explicitly when needed.

`P.DefaultFont` supplies a code-selected TMP font; otherwise Pine resolves its bundled/project TMP fallback. `CanvasOptions` configures automatically created canvases. An explicit `P.Canvas(...).With(P.CanvasScaler(...), ...)` uses its own declared native settings. Native structs pass through unchanged.

`P.Strict`, `P.Defaults` and `P.DeferNestedProperties` govern advanced imperative property processing. `Defaults` only controls `Create` wiring; it does not disable wiring for deferred views. Duplicate explicit same-object declarations and Graphic conflicts are always rejected. [Mount reference](mount-reference.md).
