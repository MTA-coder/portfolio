import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from 'vite-imagetools';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    }
  },
  plugins: [
    react(),
    imagetools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'offline.html'],
      manifest: {
        name: 'Mohammed Tawfeq Amiri Portfolio',
        short_name: 'Portfolio',
        theme_color: '#0b011e',
        background_color: '#0b011e',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        // Keep SPA fallback
        navigateFallback: '/index.html',
        // Precache additional critical assets
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
        runtimeCaching: [
          // Unsplash external images (already present)
          {
            urlPattern: /https:\/\/images\.unsplash\.com\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
            }
          },
          // Google Font stylesheets
          {
            urlPattern: /https:\/\/fonts\.googleapis\.com\/.*$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' }
          },
          // Google Font files
          {
            urlPattern: /https:\/\/fonts\.gstatic\.com\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            }
          },
          // Local font files
          {
            urlPattern: /.*\.(?:woff2?|ttf|otf)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'local-fonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            }
          },
          // App JSON / data requests
          {
            urlPattern: /.*\.(?:json)$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'json-data' }
          },
          // Local images & media
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|gif|svg|webp|avif)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-images',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
            }
          }
        ],
        // Fallback logic injected via custom handler: serve offline.html for document requests when network & cache miss
        // (A lightweight runtime plugin approach can be added later if deeper logic required)
      }
    }),
    mode === 'development' &&
    componentTagger(),
    process.env.ANALYZE && visualizer({ filename: 'dist/stats.html', template: 'treemap', gzipSize: true, brotliSize: true })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
