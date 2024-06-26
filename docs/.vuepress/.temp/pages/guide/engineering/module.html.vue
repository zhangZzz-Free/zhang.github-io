<template><div><h1 id="模块化详解" tabindex="-1"><a class="header-anchor" href="#模块化详解"><span>模块化详解</span></a></h1>
<h2 id="发展史" tabindex="-1"><a class="header-anchor" href="#发展史"><span>发展史</span></a></h2>
<h3 id="第一阶段" tabindex="-1"><a class="header-anchor" href="#第一阶段"><span>第一阶段</span></a></h3>
<p><code v-pre>JavaScript</code> 语言最初的设计目标，是作为浏览器的脚本语言，仅仅用于实现一些页面效果。</p>
<p>那个时候，一个页面所用到的<code v-pre>JS</code>可能只有区区几百行</p>
<p>在这种情况下，语言本身所存在的一些缺陷往往容易被大家忽略，因为程序规模太小。所以在这个阶段，也不存在什么专业的前端工程师</p>
<p>第一个阶段发生的大事件</p>
<ul>
<li>1996 年，NetScape 将 JavaScript 语言提交给欧洲的一个标准制定阻止 ECMA（欧洲计算机制造商协会）</li>
<li>1998 年，NetScape 在与微软浏览器 IE 的竞争中失利，宣布破产</li>
</ul>
<h3 id="第二阶段" tabindex="-1"><a class="header-anchor" href="#第二阶段"><span>第二阶段</span></a></h3>
<p><code v-pre>AJAX</code>的出现，逐渐改变了浏览器脚本语言的使用场景，使得<code v-pre>JavaScript</code>不仅可以实现页面上的一些交互，还可以和服务器进行数据交互。</p>
<p>这个时候，一个页面所需要使用的<code v-pre>JS</code>代码行数越来越多，越来越复杂。</p>
<p>后端开发者的压力逐渐增加，使得一些公司开始招聘专业的前端开发者。</p>
<p>但此时，前端开发者的待遇远不如后端开发者，因为前端开发者承担的开发任务相对于后端还是比较简单的，同时也因为以下原因，制约了前端的发展:</p>
<ol>
<li><strong>浏览器解释执行 JS 的速度太慢</strong></li>
<li><strong>用户端的电脑配置不足</strong></li>
<li>更多的代码带来了全局变量污染、依赖关系混乱等问题</li>
</ol>
<p>在这个阶段，前端开发处在一个非常尴尬的境地，它在传统的开发模式和前后端分离之间无助的徘徊</p>
<p>第二阶段的大事件：</p>
<ol>
<li>IE 浏览器制霸市场后，几乎不再更新</li>
<li>ES4.0 流产，导致 JS 语言 10 年间几乎毫无变化</li>
<li>2008 年 ES5 发布，仅解决了一些 JS API 不足的糟糕局面</li>
</ol>
<h3 id="第三阶段" tabindex="-1"><a class="header-anchor" href="#第三阶段"><span>第三阶段</span></a></h3>
<p>到了 2008 年，谷歌的<code v-pre>V8</code>引擎发布，将<code v-pre>JavaScript</code>的执行速度推上了一个新的台阶。</p>
<p>突然间，制约前端发展的两大问题得以解决，此时，只剩下最后一个问题还在负隅顽抗，即<strong>全局变量污染和依赖混乱</strong>的问题，解决了它，前端便可以突破一切障碍，未来无可限量。</p>
<p>于是，全世界的前端开发者开始在社区中激烈的讨论，如何解决全局变量污染和依赖混乱的问题。</p>
<p>2008 年，有一个叫 Ryan Dahl 的小伙子，正在为一件事焦头烂额，他需要在服务器端手写一个高性能的 web 服务，经过分析，他确定，如果要实现高性能，那么必须要尽可能的减少线程，而要减少线程，避免不了要实用异步的处理方案。</p>
<p>一开始，他打算自己实用 C/C++语言来编写，可是这一过程实在太痛苦。</p>
<p>恰逢此时，谷歌 V8 引擎发布，Ryan 经过一些考量（单线程，异步，谷歌优化） 决定利用 V8 来编写高性能的服务器端程序。</p>
<p>于是，他基于开源的 V8 引擎，对源代码作了一些修改，便快速的完成了该项目。</p>
<p>2009 年，Ryan 推出了该 web 服务项目，命名为 nodejs。</p>
<p>从此，JS 第一次堂堂正正的入主后端，不再是必须附属于浏览器的“玩具”语言了。</p>
<p>也是从此刻开始，人们认识到，JS（ES）是一门真正的语言，它依附于运行环境（运行时）（宿主程序）而执行</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-1.png" />
</p>
<p>nodejs 的诞生，便把 JS 中的最后一个问题放到了台前，即<strong>全局变量污染和依赖混乱</strong>问题</p>
<p>最后经过社区的激烈讨论，最后形成一个模块化方案，这就是<code v-pre>CommonJS</code>,该方案彻底的解决了全局变量污染和依赖混乱的问题。</p>
<p>此方案一出，也立刻被<code v-pre>nodejs</code>所支持，于是，nodejs 成为了第一个为 JS 语言实现模块化的平台，为前端接下来的迅猛发展奠定了实践基础</p>
<p>该阶段发生的大事件：</p>
<ul>
<li>2008 年，V8 发布</li>
<li>IE 的市场逐步被 firefox 和 chrome 蚕食，现已无力回天</li>
<li>2009 年，nodejs 发布，并附带 commonjs 模块化标准</li>
</ul>
<h3 id="第四阶段" tabindex="-1"><a class="header-anchor" href="#第四阶段"><span>第四阶段</span></a></h3>
<p>CommonJS 的出现打开了前端开发者的思路</p>
<p>既然后端可以使用模块化的 JS，作为 JS 语言的老东家浏览器为什么不行呢？</p>
<p>但是此时运行到浏览器其实是困难得（同步执行）</p>
<p>所以就有人想，如果 CommonJS 无法在浏览器上使用，那我们能不能自己定义一个标准出来，在浏览器上运行呢？</p>
<p>于是很快，AMD 规范出炉，它解决的问题和 CommonJS 一样，但是可以更好的适应浏览器环境</p>
<p>相继的，CMD 规范出炉，它对 AMD 规范进行了改进</p>
<p>这些行为，都受到了 ECMA 官方的密切关注......</p>
<p>于是，ECMA 官方开始考虑 JS 的模块化问题，最终在 2015 年，提出了 ES6 的模块化方案</p>
<p>从此，模块化成为了 JS 本身特有的属性</p>
<p>于此同时，很多开发者、技术厂商早已预见到 JS 的无穷潜力，于是有了下面的故事</p>
<ul>
<li>既然 JS 也能编写大型应用，那么自然也需要像其他语言那样有解决复杂问题的开发框架
<ul>
<li>Angular、React、Vue 等前端开发框架出现</li>
<li>Express、Koa 等后端开发框架出现</li>
<li>各种后端数据库驱动出现</li>
</ul>
</li>
<li>要开发大型应用，自然少不了各种实用的第三方库的支持
<ul>
<li>npm 包管理器出现，实用第三方库变得极其方便</li>
<li>webpack 等构建工具出现，专门用于打包和部署</li>
</ul>
</li>
<li>既然 JS 可以放到服务器环境，为什么不能放到其他终端环境呢？
<ul>
<li>Electron 发布，可以使用 JS 语言开发桌面应用程序</li>
<li>RN 和 Vuex 等技术发布，可以使用 JS 语言编写移动端应用程序</li>
<li>各种小程序出现，可以使用 JS 编写依附于其他应用的小程序</li>
<li>目前还有很多厂商致力于将 JS 应用到各种其他的终端设备，最终形成大前端生态</li>
</ul>
</li>
</ul>
<blockquote>
<p>可以看到，模块化的出现，是 JS 通向大型应用的基石，学习好模块化，变具备了编写大型应用的基本功。</p>
</blockquote>
<h2 id="commonjs" tabindex="-1"><a class="header-anchor" href="#commonjs"><span>CommonJS</span></a></h2>
<p>在 nodejs 中，由于有且仅有一个入口文件（启动文件），而开发一个大型应用，必然需要很多个模块，因此，nodejs 对模块化的需求比浏览器要大很多。</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-2.png" />
</p>
<p>由于 nodejs 刚刚发布之时，前端没有统一的，官方的模块化，所以就采用了 commonJs 作为其模块化规范</p>
<p>首先为大家介绍一下两个重要概念：<strong>模块导入和模块导出</strong></p>
<h3 id="模块导出" tabindex="-1"><a class="header-anchor" href="#模块导出"><span>模块导出</span></a></h3>
<p>首先介绍下什么是模块？</p>
<p>模块就是一个 JS 问文件，它包含了一部分功能，并隐藏了自身的实现</p>
<p>所以模块有两个核心：<strong>隐藏和暴露</strong></p>
<p>隐藏：隐藏内部实现逻辑</p>
<p>暴露：抛出对应方法，供外部使用</p>
<p>暴露即导出</p>
<p style="text-align: center">
  <img src="/images/engineering/engineering-3.png" />
