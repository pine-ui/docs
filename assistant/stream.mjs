export async function readAssistantStream(
  response,
  { onStage = () => {}, onDelta = () => {} },
  signal,
) {
  if (!response.headers.get("Content-Type")?.includes("text/event-stream"))
    return response.json();
  const reader = response.body.getReader(),
    decoder = new TextDecoder();
  let buffer = "",
    result;
  function frame(text) {
    const event = text.match(/^event:\s*(.+)$/m)?.[1];
    const data = text
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (!data) return;
    const value = JSON.parse(data);
    if (event === "stage") onStage(value.stage);
    if (event === "delta" && typeof value.text === "string")
      onDelta(value.text);
    if (event === "result") result = value;
  }
  const abort = () => {
    void reader.cancel().catch(() => {});
  };
  signal.addEventListener("abort", abort, { once: true });
  try {
    while (true) {
      signal.throwIfAborted();
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const frames = buffer.split(/\r?\n\r?\n/);
      buffer = frames.pop();
      frames.forEach(frame);
    }
    signal.throwIfAborted();
    buffer += decoder.decode();
    if (buffer.trim()) frame(buffer);
  } finally {
    signal.removeEventListener("abort", abort);
    await reader.cancel();
  }
  if (!result) throw new Error("No completed answer");
  return result;
}
