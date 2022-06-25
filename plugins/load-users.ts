import { UserManager } from "~~/managers/UserManager";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook(
    "app:beforeMount",
    async () => await UserManager.getInstance().refreshCache()
  );
});
