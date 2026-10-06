const { themes } = require("prism-react-renderer");
const highlightTypes = [
  "keyword",
  "class-name",
  "function",
  "namespace",
  "builtin",
];
const lightTheme = {
  ...themes.github,
  plain: { ...themes.github.plain, color: "#24292e" },
  styles: [
    { types: highlightTypes, style: { color: "#167849" } },
    { types: ["comment"], style: { opacity: 0.65 } },
  ],
};
const darkTheme = {
  ...themes.vsDark,
  plain: { ...themes.vsDark.plain, color: "#d4d4d4" },
  styles: [
    { types: highlightTypes, style: { color: "#59ce96" } },
    { types: ["comment"], style: { opacity: 0.65 } },
  ],
};

module.exports = {
  title: "Pine",
  tagline: "Reactive UI for Unity. Built in code.",
  url: "https://pine-ui.com",
  baseUrl: "/",
  organizationName: "pine-ui",
  projectName: "docs",
  trailingSlash: true,
  customFields: {
    assistantEndpoint: process.env.PINE_ASSISTANT_ENDPOINT || "",
  },
  favicon: "img/mascot/pine-face-favicon.png",
  onBrokenLinks: "throw",
  markdown: { hooks: { onBrokenMarkdownLinks: "throw" } },
  i18n: { defaultLocale: "en", locales: ["en"] },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          lastVersion: "1.0.0",
          includeCurrentVersion: false,
          versions: { "1.0.0": { label: "1.0.0", path: "" } },
          editUrl: "https://github.com/pine-ui/docs/edit/main/",
          editCurrentVersion: false,
        },
        blog: false,
        sitemap: { ignorePatterns: ["/search", "/search/**"] },
        theme: { customCss: require.resolve("./src/css/custom.css") },
      },
    ],
  ],
  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexBlog: false,
        language: "en",
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],
  themeConfig: {
    image: "img/mascot/pine-wave.webp",
    colorMode: { defaultMode: "dark", respectPrefersColorScheme: true },
    navbar: {
      title: "pine",
      logo: {
        alt: "Pine dinosaur mascot",
        src: "img/mascot/pine-icon.png",
        width: 34,
        height: 34,
      },
      items: [
        { to: "/", label: "Home", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "tutorials",
          label: "Tutorials",
          position: "left",
        },
        {
          type: "docSidebar",
          sidebarId: "api",
          label: "API",
          position: "left",
        },
        {
          href: "https://github.com/pine-ui/package",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://buymeacoffee.com/kbenim",
          label: "Buy me a coffee",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Pine",
          items: [
            { label: "Support Pine", to: "/support" },
            {
              label: "Buy me a coffee",
              href: "https://buymeacoffee.com/kbenim",
            },
          ],
        },
      ],
      copyright: "Released under the MIT License. Built with Docusaurus.",
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
      additionalLanguages: ["csharp", "json", "bash"],
    },
  },
};
