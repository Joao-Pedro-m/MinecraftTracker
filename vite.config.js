import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MinecraftTracker/', // Substitui pelo nome exato do teu repositório entre barras
  server: {
    host: true
  }
})