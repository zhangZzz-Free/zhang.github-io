<template><div><h1 id="接口防止重复调用方案" tabindex="-1"><a class="header-anchor" href="#接口防止重复调用方案"><span>接口防止重复调用方案</span></a></h1>
<h2 id="重复调用同个接口导致的问题" tabindex="-1"><a class="header-anchor" href="#重复调用同个接口导致的问题"><span>重复调用同个接口导致的问题</span></a></h2>
<ul>
<li>表单提交，输入框失焦、按钮点击、值变更提交等容易遇到重复请求的问题，即一次请求还没有执行完毕，用户又点击了一次，这样重复请求可能会造成后台数据异常。又比如在查询数据的时候点击了一次查询，还在处理数据的时候，用户又点击了一次查询。第一次查询执行完毕页面已经有数据展示出来了，用户可能正在看呢，此时第二次查询也处理完返回到前台把页面刷新了，就会造成很不好的体验</li>
</ul>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2>
<ol>
<li><code v-pre>利用防抖避免重复调用接口</code></li>
<li><code v-pre>采用禁用按钮的方式，loading、置灰等</code></li>
<li><code v-pre>利用axios的cancelToken、AbortController方法取消重复请求</code></li>
<li><code v-pre>利用promise的三个状态改造方法3</code></li>
</ol>
<h3 id="方法-1-利用防抖" tabindex="-1"><a class="header-anchor" href="#方法-1-利用防抖"><span>方法 1： 利用防抖</span></a></h3>
<blockquote>
<p>效果:当用户连续点击多次同一个按钮,最后一次点击之后,过小段时间后才发起一次请求
原理:每次调用方法后都产生一个定时器,定时器结束以后再发请求,如果重复调用方法,就取消当前的定时器,创建新的定时器,等结束后再发请求,可以用第三方封装的工具函数例如 lodash 的 debounce 方法来简化防抖的代码</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">"app"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">"onClick"</span><span class="token operator">></span>请求<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 调用lodash的防抖方法debounce,实现连续点击按钮多次,0.3秒后调用1次接口</span>
    <span class="token literal-property property">onClick</span><span class="token operator">:</span> _<span class="token punctuation">.</span><span class="token function">debounce</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">sendPost</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">username</span><span class="token operator">:</span><span class="token string">'zs'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'请求的结果'</span><span class="token punctuation">,</span> res<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">// 自定义指令防抖，在directive文件中自定义v-debounce指令</span>
<span class="token operator">&lt;</span>el<span class="token operator">-</span>button v<span class="token operator">-</span>debounce<span class="token operator">:</span><span class="token number">500</span><span class="token operator">=</span><span class="token string">"buttonDebounce"</span><span class="token operator">></span>按钮<span class="token operator">&lt;</span><span class="token operator">/</span>el<span class="token operator">-</span>button<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点"><span>优缺点</span></a></h4>
<blockquote>
<ol>
<li>防抖可以有效减少请求的频率，防止接口重复调用，但是如果接口响应比较慢，</li>
<li>响应时间超过防抖的时间阈值，再次点击也会出现重复请求 需要在触发事件加上防抖处理，不够通用</li>
</ol>
</blockquote>
<h3 id="方法-2-采用禁用按钮的方式" tabindex="-1"><a class="header-anchor" href="#方法-2-采用禁用按钮的方式"><span>方法 2：采用禁用按钮的方式</span></a></h3>
<blockquote>
<p>禁用按钮：在发送请求之前，禁用按钮（利用 loading 或者 disabled 属性），直到请求完成后再启用它。这可以防止用户在请求进行中多次点击按钮</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">"app"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">"sendRequest"</span> <span class="token operator">:</span>loading<span class="token operator">=</span><span class="token string">"loading"</span><span class="token operator">></span>请求<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
 <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

 <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token keyword">async</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>loading <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 禁用按钮</span>
         <span class="token keyword">try</span> <span class="token punctuation">{</span>        <span class="token comment">// 发送请求</span>
             <span class="token keyword">await</span> <span class="token function">yourApiRequestFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 请求成功后，启用按钮</span>
         <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>        <span class="token comment">// 处理错误情况      }</span>
         <span class="token keyword">finally</span> <span class="token punctuation">{</span>
             <span class="token keyword">this</span><span class="token punctuation">.</span>loading <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 请求完成后，启用按钮</span>
         <span class="token punctuation">}</span>
     <span class="token punctuation">}</span><span class="token punctuation">,</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="优缺点-1" tabindex="-1"><a class="header-anchor" href="#优缺点-1"><span>优缺点</span></a></h4>
