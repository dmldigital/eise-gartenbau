import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  devToolbar: { enabled: false },
  site: process.env.SITE_URL || 'https://eise.de',
  // Unterpfad für die Vorschau auf GitHub Pages (z. B. /eise-gartenbau/); lokal und auf der eigenen Domain leer
  base: process.env.BASE_PATH || '/',
  server: {
    host: true,
    port: Number(process.env.PORT) || 4322,
  },
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
