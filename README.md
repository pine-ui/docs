# Pine documentation

Docusaurus tutorials and API reference for Pine **0.1.0**.

## Build and preview

```sh
npm ci
npm run build
npm run serve -- --host 127.0.0.1 --port 3000
```

Use Node 22 (`.nvmrc`). The site base path is `/`; preview at `http://127.0.0.1:3000/`.

## Hosting

The site URL is https://pine-ui.com. GitHub Pages builds and deploys the documentation through `.github/workflows/deploy.yml` on pushes to `main`.

## Content

`docs/` is the working copy. `versioned_docs/version-0.1.0` is the 0.1.0 snapshot selected by Docusaurus. Both contain matching tutorials and API reference. Sidebars and `versions.json` select this version.

The tutorials cover installation, a counter, reactive state, native composition, dynamic UI and springs. The reference covers core lifetimes, utilities, native creation/bindings, dynamic scopes, animation and configuration.

[Package source](https://github.com/pine-ui/package/tree/v0.1.0) · [Docs source](https://github.com/pine-ui/docs/tree/v0.1.0)

## License

[MIT](LICENSE). Dependency package licenses apply to their files.
