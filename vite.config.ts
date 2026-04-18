import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
const env = loadEnv(mode, '.', '');

return {
plugins: [
react(),
tailwindcss(),

```
  // ✅ FIXED: Disable auto-generated manifest
  VitePWA({
    registerType: 'autoUpdate',
    manifest: false,

    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'osm-tiles',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'nominatim-api',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24,
            },
          },
        }
      ]
    }
  })
],

define: {
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
},

resolve: {
  alias: {
    '@': path.resolve(__dirname, '.'),
  },
},

server: {
  hmr: process.env.DISABLE_HMR !== 'true',
},
```

};
});
