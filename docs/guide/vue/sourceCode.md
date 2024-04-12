# Vue 源码

## 1. 为什么 Vue 不再使用 mixin 了

### 1.1 命名冲突

我们看到了 mixin 模式如何在运行时合并两个对象。如果他们两个都共享同名属性，会发生什么？

```javascript
const mixin = {
  data: () => ({
    myProp: null,
  }),
};

export default {
  mixins: [mixin],
  data: () => ({
    // 同名!
    myProp: null,
  }),
};
```

这就是合并策略发挥作用的地方。这是一组规则，用于确定当一个组件包含多个具有相同名称的选项时会发生什么。
Vue 组件的默认（但可以配置）合并策略指示本地选项将覆盖 mixin 选项。Vue 组件的默认(可选配置)合并策略指示本地选项将覆盖 mixin 选项。不过也有例外，例如，如果我们有多个相同类型的生命周期钩子，这些钩子将被添加到一个钩子数组中，并且所有的钩子都将被依次调用。
尽管我们不应该遇到任何实际的错误，但是在跨多个组件和 mixin 处理命名属性时，编写代码变得越来越困难。一旦第三方 mixin 作为带有自己命名属性的 npm 包被添加进来，就会特别困难，因为它们可能会导致冲突。

### 1.2 依赖不透明

换句话说，依赖不是局部声明式的。
mixin 和使用它的组件之间没有层次关系。这意味着组件可以使用 mixin 中定义的数据属性（例如 myData），但是 mixin 也可以使用假定在组件中定义的数据属性（例如 myData）。以后的某天如果想修改 mixin，包袱有点重

### 1.3 对后续开发者不友好

除了上述说的内容，在 Vue2 的源码分析过程中，我们可以发现 Vue2 大量使用了 mixin 的实现思路，导致源码溯源时很难定位，也就是灵活度太高导致的代码约束性太少。对后续的开发者而言增加了很多的上手成本。

## 2. 什么是插件？

插件可以是对象，或者是一个函数。如果是对象，那么对象中需要提供 install 函数，如果是函数，形态需要跟前面提到的 install 函数保持一致。
install 是组件安装的一个方法，跟 npm install 完全不一样，npm install 是一个命令

```javascript
const MyPlugin = {
    install(Vue, options) {
      // 1. 添加全局方法或 property
      Vue.myGlobalMethod = function () {
        // 逻辑...
      }

      // 2. 添加全局资源
      Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
          // 逻辑...
        }
        ...
      })

      // 3. 注入组件选项
      Vue.mixin({
        created: function () {
          // 逻辑...
        }
        ...
      })

      // 4. 添加实例方法
      Vue.prototype.$myMethod = function (methodOptions) {
        // 逻辑...
      }
    }
};

```

### 2.2 使用插件

```javascript
Vue.use(MyPlugin);

{
  {
    $myMethod;
  }
}
```

### 2.3 插件化机制原理

```javascript
export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 获取已经安装的插件
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = []);
    // 看看插件是否已经安装，如果安装了直接返回
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // toArray(arguments, 1)实现的功能就是，获取Vue.use(plugin,xx,xx)中的其他参数。
    // 比如 Vue.use(plugin,{size:'mini', theme:'black'})，就会回去到plugin意外的参数
    const args = toArray(arguments, 1);
    // 在参数中第一位插入Vue，从而保证第一个参数是Vue实例
    args.unshift(this);
    // 插件要么是一个函数，要么是一个对象(对象包含install方法)
    if (typeof plugin.install === 'function') {
      // 调用插件的install方法，并传入Vue实例
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    // 在已经安装的插件数组中，放进去
    installedPlugins.push(plugin);
    return this;
  };
}
```

## 3. Composition API 和 optional API 的区别？

选项式 API 与 Composition API 属于两种心智模型，选项式就是我们所说的配置式，它通过前期的内容约定，结构规范保证程序健壮性及可读性。组合式显然比选项式灵活。
选项式声明的方式相信大家都非常熟悉了，就像这样

```javascript

<!--
这个示例展示了如何通过 v-on 指令处理用户输入。
-->

<script>
export default {
  data() {
    return {
      message: 'Hello World!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    notify() {
      alert('navigation was prevented.')
    }
  }
}
</script>

<template>
  <!--
    注意我们不需要在模板中写 .value，
    因为在模板中 ref 会自动“解包”。
  -->
  <h1>{{ message }}</h1>

  <!--
    绑定到一个方法/函数。
    这个 @click 语法是 v-on:click 的简写。
  -->
  <button @click="reverseMessage">Reverse Message</button>

  <!-- 也可以写成一个内联表达式语句 -->
  <button @click="message += '!'">Append "!"</button>

  <!--
    Vue 也为一些像 e.preventDefault() 和 e.stopPropagation()
    这样的常见任务提供了修饰符。
  -->
  <a href="https://vuejs.org" @click.prevent="notify">
    A link with e.preventDefault()
  </a>
</template>

<style>
button, a {
  display: block;
  margin-bottom: 1em;
}
</style>

```

如果换为组合式方式呢？

```javascript
<!--
这个示例展示了如何通过 v-on 指令处理用户输入。
-->

<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')

function reverseMessage() {
  // 通过其 .value 属性
  // 访问/修改一个 ref 的值。
  message.value = message.value.split('').reverse().join('')
}

function notify() {
  alert('navigation was prevented.')
}
</script>

<template>
  <!--
    注意我们不需要在模板中写 .value，
    因为在模板中 ref 会自动“解包”。
  -->
  <h1>{{ message }}</h1>

  <!--
    绑定到一个方法/函数。
    这个 @click 语法是 v-on:click 的简写。
  -->
  <button @click="reverseMessage">Reverse Message</button>

  <!-- 也可以写成一个内联表达式语句 -->
  <button @click="message += '!'">Append "!"</button>

  <!--
    Vue 也为一些像 e.preventDefault() 和 e.stopPropagation()
    这样的常见任务提供了修饰符。
  -->
  <a href="https://vuejs.org" @click.prevent="notify">
    A link with e.preventDefault()
  </a>
</template>

<style>
button, a {
  display: block;
  margin-bottom: 1em;
}
</style>

```

## 4. Vuex 的实现本质

### 4.1 Vuex 实现原理

Vuex 为 Vue Components 建立起了一个完整的生态圈，包括开发中的 API 调用一环。围绕这个生态圈，简要介绍一下各模块在核心流程中的主要功能：