</p>
<h3 id="模块导入" tabindex="-1"><a class="header-anchor" href="#模块导入"><span>模块导入</span></a></h3>
<p>当需要使用一个模块时，使用的是该模块暴露的部分（导出的部分），隐藏的部分是永远无法使用的。</p>
<p><strong>当通过某种语法或 api 去使用一个模块时，这个过程叫做模块的导入</strong></p>
<h3 id="commomjs-规范" tabindex="-1"><a class="header-anchor" href="#commomjs-规范"><span>CommomJS 规范</span></a></h3>
<p>CommomJs 使用<code v-pre>require()导入</code>和<code v-pre>exports导出</code>来定义模块</p>
<p>具体规范如下：</p>
<ol>
<li>如果一个 JS 文件中存在<code v-pre>exports</code>或<code v-pre>require</code>，该 JS 文件是一个模块</li>
<li>模块内的所有代码均为隐藏代码，包括全局变量、全局函数，这些全局的内容均不应该对全局变量造成任何污染</li>
<li>如果一个模块需要暴露一些 API 提供给外部使用，需要通过<code v-pre>exports</code>导出，<code v-pre>exports</code>是一个空的对象，你可以为该对象添加任何需要导出的内容</li>
<li>如果一个模块需要导入其他模块，通过<code v-pre>require</code>实现，<code v-pre>require</code>是一个函数，传入模块的路径即可返回该模块导出的整个内容</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// utils.js</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

