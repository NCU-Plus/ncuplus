import { defineNuxtConfig } from "nuxt";
import tailwindForms from "@tailwindcss/forms";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
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
    config: {
      plugins: [tailwindForms],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "",
    },
  },
});
