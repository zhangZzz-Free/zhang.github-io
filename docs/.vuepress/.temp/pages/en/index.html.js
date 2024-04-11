import comp from "G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/en/index.html.vue"
const data = JSON.parse("{\"path\":\"/en/\",\"title\":\"Home\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":\"/logo.png\",\"actions\":[{\"text\":\"Entering a Wonderful Journey\",\"link\":\"/en/get-started.html\",\"type\":\"primary\"}],\"features\":[{\"title\":\"It's just a small thing\",\"details\":\"Record some small things for future reference。\"},{\"title\":\"Vue-Powered\",\"details\":\"Enjoy the dev experience of Vue, use Vue components in markdown, and develop custom themes with Vue.\"}],\"footer\":\"MIT Licensed | Copyright © 2024-present VuePress Community\"},\"headers\":[],\"git\":{\"updatedTime\":1712733284000,\"contributors\":[{\"name\":\"zx\",\"email\":\"1549566737@qq.com\",\"commits\":1}]},\"filePathRelative\":\"en/README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
