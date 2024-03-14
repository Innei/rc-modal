import { resolve } from 'path'
import unoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'

import PKG from '../package.json'

export default defineConfig({
  base: '',
  plugins: [
    vue(),
    vueJSX(),
    unoCSS(),
    tsconfigPaths({
      projects: [resolve(__dirname, './tsconfig.json')],
    }),
    htmlPlugin(),
  ],

  // root: resolve(__dirname, './example'),
  optimizeDeps: {
    include: ['my-awesome-lib'],
  },
  // resolve: {
  //   alias: {
  //     '~': resolve(__dirname, '..'),
  //   },
  // },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
      },
    },
  },
})

function htmlPlugin() {
  return {
    name: 'html-transform',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(
        '----------------repo----------------',
        PKG.repository.directory,
      )
    },
  } satisfies PluginOption
}
