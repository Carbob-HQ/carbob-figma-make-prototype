import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const FIGMA_ASSET_PREFIX = 'figma:asset/'
const FIGMA_ASSET_VIRTUAL_PREFIX = '\0figma-asset:'
const TRANSPARENT_PIXEL_DATA_URI =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5m5wAAAABJRU5ErkJggg=='

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    {
      name: 'figma-asset-fallback',
      enforce: 'pre',
      resolveId(id) {
        if (!id.startsWith(FIGMA_ASSET_PREFIX)) return null
        return `${FIGMA_ASSET_VIRTUAL_PREFIX}${id.slice(FIGMA_ASSET_PREFIX.length)}`
      },
      load(id) {
        if (!id.startsWith(FIGMA_ASSET_VIRTUAL_PREFIX)) return null
        return `export default ${JSON.stringify(TRANSPARENT_PIXEL_DATA_URI)};`
      },
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
