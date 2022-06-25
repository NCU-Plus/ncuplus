<template>
  <NavbarLinkButton v-if="!loggedInUser" to="/login">登入</NavbarLinkButton>
</template>

<script setup>
const loggedInUser = useLoggedInUser();
</script>
