import comp from "G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/vue/arrow.html.vue"
const data = JSON.parse("{\"path\":\"/guide/vue/arrow.html\",\"title\":\"箭头步骤条效果\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"箭头步骤条效果\"},\"headers\":[{\"level\":2,\"title\":\"使用 div 思路（无法实现默认效果）\",\"slug\":\"使用-div-思路-无法实现默认效果\",\"link\":\"#使用-div-思路-无法实现默认效果\",\"children\":[{\"level\":3,\"title\":\"搭建 dom 结构\",\"slug\":\"搭建-dom-结构\",\"link\":\"#搭建-dom-结构\",\"children\":[]}]},{\"level\":2,\"title\":\"使用 SVG 标签(可缩放矢量图形)\",\"slug\":\"使用-svg-标签-可缩放矢量图形\",\"link\":\"#使用-svg-标签-可缩放矢量图形\",\"children\":[{\"level\":3,\"title\":\"实现思路即标签介绍\",\"slug\":\"实现思路即标签介绍\",\"link\":\"#实现思路即标签介绍\",\"children\":[]}]},{\"level\":2,\"title\":\"完整代码\",\"slug\":\"完整代码\",\"link\":\"#完整代码\",\"children\":[]}],\"git\":{\"updatedTime\":1712733284000,\"contributors\":[{\"name\":\"zx\",\"email\":\"1549566737@qq.com\",\"commits\":1}]},\"filePathRelative\":\"guide/vue/arrow.md\",\"excerpt\":\"\\n<p>在我们项目中，有一个需求，想实现一个步骤条，默认的时候是 边框和文字 需要有特定的颜色，但是选中时，背景需要有特定颜色，边框颜色消失，文字显示白色，具体效果如下图：</p>\\n<p style=\\\"text-align: center\\\">\\n  <img src=\\\"/images/vue/vue-arrow.jpg\\\">\\n</p>\\n<p>可以看到，步骤一是默认样式，步骤二是选中样式，即选中背景颜色需要变成默认样式的边框颜色</p>\\n<h2>使用 div 思路（无法实现默认效果）</h2>\\n<p>当时第一次想的是使用 div 来实现这个逻辑，接下来是其实现逻辑</p>\\n<h3>搭建 dom 结构</h3>\"}")
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
