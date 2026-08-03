import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { crx } from '@crxjs/vite-plugin';
import manifest from "./manifest.config.ts";


export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    crx({ manifest }),
  ],
});