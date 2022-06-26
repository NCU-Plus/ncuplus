<template>
  <div class="page-wrapper">
    <div class="page">
      <section>
        <h1 class="text-3xl">個人檔案</h1>
        <div class="mt-4">
          <form @submit.prevent="submit" class="space-y-2">
            <div>
              <dl>
                <dt>
                  <label for="name">名稱</label>
                </dt>
                <dd>
                  <input
                    @keypress.enter.prevent
                    id="name"
                    type="text"
                    class="form-input"
                    v-model="form.name"
                  />
                </dd>
              </dl>
            </div>
            <button class="button">送出</button>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APIClient } from "~~/helpers/APIClient";
import { UserManager } from "~~/managers/UserManager";
import { store, ToastType } from "~~/plugins/store";
import { APIProfile } from "~~/types/APIProfiile";
import { APIResponse } from "~~/types/APIResponse";

const loggedInUser = useLoggedInUser();

const form = ref({
  name: loggedInUser.value?.profile.name ?? "",
});

async function submit() {
  const config = useRuntimeConfig();
  const resp = await APIClient.getInstance().fetch<APIResponse<APIProfile>>(
    `${config.public.apiBaseUrl}/profiles/${loggedInUser.value?.profile.id}`,
    {
      method: "PUT",
      body: { profile: form.value },
    }
  );
  if (resp.statusCode === 200) {
    await UserManager.getInstance().refreshCache(loggedInUser.value!.id);
    loggedInUser.value = await UserManager.getInstance().fetch(
      loggedInUser.value!.id
    );
    store.dispatch("pushToast", {
      type: ToastType.SUCCESS,
      message: "操作成功",
    });
  } else {
    throw new Error(resp.message);
  }
}
</script>
