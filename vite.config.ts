import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  root: 'src',
  build: {
    outDir: '../dist',
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  publicDir: "public"
})
