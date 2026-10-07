export function fadeWords({ className }) {
  return function walk(node) {
    if (!node.children) return;
    node.children = node.children.flatMap((child) => {
      if (child.type !== "text") {
        walk(child);
        return child;
      }
      return child.value
        .split(/(\s+)/)
        .filter(Boolean)
        .map((value) => ({
          type: "text",
          value,
          ...(!/^\s+$/.test(value) && {
            data: { hName: "span", hProperties: { className } },
          }),
        }));
    });
  };
}
