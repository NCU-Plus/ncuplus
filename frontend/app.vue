<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { MetaBuilder } from "~~/helpers/MetaBuilder";

useHead({
  title: "NCU+",
  link: [{ rel: "icon", type: "image/x-icon", href: "/logo.ico" }],
  meta: new MetaBuilder()
    .addDescription("NCU+ - 中央大學智慧校園系統")
    .addOg("og:type", "website")
    .addTitle("NCU+")
    .addOg("og:site_name", "NCU+ - 中央大學智慧校園系統")
    .build(),
});
</script>
