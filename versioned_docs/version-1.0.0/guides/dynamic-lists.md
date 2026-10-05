---
title: Create dynamic Unity UI lists with stable IDs
sidebar_label: Dynamic lists
description: Build a reactive Unity inventory list in C# with Pine keyed rows. Update quantities, reorder items, and remove rows without recreating retained items.
---

# Create dynamic Unity UI lists with stable IDs

Inventory records need stable identity when their quantity or position changes. This example uses permanent item IDs to retain each UI row.

## Run the example

Save the component and **App.cs** under Assets, then press Play. Pine starts the app and constructs the component automatically. If your project already has App.cs, put `Components.PineInventory()` in its returned tree instead of adding another entry.

<a href="/examples/1.0.0/dynamic-lists/App.cs" download="App.cs" target="_self">Download App.cs</a> · <a href="/examples/1.0.0/dynamic-lists/PineInventory.cs" download="PineInventory.cs" target="_self">Download PineInventory.cs</a>. Sources are MIT licensed.

```csharp title="App.cs"
using UnityEngine;

namespace PineDocs.Examples
{
    public static class App
    {
        public static Component Mount() => Components.PineInventory();
    }
}
```

```csharp title="PineInventory.cs"
using System.Collections.Generic;
using System.Linq;
using Pine;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace PineDocs.Examples
{
    public sealed class PineInventory : MonoBehaviour
    {
        public sealed class Item
        {
            public int Id { get; }
            public string Name { get; }
            public int Quantity { get; }

            public Item(int id, string name, int quantity)
            {
                Id = id;
                Name = name;
                Quantity = quantity;
            }
        }

        public readonly Source<Item[]> Items = UI.Source(
            value: new[] { new Item(101, "Potion", 3), new Item(102, "Key", 1) }
        );

        public Component Create()
        {
            var rows = UI.Indexes<int, Item, TextMeshProUGUI>(
                read: () =>
                    Items.Value.Select(item => new KeyValuePair<int, Item>(
                        item.Id,
                        item
                    )),
                build: (id, item, present) =>
                    new Branch<TextMeshProUGUI>(
                        UI.Label(
                            text: () =>
                                $"{item.Value.Name} x{item.Value.Quantity}",
                            UI.Name(name: $"Item {id}"),
                            UI.Size(width: 472, height: 40)
                        )
                    )
            );
            return UI.Column(
                UI.Name(name: "Inventory"),
                UI.Size(width: 520, height: 360),
                UI.Padding(
                    padding: new RectOffset(
                        left: 24,
                        right: 24,
                        top: 20,
                        bottom: 20
                    )
                ),
                UI.Children(
                    UI.Label(
                        text: "Inventory",
                        UI.FontSize(size: 32),
                        UI.Size(width: 472, height: 48)
                    ),
                    UI.Column(
                        UI.Name(name: "Item rows"),
                        UI.Size(width: 472, height: 120),
                        UI.Children(read: () => rows.Value)
                    ),
                    UI.Button(
                        text: "Add a potion",
                        click: AddPotion,
                        UI.Size(width: 472, height: 48)
                    ),
                    UI.Button(
                        text: "Reverse rows",
                        click: ReverseRows,
                        UI.Size(width: 472, height: 48)
                    ),
                    UI.Button(
                        text: "Remove the key",
                        click: RemoveKey,
                        UI.Enabled(enabled: () =>
                            Items.Value.Any(item => item.Id == 102)
                        ),
                        UI.Size(width: 472, height: 48)
                    )
                )
            );
        }

        public void AddPotion() =>
            Items.Value = Items
                .Value.Select(item =>
                    item.Id == 101
                        ? new Item(item.Id, item.Name, item.Quantity + 1)
                        : item
                )
                .ToArray();

        public void ReverseRows() =>
            Items.Value = Items.Value.Reverse().ToArray();

        public void RemoveKey() =>
            Items.Value = Items.Value.Where(item => item.Id != 102).ToArray();
    }
}
```

## In Unity

<img src="/img/guides/dynamic-lists.png" alt="A Pine inventory rendered in Unity with Key x1 above Potion x4 and buttons for updating, reversing, and removing items." width="960" height="720" loading="lazy" decoding="async"/>

## See retention in action

Click **Add a potion**: the quantity changes through the existing row's source. Click **Reverse rows**: the same row objects move to the new order. Click **Remove the key**: its row is removed and its scope is disposed.

`Indexes` receives key/value pairs. The integer `Item.Id` is the permanent key; `Source<Item>` supplies the current record to its retained row. Using the array position as a key would describe a position rather than this item's identity. Every key must be unique and non-null under the selected comparer.

The methods replace the array and changed records. This makes each state change explicit. If you choose in-place edits elsewhere, call `Notify()` on the owning source after the edit.

## Choose the list operator

Use keyed `Indexes` for records whose values can change while their IDs remain stable. `Values` instead retains unique values and supplies their current reactive index. See the [conditional UI tutorial](../tutorials/dynamic-ui.md) and [keyed lists API](../api/dynamic-scopes.md) for both forms and retained exit transitions.

`Children` reconciles the returned row components. Disposing the mount disposes all row scopes. This example shows a small visible list; use native layout and scrolling appropriate to your own inventory screen.

Connect quantities to a [reactive game HUD](reactive-hud.md), or learn [state-to-UI bindings](data-binding.md).
