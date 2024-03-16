import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { preserveDirectives } from 'rollup-plugin-preserve-directives'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const packageJson = JSON.parse(
  readFileSync('./package.json', { encoding: 'utf-8' }),
)

const globals = {
  // @ts-ignore
  ...(packageJson?.dependencies || {}),
}
export default defineConfig({
  plugins: [
    react(),
    dts({
      // rollupTypes: true

      beforeWriteFile: (filePath, content) => {
        writeFileSync(filePath.replace('.d.ts', '.d.cts'), content)
        return { filePath, content }
      },
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: [
        resolve(__dirname, 'src/index.ts'),
        resolve(__dirname, 'src/helpers/m.tsx'),
        resolve(__dirname, 'src/helpers/motion.tsx'),
        resolve(__dirname, 'src/helpers/mobile-detector.tsx'),
      ],
      name: 'RcModal',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'lodash',
        'lodash-es',
        'react/jsx-runtime',
        ...Object.keys(globals),
      ],
      output: {
        globals: {
          RcModal: 'RcModal',
        },
        preserveModules: true,
      },
      plugins: [preserveDirectives({})],
    },
  },
})
