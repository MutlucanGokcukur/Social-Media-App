import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { serverConfig } from './src/config/config';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@'                                   : fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server                                    : serverConfig,
  optimizeDeps: {
    exclude                                 : ['node_modules', 'dist'],
  },
});
