import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio', // important for GitHub Pages
  test: {
    globals: true,
    setupFiles: 'src/setupTests.js',
    environment: 'jsdom',
  }
});
