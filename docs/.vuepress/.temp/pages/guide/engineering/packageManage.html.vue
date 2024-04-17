<template><div><h1 id="包管理器" tabindex="-1"><a class="header-anchor" href="#包管理器"><span>包管理器</span></a></h1>
<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念"><span>概念</span></a></h2>
<h3 id="模块-module" tabindex="-1"><a class="header-anchor" href="#模块-module"><span>模块（module）</span></a></h3>
<p>通常以单个文件形式存在的功能片段，入口文件通常称之为<strong>入口模块</strong>或<strong>主模块</strong></p>
<h3 id="库-library-简称-lib" tabindex="-1"><a class="header-anchor" href="#库-library-简称-lib"><span>库（library, 简称 lib）</span></a></h3>
<p>以一个或多个模块组成的完整功能块，为开发中某一方面的问题提供完整的解决方案</p>
<h3 id="包-package" tabindex="-1"><a class="header-anchor" href="#包-package"><span>包（package）</span></a></h3>
<p>包含元数据的库，这些元数据包括：名称、描述、git 主页、许可证协议、作者、依赖等</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-4.png" />
</p>
<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景"><span>背景</span></a></h2>
<p>CommonJS 的出现，使 node 环境下的 JS 代码可以用模块更加细粒度的划分。一个类、一个函数、一个对象、一个配置等等均可以作为模块，这种细粒度的划分，是开发大型应用的基石。</p>
<p>为了解决在开发过程中遇到的常见问题，比如加密、提供常见的工具方法、模拟数据等等，一时间，在前端社区涌现了大量的第三方库。这些库使用 CommonJS 标准书写而成，非常容易使用。</p>
<p>然而，在下载使用这些第三方库的时候，遇到难以处理的问题：</p>
<ul>
<li><strong>下载过程繁琐</strong>
<ul>
<li>进入官网或 github 主页</li>
<li>找到并下载相应的版本</li>
<li>拷贝到工程的目录中</li>
<li>如果遇到有同名的库，需要更改名称</li>
</ul>
</li>
<li><strong>如果该库需要依赖其他库，还需要按照要求先下载其他库</strong></li>
<li><strong>开发环境中安装的大量的库如何在生产环境中还原，又如何区分</strong></li>
<li><strong>更新一个库极度麻烦</strong></li>
<li><strong>自己开发的库，如何在下一次开发使用</strong></li>
</ul>
<p><strong>以上问题，就是包管理工具要解决的问题</strong></p>
<h2 id="前端包管理器" tabindex="-1"><a class="header-anchor" href="#前端包管理器"><span>前端包管理器</span></a></h2>
<p>几乎可以这样认为，前端所有的包管理器都是基于 npm 的，目前，npm 即是一个包管理器，也是其他包管理的基石</p>
<p>npm 全称为 node package manager，即 node 包管理器，它运行在 node 环境中，让开发者可以用简单的方式完成包的查找、安装、更新、卸载、上传等操作</p>
<blockquote>
<p>npm 之所以要运行在 node 环境，而不是浏览器环境，根本原因是因为浏览器环境无法提供下载、删除、读取本地文件的功能。而 node 属于服务器环境，没有浏览器的种种限制，理论上可以完全掌控运行 node 的计算机。</p>
</blockquote>
<p>npm 的出现，弥补了 node 没有包管理器的缺陷，于是很快，node 在安装文件中内置了 npm，当开发者安装好 node 之后，就自动安装了 npm，不仅如此，node 环境还专门为 npm 提供了良好的支持，使用 npm 下载的包更加方便了。</p>
<p>npm 由三部分组成：</p>
<ul>
<li>registry：入口
<ul>
<li>可以把它想象成一个庞大的数据库</li>
<li>第三方库的开发者，将自己的库按照 npm 的规范，打包上传到数据库中</li>
<li>使用者通过统一的地址下载第三方包</li>
</ul>
</li>
<li>官网：https://www.npmjs.com/
<ul>
<li>查询包</li>
<li>注册、登录、管理个人信息</li>
</ul>
</li>
<li>CLI：command-line interface 命令行接口
<ul>
<li>这一部分是本门课讲解的重点</li>
<li>安装好 npm 后，通过 CLI 来使用 npm 的各种功能</li>
</ul>
</li>
</ul>
<blockquote>
<p>node 和 npm 是互相成就的，node 的出现让 npm 火了，npm 的火爆带动了大量的第三方库的发展，很多优秀的第三方库打包上传到了 npm，这些第三方库又为 node 带来了大量的用户</p>
</blockquote>
<h2 id="npm" tabindex="-1"><a class="header-anchor" href="#npm"><span>NPM</span></a></h2>
<h3 id="包的安装" tabindex="-1"><a class="header-anchor" href="#包的安装"><span>包的安装</span></a></h3>
<blockquote>
<p><strong>安装（install）即下载包</strong></p>
<p>由于 npm 的官方 registry 服务器位于国外，可能受网速影响导致下载缓慢或失败。因此，安装好 npm 之后，需要重新设置 registry 的地址为国内地址。目前，淘宝 https://registry.npm.taobao.org 提供了国内的 registry 地址，先设置到该地址。设置方式为<code v-pre>npm config set registry https://registry.npm.taobao.org</code>。设置好后，通过命令<code v-pre>npm config get registry</code>进行检查</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-5.png" />
</p>
</blockquote>
<p>npm 安装一个包，分为两种安装方式：</p>
<ol>
<li>本地安装</li>
<li>全局安装</li>
</ol>
<h3 id="本地安装" tabindex="-1"><a class="header-anchor" href="#本地安装"><span>本地安装</span></a></h3>
<p>使用命令<code v-pre>npm install 包名</code>或<code v-pre>npm i 包名</code>即可完成本地安装</p>
<p>本地安装的包出现在当前目录下的<code v-pre>node_modules</code>目录中</p>
<blockquote>
<p>随着开发的进展，<code v-pre>node_modules</code>目录会变得异常庞大，目录下的内容不适合直接传输到生产环境，因此通常使用<code v-pre>.gitignore</code>文件忽略该目录中的内容</p>
</blockquote>
<blockquote>
<p>本地安装适用于绝大部分的包，它会在当前目录及其子目录中发挥作用
通常在项目的根目录中使用本地安装</p>
</blockquote>
<blockquote>
<p>安装一个包的时候，npm 会自动管理依赖，它会下载该包的依赖包到<code v-pre>node_modules</code>目录中
如果本地安装的包带有 CLI，npm 会将它的 CLI 脚本文件放置到<code v-pre>node_modules/.bin</code>下，使用命令<code v-pre>npx 命令名</code>即可调用</p>
</blockquote>
<h3 id="包配置" tabindex="-1"><a class="header-anchor" href="#包配置"><span>包配置</span></a></h3>
<p>目前遇到的问题：</p>
<ol>
<li>拷贝工程后如何还原？</li>
<li>如何区分开发依赖和生产依赖？</li>
<li>如果自身的项目也是一个包，如何描述包的信息</li>
</ol>
<p>以上这些问题都需要通过包的<strong>配置文件</strong>解决</p>
<h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h3>
<p>npm 将每个使用 npm 的工程本身都看作是一个包，包的信息需要通过一个名称固定的配置文件来描述</p>
<p><strong>配置文件的名称固定为：package.json</strong></p>
<p>可以手动创建该文件，而更多的时候，是通过命令<code v-pre>npm init</code>创建的</p>
<p>配置文件中可以描述大量的信息，包括：</p>
<ul>
<li>name：包的名称，该名称必须是<strong>英文单词字符</strong>，支持连接符</li>
<li>version：版本
<ul>
<li>版本规范：主版本号.次版本号.补丁版本号</li>
<li>主版本号：仅当程序发生了重大变化时才会增长，如新增了重要功能、新增了大量的 API、技术架构发生了重大变化</li>
<li>次版本号：仅当程序发生了一些小变化时才会增长，如新增了一些小功能、新增了一些辅助型的 API</li>
<li>补丁版本号：仅当解决了一些 bug 或 进行了一些局部优化时更新，如修复了某个函数的 bug、提升了某个函数的运行效率</li>
</ul>
</li>
<li>description：包的描述</li>
<li>homepage：官网地址</li>
<li>author：包的作者，必须是有效的 npm 账户名，书写规范是 <code v-pre>account &lt;mail&gt;</code>，例如：<code v-pre>zhangsan &lt;zhangsan@gmail.com&gt;</code>，不正确的账号和邮箱可能导致发布包时失败</li>
<li>repository：包的仓储地址，通常指 git 或 svn 的地址，它是一个对象
<ul>
<li>type：仓储类型，git 或 svn</li>
<li>url：地址</li>
</ul>
</li>
<li>main：包的入口文件，使用包的人默认从该入口文件导入包的内容</li>
<li>keywords: 搜索关键字，发布包后，可以通过该数组中的关键字搜索到包</li>
</ul>
<p>使用<code v-pre>npm init --yes</code>或<code v-pre>npm init -y</code>可以在生成配置文件时自动填充默认配置</p>
<h3 id="保存依赖关系" tabindex="-1"><a class="header-anchor" href="#保存依赖关系"><span>保存依赖关系</span></a></h3>
<p>大部分时候，我们仅仅是开发项目，并不会把它打包发布出去，尽管如此，我们仍然需要 package.json 文件</p>
<p><strong>package.json 文件最重要的作用，是记录当前工程的依赖</strong></p>
<ul>
<li>dependencies：生产环境的依赖包</li>
<li>devDependencies：仅开发环境的依赖包</li>
</ul>
<p>配置好依赖后，使用下面的命令即可安装依赖</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment">## 本地安装所有依赖 dependencies + devDependencies</span>
<span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> i

