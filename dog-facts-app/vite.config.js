import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: './', // важно для GitHub Pages
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        dogFacts: './dog-facts.html',
        dogImages: './dog-images.html',
        randomFacts: './random-facts.html'
      }
    }
  }
})
