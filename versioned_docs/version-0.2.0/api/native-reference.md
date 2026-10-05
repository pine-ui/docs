---
title: Pine native declarations and bindings API
sidebar_label: Native declarations and bindings
description: Complete typed reference with overloads, parameters, ownership and examples for Pine native declarations and bindings.
---

# Native declarations and bindings

This reference documents every current public declaration in this part of Pine. Examples run inside `UI.Mount(...)` or `UI.Root(...)` unless they only create state/configuration. Variable names such as `count`, `items` and `label` refer to the typed values described by each example. All APIs run on Unity’s main thread.

## `IProperty`

```text
IProperty<in T>
```

A contravariant declaration operation restricted to compatible native component types. Text properties accept TMP text; control properties accept their corresponding controls. Invalid property/component combinations fail compilation. Implement this interface for typed custom properties; Apply runs in the caller's active ownership scope.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |

```csharp
IProperty<TMPro.TMP_Text> text = UI.Text("Hello");
UI.Label("Initial", text);
```

## `IProperty.Apply`

```text
void Apply(T target)
```

Applies this compatible property to the supplied native target in the current ownership scope. Custom implementations may create owned reactive bindings via UI.Effect and UI.Cleanup.

| Parameter | Meaning |
| --- | --- |
| `target` | The existing native component or tracked target getter, as specified by this overload. |

**Returns:** The typed result described above; reactive reads participate in the active observer.

```csharp
UI.Apply(label, UI.Text("Applied"));
```

## `GraphicProperty`

```text
GraphicProperty
```

A color binding shared by native Graphics and Selectables. On a Selectable it configures targetGraphic rather than requiring the control itself to inherit Graphic. The factory uses this intersection contract to keep Tint available on text, images and controls while rejecting plain frames.

```csharp
UI.Button("Save", () => { }, UI.Tint(UnityEngine.Color.green));
```

## `GraphicProperty.Identity`

```text
string Identity
```

The named native operation used by strict duplicate diagnostics. Obtain instances from UI.Tint; the operation is shared across graphic and selectable targets.

```csharp
var tint = UI.Tint(UnityEngine.Color.white);
string name = tint.Identity;
```

## `Mount`

```text
Mount
```

An explicit mounted interface lifetime. Scope owns bindings and created native objects; Root identifies the returned interface and Canvas identifies its containing canvas. Dispose removes the interface; destroying Root also disposes its scope. The result is optional for scene-lived UI; scene unload or root destruction ends the scope. Retain it for early disposal. Disabling the creating component does not remove or remount the tree.

```csharp
Mount mount = UI.Mount(() => UI.Label("Hello"));
mount.Dispose();
```

## `Mount.Scope`

```text
Scope Scope
```

The scope owning this mounted interface, including bindings and native objects. Enter it with Run to apply further declarations after construction.

```csharp
mount.Scope.Run(() => UI.Apply(label, UI.Text("Updated")));
```

## `Mount.Root`

```text
GameObject Root
```

The native root returned by the mount builder. Destroying it also ends the mount scope; disposal destroys owned roots.

```csharp
UnityEngine.GameObject root = mount.Root;
```

## `Mount.Canvas`

```text
Canvas Canvas
```

The Pine-created canvas or nearest ancestor canvas of an explicit parent. Existing external canvases remain externally owned.

```csharp
UnityEngine.Canvas canvas = mount.Canvas;
```

## `Mount.Dispose`

```text
public void Dispose()
```

Ends this owned lifetime idempotently. Dependencies and native event/clock registrations are released; Scope/Mount cleanup attempts all resources and aggregates failures. Application code disposes a mount when its owner ends.

```csharp
mount.Dispose();
```

## `UI.Cleanup`

```text
public static void Cleanup(UnityEngine.Object target)
```

Registers a callback, disposable or Unity object with the active scope. Cleanup occurs in reverse registration order when the scope ends or an effect reruns. Unity objects are destroyed at the end of the frame in Play Mode and immediately in Edit Mode; callback failures do not skip other resources.

