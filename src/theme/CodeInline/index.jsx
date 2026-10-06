import React from "react";

const categories = {
  state:
    /^(?:UI\.)?(?:Source|Derive|Effect|Batch|Untrack|Value|Signal|Peek|Notify|Context|Provide|UseContext)\b/,
  lifetime:
    /^(?:UI\.)?(?:Mount|Root|Scope|Cleanup|Dispose|Component|Create|Apply|CanvasOptions|Persistent)\b/,
  layout:
    /^(?:UI\.)?(?:Size|Fill|Content|Position|Anchor|Pivot|Padding|Vertical|Horizontal|CellSize|Row|Column|Grid|Children|Alignment|Scale|Rotation|SafeArea)\b/,
  controls:
    /^(?:UI\.)?(?:Frame|Label|Image|RawImage|Button|Toggle|Slider|Scrollbar|TextField|Dropdown|ScrollView|Progress|Text|Color|Font|Enabled|OnClick)\b/,
};

export default function CodeInline({ children, ...props }) {
  const text = React.Children.toArray(children)
    .filter((child) => typeof child === "string")
    .join("")
    .trim();
  const category = Object.entries(categories).find(([, pattern]) =>
    pattern.test(text),
  )?.[0];
  return (
    <code
      {...props}
      data-pine-api={category}
      title={
        category
          ? `Pine API: ${category === "controls" ? "controls and appearance" : category}`
          : props.title
      }
    >
      {children}
    </code>
  );
}
