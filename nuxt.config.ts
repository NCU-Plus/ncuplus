import { defineNuxtConfig } from "nuxt";
import tailwindForms from "@tailwindcss/forms";
// @ts-ignore
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

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
      plugins: [tailwindForms, tailwindScrollbarHide],
    },
  },
  runtimeConfig: {
    gaId: "",
    public: {
      apiBaseUrl: "",
      deployDomain: "",
    },
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
  buildModules: ["@pinia/nuxt"],
});