| Parameter | Meaning |
| --- | --- |
| `target` | The existing native component or tracked target getter, as specified by this overload. |

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Cleanup(() => UnityEngine.Debug.Log("Interface removed"));
```

## `UI.Create`

```text
public static T Create<T>(params IProperty<T>[] properties) where T : Component
```

Creates and owns a GameObject, RectTransform and the native component T, then applies compatible typed properties. Creation requires a scope. Defaults configure text and controls unless disabled. The native result can be saved, configured directly or passed into Children.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |

| Parameter | Meaning |
| --- | --- |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var label = UI.Create<TMPro.TextMeshProUGUI>(
    UI.Text("Created"),
    UI.Size(240, 48)
);
```

## `UI.Clone`

```text
public static T Clone<T>(T template, params IProperty<T>[] properties) where T : Component
```

Owns a native clone of the supplied component's GameObject, preserves its serialized native configuration, and applies compatible properties. Existing template bindings are not copied: declare new reactive bindings for the clone. The template itself remains externally owned.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |

| Parameter | Meaning |
| --- | --- |
| `template` | The typed template input (T); literals and supported reactive adapters follow this overload's documented behavior. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var copy = UI.Clone(label, UI.Text("Copy"));
```

## `UI.Apply`

```text
public static T Apply<T>(T target, params IProperty<T>[] properties) where T : Component
```

Applies compatible declarations to an existing native component in the active scope. New bindings and handlers belong to that scope; the component remains externally owned unless Pine created it or cleanup explicitly owns it. Applying later requires entering the original live scope.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |

| Parameter | Meaning |
| --- | --- |
| `target` | The existing native component or tracked target getter, as specified by this overload. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The same supplied native component. Its external ownership is preserved; only bindings and resources added by these declarations belong to the active scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Apply(label, UI.Text(() => count.Value.ToString()));
```

## `UI.Group`

```text
public static IProperty<T> Group<T>(params IProperty<T>[] properties) where T : Component
```

Composes reusable properties for one explicit native target type. Contravariance allows a group targeting a base component to configure compatible derived components. Nested group processing follows DeferNestedProperties; strict duplicate diagnostics apply within each declaration group.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |

| Parameter | Meaning |
| --- | --- |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
var textStyle = UI.Group<TMPro.TMP_Text>(UI.FontSize(24), UI.Text("Styled"));
UI.Label("Initial", textStyle);
```

## `UI.Action`

```text
public static IProperty<T> Action<T>(Action<T> action, int priority = 1) where T : Component
```

Runs a one-time typed action before ordinary properties and parenting. Lower numeric priorities run first; equal priorities retain declaration order. Use Configure for the ordinary-property phase. The action runs within construction ownership and context.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |

| Parameter | Meaning |
| --- | --- |
| `action` | Callback/action executed in the documented phase or event scope. |
| `priority` | Ordering before ordinary assignments: lower runs first, equal values retain declaration order. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(
    UI.Action<UnityEngine.RectTransform>(
        frame => frame.name = "Action",
        priority: 0
    )
);
```

## `UI.Configure`

```text
public static IProperty<T> Configure<T>(Action<T> configure) where T : Component
```

Runs a one-time typed native configuration in the ordinary-property phase. T is the actual compatible target, so configuring another component type is rejected at compilation. Use Set or Bind when the native assignment must remain reactive.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |

| Parameter | Meaning |
| --- | --- |
| `configure` | One-time typed native configuration, performed in the ordinary-property phase. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label(
    "Centered",
    UI.Configure<TMPro.TextMeshProUGUI>(label =>
        label.alignment = TMPro.TextAlignmentOptions.Center
    )
);
```

## `UI.Set`

```text
public static IProperty<T> Set<T, TValue>(string name, Action<T, TValue> set, Value<TValue> value) where T : Component
```

Declares a named typed native assignment. Literals assign once; reactive values/getters install an owned effect. Getter dependencies are tracked, but the setter is untracked so native work cannot add accidental dependencies. Names identify duplicates within strict groups and must be nonempty.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |
| `TValue` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `name` | Native name or nonempty property identity used by strict diagnostics. |
| `set` | Typed native setter run without dependency tracking. |
| `value` | The typed value or reactive input to read/apply; sources remain observable for the owning lifetime. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label(
    "Value",
    UI.Set<TMPro.TMP_Text, float>(
        "Spacing",
        (label, value) => label.characterSpacing = value,
        2f
    )
);
```

