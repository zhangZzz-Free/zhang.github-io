import comp from "G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/zh/get-started.html.vue"
const data = JSON.parse("{\"path\":\"/zh/get-started.html\",\"title\":\"目录\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Css\",\"slug\":\"css\",\"link\":\"#css\",\"children\":[{\"level\":3,\"title\":\"Css 奇思妙想\",\"slug\":\"css-奇思妙想\",\"link\":\"#css-奇思妙想\",\"children\":[]}]},{\"level\":2,\"title\":\"Javascript\",\"slug\":\"javascript\",\"link\":\"#javascript\",\"children\":[{\"level\":3,\"title\":\"Js 奇思妙想\",\"slug\":\"js-奇思妙想\",\"link\":\"#js-奇思妙想\",\"children\":[]}]},{\"level\":2,\"title\":\"Typescript\",\"slug\":\"typescript\",\"link\":\"#typescript\",\"children\":[]},{\"level\":2,\"title\":\"Vue\",\"slug\":\"vue\",\"link\":\"#vue\",\"children\":[]},{\"level\":2,\"title\":\"React\",\"slug\":\"react\",\"link\":\"#react\",\"children\":[]}],\"git\":{\"updatedTime\":1712543842000,\"contributors\":[{\"name\":\"zx\",\"email\":\"1549566737@qq.com\",\"commits\":1}]},\"filePathRelative\":\"zh/get-started.md\",\"excerpt\":\"\\n<h2>Css</h2>\\n<h3>Css 奇思妙想</h3>\\n<h2>Javascript</h2>\\n<h3>Js 奇思妙想</h3>\\n<h2>Typescript</h2>\\n<h2>Vue</h2>\\n<h2>React</h2>\\n\"}")
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