- Vue Components：Vue 组件。HTML 页面上，负责接收用户操作等交互行为，执行 dispatch 方法触发对应 action 进行回应。
- dispatch：操作行为触发方法，是唯一能执行 action 的方法。
- actions：操作行为处理模块。负责处理 Vue Components 接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台 API 请求的操作就在这个模块中进行，包括触发其他 action 以及提交 mutation 的操作。该模块提供了 Promise 的封装，以支持 action 的链式触发。
- commit：状态改变提交操作方法。对 mutation 进行提交，是唯一能执行 mutation 的方法。
- mutations：状态改变操作方法。是 Vuex 修改 state 的唯一推荐方法，其他修改方式在严格模式下将会报错。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些 hook 暴露出来，以进行 state 的监控等。
- state：页面状态管理容器对象。集中存储 Vue components 中 data 对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用 Vue 的细粒度数据响应机制来进行高效的状态更新。
- getters：state 对象读取方法。图中没有单独列出该模块，应该被包含在了 render 中，Vue Components 通过该方法读取全局 state 对象。

<p style="text-align: center">
  <img src="/images/vue/source-code-1.png" />
</p>

## 5. 手写 Vue-Router

核心代码：

```javascript
//myVueRouter.js
let Vue = null;
class HistoryRoute {
  constructor() {
    this.current = null;
  }
}
class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash';
    this.routes = options.routes || []; //你传递的这个路由是一个数组表
    this.routesMap = this.createMap(this.routes);
    this.history = new HistoryRoute();
    this.init();
  }
  init() {
    if (this.mode === 'hash') {
      // 先判断用户打开时有没有hash值，没有的话跳转到#/
      location.hash ? '' : (location.hash = '/');
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1);
      });
    } else {
      location.pathname ? '' : (location.pathname = '/');
      window.addEventListener('load', () => {
        this.history.current = location.pathname;
      });
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname;
      });
    }
  }

  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component;
      return pre;
    }, {});
  }
}
VueRouter.install = function (v) {
  Vue = v;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        // 如果是根组件
        this._root = this; //把当前实例挂载到_root上
        this._router = this.$options.router;
        Vue.util.defineReactive(this, 'xxx', this._router.history);
      } else {
        //如果是子组件
        this._root = this.$parent && this.$parent._root;
      }
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router;
        },
      });
      Object.defineProperty(this, '$route', {
        get() {
          return this._root._router.history.current;
        },
      });
    },
  });
  Vue.component('router-link', {
    props: {
      to: String,
    },
    render(h) {
      let mode = this._self._root._router.mode;
      let to = mode === 'hash' ? '#' + this.to : this.to;
      return h('a', { attrs: { href: to } }, this.$slots.default);
    },
  });
  Vue.component('router-view', {
    render(h) {
      let current = this._self._root._router.history.current;
      let routeMap = this._self._root._router.routesMap;
      return h(routeMap[current]);
    },
  });
};

export default VueRouter;
```

## 6. Vue2 的 diff 原理

双端比较就是新列表和旧列表两个列表的头与尾互相对比，，在对比的过程中指针会逐渐向内靠拢，直到某一个列表的节点全部遍历过，对比停止；

### 6.1 patch

先判断是否是首次渲染，如果是首次渲染那么我们就直接 createElm 即可；如果不是就去判断新老两个节点的元素类型否一样；如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那就说明 Vnode 完全被改变了，就可以直接替换 oldVnode；

先判断是否是首次渲染，如果是首次渲染那么我们就直接 createElm 即可；如果不是就去判断新老两个节点的元素类型否一样；如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那就说明 Vnode 完全被改变了，就可以直接替换 oldVnode；

```javascript
function patch(oldVnode, vnode, hydrating, removeOnly) {
  // 判断新的vnode是否为空
  if (isUndef(vnode)) {
    // 如果老的vnode不为空 卸载所有的老vnode
    if (isDef(oldVnode)) invokeDestroyHook(oldVnode);
    return;
  }
  let isInitialPatch = false;
  // 用来存储 insert钩子函数，在插入节点之前调用
  const insertedVnodeQueue = [];
  // 如果老节点不存在，直接创建新节点
  if (isUndef(oldVnode)) {
    isInitialPatch = true;
    createElm(vnode, insertedVnodeQueue);
  } else {
    // 是不是元素节点
    const isRealElement = isDef(oldVnode.nodeType);
    // 当老节点不是真实的DOM节点，并且新老节点的type和key相同，进行patchVnode更新工作
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
    } else {
      // 如果不是同一元素节点的话
      // 当老节点是真实DOM节点的时候
      if (isRealElement) {
        // 如果是元素节点 并且在SSR环境的时候 修改SSR_ATTR属性
        if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
          // 就是服务端渲染的，删掉这个属性
          oldVnode.removeAttribute(SSR_ATTR);
          hydrating = true;
        }
        // 这个判断里是服务端渲染的处理逻辑
        if (isTrue(hydrating)) {
          if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
            invokeInsertHook(vnode, insertedVnodeQueue, true);
            return oldVnode;
          }
        }
        // 如果不是服务端渲染的，或者混合失败，就创建一个空的注释节点替换 oldVnode
        oldVnode = emptyNodeAt(oldVnode);
      }

      // 拿到 oldVnode 的父节点
      const oldElm = oldVnode.elm;
      const parentElm = nodeOps.parentNode(oldElm);

      // 根据新的 vnode 创建一个 DOM 节点，挂载到父节点上
      createElm(
        vnode,
        insertedVnodeQueue,
        oldElm._leaveCb ? null : parentElm,
        nodeOps.nextSibling(oldElm)
      );
      // 如果新的 vnode 的根节点存在，就是说根节点被修改了，就需要遍历更新父节点
      // 递归 更新父占位符元素
      // 就是执行一遍 父节点的 destory 和 create 、insert 的 钩子函数
      if (isDef(vnode.parent)) {
        let ancestor = vnode.parent;
        const patchable = isPatchable(vnode);
        // 更新父组件的占位元素
        while (ancestor) {
          // 卸载老根节点下的全部组件
          for (let i = 0; i < cbs.destroy.length; ++i) {
            cbs.destroy[i](ancestor);
          }
          // 替换现有元素
          ancestor.elm = vnode.elm;
          if (patchable) {
            for (let i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, ancestor);
            }
            // #6513
            // invoke insert hooks that may have been merged by create hooks.
            // e.g. for directives that uses the "inserted" hook.
            const insert = ancestor.data.hook.insert;
            if (insert.merged) {
              // start at index 1 to avoid re-invoking component mounted hook
              for (let i = 1; i < insert.fns.length; i++) {
                insert.fns[i]();
              }
            }
          } else {
            registerRef(ancestor);
          }
          // 更新父节点
          ancestor = ancestor.parent;
        }
      }
      // 如果旧节点还存在，就删掉旧节点
      if (isDef(parentElm)) {
        removeVnodes([oldVnode], 0, 0);
      } else if (isDef(oldVnode.tag)) {
        // 否则直接卸载 oldVnode
        invokeDestroyHook(oldVnode);
      }
    }
  }
  // 执行 虚拟 dom 的 insert 钩子函数
  invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
  // 返回最新 vnode 的 elm ，也就是真实的 dom节点
  return vnode.elm;
}
```

