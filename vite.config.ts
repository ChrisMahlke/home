import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom']
  },
  build: {
    // Optimize build output
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      }
    },
    rollupOptions: {
      output: {
        // Optimize chunk splitting
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        },
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name || '')) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Optimize CSS
    cssCodeSplit: true,
    // Optimize source maps
    sourcemap: false,
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  // Optimize development server
  server: {
    hmr: {
      overlay: false
    }
  },
  // Optimize preview server
  preview: {
    port: 4173,
    strictPort: true
  }
});
