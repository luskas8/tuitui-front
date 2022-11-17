import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    svgr(),
    tsconfigPaths({ root: "../" })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
        external: [
          /^node:.*/,
        ]
      }
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  publicDir: "public"
})
