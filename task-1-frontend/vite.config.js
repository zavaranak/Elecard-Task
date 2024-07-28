import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
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
