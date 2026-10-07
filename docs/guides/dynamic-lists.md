---
title: Build dynamic Unity UI lists
sidebar_label: Dynamic lists
description: Build a reactive Unity inventory with Pine keyed lists. Retain row identity through reordering, dispose removed rows and download the C# example.
---

import InteractiveExample from '@site/src/components/InteractiveExample';

# Dynamic lists

Use stable identity rather than reconstructing all views from a getter. `P.Values` retains by value identity; `P.Indexes` can retain by explicit dictionary key. Append their result through `.With(() => rows.Value)`. Reordering moves the retained native objects; removal disposes row bindings. [Example and rules](../tutorials/dynamic-ui.md).

<InteractiveExample kind="inventory" version="1.0.0" />

## Run the example

Import both files into Assets/Examples. Keep one `App.cs` entry. These use the native API; the browser preview models the state changes above.

<a href="/examples/1.0.0/dynamic-lists/PineInventory.cs" download>Download PineInventory.cs</a> · <a href="/examples/1.0.0/dynamic-lists/App.cs" download>Download App.cs</a>

```csharp
using System.Collections.Generic;
using System.Linq;
using Pine;
using UnityEngine;

namespace PineDocs.Examples
{
    public static class PineInventory
    {
        private sealed class Item
        {
            public readonly int Id,
                Quantity;
            public readonly string Name;

            public Item(int id, string name, int quantity)
            {
                Id = id;
                Name = name;
                Quantity = quantity;
            }
        }

        public static View Create()
        {
            var items = P.Source(new[] { new Item(101, "Potion", 3), new Item(102, "Key", 1) });
            var rows = P.Indexes<int, Item, View>(
                () => items.Value.Select(item => new KeyValuePair<int, Item>(item.Id, item)),
                (id, item, present) =>
                    new Branch<View>(
                        P.Text(
                                () => $"{item.Value.Name} x{item.Value.Quantity}",
                                name: $"Item {id}"
                            )
                            .With(P.LayoutElement(preferredHeight: 40))
                    )
            );
            return P.Vertical(
                    spacing: 8,
                    childControlWidth: true,
                    childControlHeight: true,
                    childForceExpandHeight: false,
                    sizeDelta: new Vector2(520, 400)
                )
                .With(
                    P.Text("Inventory").With(P.LayoutElement(preferredHeight: 40)),
                    P.Vertical(
                            childControlWidth: true,
                            childControlHeight: true,
                            childForceExpandHeight: false
                        )
                        .With(P.LayoutElement(preferredHeight: 120))
                        .With(() => rows.Value),
                    P.Button(
                            "Add a potion",
                            onClick: () =>
                                items.Value = items
                                    .Value.Select(item =>
                                        item.Id == 101
                                            ? new Item(item.Id, item.Name, item.Quantity + 1)
                                            : item
                                    )
                                    .ToArray()
                        )
                        .With(P.LayoutElement(preferredHeight: 40)),
                    P.Button(
                            "Reverse rows",
                            onClick: () => items.Value = items.Value.Reverse().ToArray()
                        )
                        .With(P.LayoutElement(preferredHeight: 40)),
                    P.Button(
                            "Remove the key",
                            interactable: new Value<bool>(() =>
                                items.Value.Any(item => item.Id == 102)
                            ),
                            onClick: () =>
                                items.Value = items.Value.Where(item => item.Id != 102).ToArray()
                        )
                        .With(P.LayoutElement(preferredHeight: 40))
                );
        }
    }
}
```
