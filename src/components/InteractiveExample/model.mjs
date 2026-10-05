// Browser models of the state transitions in the matching public Pine examples.
export const titles = {hud: 'Game HUD', binding: 'Data binding', inventory: 'Inventory', spring: 'Spring motion'};
export function initialState(kind) {
  if (kind === 'hud') return {health: 100, coins: 0};
  if (kind === 'binding') return {score: 0, level: 1};
  if (kind === 'inventory') return {items: [{id: 101, name: 'Potion', quantity: 3}, {id: 102, name: 'Key', quantity: 1}]};
  if (kind === 'spring') return {onRight: false};
  throw new Error(`Unknown example: ${kind}`);
}
export function transition(kind, state, action) {
  if (action === 'reset') return initialState(kind);
  if (kind === 'hud') {
    if (action === 'damage') return {...state, health: Math.max(0, state.health - 10)};
    if (action === 'coin') return {...state, coins: state.coins + 1};
  }
  if (kind === 'binding') {
    if (action === 'points') return {...state, score: state.score + 10};
    if (action === 'level') return {level: state.level + 1, score: 0};
  }
  if (kind === 'inventory') {
    if (action === 'potion') return {items: state.items.map(item => item.id === 101 ? {...item, quantity: item.quantity + 1} : item)};
    if (action === 'reverse') return {items: [...state.items].reverse()};
    if (action === 'remove') return {items: state.items.filter(item => item.id !== 102)};
  }
  if (kind === 'spring' && action === 'toggle') return {onRight: !state.onRight};
  return state;
}
export const rank = state => state.score >= 30 ? 'Explorer' : 'Beginner';
// Analytic damped harmonic motion: period=.45s, dampingRatio=.75, as in PineSpring.cs.
export function stepSpring(position, velocity, target, seconds) {
  const omega = 2 * Math.PI / .45, damping = .75 * omega;
  const damped = omega * Math.sqrt(1 - .75 * .75), time = Math.max(0, seconds);
  const decay = Math.exp(-damping * time), cosine = Math.cos(damped * time), sine = Math.sin(damped * time);
  const displacement = position - target;
  return {
    position: target + decay * (displacement * cosine + (velocity + damping * displacement) / damped * sine),
    velocity: decay * (velocity * cosine - (damping * velocity + omega * omega * displacement) / damped * sine),
  };
}
