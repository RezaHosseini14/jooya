import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "^/api/.*": {
        target: "http://localhost:3000",
      },
    },
  },
  resolve: {
    alias: [{ find: "src", replacement: resolve(__dirname, "./src") }],
  },
  plugins: [react()]
});
