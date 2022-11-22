<template>
  <form class="w-full flex flex-col items-center">
    <div class="flex my-6 justify-center">
      <input
        :value="searchOptions.query"
        placeholder="課名/課號/老師"
        class="rounded-md pl-4 w-56 h-8"
        @input="
          update({
            ...searchOptions,
            query: ($event.target as HTMLInputElement).value,
          })
        "
        @keypress.enter.prevent
      />
      <div class="mx-4 flex items-center">
        <input
          id="advanceSearch"
          :value="searchOptions.advanceSearch"
          type="checkbox"
          @input="
            update({
              ...searchOptions,
              advanceSearch: ($event.target as HTMLInputElement).checked,
            })
          "
        />
        <label>進階搜尋</label>
      </div>
    </div>
    <div
      v-show="searchOptions.advanceSearch"
      id="searchOptions"
      class="flex my-6 space-x-2"
    >
      <div class="w-2/5 md:w-32 h-10">
        <select
          :value="searchOptions.semester"
          class="pl-4 pr-9 py-0 w-full h-full"
          @input="
            update({
              ...searchOptions,
              semester: ($event.target as HTMLInputElement).value,
            })
          "
        >
          <option value="">所有學期</option>
          <option
            v-for="semester in semesters"
            :key="semester"
            :class="'s' + semester"
            :value="semester"
          >
            {{ semester }}
          </option>
        </select>
      </div>
      <div class="w-3/5 md:w-96 h-10">
        <select
          :value="searchOptions.department"
          class="pl-4 pr-9 py-0 w-full h-full"
          @input="
            update({
              ...searchOptions,
              department: ($event.target as HTMLInputElement).value,
            })
          "
        >
          <option value="">開課單位</option>
          <option
            v-for="department in departments"
            :key="department"
            :class="department"
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
import { Course } from "types/Course";
import { formatSemester } from "~/helpers/course";
import { SearchOptions } from "./CoursesSearchOptions";

const route = useRoute();
const props = defineProps<{
  coursesData: Course[];
  searchOptions: SearchOptions;
}>();
const emits = defineEmits<{
  (e: "update:searchOptions", options: SearchOptions): void;
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

async function update(newOptions: SearchOptions) {
  await navigateTo({
    query: {
      ...route.query,
      query: newOptions.query,
      semester: newOptions.semester,
      department: newOptions.department,
    },
  });
  emits("update:searchOptions", newOptions);
}
</script>