<blockquote>
<ol>
<li>最有效避免请求还在 pending 状态时，再次触发事件发起请求</li>
<li>不够通用，需要在按钮、tab、输入框等触发事件的地方都加上</li>
</ol>
</blockquote>
<h3 id="方法-3-利用-axios-取消接口的-api" tabindex="-1"><a class="header-anchor" href="#方法-3-利用-axios-取消接口的-api"><span>方法 3：利用 axios 取消接口的 api</span></a></h3>
<blockquote>
<p>axios 内部提供的 CancelToken 来取消请求（AxiosV0.22.0 版本中把 CancelToken 打上 👎deprecated 的标记，意味废弃。与此同时，推荐 AbortController 来取而代之）
通过 axios 请求拦截器,在每次请求前把请求信息和请求的取消方法放到一个 map 对象当中,并且判断 map 对象当中是否已经存在该请求信息的请求,如果存在取消上次请求</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> pendingRequest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">generateReqKey</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> params<span class="token punctuation">,</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> config<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> Qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">,</span> Qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'&amp;'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">addPendingRequest</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> requestKey <span class="token operator">=</span> <span class="token function">generateReqKey</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
  config<span class="token punctuation">.</span>cancelToken <span class="token operator">=</span>
    config<span class="token punctuation">.</span>cancelToken <span class="token operator">||</span>
    <span class="token keyword">new</span> <span class="token class-name">axios<span class="token punctuation">.</span>CancelToken</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">cancel</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pendingRequest<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>requestKey<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pendingRequest<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>requestKey<span class="token punctuation">,</span> cancel<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">removePendingRequest</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> requestKey <span class="token operator">=</span> <span class="token function">generateReqKey</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>pendingRequest<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>requestKey<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> cancelToken <span class="token operator">=</span> pendingRequest<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>requestKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">cancelToken</span><span class="token punctuation">(</span>requestKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
    pendingRequest<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>requestKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// axios拦截器代码</span>
axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">removePendingRequest</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 检查是否存在重复请求，若存在则取消已发的请求</span>
    <span class="token function">addPendingRequest</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 把当前请求信息添加到pendingRequest对象中</span>
    <span class="token keyword">return</span> config<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">removePendingRequest</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 从pendingRequest对象中移除请求</span>
    <span class="token keyword">return</span> response<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">removePendingRequest</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>config <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 从pendingRequest对象中移除请求</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>axios<span class="token punctuation">.</span><span class="token function">isCancel</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'已取消的重复请求：'</span> <span class="token operator">+</span> error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 添加异常处理</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p style="text-align: center">
  <img src="/images/request/request-1.jpg" alt="repeatRequest">
