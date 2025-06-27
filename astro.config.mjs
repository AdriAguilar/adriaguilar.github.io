// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import { siteUrl } from "./src/data/site.json";

// https://astro.build/config
export default defineConfig({
  base: "/portfolio/",
  vite: {
    plugins: [tailwindcss()],
    base: "/portfolio/"
  },
  integrations: [svelte(), sitemap()],
  site: siteUrl,
  build: {
    format: "file",
    assets: "assets"
  }
});
