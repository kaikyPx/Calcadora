import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: './', // Define caminhos relativos para funcionar em qualquer subdiretório do GitHub Pages
    define: {
      // Injeta a variável de ambiente de forma segura durante o build
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});