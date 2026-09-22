import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
  server: {
    port: 9000,
    open: true, 
  },
  
  build: {
    outDir: 'dist',
    target: 'esnext', 
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});