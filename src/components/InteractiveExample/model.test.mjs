import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState, transition, rank, stepSpring} from './model.mjs';

test('HUD damage clamps at zero while coins remain independent', () => {
  let state = initialState('hud');
  for (let i = 0; i < 15; i++) state = transition('hud', state, 'damage');
  assert.equal(state.health, 0);
  state = transition('hud', state, 'coin');
  assert.deepEqual(state, {health: 0, coins: 1});
  assert.deepEqual(transition('hud', state, 'reset'), {health: 100, coins: 0});
});
test('bindings derive rank at thirty points and batch level/score changes', () => {
  let state = initialState('binding');
  for (let i = 0; i < 2; i++) state = transition('binding', state, 'points');
  assert.equal(rank(state), 'Beginner');
  state = transition('binding', state, 'points');
  assert.equal(rank(state), 'Explorer');
  assert.deepEqual(transition('binding', state, 'level'), {level: 2, score: 0});
  assert.deepEqual(transition('binding', state, 'reset'), {level: 1, score: 0});
});
test('keyed inventory updates records without losing stable keys or mutating previous state', () => {
  const original = initialState('inventory');
  const reversed = transition('inventory', original, 'reverse');
  assert.deepEqual(reversed.items.map(i => i.id), [102, 101]);
  assert.deepEqual(original.items.map(i => i.id), [101, 102]);
  const increased = transition('inventory', reversed, 'potion');
  assert.equal(increased.items[1].quantity, 4);
  assert.equal(original.items[0].quantity, 3);
  assert.deepEqual(transition('inventory', increased, 'remove').items, [{id: 101, name: 'Potion', quantity: 4}]);
});
test('spring motion overshoots, converges and is independent of frame subdivisions', () => {
  const start = {position: -180, velocity: 0};
  const once = stepSpring(start.position, start.velocity, 180, .5);
  let sample = start, maximum = -180;
  for (let i = 0; i < 50; i++) {
    sample = stepSpring(sample.position, sample.velocity, 180, .01);
    maximum = Math.max(maximum, sample.position);
  }
  assert.ok(maximum > 180);
  assert.ok(Math.abs(sample.position - once.position) < 1e-8);
  sample = stepSpring(sample.position, sample.velocity, 180, 3);
  assert.ok(Math.abs(sample.position - 180) < .001);
  assert.ok(Math.abs(sample.velocity) < .001);
  assert.deepEqual(transition('spring', initialState('spring'), 'toggle'), {onRight: true});
});
