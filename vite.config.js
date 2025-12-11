import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This ensures that all routes are handled by the React app
    // and not treated as static file requests
    hmr: {
      // Disable HMR for JSX files to prevent Vite from trying to serve them
      overlay: false
    }
  }
})
