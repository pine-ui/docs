import test from 'node:test';
import assert from 'node:assert/strict';
import {buildCorpus} from './build-corpus.mjs';
import {REFUSAL, suggestions, questionsForVersion, retrieve, obviousOutside, validateModelAnswer, resolveVersion, LATEST_VERSION, versionForPath} from './shared.mjs';

const corpus = await buildCorpus();
const input = {question: 'How do I install Pine in Unity?', version: '1.0.0', page: '/docs/tutorials/installation/'};
test('curated suggestions are distinct and shuffle excludes the previous three', () => {
  const first = suggestions(() => .3), next = suggestions(() => .7, first);
  assert.equal(new Set(first).size, 3); assert.equal(next.length, 3); assert.ok(next.every(q => !first.includes(q)));
});
test('corpus contains only public docs and examples, for the current version and valid section links', () => {
  assert.ok(corpus.documents.length >= 28);
  assert.ok(corpus.chunks.every(c => c.url.startsWith('/docs/') && c.version === LATEST_VERSION));
  assert.ok(corpus.chunks.every(c => !/maintenance|discovery|research/.test(c.url)));
  assert.ok(corpus.chunks.some(c => c.section === 'PineHud.cs' && c.version === '1.0.0'));
  for (const version of [LATEST_VERSION]) {
    const found = retrieve(corpus, input.question, version);
    assert.ok(found.length); assert.ok(found.every(c => c.version === version));
    assert.ok(found.some(c => c.document === 'tutorials/installation'));
  }
});
test('follow-up retrieval uses only same-version user context', () => {
  const history = [{role: 'user', content: 'How do I animate a spring?', version: '1.0.0'}];
  assert.ok(retrieve(corpus, 'What about damping?', '1.0.0', '', history).some(c => /spring|animation/.test(c.document)));
  assert.deepEqual(retrieve(corpus, 'zzunknown', '9.0.0', '', history), []);
  assert.deepEqual(retrieve(corpus, 'How do I install Pine?', '1.0.0', '', history).map(c => c.id), retrieve(corpus, 'How do I install Pine?', '1.0.0').map(c => c.id));
});
test('latest pinned version is the default regardless of the viewed docs; explicit versions carry through their topic only', () => {
  assert.equal(versionForPath('/docs/api/core/'), LATEST_VERSION);
  assert.equal(resolveVersion('How do I install Pine?').version, LATEST_VERSION);
  const oldTopic = [{role: 'user', content: 'How do springs work in Pine 9.0.0?', version: '9.0.0'}];
  assert.equal(resolveVersion('What about its damping?', oldTopic).version, LATEST_VERSION);
  assert.equal(resolveVersion('How do I install Pine?', oldTopic).version, '1.0.0');
  assert.equal(resolveVersion('Use Pine 1.0.0 instead', oldTopic).version, '1.0.0');
  assert.equal(resolveVersion('I use Unity 6000.3.25; how do I install Pine?').version, '1.0.0');
  assert.ok(resolveVersion('How do I install Pine 9.0.0?').error);
  assert.ok(resolveVersion('Compare Pine 9.0.0 and 1.0.0').error);
});
test('clear unrelated questions are refused even after Pine conversation; mixed questions are retained', () => {
  assert.equal(obviousOutside('What is the weather today?', [{role: 'user', content: 'Pine source'}]), true);
  assert.equal(obviousOutside('Explain Pine Source and the weather'), false);
  assert.equal(obviousOutside('What is the capital of France?'), true);
});
test('answers must cite real same-version sources; code indexing and generic C# types survive validation', () => {
  const chunks = retrieve(corpus, 'Source', '1.0.0');
  const answer = {status: 'answered', answer: 'Use the documented state API.\n```csharp\nList<int> items; var first = items[0];\n```', citations: [chunks[0].id]};
  assert.equal(validateModelAnswer(JSON.stringify(answer), chunks, '1.0.0').status, 'answered');
  for (const invalid of [{...answer, citations: ['invented']}, {...answer, answer: 'Use [this page](https://evil.example).'}, {...answer, answer: '```bash\ngit clone https://evil.example/pine.git\n```'}, {...answer, answer: 'Use Pine.Pine.Source(0);'}, {...answer, citations: []}]) assert.equal(validateModelAnswer(JSON.stringify(invalid), chunks, '1.0.0'), null);
  assert.equal(validateModelAnswer(JSON.stringify(answer), chunks, '9.0.0'), null);
  assert.equal(validateModelAnswer('{invalid json', chunks, '1.0.0'), null);
});

test('named slider questions retrieve its documented API; native P signatures are accepted; obsolete and fabricated methods are rejected', () => {
  const chunks = retrieve(corpus, 'How do I bind a slider to state?', '1.0.0');
  assert.ok(chunks.some(c => c.section === 'P.Slider'));
  const answer = {status: 'answered', answer: 'Use P.Slider(value: volume, minValue: 0f, maxValue: 1f);', citations: [chunks[0].id]};
  assert.equal(validateModelAnswer(JSON.stringify(answer), chunks, '1.0.0').status, 'answered');
  for (const text of ['Use UI.Slider(value);', 'Use P.Slider(value, P.Min(0f));'])
    assert.equal(validateModelAnswer(JSON.stringify({...answer, answer: text}), chunks, '1.0.0'), null);
});

test('factory methods cannot be used as component types or member containers', () => {
  const chunks = retrieve(corpus, 'Toggle onValueChanged', '1.0.0');
  const answer = {status: 'answered', answer: 'Use P.Toggle(onValueChanged: value => UnityEngine.Debug.Log(value));', citations: [chunks[0].id]};
  assert.equal(validateModelAnswer(JSON.stringify(answer), chunks, '1.0.0').status, 'answered');
  for (const text of ['Use P.Create<P.Toggle>();', 'Use P.Toggle.onValueChanged(callback);'])
    assert.equal(validateModelAnswer(JSON.stringify({...answer, answer: text}), chunks, '1.0.0'), null);
});
