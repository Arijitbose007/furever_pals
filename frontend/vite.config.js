import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0', // This makes Vite bind to all network interfaces
    port: 5173, // You can choose any port you prefer
    hmr: {
      port: 5173,
    }
  }
})
