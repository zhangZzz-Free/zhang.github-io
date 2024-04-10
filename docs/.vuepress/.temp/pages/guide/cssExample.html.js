import comp from "G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/cssExample.html.vue"
const data = JSON.parse("{\"path\":\"/guide/cssExample.html\",\"title\":\"css奇思妙想\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"333\",\"slug\":\"_333\",\"link\":\"#_333\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"guide/cssExample.md\",\"excerpt\":\"\\n<h2>333</h2>\\n\"}")
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
