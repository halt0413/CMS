import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  envDir: resolve(__dirname, "../.."),
  envPrefix: ["VITE_", "API_", "CMS_"],
  plugins: [react()],
  server: {
    port: 3000
  }
});
