import React, {useEffect, useReducer, useRef, useState} from 'react';
import {initialState, transition, titles, rank, stepSpring} from './model.mjs';
import styles from './styles.module.css';

function SpringMarker({onRight, resetKey}) {
  const target = onRight ? 180 : -180;
  const [position, setPosition] = useState(-180);
  const motion = useRef({position: -180, velocity: 0});
  useEffect(() => { motion.current = {position: -180, velocity: 0}; setPosition(-180); }, [resetKey]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame, previous = performance.now();
    const tick = time => {
      if (preference.matches) motion.current = {position: target, velocity: 0};
      else {
        const elapsed = (time - previous) / 1000;
        motion.current = stepSpring(motion.current.position, motion.current.velocity, target, elapsed);
      }
      previous = time;
      const settled = Math.abs(motion.current.position - target) < .01 && Math.abs(motion.current.velocity) < .01;
      if (settled) motion.current = {position: target, velocity: 0};
      setPosition(motion.current.position);
      if (!settled) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, resetKey]);
  return <div className={styles.track} aria-hidden="true"><span className={styles.marker} style={{left: `${50 + position / 472 * 100}%`}}/></div>;
}
export default function InteractiveExample({kind, version}) {
  const [state, dispatch] = useReducer((state, action) => transition(kind, state, action), kind, initialState);
  const [resetKey, setResetKey] = useState(0);
  const source = {hud: 'PineHud', binding: 'PineBindings', inventory: 'PineInventory', spring: 'PineSpring'}[kind];
  if (!source || !['0.2.0'].includes(version)) throw new Error('Interactive example needs a pinned version and known kind');
  const action = (name, label, disabled = false) => <button type="button" onClick={() => dispatch(name)} disabled={disabled}>{label}</button>;
  return <section className={styles.example} aria-label={`${titles[kind]} interactive browser preview`}>
    <div className={styles.toolbar}><span>Interactive browser preview · Pine {version}</span><button type="button" onClick={() => { dispatch('reset'); setResetKey(key => key + 1); }} aria-label={`Reset ${titles[kind]} demo`}>Reset demo</button></div>
    <div className={styles.canvas}>
      <h3>{titles[kind]}</h3>
      {kind === 'hud' && <>
        <p aria-live="polite">Health: {state.health} / 100</p>
        <div className={styles.health} role="progressbar" aria-label="Health" aria-valuenow={state.health} aria-valuemin="0" aria-valuemax="100"><span style={{width: `${state.health}%`}}/></div>
        <p aria-live="polite">Coins: {state.coins}</p>
        {action('damage', 'Take 10 damage', state.health === 0)}{action('coin', 'Collect a coin')}
      </>}
      {kind === 'binding' && <>
        <p aria-live="polite">Level {state.level} | Score {state.score}</p>
        <p className={state.score >= 30 ? styles.explorer : ''} aria-live="polite">{rank(state)}</p>
        {action('points', 'Gain 10 points')}{action('level', 'Advance level')}{action('reset', 'Reset', state.score === 0 && state.level === 1)}
      </>}
      {kind === 'inventory' && <>
        <ul className={styles.items} aria-live="polite">{state.items.map(item => <li key={item.id} data-item-id={item.id}>{item.name} x{item.quantity}</li>)}</ul>
        {action('potion', 'Add a potion')}{action('reverse', 'Reverse rows')}{action('remove', 'Remove the key', !state.items.some(item => item.id === 102))}
      </>}
      {kind === 'spring' && <>
        <SpringMarker onRight={state.onRight} resetKey={resetKey}/>
        <p aria-live="polite">Target: {state.onRight ? 'right' : 'left'}</p>
        {action('toggle', state.onRight ? 'Move left' : 'Move right')}
      </>}
    </div>
    <p className={styles.caption}>Try the controls. This browser demo models the example’s behavior; Unity renders the native UI. <a href={`/examples/${version}/${source}.cs`} download={`${source}.cs`}>Download matching Unity source ↗</a></p>
  </section>;
}
