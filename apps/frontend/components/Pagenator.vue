<template>
  <div>
    <ul class="my-5 flex">
      <NuxtLink
        :to="{
          query: {
            ...route.query,
            page: 1,
          },
        }"
        @click="emits('update:page', 1)"
      >
        <li id="go-first-page" class="pagenator-button rounded-l-md">First</li>
      </NuxtLink>
      <NuxtLink
        :to="{
          query: {
            ...route.query,
            page: page - 1 >= 1 ? page - 1 : 1,
          },
        }"
        @click="decreasePage"
      >
        <li id="go-prev-page" class="pagenator-button">Prev</li>
      </NuxtLink>
      <input
        id="page-input"
        :value="page"
        type="number"
        class="w-14 py-1 text-center"
        @keydown.enter="
          setPage(($event.target as HTMLInputElement).valueAsNumber)
        "
      />
      <NuxtLink
        :to="{
          query: {
            ...route.query,
            page: page + 1 <= maxPage ? page + 1 : maxPage,
          },
        }"
        @click="increasePage"
      >
        <li id="go-next-page" class="pagenator-button">Next</li>
      </NuxtLink>
      <NuxtLink
        :to="{
          query: {
            ...route.query,
            page: maxPage,
          },
        }"
        @click="emits('update:page', maxPage)"
      >
        <li id="go-last-page" class="pagenator-button rounded-r-md">Last</li>
      </NuxtLink>
    </ul>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const props = defineProps<{
  page: number;
  maxPage: number;
}>();
const emits = defineEmits<{
  (e: "update:page", page: number): void;
}>();

function increasePage(): boolean {
  if (props.page < props.maxPage) {
    emits("update:page", props.page + 1);
    return true;
  }
  return false;
}

function decreasePage(): boolean {
  if (props.page > 1) {
    emits("update:page", props.page - 1);
    return true;
  }
  return false;
}

function validatePage(page: number): boolean {
  if (page < 1 || page > props.maxPage) return false;
  return true;
}

async function setPage(newPage: number): Promise<boolean> {
  if (validatePage(newPage)) {
    await navigateTo({ query: { ...route.query, page: newPage } });
    emits("update:page", newPage);
    return true;
  }
  return false;
}

defineExpose({
  increasePage,
  decreasePage,
  setPage,
});
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
