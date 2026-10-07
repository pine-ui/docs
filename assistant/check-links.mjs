import { readFile } from "node:fs/promises";
import path from "node:path";
import { root } from "./build-corpus.mjs";
import assert from "node:assert/strict";
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

const origin = "https://pine-ui.com";
const sitemap = await readFile(path.join(root, "build/sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
assert(urls.includes(origin + "/"), "Homepage missing from sitemap");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
const links = new Map();
const downloads = new Set();
const noindex =
  /<meta\b[^>]*(?:name|property)="robots"[^>]*content="[^"]*noindex/i;
for (const match of sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(match[1]), "Invalid sitemap date");
  assert(new Date(match[1]).getTime() <= Date.now(), "Future sitemap date");
}
const titles = new Set(),
  descriptions = new Set();
for (const url of urls) {
  assert(
    url.startsWith(origin + "/") && url.endsWith("/"),
    `Non-canonical sitemap URL: ${url}`,
  );
  assert(!url.includes("/search"), "Search must not be in sitemap");
  const route = new URL(url).pathname;
  const html = await readFile(
    path.join(root, "build", route, "index.html"),
    "utf8",
  );
  const canonicals = html.match(/<link\b[^>]*rel="canonical"[^>]*>/g) || [];
  assert.equal(canonicals.length, 1, `Canonical count: ${url}`);
  assert(canonicals[0].includes(`href="${url}"`), `Canonical mismatch: ${url}`);
  assert(!noindex.test(html), `Noindex in sitemap: ${url}`);
  assert(
    /<main\b[^>]*>[\s\S]*?<h1\b/.test(html),
    `Main content missing from initial HTML: ${url}`,
  );
  links.set(
    url,
    // ponytail: inspect generated Docusaurus HTML; use a DOM parser if its output changes.
    [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)]
      .map((match) => {
        const target = new URL(match[1].replaceAll("&amp;", "&"), url);
        target.hash = "";
        target.search = "";
        if (
          target.origin === origin &&
          /\.(?:cs|tgz|sha256)\/?$/.test(target.pathname)
        )
          downloads.add(target.href);
        return target.href;
      })
      .filter((target) => urls.includes(target)),
  );
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    `Expected one main heading: ${url}`,
  );
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1];
  const description = html.match(
    /<meta\b[^>]*name="description"[^>]*content="([^"]+)"/,
  )?.[1];
  assert(title && !titles.has(title), `Missing or duplicate title: ${url}`);
  assert(
    description && !descriptions.has(description),
    `Missing or duplicate description: ${url}`,
  );
  titles.add(title);
  descriptions.add(description);
  for (const script of html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(script[1]);
  if (process.argv.includes("--live")) {
    const response = await fetch(url, { redirect: "manual" });
    assert.equal(response.status, 200, `Live status: ${url}`);
    assert(
      !/noindex/i.test(response.headers.get("x-robots-tag") || ""),
      `Live noindex header: ${url}`,
    );
    const liveHtml = await response.text();
    assert(!noindex.test(liveHtml), `Live noindex meta: ${url}`);
    assert(
      liveHtml.includes(`<title data-rh="true">${title}</title>`),
      `Live title differs from build: ${url}`,
    );
    assert(
      liveHtml.includes(`href="${url}"`),
      `Live canonical missing: ${url}`,
    );
    assert(
      liveHtml.includes(`content="${description}"`),
      `Live description differs from build: ${url}`,
    );
  }
}
const reachable = new Set([origin + "/"]);
for (const url of reachable)
  for (const target of links.get(url) || []) reachable.add(target);
assert.equal(
  reachable.size,
  urls.length,
  "Sitemap pages orphaned from homepage",
);
const robots = await readFile(path.join(root, "build/robots.txt"), "utf8");
assert(
  robots.includes(`Sitemap: ${origin}/sitemap.xml`),
  "Robots sitemap missing",
);
assert(!/^Disallow:\s*\/\s*$/im.test(robots), "Robots blocks the entire site");
for (const url of downloads) {
  const pathname = new URL(url).pathname;
  assert(!pathname.endsWith("/"), `File download has a trailing slash: ${url}`);
  await readFile(path.join(root, "build", pathname));
  if (process.argv.includes("--live")) {
    const response = await fetch(url, { redirect: "manual" });
    assert.equal(response.status, 200, `Live download status: ${url}`);
    await response.arrayBuffer();
  }
}
console.log(`Verified ${downloads.size} file download targets.`);
const search = await readFile(
  path.join(root, "build/search/index.html"),
  "utf8",
);
assert(
  /<meta\b[^>]*name="robots"[^>]*content="noindex, follow"/.test(search),
  "Search must remain noindex",
);
console.log(
  `Verified SEO on ${urls.length} sitemap pages${process.argv.includes("--live") ? " and live responses" : ""}.`,
);
