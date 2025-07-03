import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { glob } from 'glob'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  },
  build: {
    outDir: 'dist/statics/scripts',
    rollupOptions: {
      input: (() => {
        const entries = {}
        const files = glob.sync('./src/components/*/index.ts')
        files.forEach((file) => {
          const name = file.split('/').slice(-2, -1)[0]
          entries[name] = resolve(__dirname, file)
        })
        return entries
      })(),
      output: {
        entryFileNames: '[name].bundle.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        format: 'es'
      }
    },
    emptyOutDir: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3300,
    host: true
  }
})