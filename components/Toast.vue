<template>
  <div v-if="store.toasts.length > 0" class="fixed w-full h-11 z-50 top-36">
    <div
      v-for="toast of store.toasts"
      :class="{
        flex: true,
        'w-[300px]': true,
        'h-full': true,
        'mx-auto': true,
        'bg-green-400': toast.type === ToastType.SUCCESS,
        'bg-orange-400': toast.type === ToastType.WARNING,
        'bg-red-400': toast.type === ToastType.ERROR,
        'rounded-lg': true,
        'justify-center': true,
        'items-center': true,
        'text-white': true,
        'text-lg': true,
        'mb-2': true,
      }"
    >
      <font-awesome-icon
        v-if="toast.type === ToastType.SUCCESS"
        :icon="['fas', 'check']"
        size="lg"
        class="mr-2"
      />
      <font-awesome-icon
        v-if="toast.type === ToastType.WARNING"
        :icon="['fas', 'exclamation-triangle']"
        size="lg"
        class="mr-2"
      />
      <font-awesome-icon
        v-if="toast.type === ToastType.ERROR"
        :icon="['fas', 'times']"
        size="lg"
        class="mr-2"
      />
      {{ toast.message }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ToastType, useToast } from "~/stores/toast";

const store = useToast();
</script>
