---
title: Pine native declarations and bindings API
sidebar_label: Native declarations and bindings
description: Complete typed reference with overloads, parameters, ownership and examples for Pine native declarations and bindings.
---

# Native declarations and bindings

This reference documents every current public declaration in this part of Pine. Examples run inside `App.Mount()`, a component factory, or an explicit `P.Root(...)` unless they only create state/configuration. Explicit `P.Mount(...)` remains available for advanced ownership. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `IProperty`

```text
IProperty<in T>
```

A contravariant declaration operation restricted to compatible native component types.

## `IProperty.Apply`

```text
void Apply(T target)
```

Applies this compatible property to the supplied native target in the current ownership scope.

## `GraphicProperty`

```text
GraphicProperty
```

A color binding shared by native Graphics and Selectables.

## `GraphicProperty.Identity`

```text
string Identity
```

The named native operation used by strict duplicate diagnostics.

## `Mount`

```text
Mount
```

An explicit mounted interface lifetime.

## `Mount.Scope`

```text
Scope Scope
```

The scope owning this mounted interface, including bindings and native objects.

## `Mount.Root`

```text
GameObject Root
```

The native root returned by the mount builder.

## `Mount.Canvas`

```text
Canvas Canvas
```

The Pine-created canvas or nearest ancestor canvas of an explicit parent.

## `Mount.Dispose`

```text
public void Dispose()
```

Ends this owned lifetime idempotently.

## `P.Cleanup`

```text
public static void Cleanup(UnityEngine.Object target)
```

Registers a callback, disposable or Unity object with the active scope.

## `P.Create`

```text
public static T Create<T>(params IProperty<T>[] properties) where T : Component
```

Creates and owns a GameObject, RectTransform and the native component T, then applies compatible typed properties.

## `P.Clone`

```text
public static T Clone<T>(T template, params IProperty<T>[] properties) where T : Component
```

Owns a native clone of the supplied component's GameObject, preserves its serialized native configuration, and applies compatible properties.

## `P.Apply`

```text
public static T Apply<T>(T target, params IProperty<T>[] properties) where T : Component
```

Applies compatible declarations to an existing native component in the active scope.

## `P.Group`

```text
public static IProperty<T> Group<T>(params IProperty<T>[] properties) where T : Component
```

Composes reusable properties for one explicit native target type.

## `P.Action`

```text
public static IProperty<T> Action<T>(Action<T> action, int priority = 1) where T : Component
```

Runs a one-time typed action before ordinary properties and parenting.

## `P.Configure`

```text
public static IProperty<T> Configure<T>(Action<T> configure) where T : Component
```

Runs a one-time typed native configuration in the ordinary-property phase.

## `P.Set`

```text
public static IProperty<T> Set<T, TValue>(string name, Action<T, TValue> set, Value<TValue> value) where T : Component
```

Declares a named typed native assignment.

```text
public static IProperty<T> Set<T, TValue>(string name, Action<T, TValue> set, Func<TValue> read) where T : Component
```

Declares a named typed native assignment.

## `P.Bind`

```text
public static T Bind<T, TValue>(this T component, Func<TValue> read, Action<T, TValue> apply) where T : Component
```

Adds an owned reactive getter/setter binding to a saved native component and returns the same component.

## `P.Name`

```text
public static IProperty<Component> Name(Value<string> name)
```

Binds the native GameObject name.

```text
public static IProperty<Component> Name(Func<string> name)
```

Binds the native GameObject name.

## `P.Active`

```text
public static IProperty<Component> Active(Value<bool> active)
```

Binds GameObject activeSelf; disabling a native object does not dispose its construction scope.

```text
public static IProperty<Component> Active(Func<bool> active)
```

Binds GameObject activeSelf; disabling a native object does not dispose its construction scope.

## `P.Parent`

```text
public static IProperty<Component> Parent(Value<Transform> parent)
```

Binds the native parent Transform while preserving local UI transforms.

```text
public static IProperty<Component> Parent(Func<Transform> parent)
```

Binds the native parent Transform while preserving local UI transforms.

## `P.Children`

```text
public static IProperty<Component> Children(params Component[] children)
```

Composes native child components explicitly.

```text
public static IProperty<Component> Children(Func<IEnumerable<Component>> read)
```

Composes native child components explicitly.

```text
public static IProperty<Component> Children(Func<IEnumerable<GameObject>> read)
```

