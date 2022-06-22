<template>
  <div
    class="w-6 h-full mx-2 md:mx-8 cursor-pointer open-dropdown-menu"
    @click="emits('openDropdownMenu', $event)"
    v-click-outside="listener"
  >
    <font-awesome-icon
      class="hover:scale-110"
      :icon="['fas', 'ellipsis-v']"
      size="lg"
    />
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits<{
  (event: "openDropdownMenu", data: MouseEvent): void;
  (event: "closeDropdownMenu"): void;
}>();

function listener(el: Element) {
  return (event: MouseEvent) => {
    if (
      !(event.target as Element).isEqualNode(el) &&
      !(event.target as Element).parentElement?.isEqualNode(el) &&
      !(event.target as Element).parentElement?.parentElement?.isEqualNode(el)
    ) {
      emits("closeDropdownMenu");
    }
  };
}
</script>