<span class="token comment">## 仅安装生产环境的依赖 dependencies</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--production</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一来，代码移植就不是问题了，只需要移植源代码和 package.json 文件，不用移植 node_modules 目录，然后在移植之后通过命令即可重新恢复安装</p>
<p>为了更加方便的添加依赖，npm 支持在使用 install 命令时，加入一些额外的参数，用于将安装的依赖包保存到 package.json 文件中</p>
<p>涉及的命令如下</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment">## 安装依赖到生产环境</span>
<span class="token function">npm</span> i 包名
<span class="token function">npm</span> i <span class="token parameter variable">--save</span> 包名
<span class="token function">npm</span> i <span class="token parameter variable">-S</span> 包名

<span class="token comment">## 安装依赖到开发环境</span>
<span class="token function">npm</span> i --save-dev 包名
<span class="token function">npm</span> i <span class="token parameter variable">-D</span> 包名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>自动保存的依赖版本，例如<code v-pre>^15.1.3</code>，这种书写方式叫做语义版本号（semver version），具体规则后续讲解</p>
</blockquote>
<h3 id="包的使用" tabindex="-1"><a class="header-anchor" href="#包的使用"><span>包的使用</span></a></h3>
<p>nodejs 对 npm 支持非常良好</p>
<p>当使用 nodejs 导入模块时，如果模块路径不是以 ./ 或 ../ 开头，则 node 会认为导入的模块来自于 node_modules 目录，例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> _ <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'lodash'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它首先会从当前目录的以下位置寻找文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>node_modules/lodash.js
node_modules/lodash/入口文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>若当前目录没有这样的文件，则会回溯到上级目录按照同样的方式查找</p>
<p>如果到顶级目录都无法找到文件，则抛出错误</p>
<p>上面提到的入口文件按照以下规则确定</p>
<ol>
<li>查看导入包的 package.json 文件，读取 main 字段作为入口文件</li>
<li>若不包含 main 字段，则使用 index.js 作为入口文件</li>
</ol>
<blockquote>
<p>入口文件的规则同样适用于自己工程中的模块
在 node 中，还可以手动指定路径来导入相应的文件，这种情况比较少见</p>
</blockquote>
<h3 id="语义版本" tabindex="-1"><a class="header-anchor" href="#语义版本"><span>语义版本</span></a></h3>
<p>思考：如果你编写了一个包 A，依赖另外一个包 B，你在编写代码时，包 B 的版本是 2.4.1，你是希望使用你包的人一定要安装包 B，并且是 2.4.1 版本，还是希望他可以安装更高的版本，如果你希望它安装更高的版本，高的什么程度呢？</p>
<p>回顾：版本号规则</p>
<p>版本规范：主版本号.次版本号.补丁版本号</p>
<ul>
<li>主版本号：仅当程序发生了重大变化时才会增长，如新增了重要功能、新增了大量的 API、技术架构发生了重大变化</li>
<li>次版本号：仅当程序发生了一些小变化时才会增长，如新增了一些小功能、新增了一些辅助型的 API</li>
<li>补丁版本号：仅当解决了一些 bug 或 进行了一些局部优化时更新，如修复了某个函数的 bug、提升了某个函数的运行效率</li>
</ul>
<p>有的时候，我们希望：安装我的依赖包的时候，次版本号和补丁版本号是可以有提升的，但是主版本号不能变化</p>
<p>有的时候，我们又希望：安装我的依赖包的时候，只有补丁版本号可以提升，其他都不能提升</p>
<p>甚至我们希望依赖包保持固定的版本，尽管这比较少见</p>
<p>这样一来，就需要在配置文件中描述清楚具体的依赖规则，而不是直接写上版本号那么简单。</p>
<p>这种规则的描述，即<strong>语义版本</strong></p>
<p>语义版本的书写规则非常丰富，下面列出了一些常见的书写方式</p>
<table>
<thead>
<tr>
<th style="text-align:center">符号</th>
<th style="text-align:center">描述</th>
<th style="text-align:center">示例</th>
<th style="text-align:center">示例描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">&gt;</td>
<td style="text-align:center">大于某个版本</td>
<td style="text-align:center">&gt;1.2.1</td>
<td style="text-align:center">大于 1.2.1 版本</td>
</tr>
<tr>
<td style="text-align:center">&gt;=</td>
<td style="text-align:center">大于等于某个版本</td>
<td style="text-align:center">&gt;=1.2.1</td>
<td style="text-align:center">大于等于 1.2.1 版本</td>
</tr>
<tr>
<td style="text-align:center">&lt;</td>
<td style="text-align:center">小于某个版本</td>
<td style="text-align:center">&lt;1.2.1</td>
<td style="text-align:center">小于 1.2.1 版本</td>
</tr>
<tr>
<td style="text-align:center">&lt;=</td>
<td style="text-align:center">小于等于某个版本</td>
<td style="text-align:center">&lt;=1.2.1</td>
<td style="text-align:center">小于等于 1.2.1 版本</td>
</tr>
<tr>
<td style="text-align:center">-</td>
<td style="text-align:center">介于两个版本之间</td>
<td style="text-align:center">1.2.1 - 1.4.5</td>
<td style="text-align:center">介于 1.2.1 和 1.4.5 之间</td>
</tr>
<tr>
<td style="text-align:center">x</td>
<td style="text-align:center">不固定的版本号</td>
<td style="text-align:center">1.3.x</td>
<td style="text-align:center">只要保证主版本号是 1，次版本号是 3 即可</td>
</tr>
<tr>
<td style="text-align:center">~</td>
<td style="text-align:center">补丁版本号可增</td>
<td style="text-align:center">~1.3.4</td>
<td style="text-align:center">保证主版本号是 1，次版本号是 3，补丁版本号大于等于 4</td>
</tr>
<tr>
<td style="text-align:center">^</td>
<td style="text-align:center">此版本和补丁版本可增</td>
<td style="text-align:center">^1.3.4</td>
<td style="text-align:center">保证主版本号是 1，次版本号可以大于等于 3，补丁版本号可以大于等于 4</td>
</tr>
<tr>
<td style="text-align:center">*</td>
<td style="text-align:center">最新版本</td>
<td style="text-align:center">*</td>
<td style="text-align:center">始终安装最新版本</td>
</tr>
</tbody>
</table>
<h3 id="避免还原的差异" tabindex="-1"><a class="header-anchor" href="#避免还原的差异"><span>避免还原的差异</span></a></h3>
<p>版本依赖控制始终是一个两难的问题</p>
<p>如果允许版本增加，可以让依赖包的 bug 得以修复（补丁版本号），可以带来一些意外的惊喜（次版本号），但同样可能带来不确定的风险（新的 bug）</p>
<p>如果不允许版本增加，可以获得最好的稳定性，但失去了依赖包自我优化的能力</p>
<p>而有的时候情况更加复杂，如果依赖包升级后，依赖也发生了变化，会有更多不确定的情况出现</p>
<p>基于此，npm 在安装包的时候，会自动生成一个 package-lock.json 文件（参考 yarn 的），该文件记录了安装包时的确切依赖关系</p>
<p>当移植工程时，如果移植了 package-lock.json 文件，恢复安装时，会按照 package-lock.json 文件中的确切依赖进行安装，最大限度的避免了差异</p>
<h3 id="扩展-npm-的差异版本处理" tabindex="-1"><a class="header-anchor" href="#扩展-npm-的差异版本处理"><span>[扩展]npm 的差异版本处理</span></a></h3>
<p>如果两个包依赖同一个包的不同版本，如下图</p>
<p style="text-align: center">
   <img src="/images/engineering/engineering-6.png" />
