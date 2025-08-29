import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration for building the embeddable widget
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/widget.jsx',
      name: 'ChatbotWidget',
      fileName: (format) => `chatbot-widget.${format}.js`,
      formats: ['umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        format: 'umd',
        name: 'ChatbotWidget',
        exports: 'default'
      }
    },
    outDir: 'dist/widget',
    emptyOutDir: true,
    sourcemap: false,
    minify: false
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    global: 'globalThis'
  }
})
