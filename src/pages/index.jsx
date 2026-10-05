import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';

const example = `using Pine;
using UI = Pine.Pine;

var count = UI.Source(0);

using var mount = UI.Mount(() => UI.Column(
    UI.Label(() => $"Count: {count.Value}"),
    UI.Button("Increment", () => count.Value++)
));`;

export default function Home() {
  return (
    <Layout title="Reactive UI for Unity" description="Pine is a reactive C# UI library for Unity uGUI. Build interfaces in code with typed state and automatic updates.">
      <main className="pine-home">
        <section className="pine-hero">
          <div>
            <div className="pine-hero-title">
              <img src={useBaseUrl('/img/pine-icon.svg')} alt=""/>
              <h1>Interfaces in code.<br/><span>State in sync.</span></h1>
            </div>
            <p>A reactive UI library for Unity. Compose native uGUI components, bind them to typed state, and let Pine handle updates and cleanup.</p>
            <div className="pine-actions">
              <Link className="button button--primary button--lg" to="/docs/tutorials/installation">Get started</Link>
              <Link className="button button--secondary button--lg" to="/docs/api/core">API reference</Link>
            </div>
          </div>
        </section>
        <section className="pine-code-section">
          <div><h2>One source.<br/>A living interface.</h2><p>Read state inside a binding. Change it from a callback. Pine tracks the relationship.</p><Link to="/docs/tutorials/counter">Build the counter →</Link></div>
          <CodeBlock language="csharp" title="Counter.cs">{example}</CodeBlock>
        </section>
        <section className="pine-features">
          <div><h3>Typed reactivity</h3><p>Sources, derived values, effects, batching, and contexts. Explicit typed state and scoped bindings.</p></div>
          <div><h3>Native Unity UI</h3><p>Compose uGUI and TextMeshPro components. Create the Canvas and input host from code.</p></div>
          <div><h3>Owned lifetimes</h3><p>Scopes own bindings, callbacks, branches, and animations. Dispose a mount to release its UI.</p></div>
        </section>
      </main>
    </Layout>
  );
}
