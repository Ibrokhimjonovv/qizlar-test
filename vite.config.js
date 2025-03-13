import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-input-mask', 'react-lucky-wheel'],
  },
  server: {
    host: true, // Local tarmoqda ochish uchun
    port: 5173, // Istalgan port raqami
  },
});