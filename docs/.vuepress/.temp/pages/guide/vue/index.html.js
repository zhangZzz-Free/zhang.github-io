import comp from "G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/vue/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/vue/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1712733284000,\"contributors\":[{\"name\":\"zx\",\"email\":\"1549566737@qq.com\",\"commits\":1}]},\"filePathRelative\":\"guide/vue/index.md\",\"excerpt\":\"\"}")
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
