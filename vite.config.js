import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  base: '/LinkedIn-Messaging-with-Formatting-Option/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
