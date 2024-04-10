<template><div><h1 id="箭头步骤条效果" tabindex="-1"><a class="header-anchor" href="#箭头步骤条效果"><span>箭头步骤条效果</span></a></h1>
<p>在我们项目中，有一个需求，想实现一个步骤条，默认的时候是 边框和文字 需要有特定的颜色，但是选中时，背景需要有特定颜色，边框颜色消失，文字显示白色，具体效果如下图：</p>
<p style="text-align: center">
  <img src="/images/vue/vue-arrow.jpg" >
</p>
<p>可以看到，步骤一是默认样式，步骤二是选中样式，即选中背景颜色需要变成默认样式的边框颜色</p>
<h2 id="使用-div-思路-无法实现默认效果" tabindex="-1"><a class="header-anchor" href="#使用-div-思路-无法实现默认效果"><span>使用 div 思路（无法实现默认效果）</span></a></h2>
<p>当时第一次想的是使用 div 来实现这个逻辑，接下来是其实现逻辑</p>
<h3 id="搭建-dom-结构" tabindex="-1"><a class="header-anchor" href="#搭建-dom-结构"><span>搭建 dom 结构</span></a></h3>
<p>首先我们先创建一个矩形</p>
<p>然后使用一个伪元素，盖在矩形的开头，并修改其 border-color 的颜色即可，具体代码如下</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
      <span class="token selector">*</span> <span class="token punctuation">{</span>
        <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">body</span> <span class="token punctuation">{</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100vw<span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
        <span class="token property">place-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.arrow</span> <span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
        <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">min-width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">max-width</span><span class="token punctuation">:</span> max-content<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span> salmon<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token selector">.arrow::after</span> <span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
        <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
        <span class="token property">left</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
        <span class="token property">border</span><span class="token punctuation">:</span> 15px solid transparent<span class="token punctuation">;</span>
        <span class="token property">border-left-color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token selector">.arrow::before</span> <span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
        <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
        <span class="token property">right</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
        <span class="token property">border</span><span class="token punctuation">:</span> 15px solid transparent<span class="token punctuation">;</span>
        <span class="token property">border-top-color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
        <span class="token property">border-right-color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
        <span class="token property">border-bottom-color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token selector">.content</span> <span class="token punctuation">{</span>
        <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">padding</span><span class="token punctuation">:</span> 0px 20px<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 140px<span class="token punctuation">;</span>
        <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
        <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
        <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token selector">.content-inner</span> <span class="token punctuation">{</span>
        <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>-5px<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>arrow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content-inner<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就实现了一个箭头啦。</p>
<p style="text-align: center">
  <img src="/images/vue/vue-arrow-1.jpg" >
</p>
<blockquote>
<p>但是使用 div 实现箭头，并不太好实现我们开头想要的那种效果，如果非要实现也要费很大劲，得不偿失，所以接下来，介绍第二种方案</p>
</blockquote>
<h2 id="使用-svg-标签-可缩放矢量图形" tabindex="-1"><a class="header-anchor" href="#使用-svg-标签-可缩放矢量图形"><span>使用 SVG 标签(可缩放矢量图形)</span></a></h2>
<h3 id="实现思路即标签介绍" tabindex="-1"><a class="header-anchor" href="#实现思路即标签介绍"><span>实现思路即标签介绍</span></a></h3>
<h4 id="polyline" tabindex="-1"><a class="header-anchor" href="#polyline"><span>polyline</span></a></h4>
<p><span style="color: orange; font-weight: bold">polyline</span> 元素是 SVG 的一个基本形状，用来创建一系列直线连接多个点。</p>
<p>使用到的属性：</p>
<ul>
<li>stroke-width： 用于设置绘制的线段宽度</li>
<li>fill: 填充色</li>
<li>stroke: 线段颜色，</li>
<li>points：绘制一个元素点的数列 （0,0 22,22）</li>
</ul>
<p>接下来我们尝试使用该元素绘制一个箭头，先看看需要多少点位（如下图需 6 个，但是元素需要闭合，所以需要 7 个）</p>
<p style="text-align: center">
  <img src="/images/vue/vue-arrow-2.png" >
</p>
<p>所以我们就可以很轻松的绘制出一个箭头，具体代码如下</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
  <span class="token attr-name">:viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 130 26<span class="token punctuation">"</span></span>
  <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>130px<span class="token punctuation">"</span></span>
  <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>26<span class="token punctuation">"</span></span>
  <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.1<span class="token punctuation">"</span></span>
  <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>polyline</span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>polyline<span class="token punctuation">"</span></span>
    <span class="token attr-name">points</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0,0 115,0 130,13 115,26 0,26 15,13 0,0<span class="token punctuation">"</span></span>
    <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>green<span class="token punctuation">"</span></span>
    <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span>
  <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>polyline</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p style="text-align: center">
  <img src="/images/vue/vue-arrow-3.png" >
</p>
<p>此时我们得到了类似选中后的颜色，那默认颜色呢，只需要修改其 fill, stroke 属性即可，具体逻辑如下</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
  <span class="token attr-name">:viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 130 26<span class="token punctuation">"</span></span>
  <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>130px<span class="token punctuation">"</span></span>
  <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>26<span class="token punctuation">"</span></span>
  <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.1<span class="token punctuation">"</span></span>
  <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>polyline</span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>polyline<span class="token punctuation">"</span></span>
    <span class="token attr-name">points</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0,0 115,0 130,13 115,26 0,26 15,13 0,0<span class="token punctuation">"</span></span>
    <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transparent<span class="token punctuation">"</span></span>
    <span class="token attr-name">stroke</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span>
    <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span>
  <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>polyline</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p style="text-align: center">
  <img src="/images/vue/vue-arrow-4.png" >
</p>
<p>此时那文中的内容怎么办，没法直接放标签内，此时需要借助另一个标签。</p>
<h4 id="foreignobject" tabindex="-1"><a class="header-anchor" href="#foreignobject"><span>foreignObject</span></a></h4>
<blockquote>
<p>SVG 中的 /<foreignObject/> 元素允许包含来自不同的 XML 命名空间的元素。在浏览器的上下文中，很可能是 XHTML / HTML。</p>
</blockquote>
<p>所以我们可以使用该标签来作为放置内容的容器</p>
<p>属性介绍:</p>
<ul>
<li>x：设置 foreignObject 的 x 坐标</li>
<li>y：设置 foreignObject 的 y 坐标</li>
<li>width：设置 foreignObject 的宽度</li>
<li>height：设置 foreignObject 的高度</li>
</ul>
<p>具体代码如下</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
  <span class="token attr-name">:viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 130 26<span class="token punctuation">"</span></span>
  <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>130px<span class="token punctuation">"</span></span>
  <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>26<span class="token punctuation">"</span></span>
  <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.1<span class="token punctuation">"</span></span>
  <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>polyline</span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>polyline<span class="token punctuation">"</span></span>
    <span class="token attr-name">points</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0,0 115,0 130,13 115,26 0,26 15,13 0,0<span class="token punctuation">"</span></span>
    <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transparent<span class="token punctuation">"</span></span>
    <span class="token attr-name">stroke</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span>
    <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span>
  <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>polyline</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>foreignObject</span> <span class="token attr-name">x</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">y</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>130<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>26<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span>
      <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">line-height</span><span class="token punctuation">:</span> 26px<span class="token punctuation">;</span> <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>14px<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span>
    <span class="token punctuation">></span></span>
      步骤1111111
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>foreignObject</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p style="text-align: center">
  <img src="/images/vue/vue-arrow-5.png" >
</p>
<p>这样就实现了默认样式，文字颜色可以自己调整</p>
<h2 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码"><span>完整代码</span></a></h2>
<p>由于需要遍历数据，所以完整代码是 vue3 风格</p>
<p>25c2459</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>next-step-item<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stepClick<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
      <span class="token attr-name">:viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>`0 0 ${arrowStaticData.width} ${arrowStaticData.height}`<span class="token punctuation">"</span></span>
      <span class="token attr-name">:width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>arrowStaticData.width<span class="token punctuation">"</span></span>
      <span class="token attr-name">:height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>arrowStaticData.height<span class="token punctuation">"</span></span>
      <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{
        transform:
          index === 0
            ? 'translate(0px,0px)'
            : `translate(${arrowStaticData.offsetLeft * index}px,0)`,
      }<span class="token punctuation">"</span></span>
      <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1.1<span class="token punctuation">"</span></span>
      <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span>
    <span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>polyline</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>polyline<span class="token punctuation">"</span></span>
        <span class="token attr-name">:points</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>points<span class="token punctuation">"</span></span>
        <span class="token attr-name">v-bind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span>
        <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span>
      <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>polyline</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>foreignObject</span>
        <span class="token attr-name">x</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span>
        <span class="token attr-name">y</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span>
        <span class="token attr-name">:width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>arrowStaticData.width<span class="token punctuation">"</span></span>
        <span class="token attr-name">:height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>arrowStaticData.height<span class="token punctuation">"</span></span>
      <span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>svg-title<span class="token punctuation">"</span></span>
          <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{
            color: fontColor,
            lineHeight: arrowStaticData.height + 'px',
          }<span class="token punctuation">"</span></span>
          <span class="token attr-name">:title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
          {{ title }}
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>foreignObject</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> defaultFontColor <span class="token operator">=</span> <span class="token string">'#fff'</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> defaultColor <span class="token operator">=</span> <span class="token string">'transparent'</span><span class="token punctuation">;</span>

  <span class="token comment">// 主题颜色</span>
  <span class="token keyword">const</span> colorObj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">finish</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">stroke</span><span class="token operator">:</span> <span class="token string">'#16BB60'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">fill</span><span class="token operator">:</span> defaultColor<span class="token punctuation">,</span>
        <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#16BB60'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">active</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">stroke</span><span class="token operator">:</span> <span class="token string">'#16BB60'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">fill</span><span class="token operator">:</span> <span class="token string">'#16BB60'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">color</span><span class="token operator">:</span> defaultFontColor<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 绿色</span>
    <span class="token keyword">await</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">stroke</span><span class="token operator">:</span> <span class="token string">'#edf1f3'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">fill</span><span class="token operator">:</span> defaultColor<span class="token punctuation">,</span>
        <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#333'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">active</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">stroke</span><span class="token operator">:</span> <span class="token string">'#edf1f3'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">fill</span><span class="token operator">:</span> <span class="token string">'#edf1f3'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#333'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 灰色</span>
    <span class="token literal-property property">process</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">stroke</span><span class="token operator">:</span> <span class="token string">'#0A82E5'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">fill</span><span class="token operator">:</span> defaultColor<span class="token punctuation">,</span>
        <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#0A82E5'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">active</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">stroke</span><span class="token operator">:</span> <span class="token string">'#0A82E5'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">fill</span><span class="token operator">:</span> <span class="token string">'#0A82E5'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">color</span><span class="token operator">:</span> defaultFontColor<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 蓝色</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> arrowStaticData <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">130</span><span class="token punctuation">,</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
    <span class="token literal-property property">hornWidth</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token comment">// 箭头的大小</span>
    <span class="token literal-property property">offsetLeft</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token comment">// step离左侧step的距离，-15则左间距为0</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> emits <span class="token operator">=</span> <span class="token function">defineEmits</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'stepClick'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 类型名称</span>
    <span class="token literal-property property">typeName</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 是否点中当前的svg</span>
    <span class="token literal-property property">current</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 当前是第几个step</span>
    <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> points <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> width<span class="token punctuation">,</span> hornWidth<span class="token punctuation">,</span> height <span class="token punctuation">}</span> <span class="token operator">=</span> arrowStaticData<span class="token punctuation">;</span>
    <span class="token keyword">return</span> props<span class="token punctuation">.</span>index <span class="token operator">===</span> <span class="token number">0</span>
      <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">0,0  </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>width <span class="token operator">-</span> hornWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,0 
        </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>width<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>height <span class="token operator">/</span> <span class="token number">2</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 
        </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>width <span class="token operator">-</span> hornWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>height<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 
        0,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>height<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 0,0</span><span class="token template-punctuation string">`</span></span>
      <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">0,0 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>width <span class="token operator">-</span> hornWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,0 
        </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>width<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>height <span class="token operator">/</span> <span class="token number">2</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 
        </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>width <span class="token operator">-</span> hornWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>height<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 
        0,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>height<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 
        </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>hornWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>height <span class="token operator">/</span> <span class="token number">2</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 0,0</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> color <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> color <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token literal-property property">currentStyleConfig</span><span class="token operator">:</span> any <span class="token operator">=</span> colorObj<span class="token punctuation">[</span>props<span class="token punctuation">.</span>typeName<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// 如果当前是被选中的，颜色需要区分</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>props<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      color <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">fill</span><span class="token operator">:</span> currentStyleConfig<span class="token punctuation">.</span>active<span class="token punctuation">.</span>fill<span class="token punctuation">,</span>
        <span class="token literal-property property">stroke</span><span class="token operator">:</span> currentStyleConfig<span class="token punctuation">.</span>active<span class="token punctuation">.</span>stroke<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      color <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">stroke</span><span class="token operator">:</span> currentStyleConfig<span class="token punctuation">.</span>default<span class="token punctuation">.</span>stroke<span class="token punctuation">,</span>
        <span class="token literal-property property">fill</span><span class="token operator">:</span> currentStyleConfig<span class="token punctuation">.</span>default<span class="token punctuation">.</span>fill<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> color<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> fontColor <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token literal-property property">currentStyleConfig</span><span class="token operator">:</span> any <span class="token operator">=</span> colorObj<span class="token punctuation">[</span>props<span class="token punctuation">.</span>typeName<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> fontColor <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>props<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      fontColor <span class="token operator">=</span> currentStyleConfig<span class="token punctuation">.</span>active<span class="token punctuation">.</span>color<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      fontColor <span class="token operator">=</span> currentStyleConfig<span class="token punctuation">.</span>default<span class="token punctuation">.</span>color<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> fontColor<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">stepClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">emits</span><span class="token punctuation">(</span><span class="token string">'stepClick'</span><span class="token punctuation">,</span> props<span class="token punctuation">.</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>scss<span class="token punctuation">"</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.next-step-item</span> <span class="token punctuation">{</span>
    <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>
    <span class="token selector">.polyline</span> <span class="token punctuation">{</span>
      <span class="token property">transition</span><span class="token punctuation">:</span> 0.3s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.svg-title</span> <span class="token punctuation">{</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 0 15px<span class="token punctuation">;</span>
      <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
      <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
      <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
      <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
      <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
      <span class="token property">transition</span><span class="token punctuation">:</span> 0.3s<span class="token punctuation">;</span>
      <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方式</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>arrow-container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>arrow</span>
        <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item of arrowList<span class="token punctuation">"</span></span>
        <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item.index<span class="token punctuation">"</span></span>
        <span class="token attr-name">v-bind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span>
        <span class="token attr-name">:current</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>arrowCurrent === item.index<span class="token punctuation">"</span></span>
        <span class="token attr-name">@stepClick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>changeStepCurrent<span class="token punctuation">"</span></span>
      <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> reactive<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> Arrow <span class="token keyword">from</span> <span class="token string">'components/Arrow/index.vue'</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> arrowCurrent <span class="token operator">=</span> ref<span class="token operator">&lt;</span>number<span class="token operator">></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> arrowList <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'步骤一一一一一一一一一'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">typeName</span><span class="token operator">:</span> <span class="token string">'process'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'步骤二一一一一一一一一一'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">typeName</span><span class="token operator">:</span> <span class="token string">'finish'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'步骤三'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">typeName</span><span class="token operator">:</span> <span class="token string">'await'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>scss<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.arrow-container</span> <span class="token punctuation">{</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完整效果</p>
<p style="text-align: center">
  <img src="/images/vue/vue-arrow.jpg" >
</p></div></template>


