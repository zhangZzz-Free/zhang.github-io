import comp from "G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/request/repeatRequest.html.vue"
const data = JSON.parse("{\"path\":\"/guide/request/repeatRequest.html\",\"title\":\"接口防止重复调用方案\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"重复调用同个接口导致的问题\",\"slug\":\"重复调用同个接口导致的问题\",\"link\":\"#重复调用同个接口导致的问题\",\"children\":[]},{\"level\":2,\"title\":\"解决方案\",\"slug\":\"解决方案\",\"link\":\"#解决方案\",\"children\":[{\"level\":3,\"title\":\"方法 1： 利用防抖\",\"slug\":\"方法-1-利用防抖\",\"link\":\"#方法-1-利用防抖\",\"children\":[]},{\"level\":3,\"title\":\"方法 2：采用禁用按钮的方式\",\"slug\":\"方法-2-采用禁用按钮的方式\",\"link\":\"#方法-2-采用禁用按钮的方式\",\"children\":[]},{\"level\":3,\"title\":\"方法 3：利用 axios 取消接口的 api\",\"slug\":\"方法-3-利用-axios-取消接口的-api\",\"link\":\"#方法-3-利用-axios-取消接口的-api\",\"children\":[]},{\"level\":3,\"title\":\"方法 4：利用 promise 的 pending、resolve、reject 状态\",\"slug\":\"方法-4-利用-promise-的-pending、resolve、reject-状态\",\"link\":\"#方法-4-利用-promise-的-pending、resolve、reject-状态\",\"children\":[]},{\"level\":3,\"title\":\"ps\",\"slug\":\"ps\",\"link\":\"#ps\",\"children\":[]}]}],\"git\":{\"updatedTime\":1712733284000,\"contributors\":[{\"name\":\"zx\",\"email\":\"1549566737@qq.com\",\"commits\":1}]},\"filePathRelative\":\"guide/request/repeatRequest.md\",\"excerpt\":\"\\n<h2>重复调用同个接口导致的问题</h2>\\n<ul>\\n<li>表单提交，输入框失焦、按钮点击、值变更提交等容易遇到重复请求的问题，即一次请求还没有执行完毕，用户又点击了一次，这样重复请求可能会造成后台数据异常。又比如在查询数据的时候点击了一次查询，还在处理数据的时候，用户又点击了一次查询。第一次查询执行完毕页面已经有数据展示出来了，用户可能正在看呢，此时第二次查询也处理完返回到前台把页面刷新了，就会造成很不好的体验</li>\\n</ul>\\n<h2>解决方案</h2>\\n<ol>\\n<li><code>利用防抖避免重复调用接口</code></li>\\n<li><code>采用禁用按钮的方式，loading、置灰等</code></li>\\n<li><code>利用axios的cancelToken、AbortController方法取消重复请求</code></li>\\n<li><code>利用promise的三个状态改造方法3</code></li>\\n</ol>\"}")
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
