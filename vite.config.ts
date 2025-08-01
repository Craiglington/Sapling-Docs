import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "assets",
  server: {
    host: "127.0.0.1",
    port: 4200,
    strictPort: true,
    open: false,
  },
  envDir: "src/envs"
});
