import { APIClient } from "~/helpers/APIClient";
import { UserManager } from "~/managers/UserManager";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", async () => {
    const loggedInUser = useLoggedInUser();
    try {
      const client = APIClient.getInstance();
      await client.init();
      loggedInUser.value = await UserManager.getInstance().fetch(
        JSON.parse(atob(client.token!.split(".")[1])).sub
      );
    } catch (e) {
      loggedInUser.value = null;
    }
  });
});
