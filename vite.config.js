import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Si vas a publicar en GitHub Pages en https://<usuario>.github.io/<repo>/
// cambia "base" por '/<nombre-del-repositorio>/'. Para Vercel/Netlify deja '/'.
export default defineConfig({
  plugins: [react()],
  
base: '/carnet-de-route-du-fran-ais/',
})
