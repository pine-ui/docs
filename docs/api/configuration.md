---
title: Pine configuration and Unity setup
sidebar_label: Configuration
description: Configure typed Pine defaults, fonts, input preservation, canvas scaling, safe areas and reduced motion in code.
---

# Pine configuration and Unity setup

| Setting | Default | Meaning |
| --- | --- | --- |
| `UI.Version` | `1.0.0` | Working API base version; package.json identifies the `1.0.0` distribution. |
| `UI.Strict` | `true` | Duplicate named-property diagnostics within groups and duplicate child diagnostics. |
| `UI.Defaults` | `true` | Native text, graphic and selectable defaults during creation. |
| `UI.DeferNestedProperties` | `true` | Process nested groups after outer declarations within ordering phases. |
| `UI.DefaultFont` | `null` | Code-supplied default font; null selects the bundled Latin fallback. |
| `UI.ReducedMotion.Value` | `false` | Snap spring targets and remove native control/dropdown fades. |

Configure defaults before creating UI. Unity subsystem initialization restores creation flags, the default font and reduced-motion preference. Restore application preferences in your startup code. `Font(...)` can bind a font on an existing label; changing DefaultFont affects subsequent text construction.

## Fonts and localization

The bundled Liberation Sans SDF includes 567 glyphs, covering accented Latin and common punctuation. Its SIL Open Font License is included separately from Pine's MIT source license. Code-configured fonts can supply additional glyph sets and fallbacks through native TMP font assets.

```csharp
UI.DefaultFont = applicationFont;
var locale = UI.Source(value: "en");
UI.Label(
    text: () => translations[locale.Value]["welcome"],
    UI.Font(font: () => fonts[locale.Value]),
    UI.FontSize(size: 28)
);
```

Translations are ordinary typed reactive text inputs. Native TMP font fallback tables can be configured by application code. Existing project TMP settings are preserved; missing-only setup supplies settings and line-breaking/style resources. See [installation](../tutorials/installation.md) for exact ownership and input behavior.

## Native defaults

Created RectTransforms start at 160×40. Labels use Pine's resolved font, size 24, white text and decorative raycasts disabled. Selectables have a background target graphic, automatic navigation and distinct native focus/pressed/disabled colors. Complete control factories supply required child components.

`Defaults = false` disables these creation defaults. Supply required text fonts and control configuration yourself when using low-level Create; standard application declarations should retain the default.

## Group ordering and diagnostics

Actions run first, sorted by numeric priority with stable declaration order for ties. Ordinary properties follow; parenting runs afterward. Nested groups follow `DeferNestedProperties`. Strict mode catches repeated named operations within a group and repeated child transforms. Compile-time compatibility remains enforced independently of Strict. Independent bindings to the same native field can compete; give each field one controlling declaration.

## Canvas options

`CanvasOptions.Persistent` defaults to true and is read once at mounting. Set it false for scene-lived UI through optional `App.Options`. The remaining fields are typed reactive Name, ReferenceResolution, SortOrder, RenderMode, Camera, Scale, SafeArea, WorldPosition, WorldRotation and WorldSize inputs. A parentless mount owns and configures its canvas. A supplied parent preserves its existing canvas and external input ownership. The [complete mount reference](mount-reference.md) documents each field and lifetime member.
