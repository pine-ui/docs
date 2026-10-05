# Pine documentation

Docusaurus tutorials and API reference for Pine **0.1.0**.

[Live documentation](https://pine-ui.com) · [Package source](https://github.com/pine-ui/package/tree/v0.1.0) · [Docs source](https://github.com/pine-ui/docs/tree/v0.1.0)

## License

[MIT](LICENSE). Dependency package licenses apply to their files.

## Static agent toolkit

`npm run build` exports the pinned documentation versions as complete Markdown under `/ai/{version}/`, plus per-version `llms.txt`, `llms-full.txt`, `setup.txt` and an `AGENTS.md` instruction snippet. Root llms files select the default pinned version. Pages provide Copy page/Open Markdown actions; installation pages also copy the matching setup prompt.

`npm run test:agents` verifies Markdown transformation and version isolation. The build checks every exported code example, local link and page metadata. Generated files under `static/ai` and root llms files are rebuilt from Docusaurus metadata and excluded from Git. Keep `agent-tools/releases.json` and the selected version's installation/agent guides consistent when adding a version.

The optional support link is https://buymeacoffee.com/kbenim. Payments stay on the creator's profile.
