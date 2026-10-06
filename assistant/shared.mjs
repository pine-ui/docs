export const REFUSAL = 'I can help with Pine and its Unity UI documentation. I can’t answer questions outside that scope.';
export const VERSIONS = [{id: '1.0.0', label: '1.0.0', prefix: '/docs/'}];
export const LATEST_VERSION = VERSIONS[0].id;
export const QUESTIONS = [
  'How do I install Pine in Unity?', 'How do I build my first counter?',
  'How do Source and Derive work together?', 'When should I use an Effect?',
  'How do I batch related state changes?', 'How do I dispose a mount?',
  'How do I create a button and handle clicks?', 'How do I bind a slider to state?',
  'How do I build a reactive game HUD?', 'How do keyed dynamic lists work?',
  'How do I show and hide UI conditionally?', 'How do retained branch exits work?',
  'How do I animate UI with a spring?', 'How do period and damping affect springs?',
  'How do I reuse an existing Unity component?', 'How does Pine own cleanup?',
  'How do I share state with a context?', 'How do I bind text to changing state?',
  'What do Strict and Defaults configure?', 'What text and input setup does Pine need?',
  'How do I choose between Indexes and Values?', 'How do I configure native UI properties?',
  'What happens when an effect throws?', 'How do I keep state when a view is disabled?',
];
export function questionsForVersion(version) {
  return QUESTIONS;
}
export function suggestions(random = Math.random, exclude = [], version = LATEST_VERSION) {
  const pool = questionsForVersion(version).filter(q => !exclude.includes(q));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}
