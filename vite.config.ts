import { defineConfig } from 'vite';
import vinext from 'vinext';

export default defineConfig({
  plugins: [vinext()],
  ssr: {
    external: ['@prisma/client', '@prisma/adapter-better-sqlite3', 'better-sqlite3'],
  },
});
