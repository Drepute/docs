// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'rep3',
  tagline: 'rep3 docs',
  url: 'https://docs.rep3.gg',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo_new.jpeg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Drepute', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-BXYK7DDPH6',
        },
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'rep3 Docs',
        logo: {
          alt: 'rep3 Logo',
          src: 'img/logo_new.jpeg',
        },
//        items: [
//          {
//            href: 'https://rep3.gg/',
//            label: '🌐',
//            position: 'right',
//          },
//          {
//            href: 'https://twitter.com/rep3gg',
//            label: '🐦',
//            position: 'right',
//          },
//          {
//            href: 'https://discord.gg/xK2WXUv3VG',
//            label: '👾',
//            position: 'right',
//          },
//          {
//            href: 'https://rep3.substack.com/',
//            label: '📙',
//            position: 'right',
//          },
//          {
//            href: 'https://github.com/drepute/',
//            label: '💻',
//            position: 'right',
//          },
//          {
//            href: 'https://docs.rep3.gg/',
//            label: '📜',
//            position: 'right',
//          },
//        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          {
            title: 'Links',
            items: [
              {
                href: 'https://rep3.gg/',
                label: '🌐 Website',
              },
              {
                href: 'https://twitter.com/rep3gg',
                label: '🐦 Twitter',
              },
              {
                href: 'https://discord.gg/xK2WXUv3VG',
                label: '👾 Discord',
              },
              {
                href: 'https://rep3.substack.com/',
                label: '📙 Substack',
              },
              {
                href: 'https://github.com/drepute/',
                label: '💻 GitHub',
              },
              {
                href: 'https://docs.rep3.gg/',
                label: '📜 Docs',
              },
            ],
          },
        ],
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config;
