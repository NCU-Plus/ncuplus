import { fileURLToPath } from "url";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  alias: {
    types: fileURLToPath(new URL("types", import.meta.url)),
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-gtag",
    "@nuxt/test-utils/module",
  ],
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/vue-fontawesome",
    ],
  },
  typescript: {
    shim: false,
    strict: true,
  },
  tailwindcss: {
    cssPath: "~/assets/tailwind.css",
  },
  runtimeConfig: {
    public: { gtagId: "", apiBaseUrl: "", deployDomain: "" },
  },
  vue: {
    compilerOptions: {
      directiveTransforms: {
        "click-outside": () => ({
          props: [],
          needRuntime: true,
        }),
      },
    },
  },
  nitro: {
    devProxy: {
      "/open-api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  css: [
    "easymde/dist/easymde.min.css",
    "highlight.js/styles/default.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
});
