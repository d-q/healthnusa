import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        historyApiFallback: true,
        port: 3000,
        proxy: {
            '/web': {
                target: 'http://localhost:8069',
                changeOrigin: true,
                secure: false
            }
        }
    }
})