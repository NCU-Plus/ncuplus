<template>
  <div v-if="toastsData.length > 0" class="fixed w-full h-11 z-50 top-36">
    <div
      v-for="toastData of toastsData"
      :class="{
        flex: true,
        'w-[300px]': true,
        'h-full': true,
        'mx-auto': true,
        'bg-green-400': toastData.type === ToastType.SUCCESS,
        'bg-orange-400': toastData.type === ToastType.WARNING,
        'bg-red-400': toastData.type === ToastType.ERROR,
        'rounded-lg': true,
        'justify-center': true,
        'items-center': true,
        'text-white': true,
        'text-lg': true,
        'mb-2': true,
      }"
    >
      <font-awesome-icon
        :icon="['fas', 'check']"
        v-if="toastData.type === ToastType.SUCCESS"
        size="lg"
        class="mr-2"
      />
      <font-awesome-icon
        :icon="['fas', 'exclamation-triangle']"
        v-if="toastData.type === ToastType.WARNING"
        size="lg"
        class="mr-2"
      />
      <font-awesome-icon
        :icon="['fas', 'times']"
        v-if="toastData.type === ToastType.ERROR"
        size="lg"
        class="mr-2"
      />
      {{ toastData.message }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore, ToastType } from "@/plugins/store";
import { computed } from "vue";

const store = useStore();
const toastsData = computed(() => [...store.state.toasts]);
</script>
