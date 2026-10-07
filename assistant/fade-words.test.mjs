import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Markdown from "react-markdown";
import { fadeWords } from "./fade-words.mjs";

test("word fades preserve Unicode, spacing, Markdown and literal code", () => {
  const html = renderToStaticMarkup(
    React.createElement(Markdown, {
      remarkPlugins: [[fadeWords, { className: "word" }]],
      children:
        'Hello 🦖 **Pine UI**.\n\n- Use `P.Text("Hello world")`.\n\n```cs\nP.Text("Hello world");\n```',
    }),
  );
  assert.match(
    html,
    /<span class="word">Hello<\/span> <span class="word">🦖<\/span>/,
  );
  assert.match(
    html,
    /<strong><span class="word">Pine<\/span> <span class="word">UI<\/span><\/strong>/,
  );
  assert.match(
    html,
    /<li><span class="word">Use<\/span> <code>P.Text\(&quot;Hello world&quot;\)<\/code>/,
  );
  assert.match(
    html,
    /<pre><code class="language-cs">P.Text\(&quot;Hello world&quot;\);\n<\/code><\/pre>/,
  );
});
