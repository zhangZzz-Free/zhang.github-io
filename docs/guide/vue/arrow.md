---
title: '箭头步骤条效果'
---

# 箭头步骤条效果

在我们项目中，有一个需求，想实现一个步骤条，默认的时候是 边框和文字 需要有特定的颜色，但是选中时，背景需要有特定颜色，边框颜色消失，文字显示白色，具体效果如下图：

<p style="text-align: center">
  <img src="/images/vue/vue-arrow.jpg" >
</p>

可以看到，步骤一是默认样式，步骤二是选中样式，即选中背景颜色需要变成默认样式的边框颜色

## 使用 div 思路（无法实现默认效果）

当时第一次想的是使用 div 来实现这个逻辑，接下来是其实现逻辑

### 搭建 dom 结构

首先我们先创建一个矩形

然后使用一个伪元素，盖在矩形的开头，并修改其 border-color 的颜色即可，具体代码如下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        height: 100vh;
        width: 100vw;
        display: grid;
        place-content: center;
        overflow: hidden;
      }
      .arrow {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 100px;
        max-width: max-content;
        height: 30px;
        background: salmon;
      }

      .arrow::after {
        position: absolute;
        content: '';
        left: 0px;
        border: 15px solid transparent;
        border-left-color: white;
      }

      .arrow::before {
        position: absolute;
        content: '';
        right: 0px;
        border: 15px solid transparent;
        border-top-color: white;
        border-right-color: white;
        border-bottom-color: white;
      }

      .content {
        text-align: center;
        padding: 0px 20px;
        width: 140px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .content-inner {
        display: inline-block;
        width: 100%;
        transform: translateX(-5px);
      }
    </style>
  </head>
  <body>
    <div class="arrow">
      <div class="content">
        <span class="content-inner">1</span>
      </div>
    </div>
  </body>
</html>
```

这样就实现了一个箭头啦。

<p style="text-align: center">
  <img src="/images/vue/vue-arrow-1.jpg" >
</p>

> 但是使用 div 实现箭头，并不太好实现我们开头想要的那种效果，如果非要实现也要费很大劲，得不偿失，所以接下来，介绍第二种方案

## 使用 SVG 标签(可缩放矢量图形)

### 实现思路即标签介绍

#### polyline

<span style="color: orange; font-weight: bold">polyline</span> 元素是 SVG 的一个基本形状，用来创建一系列直线连接多个点。

使用到的属性：

- stroke-width： 用于设置绘制的线段宽度
- fill: 填充色
- stroke: 线段颜色，
- points：绘制一个元素点的数列 （0,0 22,22）

接下来我们尝试使用该元素绘制一个箭头，先看看需要多少点位（如下图需 6 个，但是元素需要闭合，所以需要 7 个）

<p style="text-align: center">
  <img src="/images/vue/vue-arrow-2.png" >
</p>

所以我们就可以很轻松的绘制出一个箭头，具体代码如下

```html
<svg
  :viewBox="0 0 130 26"
  width="130px"
  height="26"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <polyline
    class="polyline"
    points="0,0 115,0 130,13 115,26 0,26 15,13 0,0"
    fill="green"
    stroke-width="1"
  ></polyline>
</svg>
```

<p style="text-align: center">
  <img src="/images/vue/vue-arrow-3.png" >
</p>

此时我们得到了类似选中后的颜色，那默认颜色呢，只需要修改其 fill, stroke 属性即可，具体逻辑如下

```html
<svg
  :viewBox="0 0 130 26"
  width="130px"
  height="26"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <polyline
    class="polyline"
    points="0,0 115,0 130,13 115,26 0,26 15,13 0,0"
    fill="transparent"
    stroke="red"
    stroke-width="1"
  ></polyline>
</svg>
```

<p style="text-align: center">
  <img src="/images/vue/vue-arrow-4.png" >
</p>

此时那文中的内容怎么办，没法直接放标签内，此时需要借助另一个标签。

#### foreignObject

> SVG 中的 /<foreignObject/> 元素允许包含来自不同的 XML 命名空间的元素。在浏览器的上下文中，很可能是 XHTML / HTML。

所以我们可以使用该标签来作为放置内容的容器

属性介绍:

- x：设置 foreignObject 的 x 坐标
- y：设置 foreignObject 的 y 坐标
- width：设置 foreignObject 的宽度
- height：设置 foreignObject 的高度

具体代码如下

```html
<svg
  :viewBox="0 0 130 26"
  width="130px"
  height="26"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <polyline
    class="polyline"
    points="0,0 115,0 130,13 115,26 0,26 15,13 0,0"
    fill="transparent"
    stroke="red"
    stroke-width="1"
  ></polyline>
  <foreignObject x="0" y="0" width="130" height="26">
    <span
      style="line-height: 26px; transform: translateX(14px); display: inline-block;"
    >
      步骤1111111
    </span>
  </foreignObject>
</svg>
```

<p style="text-align: center">
  <img src="/images/vue/vue-arrow-5.png" >
</p>

这样就实现了默认样式，文字颜色可以自己调整

## 完整代码

由于需要遍历数据，所以完整代码是 vue3 风格

25c2459

```html
<template>
  <div class="next-step-item" @click="stepClick">
    <svg
      :viewBox="`0 0 ${arrowStaticData.width} ${arrowStaticData.height}`"
      :width="arrowStaticData.width"
      :height="arrowStaticData.height"
      :style="{
        transform:
          index === 0
            ? 'translate(0px,0px)'
            : `translate(${arrowStaticData.offsetLeft * index}px,0)`,
      }"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        class="polyline"
        :points="points"
        v-bind="color"
        stroke-width="1"
      ></polyline>
      <foreignObject
        x="0"
        y="0"
        :width="arrowStaticData.width"
        :height="arrowStaticData.height"
      >
        <span
          class="svg-title"
          :style="{
            color: fontColor,
            lineHeight: arrowStaticData.height + 'px',
          }"
          :title="title"
        >
          {{ title }}
        </span>
      </foreignObject>
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const defaultFontColor = '#fff';
  const defaultColor = 'transparent';

  // 主题颜色
  const colorObj = Object.freeze({
    finish: {
      default: {
        stroke: '#16BB60',
        fill: defaultColor,
        color: '#16BB60',
      },
      active: {
        stroke: '#16BB60',
        fill: '#16BB60',
        color: defaultFontColor,
      },
    }, // 绿色
    await: {
      default: {
        stroke: '#edf1f3',
        fill: defaultColor,
        color: '#333',
      },
      active: {
        stroke: '#edf1f3',
        fill: '#edf1f3',
        color: '#333',
      },
    }, // 灰色
    process: {
      default: {
        stroke: '#0A82E5',
        fill: defaultColor,
        color: '#0A82E5',
      },
      active: {
        stroke: '#0A82E5',
        fill: '#0A82E5',
        color: defaultFontColor,
      },
    }, // 蓝色
  });
  const arrowStaticData = Object.freeze({
    width: 130,
    height: 26,
    hornWidth: 15, // 箭头的大小
    offsetLeft: -7, // step离左侧step的距离，-15则左间距为0
  });

  const emits = defineEmits(['stepClick']);

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    // 类型名称
    typeName: {
      type: String,
      default: '',
    },
    // 是否点中当前的svg
    current: {
      type: Boolean,
      default: false,
    },
    // 当前是第几个step
    index: {
      type: Number,
      default: 0,
    },
  });

  const points = computed(() => {
    const { width, hornWidth, height } = arrowStaticData;
    return props.index === 0
      ? `0,0  ${width - hornWidth},0 
        ${width},${height / 2} 
        ${width - hornWidth},${height} 
        0,${height} 0,0`
      : `0,0 ${width - hornWidth},0 
        ${width},${height / 2} 
        ${width - hornWidth},${height} 
        0,${height} 
        ${hornWidth},${height / 2} 0,0`;
  });

  const color = computed(() => {
    let color = {};
    const currentStyleConfig: any = colorObj[props.typeName];
    // 如果当前是被选中的，颜色需要区分
    if (props.current) {
      color = {
        fill: currentStyleConfig.active.fill,
        stroke: currentStyleConfig.active.stroke,
      };
    } else {
      color = {
        stroke: currentStyleConfig.default.stroke,
        fill: currentStyleConfig.default.fill,
      };
    }
    return color;
  });

  const fontColor = computed(() => {
    const currentStyleConfig: any = colorObj[props.typeName];
    let fontColor = '';
    if (props.current) {
      fontColor = currentStyleConfig.active.color;
    } else {
      fontColor = currentStyleConfig.default.color;
    }
    return fontColor;
  });

  const stepClick = () => {
    emits('stepClick', props.index);
  };
