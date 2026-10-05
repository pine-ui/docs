import assert from 'node:assert/strict';
import {readFile, access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.join(root, 'build');
const manifest = JSON.parse(await readFile(path.join(build, 'ai/manifest.json'), 'utf8'));
const versions = JSON.parse(await readFile(path.join(root, 'versions.json'), 'utf8'));
const plain = unified().use(remarkParse).use(remarkGfm);
const mdx = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);
function nodes(tree, type) {
  const result = [];
  function walk(node) { if (node.type === type) result.push(node); node.children?.forEach(walk); }
  walk(tree); return result;
}
let links = 0;
for (const [route, page] of Object.entries(manifest.pages)) {
  assert(versions.includes(page.version));
  const id = page.markdown.slice(`/ai/${page.version}/`.length).replace(/\.md$/, '');
  const original = await readFile(path.join(root, `versioned_docs/version-${page.version}/${id}.md`), 'utf8');
  const exported = await readFile(path.join(build, page.markdown), 'utf8');
  const tree = plain.parse(exported);
  const originalTree = mdx.parse(original.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, ''));
  assert.deepEqual(nodes(tree, 'code').map(n => [n.lang, n.value]), nodes(originalTree, 'code').map(n => [n.lang, n.value]), `${route}: all code examples preserved`);
  const html = await readFile(path.join(build, route, 'index.html'), 'utf8');
  assert(html.includes(`href="https://pine-ui.com${page.markdown}"`), `${route}: alternate Markdown metadata`);
  assert(html.includes('Copy page'), `${route}: page action`);
  for (const node of [...nodes(tree, 'link'), ...nodes(tree, 'image'), ...nodes(tree, 'definition')]) {
    const url = new URL(node.url);
    if (url.origin !== 'https://pine-ui.com') continue;
    const file = path.join(build, decodeURI(url.pathname), url.pathname.endsWith('/') || url.pathname.startsWith('/docs/') ? 'index.html' : '');
    await access(file);
    if (url.hash && url.pathname.startsWith('/docs/')) {
      const target = await readFile(file, 'utf8');
      assert(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor ${url.href}`);
    }
    links++;
  }
}
for (const version of versions) {
  const prompt = await readFile(path.join(build, `ai/${version}/setup.txt`), 'utf8');
  assert(prompt.includes(`Pine ${version}`));
  assert(prompt.includes(`https://pine-ui.com/ai/${version}/tutorials/installation.md`));
  assert.equal(prompt.includes('using UI = Pine.Pine;'), version === '0.1.0');
  const index = await readFile(path.join(build, `ai/${version}/llms.txt`), 'utf8');
  assert(!index.includes(`/ai/${versions.find(v => v !== version)}/`));
}
assert.equal(await readFile(path.join(build, 'llms-full.txt'), 'utf8'), await readFile(path.join(build, `ai/${manifest.defaultVersion}/llms-full.txt`), 'utf8'));
assert((await readFile(path.join(build, 'support/index.html'), 'utf8')).includes('https://buymeacoffee.com/kbenim'));
console.log(`Verified ${Object.keys(manifest.pages).length} Markdown pages, preserved code examples, ${links} local links, versioned prompts and support URL.`);