Composes native child components explicitly.

## `P.On`

```text
public static IProperty<T> On<T>(Func<T, UnityEvent> select, Action action) where T : Component
```

Registers a native UnityEvent handler for the compatible target type and removes it when the scope ends.

```text
public static IProperty<T> On<T, TValue>(Func<T, UnityEvent<TValue>> select, Action<TValue> action) where T : Component
```

Registers a native UnityEvent handler for the compatible target type and removes it when the scope ends.

## `P.OnClick`

```text
public static IProperty<Button> OnClick(Action action)
```

Registers an owned Button click handler.

## `P.Changed`

```text
public static IProperty<T> Changed<T, TValue>(Func<T, TValue> read, Action<TValue> changed, Func<T, UnityEvent<TValue>> events = null, IEqualityComparer<TValue> comparer = null) where T : Component
```

Observes a native value, calls the callback initially, and reports distinct changes under the supplied comparer.

## `P.ToggleValue`

```text
public static IProperty<Toggle> ToggleValue(Source<bool> source)
```

Installs a two-way binding between Source&lt;bool&gt; and native Toggle.isOn.

## `P.SliderValue`

```text
public static IProperty<Slider> SliderValue(Source<float> source)
```

Installs a two-way slider binding and normalizes the source to the native slider's clamped/rounded value.

## `P.InputValue`

```text
public static IProperty<TMP_InputField> InputValue(Source<string> source)
```

Installs a two-way binding between a string source and TMP_InputField.text.

## `P.TextProperty`

```text
public static IProperty<TMP_Text> TextProperty(Value<string> text)
```

Binds TMP text while retaining the existing text component.

```text
public static IProperty<TMP_Text> TextProperty(Func<string> text)
```

Binds TMP text while retaining the existing text component.

## `P.FontSize`

```text
public static IProperty<TMP_Text> FontSize(Value<float> size)
```

Binds TMP font size in canvas units.

```text
public static IProperty<TMP_Text> FontSize(Func<float> size)
```

Binds TMP font size in canvas units.

## `P.Font`

```text
public static IProperty<TMP_Text> Font(Value<TMP_FontAsset> font)
```

Binds a code-supplied TMP font asset; null resolves the Pine default/fallback.

```text
public static IProperty<TMP_Text> Font(Func<TMP_FontAsset> font)
```

Binds a code-supplied TMP font asset; null resolves the Pine default/fallback.

## `P.Tint`

```text
public static GraphicProperty Tint(Value<Color> color)
```

Binds Graphic.color or a Selectable targetGraphic color through a compile-safe shared property.

```text
public static GraphicProperty Tint(Func<Color> color)
```

Binds Graphic.color or a Selectable targetGraphic color through a compile-safe shared property.

## `P.Enabled`

```text
public static IProperty<Selectable> Enabled(Value<bool> enabled)
```

Binds Selectable.interactable; disabled controls retain their native objects and bindings.

```text
public static IProperty<Selectable> Enabled(Func<bool> enabled)
```

Binds Selectable.interactable; disabled controls retain their native objects and bindings.

## `P.Navigation`

```text
public static IProperty<Selectable> Navigation(Value<Navigation> navigation)
```

Binds the native Selectable navigation configuration, including explicit directional links.

```text
public static IProperty<Selectable> Navigation(Func<Navigation> navigation)
```

Binds the native Selectable navigation configuration, including explicit directional links.

## `P.Focus`

```text
public static IProperty<Selectable> Focus()
```

Selects the native control through the active EventSystem; native navigation maintains visible focus states.

## `P.Opacity`

```text
public static IProperty<Component> Opacity(Value<float> opacity)
```

Adds or reuses CanvasGroup and binds alpha clamped to the range zero through one.

```text
public static IProperty<Component> Opacity(Func<float> opacity)
```

Adds or reuses CanvasGroup and binds alpha clamped to the range zero through one.

## `P.Sprite`

```text
public static IProperty<Image> Sprite(Value<Sprite> sprite)
```

Binds the sprite of a native Image.

```text
public static IProperty<Image> Sprite(Func<Sprite> sprite)
```

Binds the sprite of a native Image.

## `P.Texture`

```text
public static IProperty<RawImage> Texture(Value<Texture> texture)
```

Binds the texture of a native RawImage.

```text
public static IProperty<RawImage> Texture(Func<Texture> texture)
```

Binds the texture of a native RawImage.
