import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Inline assets smaller than 4kb directly into the bundle
    // (avoids extra HTTP round-trips for tiny icons / small images)
    assetsInlineLimit: 4096,

    // Produce source maps only in development (saves ~30% bundle size in prod)
    sourcemap: false,

    // Chunk splitting strategy:
    //  • vendor  — React, ReactDOM, React Router (changes rarely, cached long)
    //  • markdown — lazy-loaded only when a /blog/:slug route is visited
    //  • ui       — lucide icons (tree-shaken, but worth isolating)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router-dom')) {
            return 'vendor'
          }
          if (id.includes('react-markdown') ||
              id.includes('remark-gfm') ||
              id.includes('react-syntax-highlighter')) {
            return 'markdown'
          }
          if (id.includes('lucide-react')) {
            return 'ui'
          }
        },
      },
    },
  },

  // Dev server — fast HMR
  server: {
    port: 5173,
    // Pre-bundle these on startup so the first page load is instant
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-intersection-observer',
        'lucide-react',
      ],
    },
  },
})