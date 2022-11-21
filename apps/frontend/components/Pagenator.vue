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
        @click="page = 1"
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
        v-model="inputPage"
        type="number"
        class="w-14 py-1 text-center"
        @keydown.enter="
          if (validatePage(inputPage)) page = inputPage;
          else inputPage = page;
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
        @click="page = maxPage"
      >
        <li id="go-last-page" class="pagenator-button rounded-r-md">Last</li>
      </NuxtLink>
    </ul>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const props = defineProps<{
  maxPage: number;
}>();
const emits = defineEmits<{
  (e: "update:page", page: number): void;
}>();
const page = ref(1);
if (route.query.page) {
  if (typeof route.query.page === "string") {
    page.value = parseInt(route.query.page);
  } else {
    page.value = parseInt(route.query.page[0] ?? "1");
  }
  if (page.value <= 0) {
    page.value = 1;
  }
}

const inputPage = ref(page.value);

function increasePage() {
  if (page.value < props.maxPage) page.value++;
}

function decreasePage() {
  if (page.value > 1) page.value--;
}

function validatePage(page: number) {
  if (page < 1 || page > props.maxPage) return false;
  return true;
}

function setPage(newPage: number) {
  if (validatePage(newPage)) {
    page.value = newPage;
  }
}

watch(
  () => page.value,
  () => {
    inputPage.value = page.value;
    emits("update:page", page.value);
  },
);

defineExpose({
  page,
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