```text
public static IProperty<T> Set<T, TValue>(string name, Action<T, TValue> set, Func<TValue> read) where T : Component
```

Declares a named typed native assignment. Literals assign once; reactive values/getters install an owned effect. Getter dependencies are tracked, but the setter is untracked so native work cannot add accidental dependencies. Names identify duplicates within strict groups and must be nonempty.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |
| `TValue` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `name` | Native name or nonempty property identity used by strict diagnostics. |
| `set` | Typed native setter run without dependency tracking. |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label(
    "Value",
    UI.Set<TMPro.TMP_Text, float>(
        "Spacing",
        (label, value) => label.characterSpacing = value,
        2f
    )
);
```

## `UI.Bind`

```text
public static T Bind<T, TValue>(this T component, Func<TValue> read, Action<T, TValue> apply) where T : Component
```

Adds an owned reactive getter/setter binding to a saved native component and returns the same component. Reads collect dependencies; native assignment runs untracked. Call during construction or from a live Scope.Run; ending that scope stops updates without destroying an external component.

| Type parameter | Meaning |
| --- | --- |
| `T` | Typed value, native result or identity contract; see the summary for its role. |
| `TValue` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `component` | Builder returning the live native root in the mount scope. |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |
| `apply` | The typed apply input (Action&lt;T, TValue&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** The typed result described above; reactive reads participate in the active observer.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
label.Bind(
    () => count.Value.ToString(),
    (target, value) => target.text = value
);
```

## `UI.Name`

```text
public static IProperty<Component> Name(Value<string> name)
```

Binds the native GameObject name. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `name` | Native name or nonempty property identity used by strict diagnostics. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Name("Panel"));
```

```text
public static IProperty<Component> Name(Func<string> name)
```

Binds the native GameObject name. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `name` | Native name or nonempty property identity used by strict diagnostics. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Name("Panel"));
```

## `UI.Active`

```text
public static IProperty<Component> Active(Value<bool> active)
```

Binds GameObject activeSelf; disabling a native object does not dispose its construction scope. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `active` | The typed active input (Value&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Active(() => visible.Value));
```

```text
public static IProperty<Component> Active(Func<bool> active)
```

Binds GameObject activeSelf; disabling a native object does not dispose its construction scope. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `active` | The typed active input (Func&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Active(() => visible.Value));
```

## `UI.Parent`

```text
public static IProperty<Component> Parent(Value<Transform> parent)
```

Binds the native parent Transform while preserving local UI transforms. Parenting runs after ordinary property application, validates uniform grid conflicts, and does not take ownership of an external parent. Sources/getters can reparent an existing native result without rebuilding it.

| Parameter | Meaning |
| --- | --- |
| `parent` | Optional external native parent; null creates a Pine-owned canvas. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Parent(canvas.transform));
```

```text
public static IProperty<Component> Parent(Func<Transform> parent)
```

Binds the native parent Transform while preserving local UI transforms. Parenting runs after ordinary property application, validates uniform grid conflicts, and does not take ownership of an external parent. Sources/getters can reparent an existing native result without rebuilding it.

| Parameter | Meaning |
| --- | --- |
| `parent` | Optional external native parent; null creates a Pine-owned canvas. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Parent(canvas.transform));
```

## `UI.Children`

```text
public static IProperty<Component> Children(params Component[] children)
```

Composes native child components explicitly. Fixed children attach once; getter children reconcile retained instances and sibling order as tracked inputs change. Removed external children detach; creation scopes own destruction. Duplicate native transforms are rejected in strict mode. Parenting preserves local UI transforms.

