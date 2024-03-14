import { readFileSync } from 'fs'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
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
  plugins: [react(), dts({ rollupTypes: true })],
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

      // fileName: (format, entryName) => `${entryName}.${format}.js`,
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
      },
    },
  },
})