const stop = new Set('a an and are as at be can could do does for from how i in is it me my of on or that the their this to use using what when where which with you your'.split(' '));
export function tokens(text) {
  return String(text).replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().match(/[a-z0-9]+/g)?.filter(t => t.length > 1 && !stop.has(t)) ?? [];
}
export function versionForPath(path) { return VERSIONS.find(v => v.prefix !== '/docs/' && path.startsWith(v.prefix))?.id ?? LATEST_VERSION; }
export function isFollowup(question, previous = '') {
  if (/\b(it|that|this|those|they|them|these|same)\b|^(and\b|what about\b|how about\b|what if\b|show me\b|more\b)/i.test(question)) return true;
  const topics = [/\b(spring|damping|period|overshoot|animation)\b/i, /\b(indexes|values|keyed|rows|lists|branches|presence)\b/i, /\b(mount|dispose|disposal|cleanup|ownership)\b/i, /\b(source|derive|derived|effect|batch|state)\b/i];
  return topics.some(topic => topic.test(question) && topic.test(previous));
}
export function resolveVersion(question, messages = []) {
  const mentions = [...question.matchAll(/\b(?:pine\s+)?(?:v(?:ersion)?\s*)?(\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?)\b/gi)].filter(m => !/\b(?:unity|editor|c#|dotnet|\.net)\s*$/i.test(question.slice(Math.max(0, m.index - 20), m.index)));
  const requested = [...new Set(mentions.map(m => m[1]))];
  if (requested.length > 1) return {version: LATEST_VERSION, error: 'Please ask about one Pine version at a time so I can keep its API and sources consistent.'};
  if (requested.length) return VERSIONS.some(v => v.id === requested[0]) ? {version: requested[0]} : {version: LATEST_VERSION, error: `Pine ${requested[0]} is not available in these docs. Available versions: ${VERSIONS.map(v => v.label).join(', ')}.`};
  const previous = messages.findLast(m => m.role === 'user' && VERSIONS.some(v => v.id === m.version));
  return {version: previous && isFollowup(question, previous.content) ? previous.version : LATEST_VERSION};
}
export function obviousOutside(question, history = []) {
  const product = /\bpine\b|\bunity\b|\bugui\b|\b(source|derive|effect|mount|scope|slider|button|spring|binding|batch|indexes|cleanup|canvas|textmeshpro)\b/i;
  const unrelated = /\b(weather|recipes?|football|politics?|president|bitcoin|stock market|horoscope|poem|song lyrics|capital (?:city|of)|travel itinerary)\b/i;
  return unrelated.test(question) && !product.test(question);
}
export function retrieve(corpus, question, version, page = '', history = [], count = 5) {
  const recent = history.filter(m => m.role === 'user' && m.version === version).slice(-2).map(m => m.content).join(' ');
  const followup = isFollowup(question, recent);
  const query = [...new Set(tokens(question.length < 100 && followup ? `${question} ${recent}` : question))];
  const expanded = [...query];
  for (const [key, words] of Object.entries({dispose: ['cleanup', 'ownership'], install: ['package', 'configuration'], animation: ['spring'], hide: ['show', 'presence'], list: ['indexes', 'values'], click: ['button', 'events'], state: ['source', 'derive']})) {
    if (query.includes(key)) expanded.push(...words);
  }
  const docs = corpus.chunks.filter(c => c.version === version);
  const df = corpus.frequency[version] ?? {};
  const n = docs.length || 1;
  return docs.map(c => {
    let score = 0, hits = 0;
    const api = /^P\.(\w+)$/.exec(c.section)?.[1].toLowerCase();
    if (api && query.includes(api)) score += 20;
    const headingTerms = new Set(tokens(`${c.title} ${c.section}`));
    for (const term of new Set(expanded)) {
      const tf = c.terms[term] || 0;
      if (!tf) continue;
      hits++;
      const idf = Math.log(1 + (n - (df[term] || 0) + .5) / ((df[term] || 0) + .5));
      score += idf * (tf * 2.2) / (tf + 1.2 * (.25 + .75 * c.length / 220));
      if (headingTerms.has(term)) score += idf * 1.5;
    }
    if (score && c.url.split('#')[0] === page.split('#')[0]) score *= 1.1;
    return {...c, score, hits};
  }).filter(c => c.score > 0 && c.hits > 0).sort((a, b) => b.score - a.score).slice(0, count);
}
export function sourceCards(chunks) {
  return chunks.map(c => ({id: c.id, title: c.title, section: c.section, url: c.url, version: c.version, excerpt: c.text.replace(/```[\s\S]*?```/g, '').replace(/<\/?(?:a|img|div|span|details|summary|br|p)\b[^>]*>/gi, '').replace(/^#+\s*/gm, '').replace(/[*`|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 260)}));
}
export function fallback(chunks, reason = 'unavailable') {
  const text = reason === 'no-evidence' ? 'I couldn’t verify that in this version of Pine’s documentation.' : reason === 'rate-limited' ? 'Please pause before asking another question. You can keep exploring the documentation below.' : chunks.length ? 'AI answers are unavailable right now. Here are relevant passages from Pine’s documentation.' : 'I couldn’t load a documentation result. Please retry or use the docs search.';
  return {status: reason, answer: text, sources: sourceCards(chunks.slice(0, 3)), mode: 'documentation'};
}
export function validateModelAnswer(raw, chunks, version) {
  const text = typeof raw === 'string' ? raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, '') : '';
  let value;
  try { value = JSON.parse(text); } catch { return null; }
  if (!value || !['answered', 'outside-scope', 'no-evidence'].includes(value.status)) return null;
  if (value.status === 'outside-scope') return {status: value.status, answer: REFUSAL, sources: [], mode: 'assistant'};
  if (value.status === 'no-evidence') return fallback(chunks, 'no-evidence');
  if (typeof value.answer !== 'string' || value.answer.length < 10 || value.answer.length > 14000 || !Array.isArray(value.citations) || !value.citations.length) return null;
  const chosen = value.citations.map(id => chunks.find(c => c.id === id && c.version === version));
  if (chosen.some(c => !c)) return null;
  // URLs are supplied by the trusted corpus, never invented by the model.
  const prose = value.answer.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  if (/https?:\/\/|www\.|<\/?[a-z][^>]*>|\]\([^)]*\)/i.test(prose)) return null;
  const urls = text => [...text.matchAll(/https?:\/\/[^\s"'`<>]+/g)].map(m => m[0].replace(/[.,;!?\])}]+$/, ''));
  const evidenceUrls = new Set(chunks.flatMap(c => urls(c.text)));
  if (urls(value.answer).some(url => !evidenceUrls.has(url))) return null;
  if (version === '1.0.0' && /Pine\.Pine/.test(value.answer)) return null;
  if (/(?<!\.)\bUI\.\w+/.test(value.answer)) return null;
  const documentedApis = new Set(chunks.flatMap(c => [...(c.section + "\n" + c.text).matchAll(/\bP\.(\w+)/g)].map(m => m[1])));
  if ([...value.answer.matchAll(/\bP\.(\w+)/g)].some(m => !documentedApis.has(m[1]))) return null;
  const methods = new Set(chunks.flatMap(c => [
    ...(c.document === 'api/controls-reference' ? [c.section.replace(/^P\./, '')] : []),
    ...[...c.text.matchAll(/\bP\.(\w+)(?:<[^()]*>)?\s*\(/g)].map(m => m[1]),
  ]));
  if ([...value.answer.matchAll(/\bP\.(\w+)\s*\./g)].some(m => methods.has(m[1]))) return null;
  if (/\bP\.\w+\s*<\s*P\.\w+/.test(value.answer)) return null;
  const allowed = new Set(value.citations);
  if ([...value.answer.matchAll(/\[([a-f0-9]{14})\]/g)].some(m => !allowed.has(m[1]))) return null;
  return {status: 'answered', answer: value.answer.replace(/\[([a-f0-9]{14})\]/g, ''), sources: sourceCards([...new Map(chosen.map(c => [c.id, c])).values()]), mode: 'assistant'};
}
