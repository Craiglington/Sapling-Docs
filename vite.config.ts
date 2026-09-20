import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    checker({
      typescript: true
    })
  ],
  publicDir: "assets",
  server: {
    port: 4200,
    strictPort: true,
    open: false
  },
  preview: {
    port: 4200,
    strictPort: true,
    open: false
  },
  envDir: "src/envs"
});
