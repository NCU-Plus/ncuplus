<template>
  <div>
    <ul class="my-5 flex">
      <li
        id="go-first-page"
        class="pagenator-button rounded-l-md"
        @click="page = 1"
      >
        First
      </li>
      <li id="go-prev-page" class="pagenator-button" @click="decreasePage">
        Prev
      </li>
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
      <li id="go-next-page" class="pagenator-button" @click="increasePage">
        Next
      </li>
      <li
        id="go-last-page"
        class="pagenator-button rounded-r-md"
        @click="page = maxPage"
      >
        Last
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";

const props = defineProps<{
  getState: () => Ref<number>;
  maxPage: number;
}>();
const page = props.getState();
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

watch(
  () => page.value,
  () => (inputPage.value = page.value),
);
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
