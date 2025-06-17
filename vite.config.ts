// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/brands": "http://localhost:5000",
      "/models": "http://localhost:5000",
      "/generations": "http://localhost:5000",
      "/engines": "http://localhost:5000",
    },
  },
});
