const {themes} = require('prism-react-renderer');

module.exports = {
  title: 'Pine',
  tagline: 'Reactive UI for Unity. Built in code.',
  url: 'https://pine-ui.github.io',
  baseUrl: '/pine-ui-docs/',
  organizationName: 'pine-ui',
  projectName: 'docs',
  trailingSlash: true,
  favicon: 'img/pine-icon.svg',
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},
  i18n: {defaultLocale: 'en', locales: ['en']},
  presets: [['classic', {
    docs: {
      sidebarPath: require.resolve('./sidebars.js'),
      lastVersion: '0.1.0',
      includeCurrentVersion: false,
      versions: {'0.1.0': {label: '0.1.0', path: ''}},
      editUrl: 'https://github.com/pine-ui/docs/edit/main/',
      editCurrentVersion: false,
    },
    blog: false,
    theme: {customCss: require.resolve('./src/css/custom.css')},
  }]],
  themes: [['@easyops-cn/docusaurus-search-local', {
    hashed: true, indexBlog: false, language: 'en',
    highlightSearchTermsOnTargetPage: true,
  }]],
  themeConfig: {
    colorMode: {defaultMode: 'dark', respectPrefersColorScheme: true},
    navbar: {
      title: 'pine',
      logo: {alt: 'Pine tree', src: 'img/pine-icon.svg'},
      items: [
        {to: '/', label: 'Home', position: 'left'},
        {type: 'docSidebar', sidebarId: 'tutorials', label: 'Tutorials', position: 'left'},
        {type: 'docSidebar', sidebarId: 'api', label: 'API', position: 'left'},
        {type: 'docsVersionDropdown', position: 'right'},
        {href: 'https://github.com/pine-ui/package', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      copyright: 'Released under the MIT License',
    },
    prism: {theme: themes.github, darkTheme: themes.vsDark, additionalLanguages: ['csharp', 'json', 'bash']},
  },
};
