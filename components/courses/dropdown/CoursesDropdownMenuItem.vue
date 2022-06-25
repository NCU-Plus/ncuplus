<template>
  <div
    class="px-6 py-2 bg-white cursor-pointer hover:bg-gray-100"
    @click="emits('action')"
  >
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (event: "action"): void;
}>();
</script>
