import React, {useEffect, useState} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {usePluginData} from '@docusaurus/useGlobalData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function DocActions() {
  const {metadata} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const {pages} = usePluginData('pine-agent-toolkit');
  const page = pages[metadata.permalink];
  const installation = metadata.id === 'tutorials/installation';
  const [documents, setDocuments] = useState({});
  const [status, setStatus] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    setDocuments({});
    setStatus('');
    if (!page) return () => controller.abort();
    const paths = [page.markdown, ...(installation ? [page.setup] : [])];
    Promise.all(paths.map(async url => {
      const response = await fetch(url, {signal: controller.signal});
      if (!response.ok) throw new Error('Document unavailable');
      return [url, await response.text()];
    })).then(entries => setDocuments(Object.fromEntries(entries))).catch(error => {
      if (error.name !== 'AbortError') setStatus('Could not load copyable text. Open Markdown to read or copy this page.');
    });
    return () => controller.abort();
  }, [page, installation]);
  if (!page) return null;
  async function copy(url, label) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(documents[url]);
      setStatus(`${label} copied for Pine ${page.version}.`);
    } catch {
      setStatus('Clipboard access failed. Open Markdown or Setup prompt, then select and copy the text.');
    }
  }
  return <>
    <Head>
      <link rel="alternate" type="text/markdown" title={`Pine ${page.version} Markdown`} href={new URL(page.markdown, siteConfig.url).href}/>
      <link rel="describedby" href={new URL(page.index, siteConfig.url).href}/>
    </Head>
    <div className={styles.actions} aria-label="Use this documentation with an agent">
      <button type="button" onClick={() => copy(page.markdown, 'Page')} disabled={!documents[page.markdown]}>Copy page</button>
      <a href={page.markdown} target="_blank" rel="noopener noreferrer">Open Markdown</a>
      {installation && <><button type="button" onClick={() => copy(page.setup, 'Setup prompt')} disabled={!documents[page.setup]}>Copy setup prompt</button><a href={page.setup} target="_blank" rel="noopener noreferrer">Setup prompt</a></>}
      <Link to={page.guide}>Agent guide</Link>
      <span className={styles.version}>Pine {page.version}</span>
    </div>
    <p className={styles.status} role="status" aria-live="polite">{status}</p>
  </>;
}
