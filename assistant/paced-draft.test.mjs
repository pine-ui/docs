import test from 'node:test';
import assert from 'node:assert/strict';
import {pacedDraft} from './paced-draft.mjs';

test('network bursts stay paced through completion and preserve Unicode', async () => {
  let tick, stopped = false;
  const output = [];
  const draft = pacedDraft(text => output.push(text), {
    schedule(callback, interval) { assert.equal(interval, 50); tick = callback; return 1; },
    unschedule() { stopped = true; },
  });
  draft.append('Hello 🦖 Pine!');
  assert.deepEqual(output, []);
  tick();
  assert.equal(output.at(-1), 'Hello ');
  const finish = draft.finish('Hello 🦖 Pine!');
  tick(); tick();
  await finish;
  assert.equal(output.at(-1), 'Hello 🦖 Pine!');
  assert.equal(stopped, true);
});

test('cancellation stops queued text and releases a pending completion', async () => {
  let tick, stopped = false;
  const output = [];
  const draft = pacedDraft(text => output.push(text), {
    schedule(callback) { tick = callback; return 1; },
    unschedule() { stopped = true; },
  });
  draft.append('Provisional response'); tick();
  const finish = draft.finish('Validated replacement');
  assert.equal(output.at(-1), '');
  draft.cancel();
  await finish;
  assert.equal(stopped, true);
  assert.equal(output.at(-1), '');
});
