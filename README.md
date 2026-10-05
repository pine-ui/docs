# Pine documentation

Tutorials and API reference for Pine 0.2.0, with historical 0.1.0 documentation and matching examples.

[Documentation](https://pine-ui.com) · [Package](https://github.com/pine-ui/package) · [Docs source](https://github.com/pine-ui/docs)

## Development

Use Node 22. Run npm ci, npm run test:docs and npm run build. Run npm start for local preview. Publishing main deploys GitHub Pages.

Author pages in docs/, then maintain the selected versioned_docs snapshot and sidebar. Only pinned snapshots enter the site and documentation search corpus.

The browser assistant searches the selected version's public docs/examples. Set PINE_ASSISTANT_ENDPOINT at build time to use an independently hosted service; without it, the site provides labeled documentation search results. No service credentials belong in the frontend.

## Agent toolkit

Pages offer Copy page and Open Markdown; installation pages offer a version-aware setup prompt. The build exports Markdown under /ai/{version}/, per-version llms indexes/full bundles, setup prompts and AGENTS snippets. Root llms files select the default pinned version.

Generated exports and the public search corpus are rebuilt and excluded from Git. Keep agent-tools/releases.json and matching installation/agent guides consistent with package versions.

## License and support

[MIT](LICENSE). Dependency licenses apply to their files. Optional support: https://buymeacoffee.com/kbenim.
