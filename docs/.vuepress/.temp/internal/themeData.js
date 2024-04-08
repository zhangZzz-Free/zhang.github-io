export const themeData = JSON.parse("{\"logo\":\"https://vuejs.press/images/hero.png\",\"locales\":{\"/\":{\"selectLanguageText\":\"English\",\"navbar\":[{\"text\":\"Home\",\"link\":\"/\"},{\"text\":\"Article\",\"link\":\"/article/\"},{\"text\":\"Category\",\"link\":\"/category/\"},{\"text\":\"Tag\",\"link\":\"/tag/\"},{\"text\":\"Timeline\",\"link\":\"/timeline/\"}],\"selectLanguageName\":\"English\"},\"/zh/\":{\"selectLanguageText\":\"简体中文\",\"navbar\":[{\"text\":\"首页\",\"link\":\"/zh/\"},{\"text\":\"文章\",\"link\":\"/zh/article/\"},{\"text\":\"分类\",\"link\":\"/zh/category/\"},{\"text\":\"标签\",\"link\":\"/zh/tag/\"},{\"text\":\"时间线\",\"link\":\"/zh/timeline/\"}]}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[],\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"auto\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
