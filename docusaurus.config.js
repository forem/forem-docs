/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Forem Docs',
  tagline: 'Forem\'s engineering docs on how to contribute',
  url: 'https://forem-docs.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'forem', // Usually your GitHub org/user name.
  projectName: 'forem-docs', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: process.env.ALGOLIA_API_KEY,
      appId: process.env.ALGOLIA_APP_ID,
      indexName: process.env.ALGOLIA_INDEX_NAME,
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
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
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
              href: 'https://github.com',
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
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
