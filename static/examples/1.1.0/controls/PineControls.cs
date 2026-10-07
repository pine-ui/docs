using System.Collections.Generic;
using Pine;
using TMPro;
using UnityEngine;

namespace PineDocs.Examples
{
    public static class PineControls
    {
        public static View Create()
        {
            var text = P.Source("Player");
            var volume = P.Source(.5f);
            var enabled = P.Source(true);
            var selected = P.Source(0);
            var options = new List<TMP_Dropdown.OptionData> { new("One"), new("Two") };
            return P.Vertical(
                spacing: 8,
                childControlWidth: true,
                childControlHeight: true,
                childForceExpandHeight: false,
                sizeDelta: new Vector2(500, 480),
                children: new[]
                {
                    P.Text(
                        () => $"{text.Value}: {volume.Value:F2}",
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Button(
                        "Reset",
                        onClick: () =>
                            P.Batch(() =>
                            {
                                text.Value = "Player";
                                volume.Value = .5f;
                            }),
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.InputField(
                        text: text,
                        characterLimit: 24,
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Toggle(
                        "Enabled",
                        isOn: enabled,
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Slider(
                        value: volume,
                        minValue: 0,
                        maxValue: 1,
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Dropdown(
                        value: selected,
                        options: options,
                        children: new[] { P.LayoutElement(preferredHeight: 40) }
                    ),
                    P.Scrollbar(
                        value: volume,
                        size: .2f,
                        children: new[] { P.LayoutElement(preferredHeight: 24) }
                    ),
                    P.Button(
                        "Outlined",
                        interactable: enabled,
                        children: new[]
                        {
                            P.Self(P.Image(color: Color.gray)),
                            P.Outline(effectColor: Color.black),
                            P.LayoutElement(preferredHeight: 40),
                        }
                    ),
                }
            );
        }
    }
}