### 6.2 patchVnode

- 如果 Vnode 和 oldVnode 指向同一个对象，则直接 return 即可；
- 将旧节点的真实 DOM 赋值到新节点（真实 dom 连线到新子节点）称为 elm，然后遍历调用 update 更新 oldVnode 上的所有属性，比如 class,style,attrs,domProps,events...；
- 如果新老节点都有文本节点，并且文本不相同，那么就用 vnode.text 更新文本内容。
- 如果 oldVnode 有子节点而 Vnode 没有，则直接删除老节点即可；
- 如果 oldVnode 没有子节点而 Vnode 有，则将 Vnode 的子节点真实化之后添加到 DOM 中即可。
- 如果两者都有子节点，则执行 updateChildren 函数比较子节点。

```javascript
function patchVnode(
  oldVnode, // 老的虚拟 DOM 节点
  vnode, // 新节点
  insertedVnodeQueue, // 插入节点队列
  ownerArray, // 节点数组
  index, // 当前节点的下标
  removeOnly
) {
  // 新老节点对比地址一样，直接跳过
  if (oldVnode === vnode) {
    return;
  }
  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // clone reused vnode
    vnode = ownerArray[index] = cloneVNode(vnode);
  }
  const elm = (vnode.elm = oldVnode.elm);
  // 如果当前节点是注释或 v-if 的，或者是异步函数，就跳过检查异步组件
  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
    } else {
      vnode.isAsyncPlaceholder = true;
    }
    return;
  }
  // 当前节点是静态节点的时候，key 也一样，或者有 v-once 的时候，就直接赋值返回
  if (
    isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    vnode.componentInstance = oldVnode.componentInstance;
    return;
  }
  let i;
  const data = vnode.data;
  if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
    i(oldVnode, vnode);
  }
  const oldCh = oldVnode.children;
  const ch = vnode.children;
  if (isDef(data) && isPatchable(vnode)) {
    // 遍历调用 update 更新 oldVnode 所有属性，比如 class,style,attrs,domProps,events...
    // 这里的 update 钩子函数是 vnode 本身的钩子函数
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
    // 这里的 update 钩子函数是我们传过来的函数
    if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode);
  }
  // 如果新节点不是文本节点，也就是说有子节点
  if (isUndef(vnode.text)) {
    // 如果新老节点都有子节点
    if (isDef(oldCh) && isDef(ch)) {
      // 如果新老节点的子节点不一样，就执行 updateChildren 函数，对比子节点
      if (oldCh !== ch)
        updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
    } else if (isDef(ch)) {
      // 如果新节点有子节点的话，就是说老节点没有子节点

      // 如果老节点是文本节点，就是说没有子节点，就清空
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '');
      // 添加新节点
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
    } else if (isDef(oldCh)) {
      // 如果新节点没有子节点，老节点有子节点，就删除
      removeVnodes(oldCh, 0, oldCh.length - 1);
    } else if (isDef(oldVnode.text)) {
      // 如果老节点是文本节点，就清空
      nodeOps.setTextContent(elm, '');
    }
  } else if (oldVnode.text !== vnode.text) {
    // 如果老节点的文本和新节点的文本不同，就更新文本
    nodeOps.setTextContent(elm, vnode.text);
  }
  if (isDef(data)) {
    if (isDef((i = data.hook)) && isDef((i = i.postpatch))) i(oldVnode, vnode);
  }
}
```

### 6.3 updateChildren

为了方便理解，这里手动实现 Vue2 中的 updateChildren

#### 6.3.1 实现思路

我们先用四个指针指向两个列表的头尾

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  let oldStartIndex = 0,
    oldEndIndex = prevChildren.length - 1;
  (newStartIndex = 0), (newEndIndex = nextChildren.length - 1);
  let oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldEndIndex],
    newStartNode = nextChildren[nextStartIndex],
    newEndNode = nextChildren[nextEndIndex];
}
```

根据四个指针找到四个节点，然后进行对比，那么如何对比呢？我们按照以下四个步骤进行对比

1. 使用旧列表的头一个节点 oldStartNode 与新列表的头一个节点 newStartNode 对比；
2. 使用旧列表的最后一个节点 oldEndNode 与新列表的最后一个节点 newEndNode 对比；
3. 使用旧列表的头一个节点 oldStartNode 与新列表的最后一个节点 newEndNode 对比；
4. 使用旧列表的最后一个节点 oldEndNode 与新列表的头一个节点 newStartNode 对比；

使用以上四步进行对比，去寻找 key 相同的可复用的节点，当在某一步中找到了则停止后面的寻找。具体对比顺序如下图：

<p style="text-align: center">
  <img src="/images/vue/source-code-2.png" />
</p>

对比顺序代码结构如下:

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  let oldStartIndex = 0,
    oldEndIndex = prevChildren.length - 1;
  (newStartIndex = 0), (newEndIndex = nextChildren.length - 1);
  let oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldEndIndex],
    newStartNode = nextChildren[newStartIndex],
    newEndNode = nextChildren[newEndIndex];

  if (oldStartNode.key === newStartNode.key) {
  } else if (oldEndNode.key === newEndNode.key) {
  } else if (oldStartNode.key === newEndNode.key) {
  } else if (oldEndNode.key === newStartNode.key) {
  }
}
```

当对比时找到了可复用的节点，我们还是先 patch 给元素打补丁，然后将指针进行前/后移一位指针。根据对比节点的不同，我们移动的指针和方向也不同，具体规则如下：

