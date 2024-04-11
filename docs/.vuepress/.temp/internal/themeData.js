export const themeData = JSON.parse("{\"logo\":\"/logo.png\",\"locales\":{\"/\":{\"selectLanguageText\":\"简体中文\",\"selectLanguageName\":\"简体中文\",\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"目录\",\"link\":\"/get-started\"}]},\"/en/\":{\"selectLanguageText\":\"English\",\"selectLanguageName\":\"English\",\"navbar\":[{\"text\":\"Home\",\"link\":\"/en/\"},{\"text\":\"Catalog\",\"link\":\"/get-started\"}]}},\"sidebarDepth\":2,\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[],\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"auto\",\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

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
