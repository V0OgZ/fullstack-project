import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// 🏛️ GRUT PANOPTICON VITE CONFIG - Vision 5D→2.5D (PORT 8001 - Remplace quantum-visualizer)
export default defineConfig({
  plugins: [react()],
  
  // Configuration du serveur de développement - PORT 8001 QUANTUM GRUT
  server: {
    port: 8001,
    host: true,
    open: false,
    cors: true,
    // Proxy vers le backend Java Heroes of Time
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log(`🔄 GRUT Proxy: ${path} → http://localhost:8080${path}`)
          return path
        }
      },
      '/temporal': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  // Configuration du build
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          motion: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  },
  
  // Résolution des modules
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  
  // Variables d'environnement
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    '__GRUT_VERSION__': JSON.stringify('1.0.0-ontological'),
    '__BACKEND_URL__': JSON.stringify('http://localhost:8080')
  },
  
  // Configuration CSS
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          // Variables GRUT Cosmiques
          $grut-primary: #7c77c6;
          $grut-secondary: #ff77c6;
          $grut-accent: #77dbff;
          $grut-bg-dark: #0f0f23;
          $grut-bg-mid: #1a1a3a;
          $grut-bg-light: #2d1b69;
        `
      }
    }
  }
}) 