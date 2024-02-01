import { resolve } from "path";
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    environment: "jsdom",
    alias: {
      types: resolve(__dirname, "types"),
    },
  },
});
