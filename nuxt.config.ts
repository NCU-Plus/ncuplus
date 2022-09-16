import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
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
    public: { gaId: "", apiBaseUrl: "", deployDomain: "" },
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
  css: [
    "easymde/dist/easymde.min.css",
    "highlight.js/styles/default.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
});
