import comp from "G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"主页\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"title\":\"主页\",\"heroImage\":\"/logo.png\",\"actions\":[{\"text\":\"进入奇妙之旅\",\"link\":\"/get-started.html\",\"type\":\"primary\"}],\"features\":[{\"title\":\"小东西罢了\",\"details\":\"记录一些小东西，方便以后查看。\"}],\"footer\":\"MIT Licensed | Copyright © 2024-present VuePress Community\"},\"headers\":[],\"git\":{\"updatedTime\":1712819336000,\"contributors\":[{\"name\":\"zx\",\"email\":\"1549566737@qq.com\",\"commits\":4}]},\"filePathRelative\":\"README.md\"}")
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