</p>
<h4 id="优缺点-2" tabindex="-1"><a class="header-anchor" href="#优缺点-2"><span>优缺点</span></a></h4>
<blockquote>
<ol>
<li>可以防止前端重复响应相同数据导致体验不好的问题</li>
<li>但是这个取消请求只是前端取消了响应，取消时请求已经发出去了，后端还是会一一收到所有的请求，该查库的查库，该创建的创建，针对这种情形，服务端的对应接口需要进行幂等控制</li>
</ol>
</blockquote>
<h3 id="方法-4-利用-promise-的-pending、resolve、reject-状态" tabindex="-1"><a class="header-anchor" href="#方法-4-利用-promise-的-pending、resolve、reject-状态"><span>方法 4：利用 promise 的 pending、resolve、reject 状态</span></a></h3>
<blockquote>
<p>此方法其实是对 cancelToken 方案的改造，cancelToken 是在请求还在 pending 状态时，判断接口是否重复，重复则取消请求，但是无法保证服务端是否接收到了请求，我们只要改造这点，在发送请求前判断是否有重复调用，如果用重复调用接口，利用 promise 的 reject 拦截请求，在请求 resolve 或 reject 状态后清除用来判断是否是重复请求的 key</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// axios全局拦截文件</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> '@<span class="token operator">/</span>router<span class="token operator">/</span>interceptors
<span class="token keyword">import</span> Qs <span class="token keyword">from</span> <span class="token string">'qs'</span>

<span class="token keyword">const</span> cancelMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 生成key用来判断是否是同个请求</span>
<span class="token keyword">function</span> <span class="token function">generateReqKey</span><span class="token punctuation">(</span><span class="token parameter">config <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> method <span class="token operator">=</span> <span class="token string">'get'</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> params<span class="token punctuation">,</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> config
    <span class="token keyword">const</span> _params <span class="token operator">=</span> <span class="token keyword">typeof</span> params <span class="token operator">===</span> <span class="token string">'string'</span> <span class="token operator">?</span> Qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> Qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span>
    <span class="token keyword">const</span> _data <span class="token operator">=</span> <span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">'string'</span> <span class="token operator">?</span> Qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> Qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token punctuation">[</span>method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> _params<span class="token punctuation">,</span> _data<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'&amp;'</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> str
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">checkoutRequest</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> requestKey <span class="token operator">=</span> <span class="token function">generateReqKey</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
    <span class="token comment">// 如果设置允许多次重复请求，直接返回成功，让网络请求继续流通下去</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cancelMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>requestKey<span class="token punctuation">)</span> <span class="token operator">||</span> config<span class="token punctuation">.</span>_allowRepeatRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cancelMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>requestKey<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">axios</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果存在重复请求</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 移除已响应的请求，移除的时间可设置响应后延迟移除，此时间内可以继续阻止重复请求</span>
<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">removeRequest</span><span class="token punctuation">(</span><span class="token parameter">config <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> time <span class="token operator">=</span> config<span class="token punctuation">.</span>_debounceTime <span class="token operator">||</span> <span class="token number">0</span>
    <span class="token keyword">const</span> requestKey <span class="token operator">=</span> <span class="token function">generateReqKey</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cancelMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>requestKey<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 延迟清空，防止快速响应时多次重复调用</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            cancelMap<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>requestKey<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> time<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> checkoutRequest


<span class="token comment">// @/router/interceptors 拦截器代码</span>
axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> config<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">removeRequest</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>config<span class="token punctuation">)</span> <span class="token comment">// 从cancelMap中移除key</span>
        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">removeRequest</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>config<span class="token punctuation">)</span> <span class="token comment">// 从cancelMap中移除key</span>
        <span class="token keyword">return</span> response<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">removeRequest</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>config <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 从cancelMap中移除key</span>
        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 接口可以配置_allowRepeatRequest开启允许重复请求</span>
<span class="token keyword">return</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'xxxxxxx'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> data<span class="token punctuation">,</span>
    <span class="token literal-property property">loading</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_allowRepeatRequest</span><span class="token operator">:</span> <span class="token boolean">true</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="优缺点-3" tabindex="-1"><a class="header-anchor" href="#优缺点-3"><span>优缺点：</span></a></h4>
<blockquote>
<p>此方法效果跟禁用按钮的效果一致，但是可以全局修改，方案比较通用</p>
</blockquote>
<h3 id="ps" tabindex="-1"><a class="header-anchor" href="#ps"><span>ps</span></a></h3>
<blockquote>
<p>针对可能上传文件使用 formData 的情况，需要在重复请求那再判断一下</p>
</blockquote>
</div></template>


