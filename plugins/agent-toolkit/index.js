const fs = require('node:fs/promises');
const path = require('node:path');

module.exports = function agentToolkit(context) {
  let generated = new Map();
  return {
    name: 'pine-agent-toolkit',
    getPathsToWatch() { return [path.join(context.siteDir, 'agent-tools/releases.json')]; },
    async allContentLoaded({allContent, actions}) {
      const {exportPage, buildExports, markdownPath} = await import('../../agent-tools/export.mjs');
      const versions = JSON.parse(await fs.readFile(path.join(context.siteDir, 'versions.json'), 'utf8'));
      const statuses = JSON.parse(await fs.readFile(path.join(context.siteDir, 'agent-tools/releases.json'), 'utf8'));
      const loaded = allContent['docusaurus-plugin-content-docs']?.default?.loadedVersions;
      if (!loaded) throw new Error('Pine agent exports require the default docs plugin');
      const pages = loaded.flatMap(v => v.docs).filter(p => versions.includes(p.version) && !p.draft && !p.unlisted).map(page => ({...page}));
      const origin = context.siteConfig.url;
      for (const page of pages) {
        const source = await fs.readFile(path.join(context.siteDir, page.source.replace(/^@site\//, '')), 'utf8');
        page.markdown = exportPage({page, source, pages, origin, status: statuses[page.version]});
      }
      generated = buildExports({pages, versions, statuses, origin});
      for (const version of versions) {
        if (!pages.some(page => page.version === version)) throw new Error(`No public docs loaded for ${version}`);
      }
      const publicPages = {};
      for (const page of pages) publicPages[page.permalink] = {version: page.version, markdown: markdownPath(page), index: `/ai/${page.version}/llms.txt`};
      for (const version of versions) {
        const guide = pages.find(p => p.version === version && p.id === 'guides/agents');
        if (!guide) throw new Error(`Missing agent guide for ${version}`);
        const prompt = guide.markdown.match(/## Installation prompt\n+```text\n([\s\S]*?)\n```/)?.[1];
        const instructions = guide.markdown.match(/## Project instructions\n[\s\S]*?```markdown\n([\s\S]*?)\n```/)?.[1];
        if (!prompt || !instructions) throw new Error(`Missing setup prompt/instructions for ${version}`);
        generated.set(`ai/${version}/setup.txt`, prompt + '\n');
        generated.set(`ai/${version}/AGENTS.md`, instructions + '\n');
        for (const data of Object.values(publicPages).filter(p => p.version === version)) {
          data.guide = guide.permalink;
          data.setup = `/ai/${version}/setup.txt`;
        }
      }
      generated.set('ai/manifest.json', JSON.stringify({defaultVersion: versions[0], statuses, pages: publicPages}, null, 2) + '\n');
      await fs.rm(path.join(context.siteDir, 'static/ai'), {recursive: true, force: true});
      for (const [name, content] of generated) {
        const destination = path.join(context.siteDir, 'static', name);
        await fs.mkdir(path.dirname(destination), {recursive: true});
        await fs.writeFile(destination, content);
      }
      actions.setGlobalData({pages: publicPages});
      console.log(`Pine agent toolkit: ${pages.length} versioned Markdown pages`);
    },
    async postBuild({outDir}) {
      // Also write directly to the build: static copying can run concurrently with plugins.
      await fs.rm(path.join(outDir, 'ai'), {recursive: true, force: true});
      for (const [name, content] of generated) {
        const destination = path.join(outDir, name);
        await fs.mkdir(path.dirname(destination), {recursive: true});
        await fs.writeFile(destination, content);
      }
    },
  };
};
