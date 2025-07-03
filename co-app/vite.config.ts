import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { glob } from 'glob'

// Function to get dynamic entry points
function getEntryPoints() {
  const entries: Record<string, string> = {}
  
  const componentFiles = glob.sync('./src/components/*/index.ts')
  componentFiles.forEach((file) => {
    const name = file.split('/').slice(-2, -1)[0] // Get component name from path
    entries[name] = resolve(__dirname, file)
  })
  
  return entries
}

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic'
  })],
  build: {
    rollupOptions: {
      input: getEntryPoints(),
      output: {
        dir: 'dist/statics/scripts',
        entryFileNames: '[name].bundle.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        format: 'iife'
      }
    },
    outDir: 'dist',
    emptyOutDir: false
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        additionalData: ''
      }
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  }
})