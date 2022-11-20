<template>
  <div class="w-full flex flex-col bg-white mb-6 text-left">
    <div
      class="flex px-2 py-2 space-x-2 justify-between overflow-x-hidden font-bold border-b-[1px] border-gray-200"
    >
      <div class="flex space-x-4">
        <div class="w-14 md:w-20 flex justify-center items-center">
          <span class="truncate">
            {{ labels.heading }}
          </span>
        </div>
        <div class="w-20 md:w-60 lg:w-80 flex flex-col justify-center">
          <div class="truncate">
            {{ labels.title }}
          </div>
          <div class="truncate">
            {{ labels.subtitle }}
          </div>
        </div>
        <div class="w-20 md:w-60 lg:w-80 flex items-center">
          <span class="truncate">
            {{ labels.description }}
          </span>
        </div>
      </div>
      <div class="w-20 md:w-40 flex justify-center items-center">
        <span class="truncate">
          {{ labels.other }}
        </span>
      </div>
    </div>
    <NuxtLink
      v-for="(row, i) of data"
      :key="i"
      :to="row.link"
      @click="row.onClick ?? (() => {})"
    >
      <div
        class="flex px-2 py-2 space-x-2 justify-between overflow-x-hidden border-b-[1px] border-gray-200"
      >
        <div class="flex space-x-4">
          <div class="w-14 md:w-20 flex justify-center items-center">
            <span class="truncate">
              {{ row.heading }}
            </span>
          </div>
          <div class="w-20 md:w-60 lg:w-80 flex flex-col">
            <div class="font-medium truncate">
              {{ row.title }}
            </div>
            <div class="font-light truncate">
              {{ row.subtitle }}
            </div>
          </div>
          <div class="w-20 md:w-60 lg:w-80 flex items-center">
            <span class="truncate">
              {{ row.description }}
            </span>
          </div>
        </div>
        <div class="w-20 md:w-40 flex justify-center items-center">
          <span class="truncate">
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
