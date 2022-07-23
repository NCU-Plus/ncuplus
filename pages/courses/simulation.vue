<template>
  <div class="my-20 mx-4 min-h-screen">
    <iframe
      src="https://ncucf.zetaraku.dev/course-finder"
      title="ncu course finder"
      class="w-full min-h-screen"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { MetaBuilder } from "~~/helpers/MetaBuilder";

const title = "模擬排課";

useHead({
  title,
  meta: new MetaBuilder()
    .addTitle(title)
    .addDescription("使用嵌入至網站內的模擬排課系統")
    .build(),
});
</script>
