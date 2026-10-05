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
