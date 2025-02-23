import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: "watch-public-html",
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".html") && file.includes("public/pages/")) {
          server.ws.send({ type: "full-reload" });
        }
      },
    },
  ],
  server: {
    watch: {
      include: ["public/pages/**"],
    },
    hmr: {
      watch: ["public/pages/**"],
    },
  },
});
