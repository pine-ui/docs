---
title: "Build dynamic Unity UI lists (Pine 1.2.0)"
sidebar_label: Dynamic lists
description: "Build a reactive Unity inventory with Pine keyed lists. Retain row identity through reordering, dispose removed rows and download the C# example. Pine 1.2.0 documentation."
---

import InteractiveExample from '@site/src/components/InteractiveExample';

# Dynamic lists

Use stable identity rather than reconstructing all views from a getter. `P.Values` retains by value identity; `P.Indexes` can retain by explicit dictionary key. Pass their result as `children: () => rows.Value`. Reordering moves the retained native objects; removal disposes row bindings. [Example and rules](../tutorials/dynamic-ui.md).

## Update data while retaining rows

The inventory below uses item IDs 101 and 102 as stable keys. Add a potion replaces the item record with a higher quantity while preserving ID 101, so the existing row follows the new record. Reverse rows changes the order while retaining each row's native identity. Remove the key removes item 102 and disposes that row's owned bindings.

Choose keys from the identity of the item, rather than from its current position, when rows should follow items through reordering. The row receives read-only reactive item and presence values; change the source collection to update it. The example replaces arrays instead of mutating the stored array in place.

If every update rebuilds the list, check whether the children getter creates fresh declarations instead of reading the retained operator result. Keep `children: () => rows.Value` on the containing visual view, and supply unique non-null views. The [retained branches API](../api/dynamic-scopes.md) compares positional, keyed and value-based operators.

<InteractiveExample kind="inventory" version="1.2.0" />

## Run the example

Import both files into Assets/Examples. Keep one `App.cs` entry. These use the native API; the browser preview models the state changes above.

<a href="/examples/1.2.0/dynamic-lists/PineInventory.cs" download>Download PineInventory.cs</a> · <a href="/examples/1.2.0/dynamic-lists/App.cs" download>Download App.cs</a>

```csharp
using System.Collections.Generic;
using System.Linq;
using Pine;
using Pine.uGUI;
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
                            name: $"Item {id}",
                            children: new[] { P.LayoutElement(preferredHeight: 40) }
                        )
                    )
            );
            return P.Vertical(
                spacing: 8,
                childControlWidth: true,
                childControlHeight: true,
                childForceExpandHeight: false,
                sizeDelta: new Vector2(520, 400),
                children: new[]
                {
                    P.Text("Inventory", children: new[] { P.LayoutElement(preferredHeight: 40) }),
                    P.Vertical(
                        childControlWidth: true,
                        childControlHeight: true,
                        childForceExpandHeight: false,
                        components: new[] { P.LayoutElement(preferredHeight: 120) },
                        children: () => rows.Value
                    ),
                    P.Button(
                        "Add a potion",
                        onClick: () =>
                            items.Value = items
                                .Value.Select(item =>
                                    item.Id == 101
                                        ? new Item(item.Id, item.Name, item.Quantity + 1)
                                        : item
                                )
                                .ToArray(),
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Button(
                        "Reverse rows",
                        onClick: () => items.Value = items.Value.Reverse().ToArray(),
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Button(
                        "Remove the key",
                        interactable: new Value<bool>(() =>
                            items.Value.Any(item => item.Id == 102)
                        ),
                        onClick: () =>
                            items.Value = items.Value.Where(item => item.Id != 102).ToArray(),
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                }
            );
        }
    }
}
```
