export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"目录"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"主页"} }],
  ["/en/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/en/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/en/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/en/index.html.js"), meta: {"title":"Home"} }],
  ["/posts/archive1.html", { loader: () => import(/* webpackChunkName: "archive1.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/archive1.html.js"), meta: {"_blog":{"title":"Archive Article1","author":"","date":"1998-01-01T00:00:00.000Z","category":["History"],"tag":["WWI"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Archive Article1"} }],
  ["/posts/archive2.html", { loader: () => import(/* webpackChunkName: "archive2.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/archive2.html.js"), meta: {"_blog":{"title":"Archive Article2","author":"","date":"1998-01-02T00:00:00.000Z","category":["History"],"tag":["WWII"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Archive Article2"} }],
  ["/posts/article1.html", { loader: () => import(/* webpackChunkName: "article1.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article1.html.js"), meta: {"_blog":{"title":"Article 1","author":"","date":"2022-01-01T00:00:00.000Z","category":["CategoryA"],"tag":["tag A","tag B"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 1"} }],
  ["/posts/article10.html", { loader: () => import(/* webpackChunkName: "article10.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article10.html.js"), meta: {"_blog":{"title":"Article 10","author":"","date":"2022-01-10T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag C","tag D"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 10"} }],
  ["/posts/article11.html", { loader: () => import(/* webpackChunkName: "article11.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article11.html.js"), meta: {"_blog":{"title":"Article 11","author":"","date":"2022-01-11T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag C","tag D"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 11"} }],
  ["/posts/article12.html", { loader: () => import(/* webpackChunkName: "article12.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article12.html.js"), meta: {"_blog":{"title":"Article 12","author":"","date":"2022-01-12T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag C","tag D"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 12"} }],
  ["/posts/article2.html", { loader: () => import(/* webpackChunkName: "article2.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article2.html.js"), meta: {"_blog":{"title":"Article 2","author":"","date":"2022-01-02T00:00:00.000Z","category":["CategoryA"],"tag":["tag A","tag B"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 2"} }],
  ["/posts/article3.html", { loader: () => import(/* webpackChunkName: "article3.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article3.html.js"), meta: {"_blog":{"title":"Article 3","author":"","date":"2022-01-03T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 3"} }],
  ["/posts/article4.html", { loader: () => import(/* webpackChunkName: "article4.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article4.html.js"), meta: {"_blog":{"title":"Article 4","author":"","date":"2022-01-04T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 4"} }],
  ["/posts/article5.html", { loader: () => import(/* webpackChunkName: "article5.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article5.html.js"), meta: {"_blog":{"title":"Article 5","author":"","date":"2022-01-05T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 5"} }],
  ["/posts/article6.html", { loader: () => import(/* webpackChunkName: "article6.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article6.html.js"), meta: {"_blog":{"title":"Article 6","author":"","date":"2022-01-06T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 6"} }],
  ["/posts/article7.html", { loader: () => import(/* webpackChunkName: "article7.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article7.html.js"), meta: {"_blog":{"title":"Article 7","author":"","date":"2022-01-07T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag C","tag D"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 7"} }],
  ["/posts/article8.html", { loader: () => import(/* webpackChunkName: "article8.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article8.html.js"), meta: {"_blog":{"title":"Article 8","author":"","date":"2022-01-08T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag C","tag D"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 8"} }],
  ["/posts/article9.html", { loader: () => import(/* webpackChunkName: "article9.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/article9.html.js"), meta: {"_blog":{"title":"Article 9","author":"","date":"2022-01-09T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag C","tag D"],"excerpt":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n"},"title":"Article 9"} }],
  ["/posts/sticky.html", { loader: () => import(/* webpackChunkName: "sticky.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/sticky.html.js"), meta: {"_blog":{"title":"Sticky Article","author":"","date":"2021-01-01T00:00:00.000Z","category":["CategoryC"],"tag":["tag E"],"excerpt":"<p>A sticky article demo.</p>"},"title":"Sticky Article"} }],
  ["/posts/sticky2.html", { loader: () => import(/* webpackChunkName: "sticky2.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/posts/sticky2.html.js"), meta: {"_blog":{"title":"Sticky Article with Higher Priority","author":"","date":"2020-01-01T00:00:00.000Z","category":["CategoryC"],"tag":["tag E"],"excerpt":"\n<p>Excerpt information which is added manually.</p>\n"},"title":"Sticky Article with Higher Priority"} }],
  ["/guide/css/cssExample.html", { loader: () => import(/* webpackChunkName: "cssExample.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/css/cssExample.html.js"), meta: {"title":"css奇思妙想"} }],
  ["/guide/css/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/css/index.html.js"), meta: {"title":"目录"} }],
  ["/guide/engineering/module.html", { loader: () => import(/* webpackChunkName: "module.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/engineering/module.html.js"), meta: {"title":"模块化详解"} }],
  ["/guide/react/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/react/index.html.js"), meta: {"title":""} }],
  ["/guide/js/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/js/index.html.js"), meta: {"title":""} }],
  ["/guide/request/repeatRequest.html", { loader: () => import(/* webpackChunkName: "repeatRequest.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/request/repeatRequest.html.js"), meta: {"title":"接口防止重复调用方案"} }],
  ["/guide/vue/arrow.html", { loader: () => import(/* webpackChunkName: "arrow.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/vue/arrow.html.js"), meta: {"title":"箭头步骤条效果"} }],
  ["/guide/vue/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/vue/index.html.js"), meta: {"title":""} }],
  ["/guide/vue/sourceCode.html", { loader: () => import(/* webpackChunkName: "sourceCode.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/vue/sourceCode.html.js"), meta: {"title":"Vue 源码"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/category/index.html.js"), meta: {"title":"Categories"} }],
  ["/category/history/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/category/history/index.html.js"), meta: {"title":"Category History"} }],
  ["/category/categorya/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/category/categorya/index.html.js"), meta: {"title":"Category CategoryA"} }],
  ["/category/categoryb/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/category/categoryb/index.html.js"), meta: {"title":"Category CategoryB"} }],
  ["/category/categoryc/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/category/categoryc/index.html.js"), meta: {"title":"Category CategoryC"} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/tag/index.html.js"), meta: {"title":"Tags"} }],
  ["/tag/wwi/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/tag/wwi/index.html.js"), meta: {"title":"Tag WWI"} }],
  ["/tag/wwii/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/tag/wwii/index.html.js"), meta: {"title":"Tag WWII"} }],
  ["/tag/tag-a/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/tag/tag-a/index.html.js"), meta: {"title":"Tag tag A"} }],
  ["/tag/tag-b/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/tag/tag-b/index.html.js"), meta: {"title":"Tag tag B"} }],
  ["/tag/tag-c/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/tag/tag-c/index.html.js"), meta: {"title":"Tag tag C"} }],
  ["/tag/tag-d/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/tag/tag-d/index.html.js"), meta: {"title":"Tag tag D"} }],
  ["/tag/tag-e/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/tag/tag-e/index.html.js"), meta: {"title":"Tag tag E"} }],
  ["/article/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/article/index.html.js"), meta: {"title":"Articles"} }],
  ["/timeline/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/timeline/index.html.js"), meta: {"title":"Timeline"} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
