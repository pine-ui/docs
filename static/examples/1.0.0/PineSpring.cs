using Pine;
using UnityEngine;

namespace PineDocs.Examples
{
    public static class PineSpring
    {
        public static View Create()
        {
            var onRight = P.Source(false);
            var target = P.Derive(() => new Vector2(onRight.Value ? 180 : -180, 0));
            var position = P.Spring(() => target.Value, period: .45, dampingRatio: .75);
            return P.Vertical(spacing: 8, childControlWidth: true, childControlHeight: true,
                childForceExpandHeight: false, sizeDelta: new Vector2(520, 240)).With(
                P.Text("Spring motion").With(P.LayoutElement(preferredHeight: 40)),
                P.Frame().With(P.LayoutElement(preferredHeight: 80),
                    P.Image(color: Color.green, anchoredPosition: position, sizeDelta: new Vector2(24, 24))),
                P.Text(() => $"Target: {(onRight.Value ? "right" : "left")}").With(P.LayoutElement(preferredHeight: 40)),
                P.Button(() => onRight.Value ? "Move left" : "Move right", onClick: () => onRight.Value = !onRight.Value)
                    .With(P.LayoutElement(preferredHeight: 40))
            );
        }
    }
}
