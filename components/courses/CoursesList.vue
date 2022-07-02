<template>
  <table class="bg-white mb-6 w-full text-left">
    <thead>
      <tr>
        <th class="p-2 pl-3 align-middle border-t-gray-400">學期</th>
        <th class="p-2 pl-3 align-middle border-t-gray-400">課名</th>
        <th class="p-2 pl-3 align-middle border-t-gray-400">教師</th>
        <th class="p-2 pl-3 align-middle border-t-gray-400">開課單位</th>
        <th class="p-2 pl-3 align-middle border-t-gray-400">時間</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="courseData of pageCoursesData"
        :id="`c${courseData.year}-${courseData.semester}-${courseData.serialNo}`"
        :key="courseData.id"
        class="cursor-pointer hover:bg-gray-50"
        @click="navigateTo(`/courses/${courseData.id}`)"
      >
        <th class="p-2 pl-3 align-middle border-t-gray-400">
          {{ courseData.year }}-{{ formatSemester(courseData.semester) }}
        </th>
        <th class="p-2 pl-3 align-middle border-t-gray-400">
          {{ courseData.title }}
        </th>
        <th class="p-2 pl-3 align-middle border-t-gray-400">
          {{ courseData.teachers }}
        </th>
        <th class="p-2 pl-3 align-middle border-t-gray-400">
          {{ courseData.departmentName }}
        </th>
        <th class="p-2 pl-3 align-middle border-t-gray-400">
          {{ courseData.classTimes }}
        </th>
      </tr>
    </tbody>
  </table>
  <div>
    <ul class="my-5 flex">
      <li
        id="go-first-page"
        class="px-4 py-1 text-sky-600 hover:text-white hover:bg-sky-600 bg-white rounded-l-md cursor-pointer"
        @click="page = 1"
      >
        First
      </li>
      <li
        id="go-prev-page"
        class="px-4 py-1 text-sky-600 hover:text-white hover:bg-sky-600 bg-white cursor-pointer"
        @click="decreasePage"
      >
        Prev
      </li>
      <input
        id="page-input"
        v-model="page"
        type="number"
        class="w-14 py-1 text-center"
      />
      <li
        id="go-next-page"
        class="px-4 py-1 text-sky-600 hover:text-white hover:bg-sky-600 bg-white cursor-pointer"
        @click="increasePage"
      >
        Next
      </li>
      <li
        id="go-last-page"
        class="px-4 py-1 text-sky-600 hover:text-white hover:bg-sky-600 bg-white rounded-r-md cursor-pointer"
        @click="page = Math.floor(coursesData.length / 25 + 1)"
      >
        Last
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Course } from "~/types/Course";
import { formatSemester } from "@/helpers/course";

const props = defineProps<{
  coursesData: Course[];
}>();

const page = ref(1);

watch(
  () => page.value,
  () => {
    if (page.value < 1) {
      page.value = 1;
    } else if (page.value > Math.floor(props.coursesData.length / 25 + 1)) {
      page.value = Math.floor(props.coursesData.length / 25 + 1);
    }
  },
);

watch(
  () => props.coursesData,
  () => {
    page.value = 1;
  },
);

const pageCoursesData = computed(() => {
  return props.coursesData.slice((page.value - 1) * 25, page.value * 25);
});

function increasePage() {
  if (page.value < Math.floor(props.coursesData.length / 25 + 1)) {
    page.value++;
  }
}

function decreasePage() {
  if (page.value > 1) {
    page.value--;
  }
}
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