1. 当旧列表的头一个节点 oldStartNode 与新列表的头一个节点 newStartNode 对比时 key 相同。那么旧列表的头指针 oldStartIndex 与新列表的头指针 newStartIndex 同时向后移动一位；
2. 当旧列表的最后一个节点 oldEndNode 与新列表的最后一个节点 newEndNode 对比时 key 相同。那么旧列表的尾指针 oldEndIndex 与新列表的尾指针 newEndIndex 同时向前移动一位；
3. 当旧列表的头一个节点 oldStartNode 与新列表的最后一个节点 newEndNode 对比时 key 相同。那么旧列表的头指针 oldStartIndex 向后移动一位；新列表的尾指针 newEndIndex 向前移动一位；
4. 当旧列表的最后一个节点 oldEndNode 与新列表的头一个节点 newStartNode 对比时 key 相同。那么旧列表的尾指针 oldEndIndex 向前移动一位；新列表的头指针 newStartIndex 向后移动一位；

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  let oldStartIndex = 0,
    oldEndIndex = prevChildren.length - 1,
    newStartIndex = 0,
    newEndIndex = nextChildren.length - 1;
  let oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldEndIndex],
    newStartNode = nextChildren[newStartIndex],
    newEndNode = nextChildren[newEndIndex];

  if (oldStartNode.key === newStartNode.key) {
    patch(oldvStartNode, newStartNode, parent);

    oldStartIndex++;
    newStartIndex++;
    oldStartNode = prevChildren[oldStartIndex];
    newStartNode = nextChildren[newStartIndex];
  } else if (oldEndNode.key === newEndNode.key) {
    patch(oldEndNode, newEndNode, parent);

    oldEndIndex--;
    newEndIndex--;
    oldEndNode = prevChildren[oldEndIndex];
    newEndNode = nextChildren[newEndIndex];
  } else if (oldStartNode.key === newEndNode.key) {
    patch(oldStartNode, newEndNode, parent);

    oldStartIndex++;
    newEndIndex--;
    oldStartNode = prevChildren[oldStartIndex];
    newEndNode = nextChildren[newEndIndex];
  } else if (oldEndNode.key === newStartNode.key) {
    patch(oldEndNode, newStartNode, parent);

    oldEndIndex--;
    nextStartIndex++;
    oldEndNode = prevChildren[oldEndIndex];
    newStartNode = nextChildren[newStartIndex];
  }
}
```

上面提到，要让指针向内靠拢，所以我们需要循环。循环停止的条件是当其中一个列表的节点全部遍历完成，代码如下：

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  let oldStartIndex = 0,
    oldEndIndex = prevChildren.length - 1,
    newStartIndex = 0,
    newEndIndex = nextChildren.length - 1;
  let oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldEndIndex],
    newStartNode = nextChildren[newStartIndex],
    newEndNode = nextChildren[newEndIndex];
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
      patch(oldStartNode, newStartNode, parent);

      oldStartIndex++;
      newStartIndex++;
      oldStartNode = prevChildren[oldStartIndex];
      newStartNode = nextChildren[newStartIndex];
    } else if (oldEndNode.key === newEndNode.key) {
      patch(oldEndNode, newEndNode, parent);

      oldEndIndex--;
      newndIndex--;
      oldEndNode = prevChildren[oldEndIndex];
      newEndNode = nextChildren[newEndIndex];
    } else if (oldStartNode.key === newEndNode.key) {
      patch(oldvStartNode, newEndNode, parent);

      oldStartIndex++;
      newEndIndex--;
      oldStartNode = prevChildren[oldStartIndex];
      newEndNode = nextChildren[newEndIndex];
    } else if (oldEndNode.key === newStartNode.key) {
      patch(oldEndNode, newStartNode, parent);

      oldEndIndex--;
      newStartIndex++;
      oldEndNode = prevChildren[oldEndIndex];
      newStartNode = nextChildren[newStartIndex];
    }
  }
}
```

至此整体的循环我们就全部完成了，下面我们需要考虑这样两个问题：

- 什么情况下 DOM 节点需要移动；
- DOM 节点如何移动；
  我们来解决第一个问题：什么情况下需要移动，我们还是以上图为例：

<p style="text-align: center">
  <img src="/images/vue/source-code-3.png" />
</p>

当我们在第一个循环时，在第四步发现旧列表的尾节点 oldEndNode 与新列表的头节点 newStartNode 的 key 相同，是可复用的 DOM 节点。通过观察我们可以发现，原本在旧列表末尾的节点，却是新列表中的开头节点，没有人比他更靠前，因为他是第一个，所以我们只需要把当前的节点移动到原本旧列表中的第一个节点之前，让它成为第一个节点即可。

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  // ...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
      // ...
    } else if (oldEndNode.key === newEndNode.key) {
      // ...
    } else if (oldStartNode.key === newEndNode.key) {
      // ...
    } else if (oldEndNode.key === newStartNode.key) {
      patch(oldEndNode, newStartNode, parent);
      // 移动到旧列表头节点之前
      parent.insertBefore(oldEndNode.el, oldStartNode.el);

      oldEndIndex--;
      newStartIndex++;
      oldEndNode = prevChildren[oldEndIndex];
      newStartNode = nextChildren[newStartIndex];
    }
  }
}
```

<p style="text-align: center">
  <img src="/images/vue/source-code-4.png" />
</p>

进入第二次循环，我们在第二步发现，旧列表的尾节点 oldEndNode 和新列表的尾节点 newEndNode 为复用节点。原本在旧列表中就是尾节点，在新列表中也是尾节点，说明该节点不需要移动，所以我们什么都不需要做。
同理，如果是旧列表的头节点 oldStartNode 和新列表的头节点 newStartNode 为复用节点，我们也什么都不需要做

<p style="text-align: center">
  <img src="/images/vue/source-code-5.png" />
</p>

进入第三次循环，我们在第三部发现，旧列表的头节点 oldStartNode 和新列表的尾节点 newEndNode 为复用节点。，我们只要将 DOM-A 移动到 DOM-B 后面就可以了。
依照惯例我们还是解释一下，原本旧列表中是头节点，然后在新列表中是尾节点。那么只要在旧列表中把当前的节点移动到原本尾节点的后面，就可以了。

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  // ...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
      // ...
    } else if (oldEndNode.key === newEndNode.key) {
      // ...
    } else if (oldStartNode.key === newEndNode.key) {
      patch(oldStartNode, newEndNode, parent);
      parent.insertBefore(oldStartNode.el, oldEndNode.el.nextSibling);

      oldStartIndex++;
      newEndIndex--;
      oldStartNode = prevChildren[oldStartIndex];
      newEndNode = nextChildren[newEndIndex];
    } else if (oldEndNode.key === newStartNode.key) {
      //...
    }
  }
}
```

