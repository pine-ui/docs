---
title: Pine configuration and Unity setup
sidebar_label: Configuration
description: Configure Pine defaults, strict diagnostics, property grouping, native layout, TextMeshPro resources, and Unity input dependencies.
---

# Pine configuration and Unity setup

| Property | Default | Meaning |
| --- | --- | --- |
| `Pine.Version` | `0.1.0` | Package version. |
| `Pine.Strict` | `true` | Duplicate-property and duplicate-child diagnostics. |
| `Pine.Defaults` | `true` | Native defaults applied by component creation. |
| `Pine.DeferNestedProperties` | `true` | Process nested groups after outer properties within ordering phases. |

Unity subsystem initialization restores these flags. Configure them before constructing your UI. Ownership, derived-write, unique-key, cycle and numeric-input guards validate reactive operations.

## Package environment

The package manifest declares Unity **6000.7.0b2**, uGUI **2.7.0** and Input System **6.7.0**. Text uses TextMeshPro settings and `TMP_Settings.defaultFontAsset`. Enable the Input System backend in project settings.

## Defaults and layout

Creation sets a RectTransform size of `(160,40)`. TMP text uses the configured default font, size `24`, white color and a disabled text raycast target. Buttons use an Image target graphic. Set `Defaults = false` to configure native creation explicitly.

`DeferNestedProperties` controls group traversal; actions retain their priority ordering and parenting follows ordinary properties. Strict mode detects repeated named properties within a group and repeated child transforms.

## Versioned documentation

These API pages and tutorials document Pine **0.1.0**. Install the tagged package with `https://github.com/pine-ui/package.git#v0.1.0`.
