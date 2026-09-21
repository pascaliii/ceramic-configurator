import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    // three.js is ~696 kB minified – inherent library size, raise limit to suppress false-positive warning
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three'],
          'vendor-r3f':   ['@react-three/fiber', '@react-three/drei'],
          'vendor-ui':    ['classnames', '@tippyjs/react'],
        },
      },
    },
  },
})
