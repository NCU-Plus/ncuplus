<template>
  <div class="flex px-3 py-2 rounded items-center justify-center">
    <button ref="openDropdownButton" @click="openDropdown = !openDropdown">
      <slot></slot>
      <font-awesome-icon class="ml-2" :icon="['fas', 'caret-down']" />
    </button>
    <transition name="dropdown">
      <ul v-if="openDropdown" class="absolute top-full w-32 bg-blue-400">
        <li
          v-for="item of items"
          class="flex flex-col border-b-[1px] border-white"
        >
          <button class="py-1 text-left" @click="item.action()">
            <span class="pl-4">{{ item.label }}</span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: {
    label: string;
    action: () => void;
  }[];
}>();
const openDropdown = ref(false);
const openDropdownButton = ref<HTMLButtonElement | null>(null);

const dropdownPosition = computed(() => {
  if (!openDropdownButton.value) {
    return {
      x: 0,
      y: 0,
    };
  }
  return {
    x: openDropdownButton.value.offsetLeft,
    y:
      openDropdownButton.value.offsetTop +
      openDropdownButton.value.offsetHeight +
      40,
  };
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.1s ease-out;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}
</style>
