import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    open: true,   
    port: 5173,
    host: '0.0.0.0',
    hmr: {
      clientPort: 5173
    }
  }
})

