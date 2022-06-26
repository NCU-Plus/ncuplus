<template>
  <form class="w-full flex flex-col items-center">
    <div class="flex my-6 justify-center">
      <input
        @keypress.enter.prevent
        v-model="searchOptions.query"
        placeholder="課名/課號/老師"
        class="rounded-md pl-4 w-56 h-8"
      />
      <div class="mx-4 flex items-center">
        <input
          id="advanceSearch"
          v-model="searchOptions.advanceSearch"
          type="checkbox"
        />
        <label>進階搜尋</label>
      </div>
    </div>
    <div
      id="searchOptions"
      v-show="searchOptions.advanceSearch"
      class="flex my-6 space-x-2"
    >
      <div class="w-2/5 md:w-32 h-10">
        <select
          v-model="searchOptions.semester"
          class="pl-4 pr-9 py-0 w-full h-full"
        >
          <option value="">所有學期</option>
          <option
            :class="'s' + semester"
            v-for="semester in semesters"
            :value="semester"
          >
            {{ semester }}
          </option>
        </select>
      </div>
      <div class="w-3/5 md:w-96 h-10">
        <select
          v-model="searchOptions.department"
          class="pl-4 pr-9 py-0 w-full h-full"
        >
          <option value="">系所</option>
          <option
            :class="department"
            v-for="department in departments"
            :value="department"
          >
            {{ department }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Course } from "~/types/Course";
import { formatSemester } from "~/helpers/course";

const searchOptions = useSearchOptions();

const props = defineProps<{
  coursesData: Course[];
}>();

const semesters = computed(() => {
  const semesters = new Set<string>();
  for (const courseData of props.coursesData) {
    semesters.add(courseData.year + "-" + formatSemester(courseData.semester));
  }
  return Array.from(semesters).sort();
});

const departments = computed(() => {
  const departments = new Set<string>();
  for (const courseData of props.coursesData) {
    departments.add(courseData.departmentName);
  }
  return Array.from(departments).sort();
});
</script>
