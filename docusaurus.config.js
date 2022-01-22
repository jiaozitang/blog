// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Jiaozi`s blog',
  tagline: 'Jiaozi`s blog',
  url: '',
  baseUrl: '//',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Jiaozi', // Usually your GitHub org/user name.
  projectName: 'Jiaozi`s blog', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
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
        title: 'Jiaozi`s blog',
        logo: {
          alt: 'Jiaozi`s blog Logo',
          src: 'https://img11.360buyimg.com/ling/jfs/t1/103667/23/20676/2779/61d59cd2Ef2665258/239330f23ecbae81.png',
          href: 'docs/',
        },
        items: [
          {
            type: 'doc',
            docId: 'README',
            position: 'left',
            label: '文档',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/jiaozitang/blog',
            label: 'Coding',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