<p style="text-align: center">
  <img src="/images/vue/source-code-6.png" />
</p>

进入最后一个循环。在第一步旧列表头节点 oldStartNode 与新列表头节点 newStartNode 位置相同，所以啥也不用做。然后结束循环。

#### 6.3.2 非理想情况

上文中有一个特殊情况，当四次对比都没找到复用节点时，我们只能拿新列表的第一个节点去旧列表中找与其 key 相同的节点。

<p style="text-align: center">
  <img src="/images/vue/source-code-7.png" />
</p>

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
      //...
    } else if (oldEndNode.key === newEndNode.key) {
      //...
    } else if (oldStartNode.key === newEndNode.key) {
      //...
    } else if (oldEndNode.key === newStartNode.key) {
      //...
    } else {
      // 在旧列表中找到 和新列表头节点key 相同的节点
      let newKey = newStartNode.key,
        oldIndex = prevChildren.findIndex((child) => child.key === newKey);
    }
  }
}
```

找节点的时候其实会有两种情况：一种在旧列表中找到了，另一种情况是没找到。

<p style="text-align: center">
  <img src="/images/vue/source-code-8.png" />
</p>

当我们在旧列表中找到对应的 VNode，我们只需要将找到的节点的 DOM 元素，移动到开头就可以了。这里的逻辑其实和第四步的逻辑是一样的，只不过第四步是移动的尾节点，这里是移动找到的节点。DOM 移动后，由我们将旧列表中的节点改为 undefined，这是至关重要的一步，因为我们已经做了节点的移动了所以我们不需要进行再次的对比了。最后我们将头指针 newStartIndex 向后移一位。

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
      //...
    } else if (oldEndNode.key === newEndNode.key) {
      //...
    } else if (oldStartNode.key === newEndNode.key) {
      //...
    } else if (oldEndNode.key === newStartNode.key) {
      //...
    } else {
      // 在旧列表中找到 和新列表头节点key 相同的节点
      let newtKey = newStartNode.key,
        oldIndex = prevChildren.findIndex((child) => child.key === newKey);

      if (oldIndex > -1) {
        let oldNode = prevChildren[oldIndex];
        patch(oldNode, newStartNode, parent);
        parent.insertBefore(oldNode.el, oldStartNode.el);
        prevChildren[oldIndex] = undefined;
      }
      newStartNode = nextChildren[++newStartIndex];
    }
  }
}
```

如果在旧列表中没有找到复用节点，就直接创建一个新的节点放到最前面就可以了，然后后移头指针 newStartIndex。

<p style="text-align: center">
  <img src="/images/vue/source-code-9.png" />
</p>

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
      //...
    } else if (oldEndNode.key === newEndNode.key) {
      //...
    } else if (oldStartNode.key === newEndNode.key) {
      //...
    } else if (oldEndNode.key === newStartNode.key) {
      //...
    } else {
      // 在旧列表中找到 和新列表头节点key 相同的节点
      let newtKey = newStartNode.key,
        oldIndex = prevChildren.findIndex((child) => child.key === newKey);

      if (oldIndex > -1) {
        let oldNode = prevChildren[oldIndex];
        patch(oldNode, newStartNode, parent);
        parent.insertBefore(oldNode.el, oldStartNode.el);
        prevChildren[oldIndex] = undefined;
      } else {
        mount(newStartNode, parent, oldStartNode.el);
      }
      newStartNode = nextChildren[++newStartIndex];
    }
  }
}
```

最后当旧列表遍历到 undefind 时就跳过当前节点。

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode === undefind) {
      oldStartNode = prevChildren[++oldStartIndex];
    } else if (oldEndNode === undefind) {
      oldEndNode = prevChildren[--oldEndIndex];
    } else if (oldStartNode.key === newStartNode.key) {
      //...
    } else if (oldEndNode.key === newEndNode.key) {
      //...
    } else if (oldStartNode.key === newEndNode.key) {
      //...
    } else if (oldEndNode.key === newStartNode.key) {
      //...
    } else {
      // ...
    }
  }
}
```

#### 6.3.3 添加节点

<p style="text-align: center">
  <img src="/images/vue/source-code-10.png" />
</p>

针对上述例子，几次循环都是尾节点相同，尾指针一直向前移动，直到循环结束；

<p style="text-align: center">
  <img src="/images/vue/source-code-11.png" />
</p>

此时 oldEndIndex 以及小于了 oldStartIndex，但是新列表中还有剩余的节点，我们只需要将剩余的节点依次插入到 oldStartNode 的 DOM 之前就可以了。为什么是插入 oldStartNode 之前呢？原因是剩余的节点在新列表的位置是位于 oldStartNode 之前的，如果剩余节点是在 oldStartNode 之后，oldStartNode 就会先行对比

```javaScript

function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
  // ...
  }
  if (oldEndIndex < oldStartIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      mount(nextChildren[i], parent, prevStartNode.el)
    }
  }
}

```

#### 6.3.4 移除节点

当新列表的 newEndIndex 小于 newStartIndex 时，我们将旧列表剩余的节点删除即可。这里我们需要注意，旧列表的 undefind。在第二小节中我们提到过，当头尾节点都不相同时，我们会去旧列表中找新列表的第一个节点，移动完 DOM 节点后，将旧列表的那个节点改为 undefind。所以我们在最后的删除时，需要注意这些 undefind，遇到的话跳过当前循环即可。

```javascript
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // ...
  }
  if (oldEndIndex < oldStartIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      mount(nextChildren[i], parent, prevStartNode.el);
    }
  } else if (newEndIndex < newStartIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (prevChildren[i]) {
        partent.removeChild(prevChildren[i].el);
      }
    }
  }
}
```

## 7. Vue3 的 diff 原理

vue3 的 diff 算法其中有两个理念。第一个是相同的前置与后置元素的预处理；第二个则是最长递增子序列。

### 7.1 前置与后置的预处理

我们看这两段文字

```javascript

hello chenghuai
hey chenghuai

```

我们会发现，这两段文字是有一部分是相同的，这些文字是不需要修改也不需要移动的，真正需要进行修改中间的几个字母，所以 diff 就变成以下部分

