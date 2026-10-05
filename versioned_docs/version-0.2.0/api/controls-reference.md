---
title: Pine complete native controls API
sidebar_label: Complete native controls
description: Complete typed reference with overloads, parameters, ownership and examples for Pine complete native controls.
---

# Complete native controls

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `UI.Root(...)` unless they only create state/configuration. Explicit `UI.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `UI.Button`

```text
public static Button Button(Value<string> text, Action click, params IProperty<Button>[] properties)
```

Creates a complete native Button with a background target graphic, centered TMP label, visible focus colors and an owned click handler. Text accepts literals or tracked getters. Mouse/touch and navigation submit are handled by Unity's compatible input module.

| Parameter | Meaning |
| --- | --- |
| `text` | The typed text input (Value&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `click` | Owned callback invoked by native pointer or navigation submit. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Button(
    text: "Increment",
    click: () => count.Value++,
    UI.Size(width: 240, height: 48)
);
```

```text
public static Button Button(Func<string> text, Action click, params IProperty<Button>[] properties)
```

Creates a complete native Button with a background target graphic, centered TMP label, visible focus colors and an owned click handler. Text accepts literals or tracked getters. Mouse/touch and navigation submit are handled by Unity's compatible input module.

| Parameter | Meaning |
| --- | --- |
| `text` | The typed text input (Func&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `click` | Owned callback invoked by native pointer or navigation submit. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Button(
    text: "Increment",
    click: () => count.Value++,
    UI.Size(width: 240, height: 48)
);
```

## `UI.Toggle`

```text
public static Toggle Toggle(Source<bool> value, params IProperty<Toggle>[] properties)
```

Creates a complete native Toggle with background, checkmark and centered label. A Source&lt;bool&gt; provides two-way binding; Value&lt;bool&gt; provides source-to-control binding. Pine owns graphic wiring, default navigation and focus colors.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var enabled = UI.Source(value: false);
UI.Toggle(value: enabled, text: "Enabled", UI.Size(width: 240, height: 48));
```

```text
public static Toggle Toggle(Source<bool> value, Value<string> text, params IProperty<Toggle>[] properties)
```

Creates a complete native Toggle with background, checkmark and centered label. A Source&lt;bool&gt; provides two-way binding; Value&lt;bool&gt; provides source-to-control binding. Pine owns graphic wiring, default navigation and focus colors.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `text` | The typed text input (Value&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var enabled = UI.Source(value: false);
UI.Toggle(value: enabled, text: "Enabled", UI.Size(width: 240, height: 48));
```

```text
public static Toggle Toggle(Value<bool> value, params IProperty<Toggle>[] properties)
```

Creates a complete native Toggle with background, checkmark and centered label. A Source&lt;bool&gt; provides two-way binding; Value&lt;bool&gt; provides source-to-control binding. Pine owns graphic wiring, default navigation and focus colors.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var enabled = UI.Source(value: false);
UI.Toggle(value: enabled, text: "Enabled", UI.Size(width: 240, height: 48));
```

```text
public static Toggle Toggle(Value<bool> value, Value<string> text, params IProperty<Toggle>[] properties)
```

Creates a complete native Toggle with background, checkmark and centered label. A Source&lt;bool&gt; provides two-way binding; Value&lt;bool&gt; provides source-to-control binding. Pine owns graphic wiring, default navigation and focus colors.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `text` | The typed text input (Value&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var enabled = UI.Source(value: false);
UI.Toggle(value: enabled, text: "Enabled", UI.Size(width: 240, height: 48));
```

## `UI.Slider`

```text
public static Slider Slider(Source<float> value, params IProperty<Slider>[] properties)
```

Creates a complete native Slider with background, fill and handle. A Source&lt;float&gt; is two-way and normalizes to native clamping; Value&lt;float&gt; is one-way. Bounds accept reactive finite values, including negative minima; maximum must be at least minimum.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var volume = UI.Source(value: 0.5f);
UI.Slider(
    value: volume,
    minimum: 0f,
    maximum: 1f,
    UI.Size(width: 240, height: 48)
);
```

```text
public static Slider Slider(Source<float> value, Value<float> minimum, Value<float>? maximum, params IProperty<Slider>[] properties)
```

Creates a complete native Slider with background, fill and handle. A Source&lt;float&gt; is two-way and normalizes to native clamping; Value&lt;float&gt; is one-way. Bounds accept reactive finite values, including negative minima; maximum must be at least minimum.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `minimum` | Reactive finite lower bound; negative values are supported. |
| `maximum` | Reactive finite upper bound, at least the lower bound. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var volume = UI.Source(value: 0.5f);
UI.Slider(
    value: volume,
    minimum: 0f,
    maximum: 1f,
    UI.Size(width: 240, height: 48)
);
```

```text
public static Slider Slider(Value<float> value, params IProperty<Slider>[] properties)
```

Creates a complete native Slider with background, fill and handle. A Source&lt;float&gt; is two-way and normalizes to native clamping; Value&lt;float&gt; is one-way. Bounds accept reactive finite values, including negative minima; maximum must be at least minimum.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var volume = UI.Source(value: 0.5f);
UI.Slider(
    value: volume,
    minimum: 0f,
    maximum: 1f,
    UI.Size(width: 240, height: 48)
);
```

```text
public static Slider Slider(Value<float> value, Value<float> minimum, Value<float>? maximum, params IProperty<Slider>[] properties)
```

Creates a complete native Slider with background, fill and handle. A Source&lt;float&gt; is two-way and normalizes to native clamping; Value&lt;float&gt; is one-way. Bounds accept reactive finite values, including negative minima; maximum must be at least minimum.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `minimum` | Reactive finite lower bound; negative values are supported. |
| `maximum` | Reactive finite upper bound, at least the lower bound. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var volume = UI.Source(value: 0.5f);
UI.Slider(
    value: volume,
    minimum: 0f,
    maximum: 1f,
    UI.Size(width: 240, height: 48)
);
```

## `UI.Scrollbar`

```text
public static Scrollbar Scrollbar(Source<float> value, params IProperty<Scrollbar>[] properties)
```

Creates a complete native Scrollbar with a wired handle and target graphic. Source&lt;float&gt; binds two ways; Value&lt;float&gt; binds one way. Normalized size defaults to 0.2 and can be reactive.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var position = UI.Source(value: 0f);
UI.Scrollbar(value: position, UI.Size(width: 240, height: 24));
```

```text
public static Scrollbar Scrollbar(Source<float> value, Value<float>? size, params IProperty<Scrollbar>[] properties)
```

Creates a complete native Scrollbar with a wired handle and target graphic. Source&lt;float&gt; binds two ways; Value&lt;float&gt; binds one way. Normalized size defaults to 0.2 and can be reactive.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `size` | The typed size input (Value&lt;float&gt;?); literals and supported reactive adapters follow this overload's documented behavior. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var position = UI.Source(value: 0f);
UI.Scrollbar(value: position, UI.Size(width: 240, height: 24));
```

```text
public static Scrollbar Scrollbar(Value<float> value, params IProperty<Scrollbar>[] properties)
```

Creates a complete native Scrollbar with a wired handle and target graphic. Source&lt;float&gt; binds two ways; Value&lt;float&gt; binds one way. Normalized size defaults to 0.2 and can be reactive.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var position = UI.Source(value: 0f);
UI.Scrollbar(value: position, UI.Size(width: 240, height: 24));
```

```text
public static Scrollbar Scrollbar(Value<float> value, Value<float>? size, params IProperty<Scrollbar>[] properties)
```

Creates a complete native Scrollbar with a wired handle and target graphic. Source&lt;float&gt; binds two ways; Value&lt;float&gt; binds one way. Normalized size defaults to 0.2 and can be reactive.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `size` | The typed size input (Value&lt;float&gt;?); literals and supported reactive adapters follow this overload's documented behavior. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var position = UI.Source(value: 0f);
UI.Scrollbar(value: position, UI.Size(width: 240, height: 24));
```

## `UI.TextField`

```text
public static TMP_InputField TextField(Source<string> value, params IProperty<TMP_InputField>[] properties)
```

Creates a complete TMP_InputField with a clipped text viewport, text component, placeholder and caret. Source&lt;string&gt; binds two ways; Value&lt;string&gt; binds one way. Native Unity supplies keyboard/IME behavior, and properties remain typed to the field.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var playerName = UI.Source(value: "");
UI.TextField(
    value: playerName,
    placeholder: "Name",
    UI.CharacterLimit(limit: 24),
    UI.Size(width: 240, height: 48)
);
```

```text
public static TMP_InputField TextField(Source<string> value, Value<string> placeholder, params IProperty<TMP_InputField>[] properties)
```

Creates a complete TMP_InputField with a clipped text viewport, text component, placeholder and caret. Source&lt;string&gt; binds two ways; Value&lt;string&gt; binds one way. Native Unity supplies keyboard/IME behavior, and properties remain typed to the field.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `placeholder` | The typed placeholder input (Value&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var playerName = UI.Source(value: "");
UI.TextField(
    value: playerName,
    placeholder: "Name",
    UI.CharacterLimit(limit: 24),
    UI.Size(width: 240, height: 48)
);
```

```text
public static TMP_InputField TextField(Value<string> value, params IProperty<TMP_InputField>[] properties)
```

Creates a complete TMP_InputField with a clipped text viewport, text component, placeholder and caret. Source&lt;string&gt; binds two ways; Value&lt;string&gt; binds one way. Native Unity supplies keyboard/IME behavior, and properties remain typed to the field.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var playerName = UI.Source(value: "");
UI.TextField(
    value: playerName,
    placeholder: "Name",
    UI.CharacterLimit(limit: 24),
    UI.Size(width: 240, height: 48)
);
```

```text
public static TMP_InputField TextField(Value<string> value, Value<string> placeholder, params IProperty<TMP_InputField>[] properties)
```

Creates a complete TMP_InputField with a clipped text viewport, text component, placeholder and caret. Source&lt;string&gt; binds two ways; Value&lt;string&gt; binds one way. Native Unity supplies keyboard/IME behavior, and properties remain typed to the field.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `placeholder` | The typed placeholder input (Value&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var playerName = UI.Source(value: "");
UI.TextField(
    value: playerName,
    placeholder: "Name",
    UI.CharacterLimit(limit: 24),
    UI.Size(width: 240, height: 48)
);
```

## `UI.Dropdown`

```text
public static TMP_Dropdown Dropdown(Source<int> selected, Value<string[]> options, params IProperty<TMP_Dropdown>[] properties)
```

Creates a complete TMP_Dropdown with caption, inactive scrollable template, item toggle and label. Options and selection accept typed reactive inputs. Source&lt;int&gt; binds two ways and stays normalized when options change. Changed option names close an expanded native menu immediately; selection-only updates preserve its items. Reduced motion disables native fade travel.

| Parameter | Meaning |
| --- | --- |
| `selected` | The typed selected input (Source&lt;int&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `options` | Typed reactive option labels in display order. Null is treated as an empty collection; changing names closes an expanded native menu to avoid stale choices. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var selection = UI.Source(value: 0);
UI.Dropdown(
    selected: selection,
    options: new[] { "Low", "High" },
    UI.Size(width: 240, height: 48)
);
```

```text
public static TMP_Dropdown Dropdown(Value<int> selected, Value<string[]> options, params IProperty<TMP_Dropdown>[] properties)
```

Creates a complete TMP_Dropdown with caption, inactive scrollable template, item toggle and label. Options and selection accept typed reactive inputs. Source&lt;int&gt; binds two ways and stays normalized when options change. Changed option names close an expanded native menu immediately; selection-only updates preserve its items. Reduced motion disables native fade travel.

| Parameter | Meaning |
| --- | --- |
| `selected` | The typed selected input (Value&lt;int&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `options` | Typed reactive option labels in display order. Null is treated as an empty collection; changing names closes an expanded native menu to avoid stale choices. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var selection = UI.Source(value: 0);
UI.Dropdown(
    selected: selection,
    options: new[] { "Low", "High" },
    UI.Size(width: 240, height: 48)
);
```

## `UI.ScrollView`

```text
public static ScrollRect ScrollView(Component content, params IProperty<ScrollRect>[] properties)
```

Creates a complete native ScrollRect with a clipped viewport and drag-receiving surface. Native content results attach without losing their identity; a construction getter builds content within a fill-width, auto-height host. Scrolling is vertical by default and axes can be configured explicitly.

| Parameter | Meaning |
| --- | --- |
| `content` | Native scroll content or scoped construction callback; the viewport is supplied internally. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.ScrollView(
    content: UI.Column(UI.AutoHeight(), UI.Children(UI.Label(text: "Content"))),
    UI.Size(width: 300, height: 120)
);
```

```text
public static ScrollRect ScrollView(Func<Component> content, params IProperty<ScrollRect>[] properties)
```

Creates a complete native ScrollRect with a clipped viewport and drag-receiving surface. Native content results attach without losing their identity; a construction getter builds content within a fill-width, auto-height host. Scrolling is vertical by default and axes can be configured explicitly.

| Parameter | Meaning |
| --- | --- |
| `content` | Native scroll content or scoped construction callback; the viewport is supplied internally. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.ScrollView(
    content: UI.Column(UI.AutoHeight(), UI.Children(UI.Label(text: "Content"))),
    UI.Size(width: 300, height: 120)
);
```

## `UI.Progress`

```text
public static Image Progress(Value<float> value, params IProperty<Image>[] properties)
```

Creates a native horizontal filled Image backed by a generated white sprite. Progress is clamped between zero and one and supports typed reactive values/getters. Apply Tint, Size and other Image-compatible declarations normally.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Progress(value: () => health.Value / 100f, UI.Size(width: 300, height: 20));
```

```text
public static Image Progress(Func<float> value, params IProperty<Image>[] properties)
```

Creates a native horizontal filled Image backed by a generated white sprite. Progress is clamped between zero and one and supports typed reactive values/getters. Apply Tint, Size and other Image-compatible declarations normally.

| Parameter | Meaning |
| --- | --- |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Progress(value: () => health.Value / 100f, UI.Size(width: 300, height: 20));
```

## `UI.Placeholder`

```text
public static IProperty<TMP_InputField> Placeholder(Value<string> text)
```

Binds the text of a completely wired TMP_InputField placeholder. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `text` | The typed text input (Value&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.TextField(value: playerName, UI.Placeholder(text: "Name"));
```

```text
public static IProperty<TMP_InputField> Placeholder(Func<string> text)
```

Binds the text of a completely wired TMP_InputField placeholder. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `text` | The typed text input (Func&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.TextField(value: playerName, UI.Placeholder(text: "Name"));
```

## `UI.CharacterLimit`

```text
public static IProperty<TMP_InputField> CharacterLimit(Value<int> limit)
```

Binds the native text-field character limit; zero means unlimited and negative limits are rejected. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `limit` | The typed limit input (Value&lt;int&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.TextField(value: playerName, UI.CharacterLimit(limit: 24));
```

## `UI.SliderDirection`

```text
public static IProperty<Slider> SliderDirection(Value<Slider.Direction> direction)
```

Binds the native slider direction. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `direction` | The typed direction input (Value&lt;Slider.Direction&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Slider(
    value: volume,
    UI.SliderDirection(direction: UnityEngine.UI.Slider.Direction.BottomToTop)
);
```

## `UI.WholeNumbers`

```text
public static IProperty<Slider> WholeNumbers(Value<bool> enabled)
```

Binds whether the native slider rounds values to whole numbers. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `enabled` | The typed enabled input (Value&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Slider(
    value: count,
    minimum: 0f,
    maximum: 10f,
    UI.WholeNumbers(enabled: true)
);
```

## `UI.ScrollbarDirection`

```text
public static IProperty<Scrollbar> ScrollbarDirection(Value<Scrollbar.Direction> direction)
```

Binds the native scrollbar direction. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `direction` | The typed direction input (Value&lt;Scrollbar.Direction&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Scrollbar(
    value: position,
    UI.ScrollbarDirection(
        direction: UnityEngine.UI.Scrollbar.Direction.BottomToTop
    )
);
```

## `UI.ScrollAxes`

```text
public static IProperty<ScrollRect> ScrollAxes(Value<bool> horizontal, Value<bool> vertical)
```

Binds horizontal and vertical scroll-axis enablement. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `horizontal` | The typed horizontal input (Value&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `vertical` | The typed vertical input (Value&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.ScrollView(
    content: content,
    UI.ScrollAxes(horizontal: false, vertical: true)
);
```

## `UI.ScrollPosition`

```text
public static IProperty<ScrollRect> ScrollPosition(Value<Vector2> position)
```

Binds native normalized scroll position; layout and movement settings remain native ScrollRect behavior. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `position` | Typed immediate position or reactive native position, as specified by this overload. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.ScrollView(
    content: content,
    UI.ScrollPosition(position: new UnityEngine.Vector2(x: 0, y: 1))
);
```
