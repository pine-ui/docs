import test from 'node:test';
import assert from 'node:assert/strict';
import {exportPage, buildExports} from './export.mjs';

const pages = [
  {id: 'tutorials/start', version: '0.2.0', title: 'Start', source: '@site/versioned_docs/version-0.2.0/tutorials/start.md', permalink: '/docs/start-here/'},
  {id: 'api/core', version: '0.2.0', title: 'Core', source: '@site/versioned_docs/version-0.2.0/api/core.md', permalink: '/docs/reference/core/'},
  {id: 'tutorials/start', version: '0.1.0', title: 'Old start', source: '@site/versioned_docs/version-0.1.0/tutorials/start.md', permalink: '/docs/0.1.0/start-here/'},
];
const statuses = {'0.2.0': 'Released', '0.1.0': 'Historical release'};
const source = `---\ntitle: Start\n---\n
import InteractiveExample from '@site/example';

# Start
[Core](../api/core.md#source) and [download](/examples/0.2.0/Counter.cs).
<a href="/examples/0.2.0/Root.cs" download="Root.cs">Root.cs</a>
<span id="preview"/>
<InteractiveExample kind="hud" version="0.2.0"/>
\`\`\`csharp
var state = UI.Source<int>(0);
// [This is code](../api/core.md), <Frame>, import untouched
\`\`\`
<img src="/img/example.png" alt="Example"/>

## After

More documentation.
`;

test('export preserves code and rewrites actual metadata slugs without leaking MDX', () => {
  const text = exportPage({page: pages[0], source, pages, origin: 'https://pine-ui.com', status: statuses['0.2.0']});
  assert.match(text, /Pine 0\.2\.0.*Released/);
  assert.match(text, /https:\/\/pine-ui.com\/docs\/reference\/core\/#source/);
  assert.match(text, /\[Root.cs\]\(https:\/\/pine-ui.com\/examples\/0.2.0\/Root.cs\)/);
  assert.match(text, /var state = UI.Source<int>\(0\);\n\/\/ \[This is code\]\(\.\.\/api\/core.md\), <Frame>, import untouched/);
  assert.doesNotMatch(text, /<InteractiveExample|<span|from '@site/);
  assert.match(text, /browser preview/i);
  assert.match(text, /\n\n```csharp\nvar state/);
  assert.match(text, /\n\n## After\n/);
});

test('broken local references and unknown MDX components fail visibly', () => {
  assert.throws(() => exportPage({page: pages[0], source: '[Missing](lost.md)', pages, origin: 'https://pine-ui.com', status: 'Candidate'}), /Unresolved/);
  assert.throws(() => exportPage({page: pages[0], source: '<SecretData/>', pages, origin: 'https://pine-ui.com', status: 'Candidate'}), /Unsupported/);
});

test('indexes and full bundles isolate versions and exclude working docs', () => {
  const entries = pages.map(page => ({...page, markdown: page.version === '0.1.0' ? 'LEGACY_ONLY' : 'CURRENT_ONLY'}));
  const files = buildExports({pages: entries, versions: ['0.2.0', '0.1.0'], statuses, origin: 'https://pine-ui.com'});
  assert.match(files.get('ai/0.1.0/llms-full.txt'), /LEGACY_ONLY/);
  assert.doesNotMatch(files.get('ai/0.1.0/llms-full.txt'), /CURRENT_ONLY/);
  assert.doesNotMatch(files.get('llms-full.txt'), /LEGACY_ONLY/);
  assert.equal(files.get('llms-full.txt'), files.get('ai/0.2.0/llms-full.txt'));
  assert.match(files.get('llms.txt'), /ai\/0.1.0\/llms.txt/);
  assert.equal(files.get('ai/0.2.0/tutorials/start.md'), 'CURRENT_ONLY');
  assert.throws(() => buildExports({pages: [{...entries[0], version: 'current'}], versions: ['0.2.0'], statuses, origin: 'https://pine-ui.com'}), /Unpinned/);
});
