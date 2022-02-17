/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Forem Docs',
  tagline: 'Forem\'s developer documentation',
  url: 'https://developers.forem.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'forem', // Usually your GitHub org/user name.
  projectName: 'forem-docs', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: process.env.ALGOLIA_SEARCH_KEY || 'development',
      appId: process.env.ALGOLIA_APP_ID || 'development',
      indexName: process.env.ALGOLIA_INDEX_NAME || 'development',
    },
    navbar: {
      title: 'Home',
      logo: {
        alt: 'Forem',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/api',
          position: 'left',
          label: 'API',
        },
        {
          title: 'GitHub',
          href: 'https://github.com/forem/forem',
          label: 'GitHub',
          position: 'right',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
            {
              label: 'API Docs',
              to: '/api'
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'forem.dev',
              href: 'https://forem.dev',
            },
            {
              label: 'DEV',
              href: 'https://dev.to',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/forem/forem',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/forem',
            },
            {
              label: 'dev.to Twitter',
              href: 'https://twitter.com/thepracticaldev',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Forem, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/forem/forem-docs/edit/main',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/forem/forem-docs/edit/main',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
    [
      'redocusaurus',
      {
        specs: [{
          spec: 'api_v0.yml',
          routePath: '/api/'
        }]
      }
    ]
  ],
};
