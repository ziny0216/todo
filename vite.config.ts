import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
             @use "@/styles/abstracts/variables" as *;
             @use "@/styles/abstracts/mixins" as *;
             @use "@/styles/base/typography" as *;
             
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 경로 별칭 설정
    },
  },
});
