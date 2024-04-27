import comp from "G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/engineering/module.html.vue"
const data = JSON.parse("{\"path\":\"/guide/engineering/module.html\",\"title\":\"模块化详解\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"发展史\",\"slug\":\"发展史\",\"link\":\"#发展史\",\"children\":[{\"level\":3,\"title\":\"第一阶段\",\"slug\":\"第一阶段\",\"link\":\"#第一阶段\",\"children\":[]},{\"level\":3,\"title\":\"第二阶段\",\"slug\":\"第二阶段\",\"link\":\"#第二阶段\",\"children\":[]},{\"level\":3,\"title\":\"第三阶段\",\"slug\":\"第三阶段\",\"link\":\"#第三阶段\",\"children\":[]},{\"level\":3,\"title\":\"第四阶段\",\"slug\":\"第四阶段\",\"link\":\"#第四阶段\",\"children\":[]}]},{\"level\":2,\"title\":\"CommonJS\",\"slug\":\"commonjs\",\"link\":\"#commonjs\",\"children\":[{\"level\":3,\"title\":\"模块导出\",\"slug\":\"模块导出\",\"link\":\"#模块导出\",\"children\":[]},{\"level\":3,\"title\":\"模块导入\",\"slug\":\"模块导入\",\"link\":\"#模块导入\",\"children\":[]},{\"level\":3,\"title\":\"CommomJS 规范\",\"slug\":\"commomjs-规范\",\"link\":\"#commomjs-规范\",\"children\":[]},{\"level\":3,\"title\":\"nodejs 对 CommonJS 的实现\",\"slug\":\"nodejs-对-commonjs-的实现\",\"link\":\"#nodejs-对-commonjs-的实现\",\"children\":[]},{\"level\":3,\"title\":\"实现伪代码\",\"slug\":\"实现伪代码\",\"link\":\"#实现伪代码\",\"children\":[]}]},{\"level\":2,\"title\":\"CommonJs 为啥不能在浏览器中使用\",\"slug\":\"commonjs-为啥不能在浏览器中使用\",\"link\":\"#commonjs-为啥不能在浏览器中使用\",\"children\":[]},{\"level\":2,\"title\":\"AMD & CMD\",\"slug\":\"amd-cmd\",\"link\":\"#amd-cmd\",\"children\":[{\"level\":3,\"title\":\"AMD\",\"slug\":\"amd\",\"link\":\"#amd\",\"children\":[]},{\"level\":3,\"title\":\"CMD\",\"slug\":\"cmd\",\"link\":\"#cmd\",\"children\":[]}]},{\"level\":2,\"title\":\"ES6 模块化\",\"slug\":\"es6-模块化\",\"link\":\"#es6-模块化\",\"children\":[{\"level\":3,\"title\":\"特点\",\"slug\":\"特点\",\"link\":\"#特点\",\"children\":[]},{\"level\":3,\"title\":\"基本导入导出\",\"slug\":\"基本导入导出\",\"link\":\"#基本导入导出\",\"children\":[]},{\"level\":3,\"title\":\"默认导入导出\",\"slug\":\"默认导入导出\",\"link\":\"#默认导入导出\",\"children\":[]},{\"level\":3,\"title\":\"其他细节\",\"slug\":\"其他细节\",\"link\":\"#其他细节\",\"children\":[]}]}],\"git\":{\"updatedTime\":1712892664000,\"contributors\":[{\"name\":\"zx\",\"email\":\"1549566737@qq.com\",\"commits\":1}]},\"filePathRelative\":\"guide/engineering/module.md\",\"excerpt\":\"\\n<h2>发展史</h2>\\n<h3>第一阶段</h3>\\n<p><code>JavaScript</code> 语言最初的设计目标，是作为浏览器的脚本语言，仅仅用于实现一些页面效果。</p>\\n<p>那个时候，一个页面所用到的<code>JS</code>可能只有区区几百行</p>\\n<p>在这种情况下，语言本身所存在的一些缺陷往往容易被大家忽略，因为程序规模太小。所以在这个阶段，也不存在什么专业的前端工程师</p>\\n<p>第一个阶段发生的大事件</p>\\n<ul>\\n<li>1996 年，NetScape 将 JavaScript 语言提交给欧洲的一个标准制定阻止 ECMA（欧洲计算机制造商协会）</li>\\n<li>1998 年，NetScape 在与微软浏览器 IE 的竞争中失利，宣布破产</li>\\n</ul>\"}")
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