exports<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>

<span class="token comment">// 当你重新改变 module.exports 的指向时，也就意味着 exports !== module.exports，所以在exports.添加的属性，不会在导出的内容里</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token punctuation">,</span>
  b<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// index.js</span>
<span class="token keyword">var</span> utils <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./utils'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {a: 1, b: 2}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 可以写在条件里，同步执行，存在缓存，也存在阻塞问题</span>
  <span class="token keyword">var</span> utils1 <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./utils'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {a: 1, b: 2}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nodejs-对-commonjs-的实现" tabindex="-1"><a class="header-anchor" href="#nodejs-对-commonjs-的实现"><span>nodejs 对 CommonJS 的实现</span></a></h3>
<p>为了实现 CommonJS 规范，nodejs 对模块做出了以下处理</p>
<ol>
<li>
<p>为了保证高效的执行，仅加载必要的模块。nodejs 只有执行到<code v-pre>require</code>函数时才会加载并执行模块</p>
</li>
<li>
<p>为了隐藏模块中的代码，nodejs 执行模块时，会将模块中的所有代码放置到一个函数中执行，以保证不污染全局变量。</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//模块中的代码</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>为了保证顺利的导出模块内容，nodejs 做了以下处理</p>
<ol>
<li>在模块开始执行前，初始化一个值<code v-pre>module.exports = {}</code></li>
<li><code v-pre>module.exports</code>即模块的导出值</li>
<li>为了方便开发者便捷的导出，nodejs 在初始化完<code v-pre>module.exports</code>后，又声明了一个变量<code v-pre>exports = module.exports</code></li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> exports <span class="token operator">=</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
  <span class="token comment">//模块中的代码</span>
  <span class="token keyword">return</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>为了避免反复加载同一个模块，nodejs 默认开启了模块缓存，如果加载的模块已经被加载过了，则会自动使用之前的导出结果</p>
