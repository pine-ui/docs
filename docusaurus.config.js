const {themes} = require('prism-react-renderer');
const lightTheme = {...themes.github, styles: [...themes.github.styles,
  {types: ['namespace'], style: {opacity: 1}},
  {types: ['function'], style: {color: '#a11f2b'}},
  {types: ['string', 'interpolation-string'], style: {color: '#b10e50'}},
  {types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'], style: {color: '#087876'}},
  {types: ['comment', 'prolog', 'doctype', 'cdata'], style: {color: '#657164'}},
  {types: ['attr-value'], style: {color: '#b10e50'}},
  {types: ['atrule', 'attr-name'], style: {color: '#006789'}},
]};

module.exports = {
  title: 'Pine',
  tagline: 'Reactive UI for Unity. Built in code.',
  url: 'https://pine-ui.com',
  baseUrl: '/',
  organizationName: 'pine-ui',
  projectName: 'docs',
  trailingSlash: true,
  customFields: {assistantEndpoint: process.env.PINE_ASSISTANT_ENDPOINT || ''},
  favicon: 'img/mascot/pine-icon.png',
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},
  i18n: {defaultLocale: 'en', locales: ['en']},
  plugins: [require.resolve('./plugins/agent-toolkit')],
  presets: [['classic', {
    docs: {
      sidebarPath: require.resolve('./sidebars.js'),
      lastVersion: '0.2.0',
      includeCurrentVersion: false,
      versions: {'0.2.0': {label: '0.2.0', path: ''}, '0.1.0': {label: '0.1.0', path: '0.1.0'}},
      editUrl: 'https://github.com/pine-ui/docs/edit/main/',
      editCurrentVersion: false,
    },
    blog: false,
    sitemap: {ignorePatterns: ['/search', '/search/**']},
    theme: {customCss: require.resolve('./src/css/custom.css')},
  }]],
  themes: [['@easyops-cn/docusaurus-search-local', {
    hashed: true, indexBlog: false, language: 'en',
    highlightSearchTermsOnTargetPage: true,
  }]],
  themeConfig: {
    image: 'img/mascot/pine-wave.png',
    colorMode: {defaultMode: 'dark', respectPrefersColorScheme: true},
    navbar: {
      title: 'pine',
      logo: {alt: 'Pine dinosaur mascot', src: 'img/mascot/pine-icon.png', width: 34, height: 34},
      items: [
        {to: '/', label: 'Home', position: 'left'},
        {type: 'docSidebar', sidebarId: 'tutorials', label: 'Tutorials', position: 'left'},
        {type: 'docSidebar', sidebarId: 'api', label: 'API', position: 'left'},
        {type: 'docsVersionDropdown', position: 'right'},
        {href: 'https://github.com/pine-ui/package', label: 'GitHub', position: 'right'},
        {href: 'https://buymeacoffee.com/kbenim', label: 'Buy me a coffee', position: 'right'},
      ],
    },
    footer: {
      links: [{title: 'Pine', items: [{label: 'Support Pine', to: '/support'}, {label: 'Buy me a coffee', href: 'https://buymeacoffee.com/kbenim'}, {label: 'Agent documentation', to: '/docs/guides/agents/'}]}],
      copyright: 'Released under the MIT License',
    },
    prism: {theme: lightTheme, darkTheme: themes.vsDark, additionalLanguages: ['csharp', 'json', 'bash']},
  },
};
