import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v0/ask": {
        target: "https://c538-14-123-253-17.ngrok-free.app",
        changeOrigin: true,
        rewrite: (path) => {
          return path;
        },
      },
    },
  },
});
