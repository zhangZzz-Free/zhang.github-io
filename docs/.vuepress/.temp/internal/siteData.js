export const siteData = JSON.parse("{\"base\":\"/zhang.github-io/\",\"lang\":\"zh-CN\",\"title\":\"zx-blog\",\"description\":\"My first VuePress Site\",\"head\":[],\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"description\":\"我的第一个 VuePress 站点\",\"title\":\"zx-ch-blog\"},\"/en/\":{\"lang\":\"en-US\",\"description\":\"My first VuePress Site\",\"title\":\"zx-us-blog\"}}}")

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
