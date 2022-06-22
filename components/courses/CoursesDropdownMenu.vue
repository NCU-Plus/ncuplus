<template>
  <div
    id="dropdown-menu"
    v-if="dropdownMenuOptions.show"
    class="absolute top-0 left-0 shadow-md"
    :style="{
      transform: `translate(${dropdownMenuOptions.position.x - 53}px, ${
        dropdownMenuOptions.position.y + 29
      }px)`,
    }"
  >
    <div
      class="w-0 h-0 ml-12 border-l-8 border-r-8 border-b-8 border-b-white border-r-transparent border-l-transparent"
    ></div>
    <div class="flex flex-col">
      <div
        class="px-6 py-2 bg-white cursor-pointer hover:bg-gray-100"
        @click="emits('edit')"
        v-if="dropdownMenuOptions.isAuthor"
      >
        編輯
      </div>
      <div
        class="px-6 py-2 bg-white cursor-pointer hover:bg-gray-100"
        @click="emits('delete')"
        v-if="dropdownMenuOptions.isAuthor"
      >
        刪除
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DropdownMenuOptions } from "./CoursesDropdownMenuOptions";

const props = defineProps<{ dropdownMenuOptions: DropdownMenuOptions }>();
const emits = defineEmits<{
  (event: "edit"): void;
  (event: "delete"): void;
}>();
</script>
