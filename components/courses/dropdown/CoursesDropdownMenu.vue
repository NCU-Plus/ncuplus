<template>
  <div
    v-click-outside="listener"
    class="w-6 h-full mx-2 md:mx-8 cursor-pointer open-dropdown-menu"
    @click="showDropdownMenu = true"
  >
    <font-awesome-icon
      class="hover:scale-110"
      :icon="['fas', 'ellipsis-v']"
      size="lg"
    />
    <div v-if="showDropdownMenu" id="dropdown-menu" class="absolute shadow-md">
      <div
        class="w-0 h-0 ml-1 border-l-8 border-r-8 border-b-8 border-b-white border-r-transparent border-l-transparent"
      />
      <div class="flex flex-col">
        <div v-for="item of items" :key="item.label">
          <CoursesDropdownMenuItem v-if="item.show" @action="item.action()">
            {{ item.label }}
          </CoursesDropdownMenuItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const showDropdownMenu = ref(false);

defineProps<{
  items: {
    label: string;
    action: () => void;
    show: boolean;
  }[];
}>();

function listener(el: Element) {
  return (event: MouseEvent) => {
    if (
      !(event.target as Element).isEqualNode(el) &&
      !(event.target as Element).parentElement?.isEqualNode(el) &&
      !(event.target as Element).parentElement?.parentElement?.isEqualNode(el)
    ) {
      showDropdownMenu.value = false;
    }
  };
}
</script>
