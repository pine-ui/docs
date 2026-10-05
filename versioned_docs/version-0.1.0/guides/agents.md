---
title: Build with Pine and AI agents
sidebar_label: AI agent toolkit
description: Copy complete Pine 0.1.0 Markdown pages, version-pinned setup prompts and project instructions for coding agents.
---

# Build with Pine and AI agents

This guide is for **Pine 0.1.0 (historical release)**. Select your package version in the menu before copying a page or prompt. The installed package's source and matching API reference determine which methods are available.

## Copy documentation

Use **Copy page** above any documentation page to copy its complete Markdown, code, version and canonical source URL. **Open Markdown** provides the same text when clipboard access is unavailable. Installation pages also offer **Copy setup prompt**. Each action stays on the page's selected version.

- [Version index](/ai/0.1.0/llms.txt): compact links to this version's pages.
- [Complete Markdown bundle](/ai/0.1.0/llms-full.txt): all documentation for this version only.
- <a href="/ai/0.1.0/AGENTS.md" target="_self">Project instructions</a>: a snippet to merge into your existing instruction file.
- [Installation prompt](/ai/0.1.0/setup.txt): plain text you can select and copy.

The root [llms.txt](/llms.txt) lists available versions. Root [llms-full.txt](/llms-full.txt) follows the default version; use the version-specific bundle above for reproducible tasks. These are static context files following the [llms.txt proposal](https://llmstxt.org/), with an optional full-bundle companion. Agents can fetch them or you can attach their downloaded contents to a conversation.

## Installation prompt

```text
Help me install Pine 0.1.0 (historical release) in this Unity project.
Inspect ProjectSettings/ProjectVersion.txt, Packages/manifest.json,
Packages/packages-lock.json and the installed Pine package.json first.
Read https://pine-ui.com/ai/0.1.0/tutorials/installation.md
and https://pine-ui.com/ai/0.1.0/llms.txt
Read the historical installation page and the actual v0.1.0 package manifest together. Its docs declare Unity 6000.7.0b2, uGUI 2.7.0 and Input System 6.7.0; verify that tuple resolves in this project before changing it. This is a historical declaration, not a tested current compatibility matrix.
Install the pinned Git package https://github.com/pine-ui/package.git#v0.1.0 after checking its manifest and dependency resolution. Follow the historical TMP font/settings and input-backend setup instructions.
Use using Pine; and using UI = Pine.Pine;. Use the 0.1.0 MountHandle and PreferredSize APIs as documented. Own and dispose the mount explicitly; use the historical examples for lifecycle hooks.
Create a small runnable counter using the matching examples. Compile it in
Unity and inspect the Console, then check its text, input and root cleanup
in Play Mode. Report the Editor/package tuple and observed checks.
```

## Existing-project prompt

```text
Integrate Pine 0.1.0 (historical release) into this existing Unity project.
Read https://pine-ui.com/ai/0.1.0/tutorials/installation.md
and https://pine-ui.com/ai/0.1.0/llms.txt
Inspect current dependencies, assembly definitions, gameplay input calls,
TMP resources, EventSystems and canvases before editing. Read the historical installation page and the actual v0.1.0 package manifest together. Its docs declare Unity 6000.7.0b2, uGUI 2.7.0 and Input System 6.7.0; verify that tuple resolves in this project before changing it. This is a historical declaration, not a tested current compatibility matrix.
Reuse existing compatible UI/input ownership and preserve gameplay input.
Use the historical manual TMP and input setup. Resolve any gameplay-input conflict explicitly before changing Active Input Handling; follow the v0.1.0 EventSystem behavior in its source.
Build one isolated screen, verify existing gameplay and external UI still
respond, and record the actual compile/Play Mode results. Use using Pine; and using UI = Pine.Pine;. Use the 0.1.0 MountHandle and PreferredSize APIs as documented. Own and dispose the mount explicitly; use the historical examples for lifecycle hooks.
```

## Reusable-component prompt

```text
Build reusable UI components with Pine 0.1.0 (historical release).
Read https://pine-ui.com/ai/0.1.0/tutorials/components.md
and https://pine-ui.com/ai/0.1.0/api/creation.md
Use https://pine-ui.com/ai/0.1.0/llms.txt to resolve any other API.
Use using Pine; and using UI = Pine.Pine;. Use the 0.1.0 MountHandle and PreferredSize APIs as documented. Own and dispose the mount explicitly; use the historical examples for lifecycle hooks.
Use ordinary typed function arguments, explicit reactive sources for
shared writable state, and callbacks/read-only inputs where appropriate.
Show a root entry point and separate component files. Explain which state
is per invocation and which state is shared. Match this version’s dynamic
branch/list ownership before adding removable content. Compile all files
in Unity and verify two instances, shared state and removal behavior.
```

## Migration prompt

```text
Migrate this project's Pine integration TO 0.1.0 (historical release).
Inspect the installed version and existing call sites before making a diff.
Read the source version's pinned docs and https://pine-ui.com/ai/0.1.0/llms.txt
for the target; resolve both package manifests and dependency requirements.
Read the historical installation page and the actual v0.1.0 package manifest together. Its docs declare Unity 6000.7.0b2, uGUI 2.7.0 and Input System 6.7.0; verify that tuple resolves in this project before changing it. This is a historical declaration, not a tested current compatibility matrix.
Install the pinned Git package https://github.com/pine-ui/package.git#v0.1.0 after checking its manifest and dependency resolution. Follow the historical TMP font/settings and input-backend setup instructions.
Map every used public API against the target reference, including component
properties, groups/children, sizing, reactive operator result types, input
setup and mount lifetime. Use using Pine; and using UI = Pine.Pine;. Use the 0.1.0 MountHandle and PreferredSize APIs as documented. Own and dispose the mount explicitly; use the historical examples for lifecycle hooks.
Update one screen first, compile it in Unity and verify its state, input,
layout and cleanup. Then migrate remaining call sites and report checks.
Keep the original package lock and a reviewable migration diff.
```

## Project instructions

Merge this snippet into your project's existing instruction file:

```markdown
## Pine 0.1.0

When installing, composing or migrating Pine UI, first read:
- https://pine-ui.com/ai/0.1.0/llms.txt
- https://pine-ui.com/ai/0.1.0/tutorials/installation.md
- https://pine-ui.com/ai/0.1.0/api/creation.md

Use the installed Pine 0.1.0 source and this version's API together.
Use using Pine; and using UI = Pine.Pine;. Use the 0.1.0 MountHandle and PreferredSize APIs as documented. Own and dispose the mount explicitly; use the historical examples for lifecycle hooks.
Run Pine operations on Unity's main thread. Compile changed C# in Unity,
check the Console and verify relevant interactions in Play Mode. Report
observed checks separately from device/build checks that were not run.
```

## Agent configuration

| Agent | Where to merge Pine instructions | Official setup |
| --- | --- | --- |
| Agents supporting AGENTS.md | Existing project `AGENTS.md`, scoped to the Unity project | [AGENTS.md format](https://agents.md/) |
| Cursor | `AGENTS.md` or a scoped `.cursor/rules/*.mdc` rule | [Cursor rules](https://cursor.com/docs/rules) |
| GitHub Copilot | `.github/copilot-instructions.md` | [Repository instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions) |
| Claude Code | `CLAUDE.md`, or `@AGENTS.md` imported there; direct AGENTS.md loading depends on client version/settings | [Claude project instructions](https://code.claude.com/docs/en/memory) |

For a scoped Cursor rule, place this frontmatter above the project-instruction snippet:

```text
---
description: Pine 0.1.0 Unity UI declarations and lifecycle
globs: Assets/**/*.cs
alwaysApply: false
---
```

For Claude Code, an existing `CLAUDE.md` can include:

```text
@AGENTS.md
```

Merge instructions into existing files so unrelated project conventions remain intact. For agents without project instruction files, paste one task prompt and attach the matching Markdown bundle. These integrations supply documentation context through each client's existing features.

## Optional support

Pine is free and open source. You can optionally [buy KbeniM a coffee](https://buymeacoffee.com/kbenim) to support library development, documentation and examples.
