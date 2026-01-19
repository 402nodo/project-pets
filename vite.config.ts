import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api/pump-fun': {
        target: 'https://pump.fun',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pump-fun/, '/api'),
        secure: true,
      },
    },
  },
});




