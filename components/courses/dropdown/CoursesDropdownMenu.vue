<template>
  <div
    id="dropdown-menu"
    class="absolute top-0 left-0 shadow-md"
    :style="{
      transform: `translate(${position.x + (opts?.xOffset ?? 0)}px, ${
        position.y + (opts?.yOffset ?? 0)
      }px)`,
    }"
  >
    <div
      class="w-0 h-0 ml-1 border-l-8 border-r-8 border-b-8 border-b-white border-r-transparent border-l-transparent"
    ></div>
    <div class="flex flex-col">
      <CoursesDropdownMenuItem v-for="item of items" @action="item.action()">
        {{ item.label }}
      </CoursesDropdownMenuItem>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  items: {
    label: string;
    action: () => void;
  }[];
  position: {
    x: number;
    y: number;
  };
  opts?: {
    xOffset?: number;
    yOffset?: number;
  };
}>();
</script>
