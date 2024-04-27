# Vite 打包

## external

### 使用 esm

当想要使用 esm 包时，不需要配置 external，external 是用于给全局注入全局变量，而通过 esm 的方式，即使注入了全局变量也没效果，因为都是通过 import 'xxx' from 'xxx' 导入的。

具体代码如下

```html
<script type="module" src="xxx.vue.js"></script>
<script type="module">
  // 使用方式必须如此，无法使用  import { createApp } from 'vue'
  import { createApp } from 'xxx.vue.js';
</script>
```

如果想要使用 from 'xxx' 导入，需要采用 importmap 的方式

```js
// 具体 vite 配置如下
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    ...,
    createHtmlPlugin({
      minify: true,
      template: 'index.html',
      inject: {
        data: {
          injectScript: `
            <script type="importmap">
              { "imports": {
                  "vue": "/static/vue.js",
                  "@vue/devtools-api": "https://unpkg.com/@vue/devtools-api@6.4.5/lib/esm/index.js",
                  "vue-router": "/static/vueRouter.js",
                  "vue-demi": "/static/vueDemi.js",
                  "pinia": "/static/pinia.js"
              } }
            </script>
          `
        }
      }
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        format: 'es',
      }
    }
  }
})

```

在 html 中使用如下配置

```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <%- injectScript %>
    <!-- 注入 script -->
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### 使用 umd

使用 umd 包时，需要配置 external，因为 umd 包是全局变量注入的，所以需要配置 external，会在全局上挂载 Vue，VueRouter 等。

配置 rollup globals 和 external 只适合打包结果是 umd/iife 格式，如果是 esm 格式，则无法使用。

如果通过插件的方式

具体代码如下

```js
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    ...,
    createHtmlPlugin({
      minify: true,
      template: 'index.html',
      inject: {
        data: {
          injectScript: `
            <script src="/static/vue.global.js"></script>
            <script src="/static/vueDemi.global.js"></script>
            <script src="/static/vueRouter.global.js"></script>
            <script src="/static/pinia.global.js"></script>
          `
        }
      }
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        format: 'umd',
        // 注意 umd 模式 无法设置 manualChunks,
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi',
          'vue-router': 'VueRouter',
          pinia: 'Pinia'
        }
      },
      external: ['vue', 'vue-demi', 'vue-router', 'pinia']
    }
  },
  optimizeDeps: {
    include: isProd ? ['vue', 'vue-demi', 'vue-router', 'pinia'] : []
    // force: false // 强制进行依赖预构建
  }
})


// html 模板 和 es 导入方式一致
```

### format esm 但是引入的包是 umd

```js
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    ...,
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等 会导致 打包后，方法无法执行
      // imports: ['vue', 'vue-router'],
    }),
    createHtmlPlugin({
      minify: true,
      template: 'index.html',
      inject: {
        data: {
          injectScript: `
            <script src="/static/vue.global.js"></script>
            <script src="/static/vueDemi.global.js"></script>
            <script src="/static/vueRouter.global.js"></script>
            <script src="/static/pinia.global.js"></script>
          `
        }
      }
    }),
    viteExternalsPlugin({
      vue: 'Vue',
      'vue-demi': 'VueDemi',
      'vue-router': 'VueRouter',
      pinia: 'Pinia',
    })
  ],
  build: {
    rollupOptions: {
      output: {
        format: 'esm',
      },
    }
  },
  optimizeDeps: {
    include: isProd ? ['vue', 'vue-demi', 'vue-router', 'pinia'] : []
    // force: false // 强制进行依赖预构建
  }
})


// html 模板 和 es 导入方式一致
```