import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false, // Don't empty since widget builds first
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
})