</script>

<style lang="scss" scoped>
  .next-step-item {
    cursor: pointer;
    .polyline {
      transition: 0.3s;
    }
    .svg-title {
      padding: 0 15px;
      display: block;
      position: relative;
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: 0.3s;
      box-sizing: border-box;
    }
  }
</style>
```

使用方式

```html
<template>
  <div>
    <div class="arrow-container">
      <arrow
        v-for="item of arrowList"
        :key="item.index"
        v-bind="item"
        :current="arrowCurrent === item.index"
        @stepClick="changeStepCurrent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import Arrow from 'components/Arrow/index.vue';

  const arrowCurrent = ref<number>(0);
  const arrowList = [
    {
      index: 0,
      title: '步骤一一一一一一一一一',
      typeName: 'process',
    },
    {
      index: 1,
      title: '步骤二一一一一一一一一一',
      typeName: 'finish',
    },
    {
      index: 2,
      title: '步骤三',
      typeName: 'await',
    },
  ];
</script>

<style lang="scss">
  .arrow-container {
    padding: 30px;
    display: flex;
    width: 800px;
    height: 400px;
    border: 1px solid #ccc;
    margin-top: 100px;
    box-sizing: border-box;
  }
</style>
```

完整效果

<p style="text-align: center">
  <img src="/images/vue/vue-arrow.jpg" >
</p>