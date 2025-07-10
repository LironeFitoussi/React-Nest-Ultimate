import path from "path"
import tailwindcss from "@tailwindcss/vite"

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            '@auth0/auth0-react',
            '@reduxjs/toolkit',
            'react-redux',
            '@tanstack/react-query'
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the warning limit to 1000kb
  },
  css: {
    // Ensure CSS is properly processed
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
