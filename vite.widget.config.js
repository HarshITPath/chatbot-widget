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
        exports: 'default',
        // Optimize bundle
        manualChunks: undefined,
        inlineDynamicImports: true
      }
    },
    outDir: 'dist/widget',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Optimize for faster loading
    target: 'es2015',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    global: 'globalThis'
  },
  // Optimize dependencies for better loading
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
