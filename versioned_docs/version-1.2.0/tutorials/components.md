---
title: "Compose Unity UI components in C# (Pine 1.2.0)"
sidebar_label: Composition and attachments
description: "Compose reusable Pine View declarations with C# functions and factory children. Learn child placement, same-object Self entries, native modifiers and TMP outlines. Pine 1.2.0 documentation."
---

# Composition and attachments

Plain C# functions return reusable `View` declarations. `children: new[] { ... }` nests declarations inside the factory without creating native objects. Child arrays are copied. Visual/control/layout entries create children. Modifiers attach to the containing GameObject. `P.Self(...)` explicitly places a visual component on that same object.

```csharp
View Button(Vector2 position, Value<string> text, Action onClick)
{
    return P.Button(
        anchoredPosition: position,
        sizeDelta: new Vector2(200, 150),
        onClick: onClick,
        children: new[]
        {
            P.Self(P.Image(color: new Color(50f / 255, 50f / 255, 50f / 255))),
            P.Outline(effectColor: Color.black),
            P.Text(
                text,
                color: Color.white,
                outlineColor: new Color32(0, 0, 0, 255),
                outlineWidth: .2f
            ),
        }
    );
}
```

The button object has RectTransform, Image, Button and Outline. Its text child has RectTransform, CanvasRenderer and TextMeshProUGUI. `P.Image()` without Self creates a child image. Nested factory calls apply the same placement rules at every level.

Unity permits one Graphic per GameObject. Pine rejects conflicting Graphics and component multiplicity forbidden by Unity; allowed repetitions such as multiple Outline components remain independent. A modifier/Self entry requires a containing visual view. Named `children` arrays keep the syntax valid in C# 9 alongside optional named settings. Use `components: new[] { ... }` for static modifiers or Self entries when `children` is a reactive getter.

With reactive children, name the optional settings: `P.Button(text: "Save", children: () => rows.Value)`. The getter overload requires `children`; C# positional arguments follow that overload's parameter order.

**TMP correction:** the uGUI Outline/Shadow components affect standard uGUI meshes such as Image and LegacyText. For TMP text use its native `outlineColor`/`outlineWidth` or a font material preset. Attaching an Outline does not turn it into a TMP shader effect. [TMP outline API](https://docs.unity3d.com/Packages/com.unity.textmeshpro@3.0/api/TMPro.TMP_Text.html#TMPro_TMP_Text_outlineWidth).

For Unity callbacks, declare a concrete MonoBehaviour with a public `View Create(...)` method. Pine generates `Components.Counter(...)` with the same named parameters. Create runs once before Awake/OnEnable; hiding retains the instance, and destroying its UI disposes its behaviour and reactive scope. `using Pine;` and `using Pine.uGUI;` opts a file into component generation. See the Composition sample for independent/shared state and multi-level nesting.