```javascript
text1: llo;
text2: y;
```

接下来换成 vnode：

<p style="text-align: center">
  <img src="/images/vue/source-code-12.png" />
</p>

图中的被绿色框起来的节点，他们是不需要移动的，只需要进行打补丁 patch 就可以了。我们把该逻辑写成代码。

```javascript
function vue3Diff(prevChildren, nextChildren, parent) {
  let j = 0,
    prevEnd = prevChildren.length - 1,
    nextEnd = nextChildren.length - 1,
    prevNode = prevChildren[j],
    nextNode = nextChildren[j];
  while (prevNode.key === nextNode.key) {
    patch(prevNode, nextNode, parent);
    j++;
    prevNode = prevChildren[j];
    nextNode = nextChildren[j];
  }

  prevNode = prevChildren[prevEnd];
  nextNode = prevChildren[nextEnd];

  while (prevNode.key === nextNode.key) {
    patch(prevNode, nextNode, parent);
    prevEnd--;
    nextEnd--;
    prevNode = prevChildren[prevEnd];
    nextNode = prevChildren[nextEnd];
  }
}
```

这时候，我们需要考虑边界情况，一种是 j > prevEnd；另一种是 j > nextEnd。

<p style="text-align: center">
  <img src="/images/vue/source-code-13.png" />
</p>

在上图中，此时 j > prevEnd 且 j <= nextEnd，只需要把新列表中 j 到 nextEnd 之间剩下的节点插入进去就可以了。相反， 如果 j > nextEnd 时，把旧列表中 j 到 prevEnd 之间的节点删除就可以了。

```javaScript

function vue3Diff(prevChildren, nextChildren, parent) {
  // ...
  if (j > prevEnd && j <= nextEnd) {
    let nextpos = nextEnd + 1,
      refNode = nextpos >= nextChildren.length
                ? null
                : nextChildren[nextpos].el;
    while(j <= nextEnd) mount(nextChildren[j++], parent, refNode)

  } else if (j > nextEnd && j <= prevEnd) {
    while(j <= prevEnd) parent.removeChild(prevChildren[j++].el)
  }
}

```

在 while 循环时，指针是从两端向内逐渐靠拢的，所以我们应该在循环中就应该去判断边界情况，我们使用 label 语法，当我们触发边界情况时，退出全部的循环，直接进入判断：

```javascript
function vue3Diff(prevChildren, nextChildren, parent) {
  let j = 0,
    prevEnd = prevChildren.length - 1,
    nextEnd = nextChildren.length - 1,
    prevNode = prevChildren[j],
    nextNode = nextChildren[j];
  // label语法
  outer: {
    while (prevNode.key === nextNode.key) {
      patch(prevNode, nextNode, parent);
      j++;
      // 循环中如果触发边界情况，直接break，执行outer之后的判断
      if (j > prevEnd || j > nextEnd) break outer;
      prevNode = prevChildren[j];
      nextNode = nextChildren[j];
    }

    prevNode = prevChildren[prevEnd];
    nextNode = prevChildren[nextEnd];

    while (prevNode.key === nextNode.key) {
      patch(prevNode, nextNode, parent);
      prevEnd--;
      nextEnd--;
      // 循环中如果触发边界情况，直接break，执行outer之后的判断
      if (j > prevEnd || j > nextEnd) break outer;
      prevNode = prevChildren[prevEnd];
      nextNode = prevChildren[nextEnd];
    }
  }

  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    let nextpos = nextEnd + 1,
      refNode =
        nextpos >= nextChildren.length ? null : nextChildren[nextpos].el;
    while (j <= nextEnd) mount(nextChildren[j++], parent, refNode);
  } else if (j > nextEnd && j <= prevEnd) {
    while (j <= prevEnd) parent.removeChild(prevChildren[j++].el);
  }
}
```

### 7.2 判断是否需要移动

接下来，就是找到移动的节点，然后给他移动到正确的位置
当前/后置的预处理结束后，我们进入真正的 diff 环节。首先，我们先根据新列表剩余的节点数量，创建一个 source 数组，并将数组填满-1。

<p style="text-align: center">
  <img src="/images/vue/source-code-14.png" />
</p>

```javascript
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  outer: {
    // ...
  }

  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    // ...
  } else if (j > nextEnd && j <= prevEnd) {
    // ...
  } else {
    let prevStart = j,
      nextStart = j,
      nextLeft = nextEnd - nextStart + 1, // 新列表中剩余的节点长度
      source = new Array(nextLeft).fill(-1); // 创建数组，填满-1
  }
}
```

source 是用来做新旧节点的对应关系的，我们将新节点在旧列表的位置存储在该数组中，我们在根据 source 计算出它的最长递增子序列用于移动 DOM 节点。为此，先建立一个对象存储当前新列表中的节点与 index 的关系，再去旧列表中去找位置。
注意：如果旧节点在新列表中没有的话，直接删除就好。除此之外，我们还需要一个数量表示记录我们已经 patch 过的节点，如果数量已经与新列表剩余的节点数量一样，那么剩下的旧节点我们就直接删除了就可以了

```javascript
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  outer: {
    // ...
  }

  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    // ...
  } else if (j > nextEnd && j <= prevEnd) {
    // ...
  } else {
    let prevStart = j,
      nextStart = j,
      nextLeft = nextEnd - nextStart + 1, // 新列表中剩余的节点长度
      source = new Array(nextLeft).fill(-1), // 创建数组，填满-1
      nextIndexMap = {}, // 新列表节点与index的映射
      patched = 0; // 已更新过的节点的数量

    // 保存映射关系
    for (let i = nextStart; i <= nextEnd; i++) {
      let key = nextChildren[i].key;
      nextIndexMap[key] = i;
    }

    // 去旧列表找位置
    for (let i = prevStart; i <= prevEnd; i++) {
      let prevNode = prevChildren[i],
        prevKey = prevNode.key,
        nextIndex = nextIndexMap[prevKey];
      // 新列表中没有该节点 或者 已经更新了全部的新节点，直接删除旧节点
      if (nextIndex === undefind || patched >= nextLeft) {
        parent.removeChild(prevNode.el);
        continue;
      }
      // 找到对应的节点
      let nextNode = nextChildren[nextIndex];
      patch(prevNode, nextNode, parent);
      // 给source赋值
      source[nextIndex - nextStart] = i;
      patched++;
    }
  }
}
```

