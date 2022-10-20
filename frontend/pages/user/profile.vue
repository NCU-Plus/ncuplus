<template>
  <div class="page-wrapper">
    <div class="page">
      <section>
        <h1 class="text-3xl">個人檔案</h1>
        <div class="clearfix mt-4">
          <form class="my-2 space-y-2" @submit.prevent="submit">
            <div class="space-y-2">
              <dl class="space-y-1">
                <dt class="font-semibold">
                  <label for="name">名稱</label>
                </dt>
                <dd>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="form-input"
                    @keypress.enter.prevent
                  />
                </dd>
              </dl>
            </div>
            <button class="button">更新個人檔案</button>
          </form>
        </div>
      </section>
      <section>
        <h1 class="text-3xl">其他資訊</h1>
        <div class="clearfix mt-4">
          <div class="my-2 space-y-2">
            <dl class="space-y-1">
              <dt class="font-semibold">帳號類型</dt>
              <dd>
                {{ loggedInUser?.getRolesString().join(", ") }}
              </dd>
            </dl>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APIClient } from "~~/helpers/APIClient";
import { MetaBuilder } from "~~/helpers/MetaBuilder";
import { UserManager } from "~~/managers/UserManager";
import { ToastType, useToast } from "~~/stores/toast";
import { User } from "~~/structures/User";
import { APIProfile } from "types/APIProfiile";
import { APIResponse } from "types/APIResponse";

const title = "個人檔案";
const loggedInUser = useLoggedInUser();
const toast = useToast();

const form = ref({
  name: loggedInUser.value?.profile.name ?? "",
});

async function submit() {
  const config = useRuntimeConfig();
  const resp = await APIClient.getInstance().fetch<APIResponse<APIProfile>>(
    `${config.public.apiBaseUrl}/profiles/${loggedInUser.value?.profile.id}`,
    {
      method: "PUT",
      body: form.value,
    },
  );
  if (resp.statusCode === 200) {
    await UserManager.getInstance().refreshCache(
      (loggedInUser.value as User).id,
    );
    loggedInUser.value = await UserManager.getInstance().fetch(
      (loggedInUser.value as User).id,
    );
    toast.pushToast({
      type: ToastType.SUCCESS,
      message: "操作成功",
    });
  } else {
    throw new Error(resp.message);
  }
}

useHead({
  title,
  meta: new MetaBuilder().addTitle(title).build(),
});
</script>
