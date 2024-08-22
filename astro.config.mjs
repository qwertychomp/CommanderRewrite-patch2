import { defineConfig } from "astro/config";
import node from '@astrojs/node';
import { ViteImageOptimizer as viteImageOptimizer } from "vite-plugin-image-optimizer";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "middleware",
  }),
  vite: {
      resolve: {
          preserveSymlinks: true
      },
      plugins: [
        viteImageOptimizer()
      ]
  },
  devToolbar: {
      enabled: false
  },
  integrations: [tailwind()]
});