---
title: Data use on Pine documentation
description: How Pine documentation uses browser storage, hosting services and the optional Cloudflare AI assistant.
---

# Data use

This page explains the site's technical data flows. It is not a complete GDPR privacy notice identifying the legal operator and all applicable processing terms.

## Reading and searching the documentation

The documentation is hosted on GitHub Pages and delivered through Cloudflare. Requests disclose your IP address and request information to these providers. GitHub states that it logs visitors' IP addresses for security, including visitors who are not signed in. See [GitHub's Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [GitHub's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) and [Cloudflare's privacy policy](https://www.cloudflare.com/privacypolicy/).

Documentation search runs in your browser using an index downloaded from this site. The website source does not include advertising trackers, analytics scripts, remotely hosted fonts, or payment embeds. Hosting and security services may separately process technical request data.

## Browser storage

The selected light/dark appearance is saved in local storage (`theme`, with a possible site namespace). It remains until you change it or clear the site's browser data. Documentation tabs may save their selected tab under `docusaurus.tab.*`.

After you open Ask Pine, session storage (`pine-docs-chat-native-1.0.0`) saves up to 40 messages, starter questions, panel state and a rate-limit cooldown. This normally lasts for the browser tab's session; browsers may restore it when restoring a session. Use **Clear conversation** to remove the saved message content. This does not erase technical request records held by hosting providers. Closing the chat panel does not clear the conversation.

These settings and chat state support the features you choose to use. There is no advertising or analytics consent switch in the current website.

## Ask Pine

When AI is available, submitting a question sends the question, documentation version, documentation page path and up to six recent messages to Pine's assistant endpoint on Cloudflare. Each history message is limited to 1,200 characters. The endpoint uses Cloudflare Workers AI to generate answers from relevant public documentation. **You are interacting with AI. Answers can be inaccurate; check the cited documentation and test code before using it.**

Do not submit passwords, API keys, personal information, confidential code or other secrets. You can read and search all documentation without using the assistant. When AI is offline, the assistant searches the downloaded documentation locally.

The assistant application does not write transcripts to a database. Its abuse protection derives a daily SHA-256 identifier from your IP address and the UTC date; this is pseudonymous, not anonymous. Quota storage holds request times and temporary reservation identifiers, removes entries older than 24 hours on subsequent use, and schedules deletion after 24 hours of inactivity. Worker observability is disabled in the checked-in configuration. Provider infrastructure may still process technical data under its own policies; this is not a claim that all provider logs are disabled.

Cloudflare says it does not use Workers AI customer content to train models or improve its or third-party services without explicit consent. See [Workers AI data usage](https://developers.cloudflare.com/workers-ai/platform/data-usage/). This statement does not establish a provider log-retention period or guarantee processing only in the EU.

## External services

GitHub and Buy Me a Coffee links take you to separate services governed by their own terms and privacy notices. The website does not embed their payment forms or collect card details. Information submitted to a public GitHub issue is public; avoid including personal data or secrets.