</li>
</ol>
<h3 id="实现伪代码" tabindex="-1"><a class="header-anchor" href="#实现伪代码"><span>实现伪代码</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> cacheModule <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">myRequire</span><span class="token punctuation">(</span><span class="token parameter">filePath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> realPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> fileContent <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>realPath<span class="token punctuation">,</span> <span class="token string">'utf-8'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 实现模块缓存</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cacheModule<span class="token punctuation">[</span>realPath<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> cacheModule<span class="token punctuation">[</span>realPath<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> module <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">exports</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> exports <span class="token operator">=</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fileContent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">eval</span><span class="token punctuation">(</span>fileContent<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    cacheModule<span class="token punctuation">[</span>realPath<span class="token punctuation">]</span> <span class="token operator">=</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>

    <span class="token keyword">return</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>module<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="commonjs-为啥不能在浏览器中使用" tabindex="-1"><a class="header-anchor" href="#commonjs-为啥不能在浏览器中使用"><span>CommonJs 为啥不能在浏览器中使用</span></a></h2>
<p>首先介绍下，为什么 commonjs 规范不适用浏览器环境？</p>
<p>因为使用 <code v-pre>require</code> 导入模块是时，node 会做一下两件事情</p>
<ol>
<li>通过模块路径找到本机文件，并读取文件内容</li>
<li>将文件中的代码放入到一个函数环境中执行，并将执行后 module.exports 的值作为 require 函数的返回结果</li>
</ol>
<p>可以认为，nodejs 执行模块时，是同步执行的。</p>
<p><strong>当浏览器遇到 CommonJs</strong></p>
<p>当想把 commomjs 模块放到到浏览器端时，就遇到了一些问题</p>
<ol>
<li>浏览器需要加载的 JS 文件，都是远程从服务器读取的，而且网络运输的效率是远远低于本地读取的，所以就会导致，在浏览器端执行模块时，会出现很长时间的阻塞</li>
<li>而且此规范也需要浏览器厂商的支持，但是厂商不认，因为这不是官方的规范</li>
</ol>
<p>以上的两个问题，导致 commonjs 规范不适合浏览器环境</p>
<p>但是，也并不是说浏览器中不能实现模块化，只需解决上面的问题即可，比如：</p>
<ol>
<li>远程同步加载 JS 费时，那我们就改成回调的方式</li>
<li>需要放到函数环境执行，那就在编写模块的时候直接包一个函数</li>
</ol>
<p>基于这种简单有效的思路，就出现了 AMD 和 CMD 规范</p>
<h2 id="amd-cmd" tabindex="-1"><a class="header-anchor" href="#amd-cmd"><span>AMD &amp; CMD</span></a></h2>
<h3 id="amd" tabindex="-1"><a class="header-anchor" href="#amd"><span>AMD</span></a></h3>
<p>全称是 Asynchronous Module Definition，即异步模块加载机制</p>
<p>require.js 实现了 AMD 规范</p>
<p>在 AMD 中，导入和导出模块的代码，都必须放置在 define 函数中</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span>依赖的模块列表<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">模块名称列表</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//模块内部的代码</span>
  <span class="token keyword">return</span> 导出的内容<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd"><span>CMD</span></a></h3>
