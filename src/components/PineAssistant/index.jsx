import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Markdown from "react-markdown";
import CodeBlock from "@theme/CodeBlock";
import { pacedDraft } from "../../../assistant/paced-draft.mjs";
import remarkGfm from "remark-gfm";
import {
  VERSIONS,
  suggestions,
  questionsForVersion,
  LATEST_VERSION,
  resolveVersion,
  retrieve,
  fallback,
  obviousOutside,
  REFUSAL,
} from "../../../assistant/shared.mjs";
import { readAssistantStream } from "../../../assistant/stream.mjs";
import styles from "./styles.module.css";

const SESSION = "pine-docs-chat-native-1.1.0";
const safeUrl = (url) =>
  typeof url === "string" &&
  /^\/docs\/(?:[a-z0-9.-]+\/)+(?:#[a-z0-9_-]+)?$/.test(url);
const statusImages = {
  idle: "welcome",
  retrieving: "thinking",
  generating: "ai-assistant",
  answered: "success",
  "outside-scope": "troubleshooting",
  stopped: "cleanup",
  unavailable: "docs",
  "no-evidence": "docs",
  "rate-limited": "docs",
};
const stageText = {
  retrieving: "Searching this version’s documentation…",
  generating: "Writing and checking a sourced answer…",
};

function ChatCode({ children }) {
  const code = React.Children.toArray(children)[0];
  if (!React.isValidElement(code)) return <pre>{children}</pre>;
  const language =
    /language-([^ ]+)/.exec(code.props.className || "")?.[1] || "text";
  return (
    <CodeBlock language={["cs", "c#"].includes(language) ? "csharp" : language}>
      {String(code.props.children).replace(/\n$/, "")}
    </CodeBlock>
  );
}
const markdownComponents = {
  pre: ChatCode,
  img: () => null,
  a: ({ children }) => <span>{children}</span>,
};
function Sources({ sources, onNavigate }) {
  if (!Array.isArray(sources) || !sources.length) return null;
  return (
    <div className={styles.sources}>
      <p>From the documentation</p>
      {sources
        .filter((s) => safeUrl(s.url))
        .slice(0, 3)
        .map((source) => (
          <Link
            key={source.id}
            to={source.url}
            onClick={onNavigate}
            className={styles.source}
          >
            <strong>
              {source.title}
              <span aria-hidden="true"> ↗</span>
            </strong>
            <span>{source.section}</span>
          </Link>
        ))}
    </div>
  );
}
export default function PineAssistant() {
  const { siteConfig } = useDocusaurusContext(),
    location = useLocation();
  const endpoint = siteConfig.customFields.assistantEndpoint;
  const [open, setOpen] = useState(false),
    [messages, setMessages] = useState([]);
  const [starters, setStarters] = useState([]),
    [question, setQuestion] = useState("");
  const [stage, setStage] = useState("idle"),
    [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false),
    [draft, setDraft] = useState("");
  const [awayFromBottom, setAwayFromBottom] = useState(false);
  const [cooldown, setCooldown] = useState(0),
    [now, setNow] = useState(Date.now());
  const request = useRef(null),
    corpus = useRef(null),
    launcher = useRef(null),
    panel = useRef(null),
    input = useRef(null),
    thread = useRef(null),
    threadContent = useRef(null),
    scrollPosition = useRef(0);
  const busy = stage === "retrieving" || stage === "generating";
  const isDocs = location.pathname.startsWith("/docs/");
  const seconds = Math.max(0, Math.ceil((cooldown - now) / 1000));

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(SESSION));
      if (saved && Array.isArray(saved.messages)) {
        setMessages(
          saved.messages
            .map((m) => ({
              ...m,
              version: m.version === "current" ? LATEST_VERSION : m.version,
            }))
            .filter(
              (m) =>
                ["user", "assistant"].includes(m.role) &&
                typeof m.content === "string" &&
                VERSIONS.some((v) => v.id === m.version),
            )
            .slice(-40),
        );
        setStage(saved.messages.at(-1)?.status || "idle");
        sessionStorage.removeItem("pine-docs-chat-v1");
        setOpen(Boolean(saved.open));
        if (
          Array.isArray(saved.starters) &&
          saved.starters.length === 3 &&
          new Set(saved.starters).size === 3 &&
          saved.starters.every((q) =>
            questionsForVersion(LATEST_VERSION).includes(q),
          )
        )
          setStarters(saved.starters);
        else setStarters(suggestions());
        if (Number.isFinite(saved.cooldown)) setCooldown(saved.cooldown);
      } else setStarters(suggestions());
    } catch {
      setStarters(suggestions());
    }
    setReady(true);
    return () => request.current?.abort();
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 996px)"),
      update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!ready || (!open && !messages.length)) return;
    try {
      sessionStorage.setItem(
        SESSION,
        JSON.stringify({
          messages: messages.slice(-40),
          starters,
          open,
          cooldown,
        }),
      );
    } catch {
      /* Chat still works when session storage is unavailable. */
    }
  }, [messages, starters, open, cooldown, ready]);
  useEffect(() => {
    if (!seconds) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [cooldown, seconds > 0]);
  const checkScroll = () => {
    const element = thread.current;
    if (!element) return;
    scrollPosition.current = element.scrollTop;
    setAwayFromBottom(
      element.scrollHeight - element.clientHeight - element.scrollTop > 80,
    );
  };
  useEffect(() => {
    if (!open || !thread.current) return undefined;
    thread.current.scrollTop = scrollPosition.current;
    const observer = new ResizeObserver(checkScroll);
    observer.observe(thread.current);
    observer.observe(threadContent.current);
    checkScroll();
    return () => observer.disconnect();
  }, [open, mobile]);
  useEffect(() => {
    document.body.classList.toggle("pine-chat-open", open);
    if (!open) return () => document.body.classList.remove("pine-chat-open");
    if (mobile && !panel.current.open) panel.current.showModal();
    (input.current?.disabled
      ? panel.current.querySelector("button")
      : input.current
    )?.focus({ preventScroll: true });
    const keyboard = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => launcher.current?.focus());
      }
    };
    document.addEventListener("keydown", keyboard);
    return () => {
      document.body.classList.remove("pine-chat-open");
      document.removeEventListener("keydown", keyboard);
    };
  }, [open, isDocs, mobile]);

  useEffect(() => {
    if (!open || !input.current) return undefined;
    const element = input.current;
    const resize = () => {
      const css = getComputedStyle(element),
        line = parseFloat(css.lineHeight);
      const padding =
        parseFloat(css.paddingTop) + parseFloat(css.paddingBottom);
      element.style.height = "0px";
      const maximum = line * 4 + padding;
      element.style.height = `${Math.min(element.scrollHeight, maximum)}px`;
      element.style.overflowY =
        element.scrollHeight > maximum ? "auto" : "hidden";
    };
    resize();
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      if (width !== observer.width) {
        observer.width = width;
        resize();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [question, open, mobile]);

  async function loadCorpus(signal) {
    if (!corpus.current) {
      const response = await fetch("/assistant/corpus.json", {
        signal,
        cache: "no-cache",
      });
      if (!response.ok) throw new Error("Documentation index unavailable");
      corpus.current = await response.json();
    }
    return corpus.current;
  }
  async function send(text = question) {
    text = text.trim();
    if (!text || text.length > 2000 || request.current || seconds) return;
    const resolved = resolveVersion(text, messages),
      activeVersion = resolved.version;
    const controller = new AbortController();
    request.current = controller;
    const signal = AbortSignal.any([
      controller.signal,
      AbortSignal.timeout(60000),
    ]);
    const base = messages;
    const history = base
      .filter((m) => m.version === activeVersion)
      .slice(-6)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, 1200),
        version: m.version,
      }));
    const next = [
      ...base,
      { role: "user", content: text, version: activeVersion },
    ];
    setMessages(next);
    setQuestion("");
    setDraft("");
    setStage("retrieving");
    const paced = pacedDraft(setDraft);
    const stopDraft = () => paced.cancel();
    controller.signal.addEventListener("abort", stopDraft, { once: true });
    let chunks = [],
      result;
    try {
      if (resolved.error)
        result = {
          status: "no-evidence",
          answer: resolved.error,
          sources: [],
          mode: "documentation",
        };
      else if (obviousOutside(text, history))
        result = {
          status: "outside-scope",
          answer: REFUSAL,
          sources: [],
          mode: "assistant",
        };
      else {
        chunks = retrieve(
          await loadCorpus(signal),
          text,
          activeVersion,
          location.pathname,
          history,
        );
        if (!endpoint)
          result = fallback(
            chunks,
            chunks.length ? "unavailable" : "no-evidence",
          );
        else {
          const response = await fetch(endpoint.replace(/\/$/, "") + "/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: text,
              version: activeVersion,
              page: isDocs ? location.pathname : "",
              history,
            }),
            signal,
          });
          result = await readAssistantStream(
            response,
            {
              onStage: (s) => {
                if (stageText[s]) setStage(s);
              },
              onDelta: (text) => paced.append(text),
            },
            signal,
          );
          if (response.status === 429) {
            setNow(Date.now());
            setCooldown(
              Date.now() +
                Math.max(1, Math.min(86400, Number(result.retryAfter) || 60)) *
                  1000,
            );
          } else if (!response.ok) result = fallback(chunks);
        }
      }
      if (
        !result ||
        typeof result.answer !== "string" ||
        ![
          "answered",
          "outside-scope",
          "no-evidence",
          "unavailable",
          "rate-limited",
        ].includes(result.status)
      )
        throw new Error("Invalid response");
      if (result.status === "answered") {
        await paced.finish(result.answer);
        controller.signal.throwIfAborted();
      }
    } catch {
      result = controller.signal.aborted
        ? {
            status: "stopped",
            answer: "Answer stopped.",
            sources: [],
            mode: "documentation",
          }
        : fallback(chunks);
    } finally {
      paced.cancel();
      controller.signal.removeEventListener("abort", stopDraft);
      request.current = null;
    }
    setMessages(
      [
        ...next,
        {
          role: "assistant",
          content: result.answer,
          sources: result.sources,
          status: result.status,
          mode: result.mode,
          version: activeVersion,
        },
      ].slice(-40),
    );
    setDraft("");
    setStage(result.status);
  }
  const navigateSource = () => {
    if (window.matchMedia("(max-width: 996px)").matches) setOpen(false);
  };
  const trapFocus = (event) => {
    if (!mobile || event.key !== "Tab") return;
    const targets = Array.from(
      event.currentTarget.querySelectorAll("button, a[href], textarea"),
    ).filter((element) => element.getClientRects().length && !element.disabled);
    const first = targets[0],
      last = targets.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };
  const Panel = mobile ? "dialog" : "aside";
  if (!ready) return null;
  return (
    <>
      {!open && (
        <button
          ref={launcher}
          type="button"
          className={styles.launcher}
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="pine-assistant-panel"
        >
          <img
            src="/img/mascot/pine-ai-assistant.webp"
            alt=""
            width="48"
            height="53"
          />
          Ask Pine
        </button>
      )}
      {open && (
        <Panel
          ref={panel}
          id="pine-assistant-panel"
          className={styles.panel}
          role={mobile ? "dialog" : "complementary"}
          aria-modal={mobile || undefined}
          onKeyDownCapture={trapFocus}
          onCancel={(event) => {
            event.preventDefault();
            setOpen(false);
            requestAnimationFrame(() => launcher.current?.focus());
          }}
          aria-label="Pine documentation assistant"
        >
          <header className={styles.header}>
            <div>
              <h2>Ask Pine</h2>
            </div>
            <button
              type="button"
              className={styles.icon}
              onClick={() => {
                setOpen(false);
                requestAnimationFrame(() => launcher.current?.focus());
              }}
              aria-label="Close Pine chat"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </header>
          <div className={styles.threadArea}>
            <div ref={thread} className={styles.thread} onScroll={checkScroll}>
              <div ref={threadContent}>
                {!messages.length && (
                  <div className={styles.welcome}>
                    <img
                      src="/img/mascot/pine-ai-assistant.webp"
                      alt="Pine dinosaur with glasses studying a laptop"
                      width="126"
                      height="138"
                    />
                    <h3>A little help building with Pine.</h3>
                    <p>
                      Ask about setup, reactive state, controls, or your next
                      Unity UI. Answers use the latest pinned Pine docs unless
                      you ask for another version.
                    </p>
                    {!endpoint && (
                      <small>
                        AI is offline · You can still search Pine’s docs.
                      </small>
                    )}
                  </div>
                )}
                {messages.map((message, i) => (
                  <article
                    key={i}
                    className={
                      message.role === "user" ? styles.user : styles.answer
                    }
                    aria-label={
                      message.role === "user"
                        ? "Your question"
                        : "Pine response"
                    }
                  >
                    {message.role === "assistant" && (
                      <div className={styles.messageLabel}>
                        <img
                          className={styles.avatar}
                          src={`/img/mascot/pine-${statusImages[message.status] || "welcome"}.webp`}
                          alt=""
                          width="32"
                          height="35"
                        />
                        Pine
                        <span>
                          {
                            VERSIONS.find((v) => v.id === message.version)
                              ?.label
                          }
                          {message.mode === "documentation"
                            ? " · Docs result"
                            : ""}
                        </span>
                      </div>
                    )}
                    {message.role === "user" ? (
                      <p>{message.content}</p>
                    ) : (
                      <>
                        <Markdown
                          remarkPlugins={[remarkGfm]}
                          skipHtml
                          components={markdownComponents}
                        >
                          {message.content}
                        </Markdown>
                        <Sources
                          sources={message.sources}
                          onNavigate={navigateSource}
                        />
                      </>
                    )}
                  </article>
                ))}
                {busy && draft && (
                  <article className={styles.answer} aria-label="Pine response">
                    <div className={styles.messageLabel}>
                      <img
                        className={styles.avatar}
                        src="/img/mascot/pine-ai-assistant.webp"
                        alt=""
                        width="32"
                        height="35"
                      />
                      Pine
                    </div>
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      skipHtml
                      components={markdownComponents}
                    >
                      {draft}
                    </Markdown>
                  </article>
                )}
                {busy && !draft && (
                  <div className={styles.activity} role="status">
                    <img
                      key={stage}
                      src={`/img/mascot/pine-${statusImages[stage]}.webp`}
                      alt=""
                      width="64"
                      height="70"
                    />
                    <span>{stageText[stage]}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              className={`${styles.jump} ${awayFromBottom ? styles.jumpVisible : ""}`}
              aria-label="Scroll to conversation bottom"
              aria-hidden={!awayFromBottom}
              tabIndex={awayFromBottom ? 0 : -1}
              onClick={() =>
                thread.current?.scrollTo({
                  top: thread.current.scrollHeight,
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                })
              }
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14m-7-7 7 7 7-7" />
              </svg>
            </button>
          </div>
          <footer className={styles.footer}>
            <p className={styles.notice}>
              {endpoint
                ? "AI assistant · Messages and recent conversation are sent to Cloudflare. Answers can be wrong."
                : "Local documentation search · Questions stay in this browser."}{" "}
              Do not share personal data or secrets.{" "}
              <Link to="/data-use" onClick={navigateSource}>
                Data use
              </Link>
              {messages.length > 0 && (
                <>
                  {" · "}
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      setMessages([]);
                      setDraft("");
                      setStage("idle");
                      try {
                        sessionStorage.removeItem(SESSION);
                      } catch {
                        /* In-memory conversation is cleared even without storage. */
                      }
                    }}
                  >
                    Clear conversation
                  </button>
                </>
              )}
            </p>
            {!busy && !messages.length && (
              <div className={styles.suggestions}>
                {starters.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    disabled={!!seconds}
                  >
                    {q}
                    <span aria-hidden="true"> ↗</span>
                  </button>
                ))}
              </div>
            )}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void send();
              }}
              className={styles.form}
            >
              <textarea
                ref={input}
                rows="1"
                maxLength="2000"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.nativeEvent.isComposing
                  ) {
                    e.preventDefault();
                    void send();
                  }
                }}
                aria-label="Ask Pine a question"
                placeholder="How do I build this with Pine?"
                disabled={busy || !!seconds}
              />
              {busy ? (
                <button
                  type="button"
                  onClick={() => request.current?.abort()}
                  aria-label="Stop answer"
                >
                  <span className={styles.stopIcon} aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  aria-label="Send question"
                  disabled={!question.trim() || !!seconds}
                >
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </button>
              )}
            </form>
          </footer>
        </Panel>
      )}
    </>
  );
}
