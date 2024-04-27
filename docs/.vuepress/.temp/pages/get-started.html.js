import comp from "G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/get-started.html.vue"
const data = JSON.parse("{\"path\":\"/get-started.html\",\"title\":\"目录\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Css\",\"slug\":\"css\",\"link\":\"#css\",\"children\":[{\"level\":3,\"title\":\"Css 奇思妙想\",\"slug\":\"css-奇思妙想\",\"link\":\"#css-奇思妙想\",\"children\":[]}]},{\"level\":2,\"title\":\"Javascript\",\"slug\":\"javascript\",\"link\":\"#javascript\",\"children\":[{\"level\":3,\"title\":\"Js 奇思妙想\",\"slug\":\"js-奇思妙想\",\"link\":\"#js-奇思妙想\",\"children\":[]}]},{\"level\":2,\"title\":\"Typescript\",\"slug\":\"typescript\",\"link\":\"#typescript\",\"children\":[]},{\"level\":2,\"title\":\"Vue\",\"slug\":\"vue\",\"link\":\"#vue\",\"children\":[{\"level\":3,\"title\":\"① 源码解析\",\"slug\":\"_1-源码解析\",\"link\":\"#_1-源码解析\",\"children\":[]},{\"level\":3,\"title\":\"② 奇思妙想小箭头\",\"slug\":\"_2-奇思妙想小箭头\",\"link\":\"#_2-奇思妙想小箭头\",\"children\":[]}]},{\"level\":2,\"title\":\"React\",\"slug\":\"react\",\"link\":\"#react\",\"children\":[]},{\"level\":2,\"title\":\"请求优化\",\"slug\":\"请求优化\",\"link\":\"#请求优化\",\"children\":[{\"level\":3,\"title\":\"① 接口防重提交\",\"slug\":\"_1-接口防重提交\",\"link\":\"#_1-接口防重提交\",\"children\":[]}]},{\"level\":2,\"title\":\"工程化\",\"slug\":\"工程化\",\"link\":\"#工程化\",\"children\":[{\"level\":3,\"title\":\"① 模块化\",\"slug\":\"_1-模块化\",\"link\":\"#_1-模块化\",\"children\":[]},{\"level\":3,\"title\":\"② 包管理器\",\"slug\":\"_2-包管理器\",\"link\":\"#_2-包管理器\",\"children\":[]},{\"level\":3,\"title\":\"③ vite打包配置\",\"slug\":\"_3-vite打包配置\",\"link\":\"#_3-vite打包配置\",\"children\":[]}]}],\"git\":{\"updatedTime\":1713324319000,\"contributors\":[{\"name\":\"zx\",\"email\":\"1549566737@qq.com\",\"commits\":5}]},\"filePathRelative\":\"get-started.md\",\"excerpt\":\"\\n<h2>Css</h2>\\n<h3>Css 奇思妙想</h3>\\n<h2>Javascript</h2>\\n<h3>Js 奇思妙想</h3>\\n<p>This is the content of home page. Check <a href=\\\"/zhang.github-io/guide/css/cssExample.html\\\" target=\\\"_blank\\\">Home Page Docs</a> for more details.</p>\\n<h2>Typescript</h2>\\n<h2>Vue</h2>\\n<h3><a href=\\\"/zhang.github-io/guide/vue/sourceCode.html\\\" target=\\\"_blank\\\">① 源码解析</a></h3>\"}")
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
