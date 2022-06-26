import { APIClient } from "~/helpers/APIClient";
import { UserManager } from "~/managers/UserManager";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", async () => {
    const loggedInUser = useLoggedInUser();
    try {
      const resp = await APIClient.getInstance().getToken({
        autoNagvigate: false,
      });
      APIClient.getInstance().token = resp;
      loggedInUser.value = await UserManager.getInstance().fetch(
        JSON.parse(atob(resp.split(".")[1])).sub
      );
    } catch (e) {
      loggedInUser.value = null;
    }
  });
});
