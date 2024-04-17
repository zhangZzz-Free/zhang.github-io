import comp from "G:/HTMLFile/Vue/zx-blog/docs/.vuepress/.temp/pages/guide/engineering/packageManage.html.vue"
const data = JSON.parse("{\"path\":\"/guide/engineering/packageManage.html\",\"title\":\"包管理器\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"概念\",\"slug\":\"概念\",\"link\":\"#概念\",\"children\":[{\"level\":3,\"title\":\"模块（module）\",\"slug\":\"模块-module\",\"link\":\"#模块-module\",\"children\":[]},{\"level\":3,\"title\":\"库（library, 简称 lib）\",\"slug\":\"库-library-简称-lib\",\"link\":\"#库-library-简称-lib\",\"children\":[]},{\"level\":3,\"title\":\"包（package）\",\"slug\":\"包-package\",\"link\":\"#包-package\",\"children\":[]}]},{\"level\":2,\"title\":\"背景\",\"slug\":\"背景\",\"link\":\"#背景\",\"children\":[]},{\"level\":2,\"title\":\"前端包管理器\",\"slug\":\"前端包管理器\",\"link\":\"#前端包管理器\",\"children\":[]},{\"level\":2,\"title\":\"NPM\",\"slug\":\"npm\",\"link\":\"#npm\",\"children\":[{\"level\":3,\"title\":\"包的安装\",\"slug\":\"包的安装\",\"link\":\"#包的安装\",\"children\":[]},{\"level\":3,\"title\":\"本地安装\",\"slug\":\"本地安装\",\"link\":\"#本地安装\",\"children\":[]},{\"level\":3,\"title\":\"包配置\",\"slug\":\"包配置\",\"link\":\"#包配置\",\"children\":[]},{\"level\":3,\"title\":\"配置文件\",\"slug\":\"配置文件\",\"link\":\"#配置文件\",\"children\":[]},{\"level\":3,\"title\":\"保存依赖关系\",\"slug\":\"保存依赖关系\",\"link\":\"#保存依赖关系\",\"children\":[]},{\"level\":3,\"title\":\"包的使用\",\"slug\":\"包的使用\",\"link\":\"#包的使用\",\"children\":[]},{\"level\":3,\"title\":\"语义版本\",\"slug\":\"语义版本\",\"link\":\"#语义版本\",\"children\":[]},{\"level\":3,\"title\":\"避免还原的差异\",\"slug\":\"避免还原的差异\",\"link\":\"#避免还原的差异\",\"children\":[]},{\"level\":3,\"title\":\"[扩展]npm 的差异版本处理\",\"slug\":\"扩展-npm-的差异版本处理\",\"link\":\"#扩展-npm-的差异版本处理\",\"children\":[]},{\"level\":3,\"title\":\"npm 脚本\",\"slug\":\"npm-脚本\",\"link\":\"#npm-脚本\",\"children\":[]},{\"level\":3,\"title\":\"运行环境配置\",\"slug\":\"运行环境配置\",\"link\":\"#运行环境配置\",\"children\":[]},{\"level\":3,\"title\":\"在 node 中读取 package.json\",\"slug\":\"在-node-中读取-package-json\",\"link\":\"#在-node-中读取-package-json\",\"children\":[]},{\"level\":3,\"title\":\"其他 npm 命令\",\"slug\":\"其他-npm-命令\",\"link\":\"#其他-npm-命令\",\"children\":[]},{\"level\":3,\"title\":\"npm 配置\",\"slug\":\"npm-配置\",\"link\":\"#npm-配置\",\"children\":[]},{\"level\":3,\"title\":\"发布包\",\"slug\":\"发布包\",\"link\":\"#发布包\",\"children\":[]},{\"level\":3,\"title\":\"开源协议\",\"slug\":\"开源协议\",\"link\":\"#开源协议\",\"children\":[]}]},{\"level\":2,\"title\":\"Yarn\",\"slug\":\"yarn\",\"link\":\"#yarn\",\"children\":[{\"level\":3,\"title\":\"简介\",\"slug\":\"简介\",\"link\":\"#简介\",\"children\":[]},{\"level\":3,\"title\":\"核心命令\",\"slug\":\"核心命令\",\"link\":\"#核心命令\",\"children\":[]},{\"level\":3,\"title\":\"yarn 的特别礼物\",\"slug\":\"yarn-的特别礼物\",\"link\":\"#yarn-的特别礼物\",\"children\":[]}]},{\"level\":2,\"title\":\"cnpm\",\"slug\":\"cnpm\",\"link\":\"#cnpm\",\"children\":[]},{\"level\":2,\"title\":\"nvm\",\"slug\":\"nvm\",\"link\":\"#nvm\",\"children\":[{\"level\":3,\"title\":\"下载与安装\",\"slug\":\"下载与安装\",\"link\":\"#下载与安装\",\"children\":[]},{\"level\":3,\"title\":\"使用nvm\",\"slug\":\"使用nvm\",\"link\":\"#使用nvm\",\"children\":[]}]},{\"level\":2,\"title\":\"pnpm\",\"slug\":\"pnpm\",\"link\":\"#pnpm\",\"children\":[{\"level\":3,\"title\":\"安装和使用\",\"slug\":\"安装和使用\",\"link\":\"#安装和使用\",\"children\":[]},{\"level\":3,\"title\":\"pnpm的原理\",\"slug\":\"pnpm的原理\",\"link\":\"#pnpm的原理\",\"children\":[]},{\"level\":3,\"title\":\"注意事项\",\"slug\":\"注意事项\",\"link\":\"#注意事项\",\"children\":[]}]},{\"level\":2,\"title\":\"pnpm原理详解\",\"slug\":\"pnpm原理详解\",\"link\":\"#pnpm原理详解\",\"children\":[{\"level\":3,\"title\":\"概念\",\"slug\":\"概念-1\",\"link\":\"#概念-1\",\"children\":[]},{\"level\":3,\"title\":\"原理\",\"slug\":\"原理\",\"link\":\"#原理\",\"children\":[]}]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"guide/engineering/packageManage.md\",\"excerpt\":\"\\n<h2>概念</h2>\\n<h3>模块（module）</h3>\\n<p>通常以单个文件形式存在的功能片段，入口文件通常称之为<strong>入口模块</strong>或<strong>主模块</strong></p>\\n<h3>库（library, 简称 lib）</h3>\\n<p>以一个或多个模块组成的完整功能块，为开发中某一方面的问题提供完整的解决方案</p>\\n<h3>包（package）</h3>\\n<p>包含元数据的库，这些元数据包括：名称、描述、git 主页、许可证协议、作者、依赖等</p>\\n<p style=\\\"text-align: center\\\">\\n  <img src=\\\"/images/engineering/engineering-4.png\\\">\\n</p>\"}")
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
