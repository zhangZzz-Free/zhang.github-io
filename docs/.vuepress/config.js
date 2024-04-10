import { blogPlugin } from '@vuepress/plugin-blog';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';
import { searchPlugin } from '@vuepress/plugin-search';
import { findFile } from './utils/util';

export default defineUserConfig({
  lang: 'zh-CN',

  title: 'zx-blog',
  description: 'My first VuePress Site',

  locales: {
    '/': {
      lang: 'zh-CN',
      description: '我的第一个 VuePress 站点',
      title: 'zx-ch-blog',
    },
    '/en/': {
      lang: 'en-US',
      description: 'My first VuePress Site',
      title: 'zx-us-blog',
    },
  },

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    locales: {
      '/': {
        selectLanguageText: '简体中文',
        selectLanguageName: '简体中文',
        navbar: [
          {
            text: '首页',
            link: '/',
          },
          // {
          //   text: '文章',
          //   link: '/article/',
          // },
          // {
          //   text: '分类',
          //   link: '/category/',
          // },
          // {
          //   text: '标签',
          //   link: '/tag/',
          // },
          // {
          //   text: '时间线',
          //   link: '/timeline/',
          // },
        ],
      },
      '/en/': {
        selectLanguageText: 'English',
        selectLanguageName: 'English',
        navbar: [
          {
            text: 'Home',
            link: '/en/',
          },
          // {
          //   text: 'Article',
          //   link: '/en/article/',
          // },
          // {
          //   text: 'Category',
          //   link: '/en/category/',
          // },
          // {
          //   text: 'Tag',
          //   link: '/en/tag/',
          // },
          // {
          //   text: 'Timeline',
          //   link: '/en/timeline/',
          // },
        ],
      },
    },
    // sidebar: [
    //   // SidebarItem
    //   {
    //     text: 'Css',
    //     link: '/guide/css/index.md',
    //     children: [
    //       // SidebarItem
    //       {
    //         text: 'css奇思秒想',
    //         link: '/guide/css/cssExample.md',
    //         collapsable: true,
    //         children: [],
    //       },
    //     ],
    //   },
    //   {
    //     text: 'Javascript',
    //     link: '/guide/js/index.md',
    //   },
    //   {
    //     text: 'React',
    //     link: '/guide/react/index.md',
    //   },
    //   {
    //     text: 'Vue',
    //     link: '/guide/vue/index.md',
    //     children: [
    //       {
    //         text: '奇思妙想小箭头',
    //         link: '/guide/vue/arrow.md',
    //         collapsable: true,
    //         // children: findFile('/guide/vue/arrow.md'),
    //       },
    //     ],
    //   },
    // ],
    sidebarDepth: 2
  }),

  base: '/zhang.github-io/',

  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
        '/en/': {
          placeholder: 'Search',
        },
      },
      // 排除首页
      isSearchable: (page) => page.path !== '/',
    }),
    blogPlugin({
      // Only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith('posts/') : false,

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || '',
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter.excerpt === 'string'
            ? frontmatter.excerpt
            : data?.excerpt || '',
      }),

      // Generate excerpt for all pages excerpt those users choose to disable
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home &&
        frontmatter.excerpt !== false &&
        typeof frontmatter.excerpt !== 'string',

      category: [
        {
          key: 'category',
          getter: (page) => page.frontmatter.category || [],
          layout: 'Category',
          itemLayout: 'Category',
          frontmatter: () => ({
            title: 'Categories',
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: 'tag',
          getter: (page) => page.frontmatter.tag || [],
          layout: 'Tag',
          itemLayout: 'Tag',
          frontmatter: () => ({
            title: 'Tags',
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: 'article',
          // Remove archive articles
          filter: (page) => !page.frontmatter.archive,
          layout: 'Article',
          frontmatter: () => ({
            title: 'Articles',
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky;

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
              return -1;

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;

            if (!pageB.frontmatter.date) return 1;
            if (!pageA.frontmatter.date) return -1;

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            );
          },
        },
        {
          key: 'timeline',
          // Only article with date should be added to timeline
          filter: (page) => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
          layout: 'Timeline',
          frontmatter: () => ({
            title: 'Timeline',
            sidebar: false,
          }),
        },
      ],
      hotReload: true,
    }),
  ],

  bundler: viteBundler(),
});
