---
title: Build a reactive Unity UI counter
sidebar_label: Counter
description: Build a working Unity uGUI counter in C# with Pine sources, reactive text, native buttons and automatic startup. Download the complete App.cs example.
---

# Counter

Pine 1.0.0 provides native uGUI declarations. Import `using Pine;` and use `P` directly. `View` is a declaration; `UnityEngine.Component` is the native object built from it. `App.Mount()` runs once. Sources update retained native components through tracked getters.

```csharp
using Pine;
using UnityEngine;

public static class App
{
    public static View Mount()
    {
        var count = P.Source(0);
        return P.Vertical(
                spacing: 12,
                childControlWidth: true,
                childControlHeight: true,
                childForceExpandHeight: false,
                sizeDelta: new Vector2(240, 160)
            )
            .With(
                P.Text(() => $"Count: {count.Value}", fontSize: 24)
                    .With(P.LayoutElement(preferredHeight: 40)),
                P.Button("Increment", onClick: () => count.Value++)
                    .With(P.LayoutElement(preferredHeight: 40)),
                P.Button(
                        "Reset",
                        onClick: () => count.Value = 0,
                        interactable: new Value<bool>(() => count.Value > 0)
                    )
                    .With(P.LayoutElement(preferredHeight: 40))
            );
    }
}
```

`P.Button` creates a real `UnityEngine.UI.Button` and wires its background `Image`. Supplying text adds a TMP caption. Layout sizing uses native `LayoutElement` settings. Omitted props retain native component defaults, so this example explicitly enables layout child sizing.

## Run the example

[Download App.cs](/examples/1.0.0/Counter/App.cs). Keep one `App.cs` entry in a project.
