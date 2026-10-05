---
title: Compose Unity UI components in C#
sidebar_label: Components and properties
description: Compose native Unity uGUI and TextMeshPro components with Pine builders, typed setters, scoped events, and reactive properties.
---

# Compose Unity UI components in C#

A component is an ordinary C# function returning a Unity component.

```csharp
UnityEngine.UI.Button IncrementButton(Source<int> count)
{
    return UI.Button("Increment", () => count.Value++,
        UI.PreferredSize(320, 48));
}
```

Call builders under a mount/root. Returned components can be direct child properties:

```csharp
var count = UI.Source(0);
var panel = UI.Column(
    UI.Label(() => $"Count: {count.Value}"),
    IncrementButton(count));
```

`Frame`, `Column`, `Row`, `Label`, `Image` and `Button` are convenience builders. `Create<T>` exposes other native components. Fixed/reactive `Children` overloads compose returned components or GameObjects; reactive children reconcile membership and sibling order.

## Properties

`Property` is the shared type for configuration operations. Typed values and setters configure the native components attached to each GameObject.

```csharp
var text = UI.Label("Welcome",
    UI.FontSize(28),
    UI.Configure<TMPro.TextMeshProUGUI>(t =>
        t.alignment = TMPro.TextAlignmentOptions.Center));
```

`Configure` runs once. `Set<T,TValue>` accepts literals, explicit reactive values or direct getter lambdas. Static values apply once; dynamic getters run in effects. Setters do not collect extra dependencies. `Group` composes properties, with configurable ordering.

`Create` and `Clone` own their objects; `Apply` binds an external object without owning it. Removing a child detaches it; its creation scope owns destruction. Avoid independent bindings that compete to write the same property.

## Events and controls

`OnClick`, `On<T>` and `On<T,TValue>` subscribe native events with scoped cleanup. Later callbacks run untracked in a batch. `Changed` uses a supplied event or polls only the observed property.

`InputValue`, `ToggleValue` and `SliderValue` provide two-way bindings using notification-free setters. Apply them to native controls configured with child graphics, handles and text viewports.

Continue with [dynamic UI](dynamic-ui.md).
