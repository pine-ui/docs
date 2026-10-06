import test from "node:test";
import assert from "node:assert/strict";
import { readAssistantStream } from "./stream.mjs";

test("answer text reaches the reader before generation completes, preserving split Unicode and final frames", async () => {
  let output, finish;
  const body = new ReadableStream({
    start(controller) {
      output = controller;
    },
  });
  const response = new Response(body, {
    headers: { "Content-Type": "text/event-stream" },
  });
  const parts = [],
    encoder = new TextEncoder();
  const firstDelta = new Promise((resolve) => {
    finish = resolve;
  });
  const result = readAssistantStream(
    response,
    {
      onDelta(text) {
        parts.push(text);
        finish();
      },
    },
    new AbortController().signal,
  );
  const bytes = encoder.encode(
    'event: delta\r\ndata: {"text":"Pine’s state"}\r\n\r\n',
  );
  for (const byte of bytes) output.enqueue(Uint8Array.of(byte));
  await firstDelta;
  assert.deepEqual(parts, ["Pine’s state"]);
  output.enqueue(
    encoder.encode(
      'event: result\ndata: {"status":"answered","answer":"Pine’s state"}',
    ),
  );
  output.close();
  assert.equal((await result).status, "answered");
});

test("a failed final validation replaces the streamed draft; an unfinished stream cannot succeed", async () => {
  const body =
    'event: delta\ndata: {"text":"Draft"}\n\nevent: result\ndata: {"status":"no-evidence","answer":"Could not verify"}\n\n';
  const result = await readAssistantStream(
    new Response(body, { headers: { "Content-Type": "text/event-stream" } }),
    {},
    new AbortController().signal,
  );
  assert.equal(result.answer, "Could not verify");
  await assert.rejects(
    readAssistantStream(
      new Response(body.split("event: result")[0], {
        headers: { "Content-Type": "text/event-stream" },
      }),
      {},
      new AbortController().signal,
    ),
    /No completed answer/,
  );
});
