import { defineConfig } from "vite";
import fs from "fs";

export default defineConfig({
  publicDir: "assets",
  server: {
    host: "127.0.0.1",
    port: 4200,
    strictPort: true,
    open: false,
    https: {
      key: fs.readFileSync("certs/server.key"),
      cert: fs.readFileSync("certs/server.crt")
    }
  },
  envDir: "src/envs"
});
