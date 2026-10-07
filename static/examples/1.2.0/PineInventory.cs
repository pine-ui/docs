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
