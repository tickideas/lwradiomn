// vite.config.ts
// Vite configuration for Loveworld Radio Mongolia static site
// Builds a single-page React app with Tailwind CSS
// RELEVANT FILES: tsconfig.json, index.html, src/main.tsx

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
