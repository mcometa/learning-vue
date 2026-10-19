import { defineConfig } from 'vite'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  resolve: {
    alias: [{ find: /^vue$/, replacement: require.resolve('vue/dist/vue.esm.js') }]
  },
  server: {
    fs: { allow: [fileURLToPath(new URL('..', import.meta.url))] }
  },
  build: { outDir: 'dist' }
})
