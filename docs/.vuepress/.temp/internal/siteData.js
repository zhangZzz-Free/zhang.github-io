export const siteData = JSON.parse("{\"base\":\"/zhang.github-io/\",\"lang\":\"zh-CN\",\"title\":\"\",\"description\":\"\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/zhang.github-io/logo.png\",\"type\":\"image/x-icon\"}]],\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"title\":\"妈妈！我今天还想在学一遍\",\"description\":\"知识分享博客\"},\"/en/\":{\"lang\":\"en-US\",\"title\":\"Mom! I want to learn again today\",\"description\":\"content share blog\"}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
