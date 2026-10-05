import path from 'node:path';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';

const parser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);
const writer = unified().use(remarkStringify, {fences: true, bullet: '-', listItemIndent: 'one'}).use(remarkGfm);
const paragraph = value => ({type: 'paragraph', children: [{type: 'text', value}]});
const attr = (node, name) => node.attributes.find(a => a.name === name)?.value;
export const markdownPath = page => `/ai/${page.version}/${page.id}.md`;

export function exportPage({page, source, pages, origin, status}) {
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const tree = parser.parse(body);
  const bySource = new Map(pages.map(p => [p.source, p]));
  function resolve(url) {
    if (/^(https?:|mailto:|tel:)/.test(url)) return url;
    if (url.startsWith('#')) return new URL(page.permalink + url, origin).href;
    if (url.startsWith('/')) return new URL(url, origin).href;
    const [file, fragment = ''] = url.split('#');
    if (/\.mdx?$/.test(file)) {
      const target = bySource.get(path.posix.join(path.posix.dirname(page.source), decodeURI(file)));
      if (!target) throw new Error(`Unresolved documentation link ${url} in ${page.source}`);
      return new URL(target.permalink + (fragment ? `#${fragment}` : ''), origin).href;
    }
    return new URL(url, new URL(page.permalink, origin)).href;
  }
  function clean(node) {
    if (node.type === 'mdxjsEsm') return null;
    if (node.type === 'mdxFlowExpression' || node.type === 'mdxTextExpression') throw new Error(`Unsupported MDX expression in ${page.source}`);
    if (node.type.startsWith('mdxJsx')) {
      if (node.name === 'InteractiveExample') return paragraph('Interactive browser preview: open the canonical page to try this example. The preview models behavior; run the linked C# source in Unity for native execution.');
      if (node.name === 'span' && attr(node, 'id')) return null;
      let inline;
      if (node.name === 'img') inline = {type: 'image', url: resolve(attr(node, 'src')), alt: attr(node, 'alt') || '', title: null};
      if (node.name === 'a' && typeof attr(node, 'href') === 'string') inline = {type: 'link', url: resolve(attr(node, 'href')), children: node.children.map(clean).filter(Boolean)};
      if (inline) return node.type === 'mdxJsxFlowElement' ? {type: 'paragraph', children: [inline]} : inline;
      throw new Error(`Unsupported MDX component ${node.name} in ${page.source}`);
    }
    if (['link', 'image', 'definition'].includes(node.type)) node.url = resolve(node.url);
    if (node.children) node.children = node.children.map(clean).filter(Boolean);
    return node;
  }
  clean(tree);
  const header = `Pine ${page.version} — ${status}\n\nCanonical page: ${new URL(page.permalink, origin).href}\n\nVersion index: ${new URL(`/ai/${page.version}/llms.txt`, origin).href}\n\n`;
  return header + writer.stringify(tree);
}

export function buildExports({pages, versions, statuses, origin}) {
  const files = new Map();
  for (const page of pages) {
    if (!versions.includes(page.version)) throw new Error(`Unpinned documentation version ${page.version}`);
    files.set(markdownPath(page).slice(1), page.markdown);
  }
  for (const version of versions) {
    if (!statuses[version]) throw new Error(`Missing release status for ${version}`);
    const selected = pages.filter(p => p.version === version).sort((a, b) => a.id.localeCompare(b.id));
    const header = `# Pine ${version}\n\n> ${statuses[version]}. Read this version's API and prerequisites before writing code.\n\n`;
    const links = selected.map(p => `- [${p.title}](${new URL(markdownPath(p), origin).href}): ${p.description || p.id}`).join('\n');
    files.set(`ai/${version}/llms.txt`, `${header}## Documentation\n\n${links}\n\n## Complete context\n\n- [Full bundle](${origin}/ai/${version}/llms-full.txt): All pages for Pine ${version} only.\n`);
    files.set(`ai/${version}/llms-full.txt`, header + selected.map(p => p.markdown).join('\n\n---\n\n'));
  }
  files.set('llms.txt', `# Pine documentation\n\n> Reactive Unity UI in C#. Default documentation: Pine ${versions[0]} (${statuses[versions[0]]}). Choose one version; use its prerequisites, examples and API together.\n\n## Versions\n\n${versions.map(v => `- [Pine ${v}](${origin}/ai/${v}/llms.txt): ${statuses[v]}`).join('\n')}\n\n## Default version\n\n- [Complete bundle](${origin}/llms-full.txt): Pine ${versions[0]} only.\n`);
  files.set('llms-full.txt', files.get(`ai/${versions[0]}/llms-full.txt`));
  return files;
}