<p style="text-align: center">
  <img src="/images/vue/source-code-15.png" />
</p>

找到位置后，我们观察这个重新赋值后的 source，我们可以看出，如果是全新的节点的话，其在 source 数组中对应的值就是初始的-1，通过这一步我们可以区分出来哪个为全新的节点，哪个是可复用的。
其次，我们要判断是否需要移动，如果我们找到的 index 是一直递增的，说明不需要移动任何节点。我们通过设置一个变量来保存是否需要移动的状态。

```javascript
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  outer: {
    // ...
  }

  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    // ...
  } else if (j > nextEnd && j <= prevEnd) {
    // ...
  } else {
    let prevStart = j,
      nextStart = j,
      nextLeft = nextEnd - nextStart + 1, // 新列表中剩余的节点长度
      source = new Array(nextLeft).fill(-1), // 创建数组，填满-1
      nextIndexMap = {}, // 新列表节点与index的映射
      patched = 0,
      move = false, // 是否移动
      lastIndex = 0; // 记录上一次的位置

    // 保存映射关系
    for (let i = nextStart; i <= nextEnd; i++) {
      let key = nextChildren[i].key;
      nextIndexMap[key] = i;
    }

    // 去旧列表找位置
    for (let i = prevStart; i <= prevEnd; i++) {
      let prevNode = prevChildren[i],
        prevKey = prevNode.key,
        nextIndex = nextIndexMap[prevKey];
      // 新列表中没有该节点 或者 已经更新了全部的新节点，直接删除旧节点
      if (nextIndex === undefind || patched >= nextLeft) {
        parent.removeChild(prevNode.el);
        continue;
      }
      // 找到对应的节点
      let nextNode = nextChildren[nextIndex];
      patch(prevNode, nextNode, parent);
      // 给source赋值
      source[nextIndex - nextStart] = i;
      patched++;

      // 递增方法，判断是否需要移动
      if (nextIndex < lastIndex) {
        move = true;
      } else {
        lastIndex = nextIndex;
      }
    }

    if (move) {
      // 需要移动
    } else {
      //不需要移动
    }
  }
}
```

### 7.3 DOM 如何移动

判断完是否需要移动后，我们就需要考虑如何移动了。一旦需要进行 DOM 移动，我们首先要做的就是找到 source 的最长递增子序列。

```javascript
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  if (move) {
    const seq = lis(source); // [0, 1]
    // 需要移动
  } else {
    //不需要移动
  }
}
```

> 最长递增子序列：给定一个数值序列，找到它的一个子序列，并且子序列中的值是递增的，子序列中的元素在原序列中不一定连续。
>
> 例如给定数值序列为：[ 0, 8, 4, 12 ]。
>
> 那么它的最长递增子序列就是：[0, 8, 12]。
>
> 当然答案可能有多种情况，例如：[0, 4, 12] 也是可以的。

上面的代码中，我们调用 lis 函数求出数组 source 的最长递增子序列为[ 0, 1 ]。我们知道 source 数组的值为 [2, 3, 1, -1]，很显然最长递增子序列应该是[ 2, 3 ]，计算出的结果是[ 0, 1 ]代表的是最长递增子序列中的各个元素在 source 数组中的位置索引，如下图所示：

<p style="text-align: center">
  <img src="/images/vue/source-code-16.png" />
</p>

我们根据 source，对新列表进行重新编号，并找出了最长递增子序列。
我们从后向前进行遍历 source 每一项。此时会出现三种情况：

1. 当前的值为-1，这说明该节点是全新的节点，又由于我们是从后向前遍历，我们直接创建好 DOM 节点插入到队尾就可以了；
2. 当前的索引为最长递增子序列中的值，也就是 i === seq[j]，这说说明该节点不需要移动；
3. 当前的索引不是最长递增子序列中的值，那么说明该 DOM 节点需要移动，这里也很好理解，我们也是直接将 DOM 节点插入到队尾就可以了，因为队尾是排好序的；

<p style="text-align: center">
  <img src="/images/vue/source-code-17.png" />
</p>

```javascript

function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  if (move) {
   // 需要移动
        const seq = lis(source); // [0, 1]
    let j = seq.length - 1;  // 最长子序列的指针
    // 从后向前遍历
    for (let i = nextLeft - 1； i >= 0; i--) {
      let pos = nextStart + i, // 对应新列表的index
        nextNode = nextChildren[pos],        // 找到vnode
              nextPos = pos + 1，    // 下一个节点的位置，用于移动DOM
        refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
        cur = source[i];  // 当前source的值，用来判断节点是否需要移动

      if (cur === -1) {
        // 情况1，该节点是全新节点
              mount(nextNode, parent, refNode)
      } else if (cur === seq[j]) {
        // 情况2，是递增子序列，该节点不需要移动
        // 让j指向下一个
        j--
      } else {
        // 情况3，不是递增子序列，该节点需要移动
        parent.insetBefore(nextNode.el, refNode)
      }
    }

  } else {
  //不需要移动

  }
}

```

说完了需要移动的情况，再说说不需要移动的情况。如果不需要移动的话，我们只需要判断是否有全新的节点给他添加进去就可以了。具体代码如下：

```javascript

function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  if (move) {
        const seq = lis(source); // [0, 1]
    let j = seq.length - 1;  // 最长子序列的指针
    // 从后向前遍历
    for (let i = nextLeft - 1； i >= 0; i--) {
      let pos = nextStart + i, // 对应新列表的index
        nextNode = nextChildren[pos],        // 找到vnode
              nextPos = pos + 1，    // 下一个节点的位置，用于移动DOM
        refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
        cur = source[i];  // 当前source的值，用来判断节点是否需要移动

      if (cur === -1) {
        // 情况1，该节点是全新节点
              mount(nextNode, parent, refNode)
      } else if (cur === seq[j]) {
        // 情况2，是递增子序列，该节点不需要移动
        // 让j指向下一个
        j--
      } else {
        // 情况3，不是递增子序列，该节点需要移动
        parent.insetBefore(nextNode.el, refNode)
      }
    }
  } else {
    //不需要移动
    for (let i = nextLeft - 1； i >= 0; i--) {
      let cur = source[i];  // 当前source的值，用来判断节点是否需要移动

      if (cur === -1) {
       let pos = nextStart + i, // 对应新列表的index
          nextNode = nextChildren[pos],        // 找到vnode
          nextPos = pos + 1，    // 下一个节点的位置，用于移动DOM
          refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
              mount(nextNode, parent, refNode)
      }
    }
  }
}

```

