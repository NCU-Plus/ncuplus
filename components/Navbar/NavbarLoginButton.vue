<template>
  <NavbarLinkButton v-if="!isLogin" to="/login">登入</NavbarLinkButton>
</template>

<script setup>
import { APIClient } from "~/helpers/APIClient";
const isLogin = ref(false);
try {
  const resp = await APIClient.getInstance().getToken({ autoNagvigate: false });
  isLogin.value = true;
} catch (e) {}
</script>
