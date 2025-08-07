import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    historyApiFallback: true, // Redirect semua route ke index.html
  }
})