## 8. Vue3.0 性能提升主要是通过哪几方面体现的？

### 8.1 编译阶段

回顾 Vue2，我们知道每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把用到的数据 property 记录为依赖，当依赖发生改变，触发 setter，则会通知 watcher，从而使关联的组件重新渲染

<p style="text-align: center">
  <img src="/images/vue/source-code-18.png" />
</p>

试想一下，一个组件结构如下图

```html
<template>
  <div id="content">
    <p class="text">静态文本</p>
    <p class="text">静态文本</p>
    <p class="text">{{ message }}</p>
    <p class="text">静态文本</p>
    ...
    <p class="text">静态文本</p>
  </div>
</template>
```

可以看到，组件内部只有一个动态节点，剩余一堆都是静态节点，所以这里很多 diff 和遍历其实都是不需要的，造成性能浪费
因此，Vue3 在编译阶段，做了进一步优化。主要有如下：

- diff 算法优化
- 静态提升
- 事件监听缓存
- SSR 优化

#### 8.1.1 diff 算法优化

vue3 在 diff 算法中相比 vue2 增加了静态标记
关于这个静态标记，其作用是为了会发生变化的地方添加一个 flag 标记，下次发生变化的时候直接找该地方进行比较
下图这里，已经标记静态节点的 p 标签在 diff 过程中则不会比较，把性能进一步提高

<p style="text-align: center">
  <img src="/images/vue/source-code-19.png" />
</p>

关于静态类型枚举如下

```javascript

export const enum PatchFlags {
  TEXT = 1,// 动态的文本节点
  CLASS = 1 << 1,  // 2 动态的 class
  STYLE = 1 << 2,  // 4 动态的 style
  PROPS = 1 << 3,  // 8 动态属性，不包括类名和样式
  FULL_PROPS = 1 << 4,  // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
  HYDRATE_EVENTS = 1 << 5,  // 32 表示带有事件监听器的节点
  STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的 Fragment
  KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
  UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
  NEED_PATCH = 1 << 9,   // 512
  DYNAMIC_SLOTS = 1 << 10,  // 动态 solt
  HOISTED = -1,  // 特殊标志是负整数表示永远不会用作 diff
  BAIL = -2 // 一个特殊的标志，指代差异算法
}

```

#### 8.1.2 静态提升

Vue3 中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用
这样就免去了重复的创建节点，大型应用会受益于这个改动，免去了重复的创建操作，优化了运行时候的内存占用

```html
<span>你好</span>

<div>{{ message }}</div>
```

没有做静态提升之前

```javascript
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _Fragment,
      null,
      [
        _createVNode('span', null, '你好'),
        _createVNode('div', null, _toDisplayString(_ctx.message), 1 /* TEXT */),
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}
```

做了静态提升之后

```javascript
const _hoisted_1 = /*#__PURE__*/ _createVNode(
  'span',
  null,
  '你好',
  -1 /* HOISTED */
);

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _Fragment,
      null,
      [
        _hoisted_1,
        _createVNode('div', null, _toDisplayString(_ctx.message), 1 /* TEXT */),
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}

// Check the console for the AST
```

静态内容\_hoisted_1 被放置在 render 函数外，每次渲染的时候只要取 \_hoisted_1 即可
同时 \_hoisted_1 被打上了 PatchFlag ，静态标记值为 -1 ，特殊标志是负整数表示永远不会用于 Diff

#### 8.1.3 事件监听缓存

默认情况下绑定事件行为会被视为动态绑定，所以每次都会去追踪它的变化

```html
<div>
  <button @click="onClick">点我</button>
</div>
```

没开启事件监听器缓存

```javascript
export const render = /*#__PURE__*/ _withId(function render(
  _ctx,
  _cache,
  $props,
  $setup,
  $data,
  $options
) {
  return (
    _openBlock(),
    _createBlock('div', null, [
      _createVNode('button', { onClick: _ctx.onClick }, '点我', 8 /* PROPS */, [
        'onClick',
      ]),
      // PROPS=1<<3,// 8 //动态属性，但不包含类名和样式
    ])
  );
});
```

开启事件侦听器缓存后

```javascript
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock('div', null, [
      _createVNode(
        'button',
        {
          onClick:
            _cache[1] || (_cache[1] = (...args) => _ctx.onClick(...args)),
        },
        '点我'
      ),
    ])
  );
}
```

上述发现开启了缓存后，没有了静态标记。也就是说下次 diff 算法的时候直接使用

#### 8.1.4 SSR 优化

当静态内容大到一定量级时候，会用 createStaticVNode 方法在客户端去生成一个 static node，这些静态 node，会被直接 innerHtml，就不需要创建对象，然后根据对象渲染

```html
<div>
  <div>
    <span>你好</span>
  </div>
  ... // 很多个静态属性
  <div>
    <span>{{ message }}</span>
  </div>
</div>
```

编译后

```javascript
import { mergeProps as _mergeProps } from 'vue';
import {
  ssrRenderAttrs as _ssrRenderAttrs,
  ssrInterpolate as _ssrInterpolate,
} from '@vue/server-renderer';

export function ssrRender(
  _ctx,
  _push,
  _parent,
  _attrs,
  $props,
  $setup,
  $data,
  $options
) {
  const _cssVars = { style: { color: _ctx.color } };
  _push(
    `<div${_ssrRenderAttrs(
      _mergeProps(_attrs, _cssVars)
    )}><div><span>你好</span>...<div><span>你好</span><div><span>${_ssrInterpolate(
      _ctx.message
    )}</span></div></div>`
  );
}
```

## 8.2 源码体积

相比 Vue2，Vue3 整体体积变小了，除了移除一些不常用的 API，再重要的是 Tree shanking
任何一个函数，如 ref、reavtived、computed 等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小

```javascript
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  setup(props, context) {
    const age = ref(18);

    let state = reactive({
      name: 'test',
    });

    const readOnlyAge = computed(() => age.value++); // 19

    return {
      age,
      state,
      readOnlyAge,
    };
  },
});
```

## 8.3 响应式系统

vue2中采用 defineProperty来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加getter和setter，实现响应式
vue3采用proxy重写了响应式系统，因为proxy可以对整个对象进行监听，所以不需要深度遍历
- 可以监听动态属性的添加
- 可以监听到数组的索引和数组length属性
- 可以监听删除属性