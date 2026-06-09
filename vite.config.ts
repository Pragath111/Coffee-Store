import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },

  vite: {
    base: "/",
  },
});