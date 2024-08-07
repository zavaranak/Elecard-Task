import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@icons': path.resolve(__dirname, 'src/icons'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  plugins: [react(), svgr({ include: '**/*.svg' })],
  preview: {
    host: true,
    port: 8080,
  },
  server: {
    host: true,
    port: 8000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://contest.elecard.ru/frontend_data',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
