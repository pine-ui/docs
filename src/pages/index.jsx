import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Head from "@docusaurus/Head";

const identity = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://pine-ui.com/#pine",
      name: "Pine",
      url: "https://pine-ui.com/",
      logo: "https://pine-ui.com/img/mascot/pine-icon.png",
      sameAs: ["https://github.com/pine-ui"],
    },
    {
      "@type": "WebSite",
      "@id": "https://pine-ui.com/#website",
      name: "Pine",
      alternateName: "Pine UI for Unity",
      url: "https://pine-ui.com/",
      publisher: { "@id": "https://pine-ui.com/#pine" },
      inLanguage: "en",
      about: { "@id": "https://pine-ui.com/#source" },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://pine-ui.com/#source",
      name: "Pine",
      description:
        "A reactive C# UI library for Unity uGUI with typed state, native components, dynamic lists and spring animations.",
      url: "https://pine-ui.com/",
      codeRepository: "https://github.com/pine-ui/package",
      programmingLanguage: "C#",
      runtimePlatform: "Unity with uGUI",
      version: "1.0.0",
      license: "https://github.com/pine-ui/package/blob/main/LICENSE",
      isAccessibleForFree: true,
    },
  ],
};

const example = `using Pine;
using UnityEngine;

public static class App
{
    public static View Mount()
    {
        var count = P.Source(0);
        return P.Vertical(
                spacing: 12,
                childControlWidth: true,
                childControlHeight: true,
                childForceExpandHeight: false,
                sizeDelta: new Vector2(240, 160)
            )
            .With(
                P.Text(() => $"Count: {count.Value}", fontSize: 24)
                    .With(P.LayoutElement(preferredHeight: 40)),
                P.Button("Increment", onClick: () => count.Value++)
                    .With(P.LayoutElement(preferredHeight: 40)),
                P.Button(
                        "Reset",
                        onClick: () => count.Value = 0,
                        interactable: new Value<bool>(() => count.Value > 0)
                    )
                    .With(P.LayoutElement(preferredHeight: 40))
            );
    }
}`;

export default function Home() {
  return (
    <Layout
      title="Reactive UI for Unity in C#"
      description="Pine is a reactive C# UI library for Unity uGUI. Build interfaces in code with typed state, data binding, dynamic lists, and spring animations."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(identity)}</script>
      </Head>
      <main className="pine-home">
        <section className="pine-hero">
          <div>
            <div className="pine-hero-title">
              <img
                src={useBaseUrl("/img/mascot/pine-icon.png")}
                alt=""
                width="164"
                height="164"
              />
              <h1>
                Reactive Unity UI.
                <br />
                <span>Built in C#.</span>
              </h1>
            </div>
            <p>
              A reactive UI library for Unity. Compose native uGUI components,
              bind them to typed state, and let Pine handle updates and cleanup.
            </p>
            <div className="pine-actions">
              <Link
                className="button button--primary button--lg"
                to="/docs/tutorials/installation"
              >
                Get started
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/api/core"
              >
                API reference
              </Link>
            </div>
          </div>
        </section>
        <section className="pine-code-section">
          <div>
            <h2>
              One source.
              <br />A living interface.
            </h2>
            <p>
              Read state inside a binding. Change it from a callback. Pine
              tracks the relationship.
            </p>
            <Link to="/docs/tutorials/counter">Build the counter →</Link>
          </div>
          <CodeBlock language="csharp" title="App.cs">
            {example}
          </CodeBlock>
        </section>
        <section className="pine-features">
          <div>
            <h3>Typed reactivity</h3>
            <p>
              Sources, derived values, effects, batching, and contexts. Explicit
              typed state and scoped bindings.
            </p>
          </div>
          <div>
            <h3>Native Unity UI</h3>
            <p>
              Compose uGUI and TextMeshPro components. Create the Canvas and
              input host from code.
            </p>
          </div>
          <div>
            <h3>Owned lifetimes</h3>
            <p>
              Scopes own bindings, callbacks, branches, and animations. One app
              entry owns the tree. Destroying its root ends the scope; scene
              lifetime is optional.
            </p>
          </div>
        </section>
        <section className="pine-guides">
          <h2>Install Pine for Unity</h2>
          <p>
            Pine is free and open source under the MIT license. Install version
            1.0.0 through Unity Package Manager using its Git URL or download
            the UPM archive. The declared baseline is Unity 6000.3, uGUI 2.0.0
            and Input System 1.20.1; newer native features have version gates.
          </p>
          <p>
            <Link to="/docs/tutorials/installation">
              Installation and requirements
            </Link>
            {" · "}
            <Link to="/docs/tutorials/components">
              Compose reusable C# components
            </Link>
          </p>
        </section>
        <section className="pine-guides">
          <h2>Build something with Pine</h2>
          <div>
            <Link to="/docs/guides/reactive-hud">
              Build a reactive game HUD
            </Link>
            <Link to="/docs/guides/dynamic-lists">
              Create dynamic Unity UI lists
            </Link>
            <Link to="/docs/guides/data-binding">
              Bind Unity UI to C# state
            </Link>
            <Link to="/docs/guides/spring-animation">
              Animate Unity UI with springs
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
