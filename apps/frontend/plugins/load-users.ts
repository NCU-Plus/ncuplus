import { UserManager } from "~~/managers/UserManager";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", async () => {
    try {
      await UserManager.getInstance().refreshCache();
    } catch (e) {
      console.log(e);
    }
  });
});
