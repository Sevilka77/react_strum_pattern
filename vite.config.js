import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteRemoveConsole from "vite-plugin-remove-console";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [],
        plugins: [],
        // Use .babelrc files
        babelrc: true,
        // Use babel.config.js files
        configFile: true,
      },
    }),

    viteRemoveConsole(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "/",
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "[name][extname]",
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@mui/material"],
        },
      },
    },
  },
});
