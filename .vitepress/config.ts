import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LEAF',
  description: 'LC-MS Extensible Analysis Framework — user manual for the LEAF metabolomics web app',
  lang: 'en-US',

  cleanUrls: true,
  ignoreDeadLinks: false,
  srcExclude: ['README.md', 'node_modules/**'],

  head: [
    ['link', { rel: 'icon', href: '/leaf-icon.png' }],
    ['meta', { name: 'theme-color', content: '#3B82F6' }],
  ],

  themeConfig: {
    logo: '/leaf-icon.png',
    siteTitle: 'LEAF',

    nav: [
      { text: 'Get Started', link: '/get-started/install-desktop' },
      { text: 'Workflow', link: '/workflow/prepare-data' },
      { text: 'Reference', link: '/reference/ui-tour' },
      {
        text: 'Scripting',
        items: [
          { text: 'Command-line interface', link: '/cli/overview' },
          { text: 'Python package', link: '/python/overview' },
        ],
      },
      {
        text: 'More',
        items: [
          { text: 'Team', link: '/team' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Developer docs', link: 'https://github.com/MorscherLab/LEAF/tree/main/docs' },
        ],
      },
      { text: 'Open MINT', link: 'https://mint.morscherlab.org' },
    ],

    sidebar: {
      '/get-started/': [
        {
          text: 'Get Started',
          items: [
            { text: 'Install on desktop', link: '/get-started/install-desktop' },
            { text: 'Use the hosted version', link: '/get-started/install-hosted' },
            { text: 'First analysis (5 min)', link: '/get-started/quickstart' },
          ],
        },
      ],
      '/workflow/': [
        {
          text: 'Workflow',
          items: [
            { text: 'Prepare your data', link: '/workflow/prepare-data' },
            { text: 'Extract', link: '/workflow/extract' },
            { text: 'Analyze', link: '/workflow/analyze' },
            { text: 'Visualize', link: '/workflow/visualize' },
            { text: 'Export', link: '/workflow/export' },
            { text: 'Isotope tracing', link: '/workflow/tracing' },
            { text: 'Untargeted analysis', link: '/workflow/untargeted' },
          ],
        },
      ],
      '/cli/': [
        {
          text: 'Command-line interface',
          items: [
            { text: 'Overview', link: '/cli/overview' },
            { text: 'leaf serve', link: '/cli/serve' },
            { text: 'Configuration', link: '/cli/configuration' },
          ],
        },
      ],
      '/python/': [
        {
          text: 'Python package',
          items: [
            { text: 'Overview', link: '/python/overview' },
            { text: 'Quickstart', link: '/python/quickstart' },
          ],
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'UI tour', link: '/reference/ui-tour' },
            { text: 'Troubleshooting', link: '/reference/troubleshooting' },
            { text: 'FAQ', link: '/reference/faq' },
            { text: 'Glossary', link: '/reference/glossary' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MorscherLab/LEAF' },
    ],

    search: { provider: 'local' },

    editLink: {
      pattern: 'https://github.com/MorscherLab/LEAF-docs/edit/main/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: { dateStyle: 'medium', timeStyle: undefined },
    },

    footer: {
      message: 'LEAF is open source. Made by the Morscher Lab.',
      copyright: `© ${new Date().getFullYear()} Morscher Lab`,
    },

    outline: { level: [2, 3] },
  },

  vite: {
    server: { port: 17173, strictPort: true },
    // Explicit publicDir so CNAME + icon ship in dist/ regardless of cwd
    publicDir: '.vitepress/public',
  },
})
