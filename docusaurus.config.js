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
    sitemap: {ignorePatterns: ['/search', '/search/**']},
    theme: {customCss: require.resolve('./src/css/custom.css')},
  }]],
  themes: [['@easyops-cn/docusaurus-search-local', {
    hashed: true, indexBlog: false, language: 'en',
    highlightSearchTermsOnTargetPage: true,
  }]],
  themeConfig: {
    image: 'img/pine-social.png',
    colorMode: {defaultMode: 'dark', respectPrefersColorScheme: true},
    navbar: {
      title: 'pine',
      logo: {alt: 'Pine tree', src: 'img/pine-icon.svg', width: 27, height: 32},
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
    prism: {theme: lightTheme, darkTheme: themes.vsDark, additionalLanguages: ['csharp', 'json', 'bash']},
  },
};
