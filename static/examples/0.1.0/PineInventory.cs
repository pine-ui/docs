using System.Collections.Generic;
using System.Linq;
using Pine;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UI = Pine.Pine;

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
            new[] { new Item(101, "Potion", 3), new Item(102, "Key", 1) }
        );
        private MountHandle _mount;

        private void OnEnable()
        {
            _mount = UI.Mount(() =>
            {
                var rows = UI.Indexes<int, Item, TextMeshProUGUI>(
                    () =>
                        Items.Value.Select(item => new KeyValuePair<int, Item>(
                            item.Id,
                            item
                        )),
                    (id, item, present) =>
                        new Branch<TextMeshProUGUI>(
                            UI.Label(
                                () =>
                                    $"{item.Value.Name} x{item.Value.Quantity}",
                                UI.Name($"Item {id}"),
                                UI.PreferredSize(472, 40)
                            )
                        )
                );
                return UI.Column(
                    UI.Name("Inventory"),
                    UI.Size(520, 360),
                    UI.Configure<VerticalLayoutGroup>(g =>
                        g.padding = new RectOffset(24, 24, 20, 20)
                    ),
                    UI.Label(
                        "Inventory",
                        UI.FontSize(32),
                        UI.PreferredSize(472, 48)
                    ),
                    UI.Column(
                        UI.Name("Item rows"),
                        UI.PreferredSize(472, 120),
                        UI.Children(() => rows.Value)
                    ),
                    UI.Button(
                        "Add a potion",
                        AddPotion,
                        UI.PreferredSize(472, 48)
                    ),
                    UI.Button(
                        "Reverse rows",
                        ReverseRows,
                        UI.PreferredSize(472, 48)
                    ),
                    UI.Button(
                        "Remove the key",
                        RemoveKey,
                        UI.Enabled(() =>
                            Items.Value.Any(item => item.Id == 102)
                        ),
                        UI.PreferredSize(472, 48)
                    )
                );
            });
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

        private void OnDisable()
        {
            _mount?.Dispose();
            _mount = null;
        }
    }
}
