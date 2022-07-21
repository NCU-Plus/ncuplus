<template>
  <dialog ref="dialog" class="dialog rounded-md" @click="onClick">
    <slot />
  </dialog>
</template>

<script setup lang="ts">
const dialog = ref<HTMLDialogElement | null>(null);
const emits = defineEmits<{
  (event: "show"): void;
  (event: "close"): void;
}>();

function onClick(event: MouseEvent) {
  if (event.target === dialog.value) close();
}

function show() {
  dialog.value?.showModal();
  emits("show");
}

function close() {
  dialog.value?.close();
  emits("close");
}

defineExpose({
  show,
  close,
});
</script>
