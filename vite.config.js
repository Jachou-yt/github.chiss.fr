import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const vuePlugin = require('@vitejs/plugin-vue')

// https://vitejs.dev/config/

module.exports = {
  plugins: [
    vuePlugin()
  ]
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
