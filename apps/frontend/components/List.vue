<template>
  <div class="w-full flex flex-col bg-white mb-6 text-left">
    <div
      class="flex px-2 py-2 space-x-2 justify-between overflow-x-hidden font-bold border-b-[1px] border-gray-200"
    >
      <div class="flex space-x-4">
        <div class="w-14 md:w-20 flex justify-center items-center">
          <span class="label-heading truncate">
            {{ labels.heading }}
          </span>
        </div>
        <div class="w-20 md:w-60 lg:w-80 flex flex-col justify-center">
          <div class="label-title truncate">
            {{ labels.title }}
          </div>
          <div class="label-subtitle truncate">
            {{ labels.subtitle }}
          </div>
        </div>
        <div class="w-20 md:w-60 lg:w-80 flex items-center">
          <span class="label-description truncate">
            {{ labels.description }}
          </span>
        </div>
      </div>
      <div class="w-20 md:w-40 flex justify-center items-center">
        <span class="label-other truncate">
          {{ labels.other }}
        </span>
      </div>
    </div>
    <NuxtLink
      v-for="(row, i) of data"
      :key="i"
      class="row-link"
      :to="row.link"
      @click="row.onClick ? row.onClick() : undefined"
    >
      <div
        class="flex px-2 py-2 space-x-2 justify-between overflow-x-hidden border-b-[1px] border-gray-200"
      >
        <div class="flex space-x-4">
          <div class="w-14 md:w-20 flex justify-center items-center">
            <span class="row-heading truncate">
              {{ row.heading }}
            </span>
          </div>
          <div class="w-20 md:w-60 lg:w-80 flex flex-col">
            <div class="row-title font-medium truncate">
              {{ row.title }}
            </div>
            <div class="row-subtitle font-light truncate">
              {{ row.subtitle }}
            </div>
          </div>
          <div class="w-20 md:w-60 lg:w-80 flex items-center">
            <span class="row-description truncate">
              {{ row.description }}
            </span>
          </div>
        </div>
        <div class="w-20 md:w-40 flex justify-center items-center">
          <span class="row-other truncate">
            {{ row.other }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  labels: {
    heading?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    other?: string;
  };
  data: {
    heading?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    other?: string;
    link?: string;
    onClick?: () => void;
  }[];
}>();
</script>
