import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-input-mask', 'react-lucky-wheel'],
  },
  server: {
    host: true, 
    port: 5173, 
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});