import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
    viteStaticCopy({
      targets: [
        {
          src: "dist/index.html", // Исходный файл
          dest: "", // Копируем в корень папки dist
          rename: "404.html", // Переименовываем в 404.html
        },
      ],
    }),
  ],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        // Manual chunks
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@mui/material"],
        },
      },
    },
  },
});