| Parameter | Meaning |
| --- | --- |
| `children` | Fixed native children or tracked getter of retained child instances; duplicates are rejected in strict mode. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Column(UI.Children(UI.Label("One"), UI.Label("Two")));
```

```text
public static IProperty<Component> Children(Func<IEnumerable<Component>> read)
```

Composes native child components explicitly. Fixed children attach once; getter children reconcile retained instances and sibling order as tracked inputs change. Removed external children detach; creation scopes own destruction. Duplicate native transforms are rejected in strict mode. Parenting preserves local UI transforms.

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Column(UI.Children(UI.Label("One"), UI.Label("Two")));
```

```text
public static IProperty<Component> Children(Func<IEnumerable<GameObject>> read)
```

Composes native child components explicitly. Fixed children attach once; getter children reconcile retained instances and sibling order as tracked inputs change. Removed external children detach; creation scopes own destruction. Duplicate native transforms are rejected in strict mode. Parenting preserves local UI transforms.

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Column(UI.Children(UI.Label("One"), UI.Label("Two")));
```

## `UI.On`

```text
public static IProperty<T> On<T>(Func<T, UnityEvent> select, Action action) where T : Component
```

Registers a native UnityEvent handler for the compatible target type and removes it when the scope ends. Callbacks enter their captured construction scope and context, then batch source writes without dependency tracking. Use the generic value overload for native event payloads.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |

| Parameter | Meaning |
| --- | --- |
| `select` | Native event selector or reactive branch selector, as specified by this overload. |
| `action` | Callback/action executed in the documented phase or event scope. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Button(
    "Save",
    () => { },
    UI.On<UnityEngine.UI.Button>(
        b => b.onClick,
        () => UnityEngine.Debug.Log("Clicked")
    )
);
```

```text
public static IProperty<T> On<T, TValue>(Func<T, UnityEvent<TValue>> select, Action<TValue> action) where T : Component
```

Registers a native UnityEvent handler for the compatible target type and removes it when the scope ends. Callbacks enter their captured construction scope and context, then batch source writes without dependency tracking. Use the generic value overload for native event payloads.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |
| `TValue` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `select` | Native event selector or reactive branch selector, as specified by this overload. |
| `action` | Callback/action executed in the documented phase or event scope. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Button(
    "Save",
    () => { },
    UI.On<UnityEngine.UI.Button>(
        b => b.onClick,
        () => UnityEngine.Debug.Log("Clicked")
    )
);
```

## `UI.OnClick`

```text
public static IProperty<Button> OnClick(Action action)
```

Registers an owned Button click handler. The callback batches writes, retains construction scope/context and is detached on cleanup. The native Button supplies mouse, touch and navigation-submit behavior through the compatible EventSystem.

| Parameter | Meaning |
| --- | --- |
| `action` | Callback/action executed in the documented phase or event scope. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Button("Save", () => UnityEngine.Debug.Log("Saved"));
```

## `UI.Changed`

```text
public static IProperty<T> Changed<T, TValue>(Func<T, TValue> read, Action<TValue> changed, Func<T, UnityEvent<TValue>> events = null, IEqualityComparer<TValue> comparer = null) where T : Component
```

Observes a native value, calls the callback initially, and reports distinct changes under the supplied comparer. A supplied UnityEvent delivers changes directly; otherwise the shared clock polls the native getter. Cleanup removes the handler or polling listener. Callbacks retain their construction scope/context.

| Type parameter | Meaning |
| --- | --- |
| `T` | Native component target compatible with these declarations. |
| `TValue` | Typed value, native result or identity contract; see the summary for its role. |

| Parameter | Meaning |
| --- | --- |
| `read` | The getter whose source reads establish reactive dependencies; supply a stable native result where required. |
| `changed` | Callback for the initial native value and subsequent distinct values. |
| `events` | Optional native event source; null uses shared-clock polling. |
| `comparer` | Optional equality/identity comparer; null selects the documented default policy. |

**Returns:** An owned subscription that invokes the callback for the initial native value and subsequent distinct values.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Create<UnityEngine.UI.Toggle>(
    UI.Changed<UnityEngine.UI.Toggle, bool>(
        t => t.isOn,
        value => UnityEngine.Debug.Log(value),
        t => t.onValueChanged
    )
);
```

## `UI.ToggleValue`

```text
public static IProperty<Toggle> ToggleValue(Source<bool> source)
```

Installs a two-way binding between Source&lt;bool&gt; and native Toggle.isOn. Source updates use SetIsOnWithoutNotify to prevent event feedback; user-generated native changes write the source. Prefer UI.Toggle(source, ...) for a completely wired control.

| Parameter | Meaning |
| --- | --- |
| `source` | Mutable typed source used by this two-way native binding. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Toggle(isEnabled, "Enabled");
```

