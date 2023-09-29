import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  // in production, the proxy may or may not work, thus we need CORS
  server: {
    port: 3000,
    proxy:{
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: true
      }
    }
  },
});
