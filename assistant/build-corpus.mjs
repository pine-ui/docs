import {readFile, readdir, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import Slugger from 'github-slugger';
import {tokens, VERSIONS} from './shared.mjs';
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
async function files(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  const nested = await Promise.all(entries.map(e => e.isDirectory() ? files(path.join(dir, e.name)) : e.name.endsWith('.md') ? [path.join(dir, e.name)] : []));
  return nested.flat().sort();
}
export async function buildCorpus() {
  const chunks = [], documents = [], frequency = {};
  const pinned = JSON.parse(await readFile(path.join(root, 'versions.json'), 'utf8'));
  if (JSON.stringify(pinned) !== JSON.stringify(VERSIONS.map(v => v.id))) throw new Error('Assistant versions must match the pinned docs manifest');
  for (const {id: version, prefix} of VERSIONS) {
    const directory = `versioned_docs/version-${version}`;
    for (const file of await files(path.join(root, directory))) {
      const source = await readFile(file, 'utf8');
      const front = source.match(/^---\n([\s\S]*?)\n---\n/);
      const text = source.slice(front?.[0].length ?? 0).replace(/^import .+;\s*$/gm, '').replace(/<InteractiveExample\b[^>]*\/>/g, '').replace(/<span id="in-unity"\s*\/>/g, '');
      const id = path.relative(path.join(root, directory), file).replace(/\.md$/, '');
      const title = front?.[1].match(/^title:\s*(.+)$/m)?.[1].replace(/^['"]|['"]$/g, '') ?? id;
      const url = `${prefix}${id}/`;
      documents.push({id, version, title, url});
      const slugger = new Slugger();
      let section = title, anchor = '', lines = [], fenced = false;
      function flush() {
        const body = lines.join('\n').trim().replace(/<img[^>]*\/>/g, '');
        lines = [];
        if (!body) return;
        const list = tokens(`${title} ${section} ${body}`), terms = {};
        for (const token of list) terms[token] = (terms[token] || 0) + 1;
        const chunkId = createHash('sha256').update(`${version}:${id}:${section}:${body}`).digest('hex').slice(0, 14);
        chunks.push({id: chunkId, document: id, version, title, section, url: url + (anchor ? `#${anchor}` : ''), text: body, terms, length: list.length});
      }
      for (const line of text.split('\n')) {
        if (/^```/.test(line)) fenced = !fenced;
        const heading = !fenced && line.match(/^(#{1,6})\s+(.+)$/);
        if (heading) {
          flush(); section = heading[2].replace(/[`*_]/g, '');
          const slug = slugger.slug(section);
          anchor = heading[1].length === 1 ? '' : slug;
        } else {
          if (!fenced && !line && lines.join('\n').length > 2000) flush();
          lines.push(line);
        }
      }
      flush();
      // Matching downloads enrich retrieval while citing their owning public guide.
      for (const match of text.matchAll(/href="(\/examples\/[^"?#]+\.cs)"/g)) {
        const download = match[1];
        if (!new RegExp(`^/examples/${version.replaceAll('.', '\\.')}/(?:[a-zA-Z0-9_-]+/)*[a-zA-Z0-9_-]+\\.cs$`).test(download)) throw new Error(`Example version mismatch or outside public whitelist: ${file}`);
        const body = await readFile(path.join(root, 'static', download), 'utf8');
        const list = tokens(`${title} ${body}`), terms = {};
        for (const token of list) terms[token] = (terms[token] || 0) + 1;
        chunks.push({id: createHash('sha256').update(`${version}:${download}:${body}`).digest('hex').slice(0, 14), document: id, version, title, section: path.basename(download), url: `${url}#run-the-example`, text: '```csharp\n' + body + '\n```', terms, length: list.length});
      }
    }
    frequency[version] = {};
    for (const c of chunks.filter(c => c.version === version)) for (const term of Object.keys(c.terms)) frequency[version][term] = (frequency[version][term] || 0) + 1;
  }
  const corpus = {documents, chunks, frequency};
  const serialized = JSON.stringify(corpus);
  for (const location of ['static/assistant/corpus.json']) {
    await mkdir(path.dirname(path.join(root, location)), {recursive: true});
    await writeFile(path.join(root, location), serialized);
  }
  return corpus;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const corpus = await buildCorpus();
  console.log(`Pine retrieval: ${corpus.documents.length} public documents, ${corpus.chunks.length} versioned chunks`);
}
