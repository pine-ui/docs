import test from 'node:test';
import assert from 'node:assert/strict';
import {buildCorpus} from './build-corpus.mjs';
import {REFUSAL, suggestions, questionsForVersion, retrieve, obviousOutside, validateModelAnswer, resolveVersion, LATEST_VERSION, versionForPath} from './shared.mjs';

const corpus = await buildCorpus();
const input = {question: 'How do I install Pine in Unity?', version: '0.2.0', page: '/docs/tutorials/installation/'};
test('curated suggestions are distinct and shuffle excludes the previous three', () => {
  const first = suggestions(() => .3), next = suggestions(() => .7, first);
  assert.equal(new Set(first).size, 3); assert.equal(next.length, 3); assert.ok(next.every(q => !first.includes(q)));
  assert.ok(!questionsForVersion('0.1.0').includes('How do I keep state when a view is disabled?'));
  assert.ok(suggestions(() => .5, [], '0.1.0').every(q => questionsForVersion('0.1.0').includes(q)));
});
test('corpus contains only public docs and examples, with separate versions and valid section links', () => {
  assert.ok(corpus.documents.length >= 32);
  assert.ok(corpus.chunks.every(c => c.url.startsWith(c.version === '0.2.0' ? '/docs/' : '/docs/0.1.0/')));
  assert.ok(corpus.chunks.every(c => !/maintenance|discovery|research/.test(c.url)));
  assert.ok(corpus.chunks.some(c => c.section === 'PineHud.cs' && c.version === '0.2.0'));
  for (const version of ['0.2.0', '0.1.0']) {
    const found = retrieve(corpus, input.question, version);
    assert.ok(found.length); assert.ok(found.every(c => c.version === version));
    assert.ok(found.some(c => c.document === 'tutorials/installation'));
  }
});
test('follow-up retrieval uses only same-version user context', () => {
  const history = [{role: 'user', content: 'How do I animate a spring?', version: '0.2.0'}];
  assert.ok(retrieve(corpus, 'What about damping?', '0.2.0', '', history).some(c => /spring|animation/.test(c.document)));
  assert.deepEqual(retrieve(corpus, 'zzunknown', '0.1.0', '', history), []);
  assert.deepEqual(retrieve(corpus, 'How do I install Pine?', '0.2.0', '', history).map(c => c.id), retrieve(corpus, 'How do I install Pine?', '0.2.0').map(c => c.id));
});
test('latest pinned version is the default regardless of the viewed docs; explicit versions carry through their topic only', () => {
  assert.equal(versionForPath('/docs/0.1.0/api/core/'), '0.1.0');
  assert.equal(resolveVersion('How do I install Pine?').version, LATEST_VERSION);
  const oldTopic = [{role: 'user', content: 'How do springs work in Pine 0.1.0?', version: '0.1.0'}];
  assert.equal(resolveVersion('What about its damping?', oldTopic).version, '0.1.0');
  assert.equal(resolveVersion('How do I install Pine?', oldTopic).version, '0.2.0');
  assert.equal(resolveVersion('Use Pine 0.2.0 instead', oldTopic).version, '0.2.0');
  assert.equal(resolveVersion('I use Unity 6000.3.25; how do I install Pine?').version, '0.2.0');
  assert.ok(resolveVersion('How do I install Pine 9.0.0?').error);
  assert.ok(resolveVersion('Compare Pine 0.1.0 and 0.2.0').error);
});
test('clear unrelated questions are refused even after Pine conversation; mixed questions are retained', () => {
  assert.equal(obviousOutside('What is the weather today?', [{role: 'user', content: 'Pine source'}]), true);
  assert.equal(obviousOutside('Explain Pine Source and the weather'), false);
  assert.equal(obviousOutside('What is the capital of France?'), true);
});
test('answers must cite real same-version sources; code indexing and generic C# types survive validation', () => {
  const chunks = retrieve(corpus, 'Source', '0.2.0');
  const answer = {status: 'answered', answer: 'Use the documented state API.\n```csharp\nList<int> items; var first = items[0];\n```', citations: [chunks[0].id]};
  assert.equal(validateModelAnswer(JSON.stringify(answer), chunks, '0.2.0').status, 'answered');
  for (const invalid of [{...answer, citations: ['invented']}, {...answer, answer: 'Use [this page](https://evil.example).'}, {...answer, answer: '```bash\ngit clone https://evil.example/pine.git\n```'}, {...answer, answer: 'Use Pine.Pine.Source(0);'}, {...answer, citations: []}]) assert.equal(validateModelAnswer(JSON.stringify(invalid), chunks, '0.2.0'), null);
  assert.equal(validateModelAnswer(JSON.stringify(answer), chunks, '0.1.0'), null);
  const release = retrieve(corpus, 'Source', '0.1.0');
  assert.equal(validateModelAnswer(JSON.stringify({...answer, answer: '```csharp\nusing Pine;\nvar state = UI.Source(0);\n```', citations: [release[0].id]}), release, '0.1.0'), null);
  assert.equal(validateModelAnswer('{invalid json', chunks, '0.2.0'), null);
});

test('named slider questions retrieve its documented API; fabricated UI methods are rejected', () => {
  const chunks = retrieve(corpus, 'How do I bind a slider to state?', '0.2.0');
  assert.ok(chunks.some(c => c.section === 'UI.Slider'));
  const answer = {status: 'answered', answer: 'Use UI.Slider(value, UI.Min(0f), UI.Max(1f));', citations: [chunks[0].id]};
  assert.equal(validateModelAnswer(JSON.stringify(answer), chunks, '0.2.0'), null);
});
