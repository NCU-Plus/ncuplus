<template>
  <NavbarDropdown
    :items="[
      {
        label: '個人檔案',
        action: () => navigateTo('/user/profile'),
      },
      {
        label: '登出',
        action: () => logout(),
      },
    ]"
    v-if="loggedInUser"
  >
    {{ loggedInUser?.name }}
  </NavbarDropdown>
</template>

<script setup lang="ts">
import { APIClient } from "~/helpers/APIClient";
import { APIResponse } from "~~/types/APIResponse";

const loggedInUser = useLoggedInUser();

async function logout() {
  const config = useRuntimeConfig();
  const client = APIClient.getInstance();
  const resp = await client.fetch<APIResponse<any>>(
    `${config.public.apiBaseUrl}/auth/logout`,
    {
      method: "POST",
    }
  );
  if (resp.statusCode === 200) {
    client.resetToken();
    loggedInUser.value = null;
    navigateTo("/");
  } else {
    throw new Error(resp.message);
  }
}
</script>
