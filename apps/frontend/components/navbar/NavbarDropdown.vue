<template>
  <div
    id="dropdown"
    class="flex px-3 py-5 rounded items-center justify-center"
    @mouseenter="openDropdown = true"
    @mouseleave="openDropdown = false"
  >
    <button ref="openDropdownButton">
      <slot />
      <font-awesome-icon class="ml-2" :icon="['fas', 'caret-down']" />
    </button>
    <transition name="dropdown">
      <ul v-if="openDropdown" class="absolute top-full w-32 bg-blue-400">
        <li
          v-for="item of items"
          :id="item.label"
          :key="item.label"
          class="flex flex-col border-b-[1px] border-white"
        >
          <button
            class="py-1 text-left"
            @click="
              item.action();
              openDropdown = !openDropdown;
            "
          >
            <span class="pl-4">{{ item.label }}</span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: {
    label: string;
    action: () => void;
  }[];
}>();
const openDropdown = ref(false);
const openDropdownButton = ref<HTMLButtonElement | null>(null);
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
