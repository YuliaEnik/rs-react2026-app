import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/rs-react2026-app/',
  server: {
    port: 5173,
    proxy: {
      '/api/cleveland': {
        target: 'https://openaccess-api.clevelandart.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cleveland/, ''),
      },
    },
  },
});
