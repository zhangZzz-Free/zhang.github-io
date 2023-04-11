import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const resolve = (dir) => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  return {
    base: "/zhang.github-io/",
    publicDir: resolve("static"),
    mode: "development",
    resolve: {
      alias: {
        "@": resolve("src"), //作为 entries 的选项
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    server: {
      open: true,
      port: 5566,
    },
    css: {
      modules: {},
    },
    build: {
      //打包环境移除console.log，debugger
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      //打包文件按照类型分文件夹显示
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createHtmlPlugin({
        minify: true,
        template: "./index.html",
        inject: {
          data: {
            scriptPrefix: "/zhang.github-io/",
          },
        },
      }),
    ],
  };
});