</p>
<p>面对这种情况，在 node_modules 目录中，不会使用扁平（默认会把依赖都拍扁，不会出现多层级的情况，即都放在 node_modules 中）的目录结构，而会形成嵌套的目录，如下图：</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>├── node_modules
│   ├── a
│   │   ├── node_modules
│   │   │   ├── c
│   │   │   |   |—— c包的文件
│   │   │── a包的文件
│   ├── b
│   │   ├── node_modules
│   │   │   ├── c
│   │   │   |   |—— c包的文件
│   │   │── b包的文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="npm-脚本" tabindex="-1"><a class="header-anchor" href="#npm-脚本"><span>npm 脚本</span></a></h3>
<p>在开发的过程中，我们可能会反复使用很多的 CLI 命令，例如：</p>
<ul>
<li>启动工程命令（node 或 一些第三方包提供的 CLI 命令）</li>
<li>部署工程命令（一些第三方包提供的 CLI 命令）</li>
<li>测试工程命令（一些第三方包提供的 CLI 命令）</li>
</ul>
<p>这些命令纷繁复杂，根据第三方包的不同命令也会不一样，非常难以记忆</p>
<p>于是，npm 非常贴心的支持了脚本，只需要在 package.json 中配置 scripts 字段，即可配置各种脚本名称</p>
<p>之后，我们就可以运行简单的指令来完成各种操作了</p>
<p>运行方式是 <code v-pre>npm run 脚本名称</code>（可以运行任意脚本，还可以运行 dir 等对应设备 cmd 命令）</p>
<blockquote>
<p>脚本存放再 node_modules/.bin 目录中，如果想直接调用，可以通过 npx 的方式运行，但是配置再 scripts 中，可以省略 npx</p>
</blockquote>
<p>不仅如此，npm 还对某些常用的脚本名称进行了简化，下面的脚本名称是不需要使用 run 的：</p>
<ul>
<li>start</li>
<li>stop</li>
<li>test</li>
</ul>
<p>一些细节：</p>
<ul>
<li>脚本中可以省略 npx</li>
<li>start 脚本有默认值：node server.js （默认运行 server.js 文件）</li>
</ul>
<h3 id="运行环境配置" tabindex="-1"><a class="header-anchor" href="#运行环境配置"><span>运行环境配置</span></a></h3>
<p>我们书写的代码一般有三种运行环境：</p>
<ol>
<li>开发环境</li>
<li>生产环境</li>
<li>测试环境</li>
</ol>
<p>有的时候，我们可能需要在 node 代码中根据不同的环境做出不同的处理</p>
<p>如何优雅的让 node 知道处于什么环境，是极其重要的</p>
<p>通常我们使用如下的处理方式：</p>
<p>node 中有一个全局变量 global (可以类比浏览器环境的 window)，该变量是一个对象，对象中的所有属性均可以直接使用</p>
<p>global 有一个属性是 process，该属性是一个对象，包含了当前运行 node 程序的计算机的很多信息，其中有一个信息是 env，是一个对象，包含了计算机中所有的系统变量（即我的电脑里的系统变量）</p>
<p>通常，我们通过系统变量 NODE_ENV 的值，来判定 node 程序处于何种环境</p>
<p>有两种方式设置 NODE_ENV 的值</p>
<ol>
<li>永久设置 直接修改我的电脑系统变量的值</li>
<li>临时设置</li>
</ol>
<p>我们一般使用临时设置</p>
<p>因此，我们可以配置 scripts 脚本，在设置好了 NODE_ENV 后启动程序</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token string-property property">"script"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token string-property property">"dev"</span><span class="token operator">:</span> <span class="token string">"set NODE_ENV=development&amp;&amp; node server.js"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>为了避免不同系统的设置方式的差异，可以使用第三方库 cross-env 对环境变量进行设置</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token string-property property">"script"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token string-property property">"dev"</span><span class="token operator">:</span> <span class="token string">"cross-env NODE_ENV=development node server.js"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在-node-中读取-package-json" tabindex="-1"><a class="header-anchor" href="#在-node-中读取-package-json"><span>在 node 中读取 package.json</span></a></h3>
<p>有的时候，我们可能在 package.json 中配置一些自定义的字段，这些字段需要在 node 中读取</p>
<p>在 node 中，可以直接导入一个 json 格式的文件，它会自动将其转换为 js 对象</p>
<h3 id="其他-npm-命令" tabindex="-1"><a class="header-anchor" href="#其他-npm-命令"><span>其他 npm 命令</span></a></h3>
<ol>
<li>安装</li>
</ol>
<ul>
<li>精确安装最新版本</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save-exact 包名
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-E</span> 包名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>安装指定版本</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> 包名@版本号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>查询</li>
</ol>
<ul>
<li>查询包安装路径</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> root <span class="token punctuation">[</span>-g<span class="token punctuation">]</span>
<span class="token comment">## -g 查看全局安装路径，不加 -g 查看当前项目安装路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查看包信息</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> view 包名 <span class="token punctuation">[</span>子信息<span class="token punctuation">]</span>
<span class="token comment">## view aliases：v info show</span>
<span class="token comment">## npm view === npm v === npm info === npm show</span>