<p>全称是 Common Module Definition，公共模块定义规范</p>
<p>sea.js 实现了 CMD 规范</p>
<p>在 CMD 中，导入和导出模块的代码，都必须放置在 define 函数中</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//模块内部的代码</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="es6-模块化" tabindex="-1"><a class="header-anchor" href="#es6-模块化"><span>ES6 模块化</span></a></h2>
<h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点"><span>特点</span></a></h3>
<p>ES6 模块化具有以下的特点</p>
<ol>
<li>使用依赖<strong>预声明</strong>的方式导入模块
<ol>
<li>依赖延迟声明
<ol>
<li>优点：某些时候可以提高效率</li>
<li>缺点：无法在一开始确定模块依赖关系（比较模糊）</li>
</ol>
</li>
<li>依赖预声明
<ol>
<li>优点：在一开始可以确定模块依赖关系</li>
<li>缺点：某些时候效率较低</li>
</ol>
</li>
</ol>
</li>
<li>灵活的多种导入导出方式</li>
<li>规范的路径表示法：所有路径必须以./或../开头</li>
</ol>
<h3 id="基本导入导出" tabindex="-1"><a class="header-anchor" href="#基本导入导出"><span>基本导入导出</span></a></h3>
<p>一. <strong>模块的引入</strong></p>
<p>目前，浏览器使用以下方式引入一个 ES6 模块文件</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>
<span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">"入口文件"</span> type<span class="token operator">=</span><span class="token string">"module"</span><span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>二. <strong>模块的基本导出和导入</strong></p>
<p>ES6 中的模块导入导出分为两种：</p>
<ol>
<li>基本导入导出</li>
<li>默认导入导出</li>
</ol>
<p>基本导出</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
  类似于 ``` exports.xxx = xxxx ```

  基本导出可以有多个，每个必须有名称

  基本导出的语法如下：
 */</span>

<span class="token keyword">export</span> 声明表达式

<span class="token doc-comment comment">/** 或 */</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span>具名符号<span class="token punctuation">}</span>

<span class="token doc-comment comment">/** 由于基本导出必须具有名称，所以要求导出内容必须跟上**声明表达式**或**具名符号** */</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本导入</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
  由于使用的是**依赖预加载**，因此，导入任何其他模块，导入代码必须放置到所有代码之前

  对于基本导出，如果要进行导入，使用下面的代码
 */</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> 导入的符号列表 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'模块路径'</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
  注意以下细节：

  - 导入时，可以通过关键字```as```对导入的符号进行重命名
  - 导入时使用的符号是常量，不可修改
  - 可以使用*号导入所有的基本导出，形成一个对象
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="默认导入导出" tabindex="-1"><a class="header-anchor" href="#默认导入导出"><span>默认导入导出</span></a></h3>
<p>一. <strong>默认导出</strong></p>
<p>每个模块，除了允许有多个基本导出之外，还允许有一个默认导出</p>
<p>默认导出类似于 CommonJS 中的<code v-pre>module.exports</code>，由于只有一个，因此无需具名</p>
<p>具体的语法是</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> 默认导出的数据<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> 默认导出的数据 <span class="token keyword">as</span> <span class="token keyword">default</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于每个模块仅允许有一个默认导出，因此，每个模块不能出现多个默认导出语句</p>
<p>二. <strong>默认导入</strong></p>
<p>需要想要导入一个模块的默认导出，需要使用下面的语法</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> 接收变量名 <span class="token keyword">from</span> <span class="token string">'模块路径'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类似于 CommonJS 中的</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> 接收变量名 <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'模块路径'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于默认导入时变量名是自行定义的，因此没有别名一说</p>
<p>如果希望同时导入某个模块的默认导出和基本导出，可以使用下面的语法</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> 接收默认导出的变量<span class="token punctuation">,</span> <span class="token punctuation">{</span> 接收基本导出的变量 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'模块路径'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注：如果使用*号，会将所有基本导出和默认导出聚合到一个对象中，默认导出会作为属性 default 存在</p>
<h3 id="其他细节" tabindex="-1"><a class="header-anchor" href="#其他细节"><span>其他细节</span></a></h3>
<ol>
<li>尽量导出不可变值</li>
</ol>
<p>当导出一个内容时，尽量保证该内容是不可变的（大部分情况都是如此）</p>
<p>因为，虽然导入后，无法更改导入内容，但是在导入的模块内部却有可能发生更改，这将导致一些无法预料的事情发生</p>
<ol start="2">
<li><strong>可以使用无绑定的导入用于执行一些初始化代码</strong></li>
</ol>
<p>如果我们只是想执行模块中的一些代码，而不需要导入它的任何内容，可以使用无绑定的导入：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'模块路径'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li><strong>可以使用绑定再导出，来重新导出来自另一个模块的内容</strong></li>
</ol>
<p>有的时候，我们可能需要用一个模块封装多个模块，然后有选择的将多个模块的内容分别导出，可以使用下面的语法轻松完成</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> 绑定的标识符 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'模块路径'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


