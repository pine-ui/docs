import React from 'react';
import Content from '@theme-original/DocItem/Content';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';
const poses = {installation: 'setup', counter: 'getting-started', reactivity: 'reactivity', components: 'layout', 'dynamic-ui': 'scopes', animation: 'motion', 'reactive-hud': 'events', 'dynamic-lists': 'scopes', 'data-binding': 'reactivity', 'spring-animation': 'motion', core: 'api', utility: 'cleanup', creation: 'layout', 'dynamic-scopes': 'scopes', configuration: 'setup', 'controls-reference': 'events', controls: 'events', 'dynamic-reference': 'scopes', 'layout-reference': 'layout', 'mount-reference': 'setup', 'native-reference': 'api', 'scope-reference': 'cleanup', 'signal-reference': 'reactivity', 'spring-reference': 'motion', 'state-reference': 'reactivity'};
export default function DocContent(props) {
  const {metadata} = useDoc(), id = metadata.id.split('/').pop();
  return <><div className={styles.illustration} aria-hidden="true"><img src={`/img/mascot/pine-${poses[id] || 'docs'}.png`} alt="" width="115" height="126" loading="lazy"/></div><Content {...props}/></>;
}
