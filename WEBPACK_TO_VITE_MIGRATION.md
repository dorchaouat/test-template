# Webpack to Vite Migration Summary

## Overview
Successfully migrated both `react` and `co-app` projects from webpack to Vite. Both projects are React-based custom element builders that create web components from React components using `react-to-webcomponent`.

## Projects Migrated
- `/react` - Custom element flow project
- `/co-app` - Co-app scripts project

## Changes Made

### 1. Package.json Updates
**Removed webpack dependencies:**
- `webpack`
- `webpack-cli`
- `ts-loader`
- `css-loader`
- `sass-loader`
- `style-loader`
- `css-modules-typescript-loader`

**Added Vite dependencies:**
- `vite ^4.3.0`
- `@vitejs/plugin-react ^4.0.0`
- `vite-plugin-dts ^2.3.0`
- `@types/node` (for Vite configuration)
- `glob ^8.1.0` (for dynamic entry points)

**Updated React types:**
- `@types/react` from `^16.9.15` to `^18.0.0` (for compatibility)

### 2. Script Updates
**Before:**
```json
{
  "start": "custom-element-flow start", // or "co-app-scripts start"
  "build": "custom-element-flow build", // or "co-app-scripts build"
}
```

**After:**
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "start": "custom-element-flow start", // preserved for workflow compatibility
}
```

### 3. Vite Configuration (vite.config.ts)
Created new Vite configuration files that replicate webpack's dynamic entry point functionality:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { glob } from 'glob'

// Function to get dynamic entry points (similar to webpack config)
function getEntryPoints() {
  const entries: Record<string, string> = {}
  
  const componentFiles = glob.sync('./src/components/*/index.ts')
  componentFiles.forEach((file) => {
    const name = file.split('/').slice(-2, -1)[0]
    entries[name] = resolve(__dirname, file)
  })
  
  return entries
}

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic' // For compatibility with older React JSX
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
```

### 4. TypeScript Configuration Updates
Updated `tsconfig.json` for better Vite compatibility:

**Key changes:**
- `target`: `ES2020` (from `es2018`)
- `module`: `ESNext` (from `commonjs`)
- `moduleResolution`: `node`
- `jsx`: `react` (classic runtime for compatibility)
- `resolveJsonModule`: `true`
- `isolatedModules`: `true`
- `noEmit`: `true`
- Added `vite.config.ts` to includes

### 5. File Deletions
- Removed `webpack.config.js` from both projects

## Key Features Preserved

### Dynamic Entry Points
The original webpack configuration used `glob.sync('./src/components/*/index.ts')` to automatically create entry points for each component. This functionality is preserved in Vite using the same approach in the `getEntryPoints()` function.

### CSS Modules & SCSS Support
- SCSS preprocessing is maintained
- CSS modules functionality is preserved
- File output structure matches original webpack setup

### Output Structure
Build outputs are maintained in the same location:
- `dist/statics/scripts/[component-name].bundle.js`

## Build Verification
✅ Both projects build successfully:
- `react/dist/statics/scripts/first-widget.bundle.js` (17KB)
- `co-app/dist/statics/scripts/first-widget.bundle.js` (17KB)

## Benefits of Migration

### Performance Improvements
- **Faster development builds** - Vite uses ESBuild for development
- **Hot Module Replacement (HMR)** - Near-instant updates during development
- **Faster cold starts** - Vite starts development server much faster than webpack

### Modern Tooling
- **Native ES modules** support
- **Better TypeScript integration**
- **Optimized production builds** using Rollup

### Developer Experience
- **Better error messages** and stack traces
- **Built-in development server** with `npm run dev`
- **Preview builds** with `npm run preview`

## Usage

### Development
```bash
npm run dev    # Start development server with HMR
```

### Building
```bash
npm run build  # Build for production
```

### Preview
```bash
npm run preview  # Preview production build locally
```

## Notes
- Sass deprecation warnings are present but don't affect functionality
- Custom build scripts (`custom-element-flow` and `co-app-scripts`) are preserved for existing workflows
- The migration maintains full compatibility with the existing component structure and output format