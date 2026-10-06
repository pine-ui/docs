import { readFile } from "node:fs/promises";
import path from "node:path";
import { root } from "./build-corpus.mjs";
const corpus = JSON.parse(
  await readFile(path.join(root, "static/assistant/corpus.json"), "utf8"),
);
const pages = new Map();
for (const chunk of corpus.chunks) {
  const [route, anchor] = chunk.url.split("#");
  if (!pages.has(route))
    pages.set(
      route,
      await readFile(path.join(root, "build", route, "index.html"), "utf8"),
    );
  if (anchor && !pages.get(route).includes(`id="${anchor}"`))
    throw new Error(`Missing citation anchor: ${chunk.url}`);
}
for (const [route, html] of pages)
  if (!html.includes("/img/mascot/pine-"))
    throw new Error(`Missing docs mascot: ${route}`);
console.log(
  `Verified ${corpus.chunks.length} citation targets and mascots on ${pages.size} built docs pages.`,
);
