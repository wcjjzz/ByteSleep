import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 项目页部署需要配置仓库名作为 base。
export default defineConfig({
  plugins: [react()],
  base: '/PSGScope/',
});
