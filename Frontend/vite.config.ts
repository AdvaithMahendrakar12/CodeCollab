import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@babel/runtime/helpers/extends': '@babel/runtime/helpers/esm/extends',
    },
  },
  optimizeDeps: {
    exclude: ['@babel/runtime/helpers/extends']
  },
})


