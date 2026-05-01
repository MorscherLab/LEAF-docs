import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LEAF',
  description: 'LC-MS Extensible Analysis Framework — user manual for the LEAF metabolomics web app',
  lang: 'en-US',

  cleanUrls: true,
  ignoreDeadLinks: false,
  srcExclude: ['README.md', 'node_modules/**', 'docs/**'],

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
      { text: 'Scripting', link: '/scripting/' },
      { text: 'SEED', link: '/seed/' },
      { text: 'Reference', link: '/reference/ui-tour' },
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
            { text: 'Extract — targeted', link: '/workflow/extract' },
            { text: 'Analyze', link: '/workflow/analyze' },
            { text: 'Visualize', link: '/workflow/visualize' },
            { text: 'Export', link: '/workflow/export' },
            { text: 'Isotope tracing (modifier)', link: '/workflow/tracing' },
            { text: 'Untargeted overview', link: '/workflow/untargeted' },
            { text: 'Extract — untargeted', link: '/workflow/extract-untargeted' },
            { text: 'Inspect features', link: '/workflow/inspect-features' },
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
            { text: 'Team', link: '/team' },
            { text: 'Changelog', link: '/changelog' },
          ],
        },
      ],
      '/scripting/': [
        {
          text: 'Overview',
          items: [
            { text: 'When to use scripting', link: '/scripting/' },
          ],
        },
        {
          text: 'Command line',
          items: [
            { text: 'Overview', link: '/scripting/cli/overview' },
            { text: 'leaf webui', link: '/scripting/cli/webui' },
            { text: 'leaf targeted', link: '/scripting/cli/targeted' },
            { text: 'leaf untargeted', link: '/scripting/cli/untargeted' },
            { text: 'leaf watch', link: '/scripting/cli/watch' },
            { text: 'Configuration', link: '/scripting/cli/configuration' },
          ],
        },
        {
          text: 'Python package',
          items: [
            { text: 'Overview & install', link: '/scripting/python/overview' },
            { text: 'Recipes', link: '/scripting/python/recipes' },
          ],
        },
        {
          text: 'RAW reader',
          items: [
            { text: 'SEED (macOS / Linux)', link: '/scripting/reader' },
          ],
        },
      ],
      '/seed/': [
        {
          text: 'SEED',
          items: [
            { text: 'Overview', link: '/seed/' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'Command line', link: '/seed/cli' },
            { text: 'Python API', link: '/seed/python-api' },
            { text: 'Rust API', link: '/seed/rust-api' },
            { text: 'Changelog', link: '/seed/changelog' },
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