<span class="token function">npm</span> view react versions
<span class="token comment">## 查看react版本，rc表示release candidate，即候选版本，最成熟版本，一般安装后面不带任何字母的即16.3.0，最次也需要安装rc版本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查询安装包</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> list <span class="token punctuation">[</span>-g<span class="token punctuation">]</span> <span class="token punctuation">[</span>--depth<span class="token operator">=</span>依赖深度<span class="token punctuation">]</span>
<span class="token comment">## list aliases: ls  la  ll</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>更新</li>
</ol>
<ul>
<li>检查有哪些包需要更新</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> outdated
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>更新包</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> update <span class="token punctuation">[</span>-g<span class="token punctuation">]</span> <span class="token punctuation">[</span>包名<span class="token punctuation">]</span>
<span class="token comment">## update 别名（aliases）：up、upgrade</span>
<span class="token comment">## 不加包名，则更新所有包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>卸载包</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> uninstall <span class="token punctuation">[</span>-g<span class="token punctuation">]</span> 包名
<span class="token comment">## uninstall aliases: remove, rm, r, un, unlink</span>
<span class="token comment">## 不加包名，则更新所有包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="npm-配置" tabindex="-1"><a class="header-anchor" href="#npm-配置"><span>npm 配置</span></a></h3>
<p>npm 的配置会对其他命令产生或多或少的影响</p>
<p>安装好 npm 之后，最终会产生两个配置文件，一个是用户配置，一个是系统配置，当两个文件的配置项有冲突的时候，用户配置会覆盖系统配置</p>
<p>通常，我们不关心具体的配置文件，而只关心最终生效的配置</p>
<p>通过下面的命令可以查询目前生效的各种配置</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> config <span class="token function">ls</span> <span class="token punctuation">[</span>-l<span class="token punctuation">]</span> <span class="token punctuation">[</span>--json<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另外，可以通过下面的命令操作配置</p>
<ol>
<li>获取某个配置项</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> config get 配置项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>设置某个配置项</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> 配置项<span class="token operator">=</span>值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>移除某个配置项</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> config delete 配置项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="发布包" tabindex="-1"><a class="header-anchor" href="#发布包"><span>发布包</span></a></h3>
<ol>
<li>
<p>准备工作</p>
<ol>
<li>移除淘宝镜像源 <code v-pre>npm config delete registry</code></li>
<li>到 npm 官网注册一个账号，并完成邮箱认证</li>
<li>本地使用 npm cli 进行登录</li>
<li>使用命令<code v-pre>npm login</code>登录</li>
<li>使用命令<code v-pre>npm whoami</code>查看当前登录的账号</li>
<li>使用命令<code v-pre>npm logout</code>注销</li>
<li>创建工程根目录</li>
<li>使用 npm init 进行初始化</li>
</ol>
</li>
<li>
<p>发布</p>
<ol>
<li>开发</li>
<li>确定版本</li>
<li>使用命令<code v-pre>npm publish</code>完成发布</li>
</ol>
</li>
</ol>
<h3 id="开源协议" tabindex="-1"><a class="header-anchor" href="#开源协议"><span>开源协议</span></a></h3>
<p style="text-align: center">
   <img src="/images/engineering/engineering-7.png" />
</p>
<p>可以通过网站 http://choosealicense.online/appendix/ 选择协议，并复制协议内容</p>
<p>如下内容</p>
<p>MIT License</p>
<p>Copyright (c) 2019-2050 bangbangji</p>
<blockquote>
<p>Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p>
<p>The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.</p>
<p>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</p>
</blockquote>
<blockquote></blockquote>
<h2 id="yarn" tabindex="-1"><a class="header-anchor" href="#yarn"><span>Yarn</span></a></h2>
<h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h3>
<blockquote>
<p>yarn 官网：https://www.yarnpkg.com/zh-Hans/</p>
</blockquote>
<p>yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具，<strong>它仍然使用 npm 的 registry</strong>，不过提供了全新 CLI 来对包进行管理</p>
<p>过去，yarn 的出现极大的抢夺了 npm 的市场，甚至有人戏言，npm 只剩下一个 registry 了。</p>
<p>之所以会出现这种情况，是因为在过去，npm 存在下面的问题：</p>
<ul>
<li>依赖目录嵌套层次深：过去，npm 的依赖是嵌套的，这在 windows 系统上是一个极大的问题，由于众所周知的原因，windows 系统无法支持太深的目录</li>
<li>下载速度慢
<ul>
<li>由于嵌套层次的问题，所以 npm 对包的下载只能是串行的，即前一个包下载完后才会下载下一个包，导致带宽资源没有完全利用</li>
<li>多个相同版本的包被重复的下载</li>
</ul>
</li>
<li>控制台输出繁杂：过去，npm 安装包的时候，每安装一个依赖，就会输出依赖的详细信息，导致一次安装有大量的信息输出到控制台，遇到错误极难查看</li>
<li>工程移植问题：由于 npm 的版本依赖可以是模糊的，可能会导致工程移植后，依赖的确切版本不一致。</li>
</ul>
<p>针对上述问题，yarn 从诞生那天就已经解决，它用到了以下的手段：</p>
<ul>
<li>使用扁平的目录结构</li>
<li>并行下载</li>
<li>使用本地缓存</li>
<li>控制台仅输出关键信息</li>
<li>使用 yanr-lock 文件记录确切依赖</li>
</ul>
<p>不仅如此，yarn 还优化了以下内容：</p>
<ul>
<li>增加了某些功能强大的命令</li>
<li>让既有的命令更加语义化</li>
<li>本地安装的 CLI 工具可以使用 yarn 直接启动</li>
<li>将全局安装的目录当作一个普通的工程，生成 package.json 文件，便于全局安装移植</li>
</ul>
<p>yarn 的出现给 npm 带来了巨大的压力，很快，npm 学习了 yarn 先进的理念，不断的对自身进行优化，到了目前的 npm6 版本，几乎完全解决了上面的问题：</p>
<ul>
<li>目录扁平化</li>
<li>并行下载</li>
<li>本地缓存</li>
<li>使用 package-lock 记录确切依赖</li>
<li>增加了大量的命令别名</li>
<li>内置了 npx，可以启动本地的 CLI 工具</li>
<li>极大的简化了控制台输出</li>
</ul>
<p><strong>总结</strong></p>
<p>npm6 之后，可以说 npm 已经和 yarn 非常接近，甚至没有差距了。很多新的项目，又重新从 yarn 转回到 npm。</p>
<p>这两个包管理器是目前的主流，都必须要学习。</p>
<h3 id="核心命令" tabindex="-1"><a class="header-anchor" href="#核心命令"><span>核心命令</span></a></h3>
<ol>
<li><strong>初始化</strong></li>
</ol>
<p>初始化：<code v-pre>yarn init [--yes/-y]</code></p>
<ol start="2">
<li><strong>安装</strong></li>
</ol>
<p>添加指定包：<code v-pre>yarn [global] add package-name [--dev/-D] [--exact/-E]</code></p>
<p>安装package.json中的所有依赖：<code v-pre>yarn install [--production/--prod]</code></p>
<ol start="3">
<li><strong>脚本和本地CLI</strong></li>
</ol>
<p>运行脚本：<code v-pre>yarn run 脚本名</code></p>
<blockquote>
<p>start、stop、test可以省略run</p>
</blockquote>
<p>运行本地安装的CLI：<code v-pre>yarn run CLI名</code></p>
<ol start="4">
<li><strong>查询</strong></li>
</ol>
<p>查看bin目录：<code v-pre>yarn [global] bin</code></p>
<p>查询包信息：<code v-pre>yarn info 包名 [子字段]</code></p>
<p>列举已安装的依赖：<code v-pre>yarn [global] list [--depth=依赖深度]</code></p>
<blockquote>
<p>yarn的list命令和npm的list不同，yarn输出的信息更加丰富，包括顶级目录结构、每个包的依赖版本号</p>
</blockquote>
<ol start="5">
<li><strong>更新</strong></li>
</ol>
<p>列举需要更新的包：<code v-pre>yarn outdated</code></p>
<p>更新包：<code v-pre>yarn [global] upgrade [包名]</code></p>
<ol start="6">
<li><strong>卸载</strong></li>
</ol>
<p>卸载包：<code v-pre>yarn remove 包名</code></p>
<h3 id="yarn-的特别礼物" tabindex="-1"><a class="header-anchor" href="#yarn-的特别礼物"><span>yarn 的特别礼物</span></a></h3>
<p>在终端命令上，yarn不仅仅是对npm的命令做了一个改名，还增加了一些原本没有的命令，这些命令在某些时候使用起来非常方便</p>
<ol>
<li><strong>yarn check</strong></li>
</ol>
<p>使用<code v-pre>yarn check</code>命令，可以验证package.json文件的依赖记录和lock文件是否一致</p>
<p>这对于防止篡改非常有用</p>
<ol start="2">
<li><strong>yarn audit</strong></li>
</ol>
<p>使用<code v-pre>yarn audit</code>命令，可以检查本地安装的包有哪些已知漏洞，以表格的形式列出，漏洞级别分为以下几种：</p>
<ul>
<li>INFO：信息级别</li>
<li>LOW: 低级别</li>
<li>MODERATE：中级别</li>
<li>HIGH：高级别</li>
<li>CRITICAL：关键级别</li>
</ul>
<ol start="3">
<li><strong>yarn why</strong></li>
</ol>
<p>使用<code v-pre>yarn why 包名</code>命令，可以在控制台打印出为什么安装了这个包，哪些包会用到它</p>
<ol start="4">
<li><strong>yarn create</strong></li>
</ol>
<p>非常有趣的命令</p>
<p>今后，我们会学习一些脚手架，所谓脚手架，就是使用一个命令来搭建一个工程结构</p>
<p>过去，我们都是使用如下的做法：</p>
<ol>
<li>全局安装脚手架工具</li>
<li>使用全局命令搭建脚手架</li>
</ol>
<p>由于大部分脚手架工具都是以<code v-pre>create-xxx</code>的方式命名的，比如react的官方脚手架名称为<code v-pre>create-react-app</code></p>
<p>因此，可以使用<code v-pre>yarn create</code>命令来一步完成安装和搭建</p>
<p>例如：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> create react-app my-app
<span class="token comment"># 等同于下面的两条命令</span>
<span class="token function">yarn</span> global <span class="token function">add</span> create-react-app
create-react-app my-app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cnpm" tabindex="-1"><a class="header-anchor" href="#cnpm"><span>cnpm</span></a></h2>
<blockquote>
<p>官网地址：https://npm.taobao.org/</p>
</blockquote>
<p>为解决国内用户连接npm registry缓慢的问题，淘宝搭建了自己的registry，即淘宝npm镜像源</p>
<p>过去，npm没有提供修改registry的功能，因此，淘宝提供了一个CLI工具即cnpm，它支持除了<code v-pre>npm publish</code>以外的所有命令，只不过连接的是淘宝镜像源</p>
<p>如今，npm已经支持修改registry了，可能cnpm唯一的作用就是和npm共存，即如果要使用官方源，则使用npm，如果使用淘宝源，则使用cnpm</p>
<h2 id="nvm" tabindex="-1"><a class="header-anchor" href="#nvm"><span>nvm</span></a></h2>
<p>nvm并非包管理器，它是用于管理多个node版本的工具</p>
<p>在实际的开发中，可能会出现多个项目分别使用的是不同的node版本，在这种场景下，管理不同的node版本就显得尤为重要</p>
<p>nvm就是用于切换版本的一个工具</p>
<h3 id="下载与安装" tabindex="-1"><a class="header-anchor" href="#下载与安装"><span>下载与安装</span></a></h3>
<p>最新版下载地址：https://github.com/coreybutler/nvm-windows/releases</p>
<p>下载nvm-setup.zip后，直接安装</p>
<h3 id="使用nvm" tabindex="-1"><a class="header-anchor" href="#使用nvm"><span>使用nvm</span></a></h3>
<p>nvm提供了CLI工具，用于管理node版本</p>
<p>在终端中输入nvm，以查看各种可用命令</p>
<blockquote>
<p>为了加快下载速度，建议设置淘宝镜像
node淘宝镜像：https://npm.taobao.org/mirrors/node/
npm淘宝镜像：https://npm.taobao.org/mirrors/npm/</p>
</blockquote>
<h2 id="pnpm" tabindex="-1"><a class="header-anchor" href="#pnpm"><span>pnpm</span></a></h2>
<p>pnpm是一种新起的包管理器，从npm的下载量看，目前还没有超过yarn，但它的实现方式值得主流包管理器学习，某些开发者极力推荐使用pnpm</p>
<p>从结果上来看，它具有以下优势：</p>
<ol>
<li>目前，安装效率高于npm和yarn的最新版</li>
<li>极其简洁的node_modules目录</li>
<li>避免了开发时使用间接依赖的问题（即使用其他包管理器，会把安装包的依赖包拍平放在node_modules上，所以可以去引用它的依赖，但是一旦其他人用了pnpm安装，会发现项目跑不起来）</li>
<li>能极大的降低磁盘空间的占用</li>
</ol>
<h3 id="安装和使用" tabindex="-1"><a class="header-anchor" href="#安装和使用"><span>安装和使用</span></a></h3>
<p>全局安装pnpm</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> <span class="token function">pnpm</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后在使用时，只需要把npm替换为pnpm即可</p>
<p>如果要执行安装在本地的CLI，可以使用pnpx，它和 npx 的功能完全一样，唯一不同的是，在使用pnpx执行一个需要安装的命令时，会使用pnpm进行安装</p>
<blockquote>
<p>比如<code v-pre>npx mocha</code>执行本地的<code v-pre>mocha</code>命令时，如果<code v-pre>mocha</code>没有安装，则npx会自动的、临时的安装mocha，安装好后，自动运行mocha命令，运行后就卸载该依赖</p>
</blockquote>
<h3 id="pnpm的原理" tabindex="-1"><a class="header-anchor" href="#pnpm的原理"><span>pnpm的原理</span></a></h3>
<ol>
<li>同 yarn 和 npm 一样，pnpm 仍然使用缓存来保存已经安装过的包（缓存在当前项目的根目录，即项目在D:/asdsd/xxxx, 则缓存在D:/.pnpm-store），以及使用 pnpm-lock.yaml 来记录详细的依赖版本</li>
</ol>
<blockquote>
<p>yarn和npm第一次下载会把包缓存在一个文件夹里，后续如果发现下载的包和缓存的包一样，就会把包直接拷贝到当前项目，所以会造成文件被复制多份</p>
<p>而pnpm测试使用链接快捷方式，所以不会存在文件被复制多份</p>
</blockquote>
<ol start="2">
<li>
<p>不同于 yarn 和 npm， pnpm 使用<strong>符号链接和硬链接</strong>（可将它们想象成快捷方式）的做法来放置依赖，从而规避了从缓存中拷贝文件的时间，使得安装和卸载的速度更快</p>
</li>
<li>
<p>由于使用了<strong>符号链接和硬链接</strong>，pnpm可以规避windows操作系统路径过长的问题，因此，它选择使用树形的依赖结果，有着几乎完美的依赖管理。也因为如此，项目中只能使用直接依赖，而不能使用间接依赖</p>
</li>
</ol>
<h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h3>
<p>由于 pnpm 会改动 node_modules 目录结构，使得每个包只能使用直接依赖（只能使用mode_modules第一层），而不能使用间接依赖，因此，如果使用 pnpm 安装的包中包含间接依赖，则会出现问题(<strong>现在不会了，除非使用了绝对路径</strong>)</p>
<p>由于 pnpm 超高的安装卸载效率，越来越多的包开始修正之前的间接依赖代码</p>
<h2 id="pnpm原理详解" tabindex="-1"><a class="header-anchor" href="#pnpm原理详解"><span>pnpm原理详解</span></a></h2>
<h3 id="概念-1" tabindex="-1"><a class="header-anchor" href="#概念-1"><span>概念</span></a></h3>
<blockquote>
<p>要彻底理解pnpm是怎么做的，需要有一些操作系统知识</p>
</blockquote>
<ol>
<li><strong>文件的本质</strong></li>
</ol>
<p>在操作系统中，文件实际上是一个指针，只不过它指向的不是内存地址，而是一个外部存储地址（这里的外部存储可以是硬盘、U盘、甚至是网络）</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-8.png" />
</p>
<p>当我们删除文件时，删除的实际上是指针，因此，无论删除多么大的文件，速度都非常快。</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-9.png" />
</p>
<ol start="2">
<li><strong>文件的拷贝</strong></li>
</ol>
<p>如果你复制一个文件，是将该文件指针指向的内容进行复制，然后产生一个新文件指向新的内容</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-10.png" />
</p>
<ol start="3">
<li><strong>硬链接 hard link</strong></li>
</ol>
<p>硬链接的概念来自于 Unix 操作系统，它是指将一个文件A指针复制到另一个文件B指针中，文件B就是文件A的硬链接</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-11.png" />
</p>
<p>通过硬链接，不会产生额外的磁盘占用，并且，两个文件都能找到相同的磁盘内容</p>
<p>硬链接的数量没有限制，可以为同一个文件产生多个硬链接</p>
<p>windows Vista操作系统开始，支持了创建硬链接的操作，在cmd中使用下面的命令可以创建硬链接</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>mklink /h 链接名称 目标文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于文件夹（目录）不存在文件内容，所以文件夹（目录）不能创建硬链接</p>
<blockquote>
<p>由于种种原因，在windows操作系统中，通常不要跨越盘符创建硬链接</p>
</blockquote>
<ol start="4">
<li><strong>符号链接 symbol link</strong></li>
</ol>
<p>符号链接又称为软连接，如果为某个文件或文件夹A创建符号连接B，则B指向A。</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-12.png" />
</p>
<p>windows Vista操作系统开始，支持了创建符号链接的操作，在cmd中使用下面的命令可以创建符号链接：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>mklink /d 链接名称 目标文件
<span class="token comment"># /d表示创建的是目录的符号链接，不写则是文件的符号链接</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>早期的windows系统不支持符号链接，但它提供了一个工具junction来达到类似的功能</p>
</blockquote>
<p><strong>符号链接和硬链接的区别</strong></p>
<ol>
<li>硬链接仅能链接文件，而符号链接可以链接目录</li>
<li>硬链接在链接完成后仅和文件内容关联，和之前链接的文件没有任何关系。而符号链接始终和之前链接的文件关联，和文件内容不直接相关</li>
</ol>
<ol start="5">
<li><strong>快捷方式</strong></li>
</ol>
<p>快捷方式类似于符号链接，是windows系统早期就支持的链接方式。</p>
<p>它不仅仅是一个指向其他文件或目录的指针，其中还包含了各种信息：如权限、兼容性启动方式等其他各种属性</p>
<p>由于快捷方式是windows系统独有的，在跨平台的应用中一般不会使用</p>
<ol start="6">
<li><strong>node环境对硬链接和符号链接的处理</strong></li>
</ol>
<p><strong>硬链接</strong>：硬链接是一个实实在在的文件，node不对其做任何特殊处理，也无法区别对待，实际上，node根本无从知晓该文件是不是一个硬链接</p>
<p><strong>符号链接</strong>：由于符号链接指向的是另一个文件或目录，当node执行符号链接下的JS文件时，会使用原始路径。</p>
<h3 id="原理" tabindex="-1"><a class="header-anchor" href="#原理"><span>原理</span></a></h3>
<p>pnpm使用符号链接和硬链接来构建node_modules目录</p>
<p>下面用一个例子来说明它的构建方式</p>
<p>假设两个包a和b，a依赖b：</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-13.png" />
</p>
<p>假设我们的工程为proj，直接依赖a，则安装时，pnpm会做下面的处理</p>
<ol>
<li>查询依赖关系，得到最终要安装的包：a和b</li>
<li>查看a和b是否已经有缓存，如果没有，下载到缓存中，如果有，则进入下一步</li>
<li>创建 node_modules 目录，并对目录进行结构初始化</li>
</ol>
<p style="text-align: center">
  <img src="/images/engineering/engineering-14.png" />
</p>
<ol start="4">
<li>从缓存的对应包中使用硬链接放置文件到相应包代码目录中</li>
</ol>
<p style="text-align: center">
  <img src="/images/engineering/engineering-15.png" />
</p>
<ol start="5">
<li>使用符号链接，将每个包的<strong>直接依赖</strong>放置到自己的目录中</li>
</ol>
<p style="text-align: center">
  <img src="/images/engineering/engineering-16.png" />
</p>
<p>这样做的目的，是为了保证a的代码在执行过程中，可以读取到它们的直接依赖</p>
<ol start="6">
<li>新版本的pnpm为了解决一些书写不规范的包（读取间接依赖）的问题，又将所有的工程非直接依赖，使用符号链接加入到了 .pnpm/node_modules 中</li>
</ol>
<p>在本例中好像没有必要，但是如果b依赖c，a又要直接用c，这种不规范的用法现在pnpm通过这种方式支持了。</p>
<blockquote>
<p>但对于那些使用绝对路径的奇葩写法，可能永远也无法支持</p>
</blockquote>
<ol start="7">
<li>在工程的node_modules目录中使用符号链接，放置直接依赖</li>
</ol>
<p style="text-align: center">
  <img src="/images/engineering/engineering-17.png" />
</p>
<ol start="8">
<li>完成</li>
</ol>
</div></template>


