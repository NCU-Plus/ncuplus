import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    alias: {
      "~~": resolve(__dirname, "."),
      "@@": resolve(__dirname, "."),
      "~": resolve(__dirname, "."),
      "@": resolve(__dirname, "."),
      assets: resolve(__dirname, "assets"),
      public: resolve(__dirname, "public"),
    },
  },
});