## `UI.SliderValue`

```text
public static IProperty<Slider> SliderValue(Source<float> source)
```

Installs a two-way slider binding and normalizes the source to the native slider's clamped/rounded value. Source updates avoid synthetic value-change events; native changes update the source. Prefer UI.Slider(source, ...) for built-in graphics and handles.

| Parameter | Meaning |
| --- | --- |
| `source` | Mutable typed source used by this two-way native binding. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Slider(volume, 0f, 1f);
```

## `UI.InputValue`

```text
public static IProperty<TMP_InputField> InputValue(Source<string> source)
```

Installs a two-way binding between a string source and TMP_InputField.text. Source writes use the native non-notifying setter; user edits write the source. Prefer UI.TextField(source, ...) for the complete viewport, text and placeholder hierarchy.

| Parameter | Meaning |
| --- | --- |
| `source` | Mutable typed source used by this two-way native binding. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.TextField(playerName, "Player name");
```

## `UI.Text`

```text
public static IProperty<TMP_Text> Text(Value<string> text)
```

Binds TMP text while retaining the existing text component. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `text` | The typed text input (Value&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label("Initial", UI.Text(() => count.Value.ToString()));
```

```text
public static IProperty<TMP_Text> Text(Func<string> text)
```

Binds TMP text while retaining the existing text component. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `text` | The typed text input (Func&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label("Initial", UI.Text(() => count.Value.ToString()));
```

## `UI.FontSize`

```text
public static IProperty<TMP_Text> FontSize(Value<float> size)
```

Binds TMP font size in canvas units. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `size` | The typed size input (Value&lt;float&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label("Heading", UI.FontSize(32));
```

```text
public static IProperty<TMP_Text> FontSize(Func<float> size)
```

Binds TMP font size in canvas units. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `size` | The typed size input (Func&lt;float&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label("Heading", UI.FontSize(32));
```

## `UI.Font`

```text
public static IProperty<TMP_Text> Font(Value<TMP_FontAsset> font)
```

Binds a code-supplied TMP font asset; null resolves the Pine default/fallback. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `font` | The typed font input (Value&lt;TMP_FontAsset&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label("Localized", UI.Font(fontAsset));
```

```text
public static IProperty<TMP_Text> Font(Func<TMP_FontAsset> font)
```

Binds a code-supplied TMP font asset; null resolves the Pine default/fallback. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `font` | The typed font input (Func&lt;TMP_FontAsset&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label("Localized", UI.Font(fontAsset));
```

## `UI.Tint`

```text
public static GraphicProperty Tint(Value<Color> color)
```

Binds Graphic.color or a Selectable targetGraphic color through a compile-safe shared property. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `color` | The typed color input (Value&lt;Color&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Image(UI.Tint(UnityEngine.Color.green));
```

```text
public static GraphicProperty Tint(Func<Color> color)
```

Binds Graphic.color or a Selectable targetGraphic color through a compile-safe shared property. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `color` | The typed color input (Func&lt;Color&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Image(UI.Tint(UnityEngine.Color.green));
```

## `UI.Enabled`

```text
public static IProperty<Selectable> Enabled(Value<bool> enabled)
```

Binds Selectable.interactable; disabled controls retain their native objects and bindings. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `enabled` | The typed enabled input (Value&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Button("Save", () => { }, UI.Enabled(() => canSave.Value));
```

```text
public static IProperty<Selectable> Enabled(Func<bool> enabled)
```

Binds Selectable.interactable; disabled controls retain their native objects and bindings. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `enabled` | The typed enabled input (Func&lt;bool&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Button("Save", () => { }, UI.Enabled(() => canSave.Value));
```

## `UI.Navigation`

```text
public static IProperty<Selectable> Navigation(Value<Navigation> navigation)
```

Binds the native Selectable navigation configuration, including explicit directional links. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `navigation` | The typed navigation input (Value&lt;Navigation&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Button(
    "Next",
    () => { },
    UI.Navigation(
        new UnityEngine.UI.Navigation
        {
            mode = UnityEngine.UI.Navigation.Mode.Automatic,
        }
    )
);
```

```text
public static IProperty<Selectable> Navigation(Func<Navigation> navigation)
```

Binds the native Selectable navigation configuration, including explicit directional links. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `navigation` | The typed navigation input (Func&lt;Navigation&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Button(
    "Next",
    () => { },
    UI.Navigation(
        new UnityEngine.UI.Navigation
        {
            mode = UnityEngine.UI.Navigation.Mode.Automatic,
        }
    )
);
```

## `UI.Focus`

```text
public static IProperty<Selectable> Focus()
```

Selects the native control through the active EventSystem; native navigation maintains visible focus states.

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Button("Start", () => { }, UI.Focus());
```

## `UI.Opacity`

```text
public static IProperty<Component> Opacity(Value<float> opacity)
```

Adds or reuses CanvasGroup and binds alpha clamped to the range zero through one. It does not disable interaction or destroy children. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `opacity` | The typed opacity input (Value&lt;float&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Opacity(0.5f));
```

```text
public static IProperty<Component> Opacity(Func<float> opacity)
```

Adds or reuses CanvasGroup and binds alpha clamped to the range zero through one. It does not disable interaction or destroy children. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `opacity` | The typed opacity input (Func&lt;float&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Opacity(0.5f));
```

## `UI.Frame`

```text
public static RectTransform Frame(params IProperty<RectTransform>[] properties)
```

Creates an owned plain RectTransform for child composition and positioning. Overflow remains visible unless explicitly clipped.

| Parameter | Meaning |
| --- | --- |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Frame(UI.Size(300, 100), UI.Children(UI.Label("Panel")));
```

## `UI.Column`

```text
public static RectTransform Column(params IProperty<RectTransform>[] properties)
```

Creates an owned frame with native vertical layout and an eight-unit default gap. Use Size, Fill and Auto to state sizing intent; children compose explicitly.

| Parameter | Meaning |
| --- | --- |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Column(UI.Vertical(12), UI.Children(UI.Label("First"), UI.Label("Second")));
```

```text
public static RectTransform Column(float gap, params Component[] children)
```

Creates an owned vertical container with the supplied fixed gap and ordered native children. Children may be returned by ordinary custom component functions; they inherit the current mount or dynamic branch scope. Each factory runs once when its instance is constructed. Use the property overload for reactive spacing, sizing or dynamic child lists.

| Parameter | Meaning |
| --- | --- |
| `gap` | Fixed spacing between children in canvas units; negative spacing overlaps adjacent children. |
| `children` | Native child components, including results of nested custom component factories, in display order. |

**Returns:** The live native RectTransform, owned by the current scope. No additional mount is created.

**Ownership:** Call inside UI.Mount, a dynamic branch builder or a live Scope.Run. Hiding keeps the instance; removing a Pine-owned branch ends its bindings. Supply state from outside a removable branch to preserve it across reconstruction.

```csharp
UI.Mount(() =>
{
    var count = UI.Source(0);
    return UI.Column(
        12,
        UI.Label(() => $"Count: {count.Value}"),
        UI.Button("Increment", () => count.Value++)
    );
});
```

## `UI.Row`

```text
public static RectTransform Row(params IProperty<RectTransform>[] properties)
```

Creates an owned frame with native horizontal layout and an eight-unit default gap. Child exact sizes are preserved; flexible and content-driven sizing are explicit.

| Parameter | Meaning |
| --- | --- |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Row(UI.Horizontal(12), UI.Children(UI.Label("Left"), UI.Label("Right")));
```

```text
public static RectTransform Row(float gap, params Component[] children)
```

Creates an owned horizontal container with the supplied fixed gap and ordered native children. Custom component functions compose synchronously under the enclosing ownership scope without additional mounts. Use the property overload for reactive spacing, sizing or dynamic child lists.

| Parameter | Meaning |
| --- | --- |
| `gap` | Fixed spacing between children in canvas units; negative spacing overlaps adjacent children. |
| `children` | Native child components, including results of nested custom component factories, in display order. |

**Returns:** The live native RectTransform, owned by the current scope. No additional mount is created.

**Ownership:** Call inside UI.Mount, a dynamic branch builder or a live Scope.Run. Retained children update through their bindings; ordinary state changes do not rebuild the complete factory.

```csharp
UI.Row(8, UI.Button("Save", () => Save()), UI.Button("Cancel", () => Cancel()));
```

## `UI.Label`

```text
public static TextMeshProUGUI Label(Value<string> text, params IProperty<TextMeshProUGUI>[] properties)
```

Creates owned TextMeshProUGUI with typed literal or reactive text, bundled/default font, white text and nonblocking raycasts. Compatible text, graphic and common properties are accepted at compilation.

| Parameter | Meaning |
| --- | --- |
| `text` | The typed text input (Value&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label(() => count.Value.ToString(), UI.FontSize(24), UI.Size(240, 48));
```

```text
public static TextMeshProUGUI Label(Func<string> text, params IProperty<TextMeshProUGUI>[] properties)
```

Creates owned TextMeshProUGUI with typed literal or reactive text, bundled/default font, white text and nonblocking raycasts. Compatible text, graphic and common properties are accepted at compilation.

| Parameter | Meaning |
| --- | --- |
| `text` | The typed text input (Func&lt;string&gt;); literals and supported reactive adapters follow this overload's documented behavior. |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Label(() => count.Value.ToString(), UI.FontSize(24), UI.Size(240, 48));
```

## `UI.Image`

```text
public static Image Image(params IProperty<Image>[] properties)
```

Creates an owned native Image with nonblocking decorative raycasts and typed sprite/color properties. Use Progress for a native filled image.

| Parameter | Meaning |
| --- | --- |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Image(UI.Sprite(icon), UI.Size(48, 48));
```

## `UI.RawImage`

```text
public static RawImage RawImage(params IProperty<RawImage>[] properties)
```

Creates an owned native RawImage with typed texture/color properties. Supply a code-configured Texture or RenderTexture without Inspector wiring.

| Parameter | Meaning |
| --- | --- |
| `properties` | Compatible typed declarations to apply; incompatible component/property combinations are rejected at compilation. |

**Returns:** The live native component, owned by the active scope. Retain it for direct native access or typed UI.Apply; reactive bindings update this same instance.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.RawImage(UI.Texture(texture), UI.Size(320, 180));
```

## `UI.Sprite`

```text
public static IProperty<Image> Sprite(Value<Sprite> sprite)
```

Binds the sprite of a native Image. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `sprite` | The typed sprite input (Value&lt;Sprite&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Image(UI.Sprite(icon));
```

```text
public static IProperty<Image> Sprite(Func<Sprite> sprite)
```

Binds the sprite of a native Image. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `sprite` | The typed sprite input (Func&lt;Sprite&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.Image(UI.Sprite(icon));
```

## `UI.Texture`

```text
public static IProperty<RawImage> Texture(Value<Texture> texture)
```

Binds the texture of a native RawImage. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `texture` | The typed texture input (Value&lt;Texture&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.RawImage(UI.Texture(texture));
```

```text
public static IProperty<RawImage> Texture(Func<Texture> texture)
```

Binds the texture of a native RawImage. Literal values apply once; typed reactive values and Value-wrapped getters stay bound for the active ownership scope.

| Parameter | Meaning |
| --- | --- |
| `texture` | The typed texture input (Func&lt;Texture&gt;); literals and supported reactive adapters follow this overload's documented behavior. |

**Returns:** A compatible property operation to apply within a live ownership scope.

**Ownership:** Construct and apply declarations on Unity's main thread within UI.Mount, UI.Root or a live Scope.Run. Literal assignments occur once; reactive observers and handlers end with their owning scope.

```csharp
UI.RawImage(UI.Texture(texture));
```
