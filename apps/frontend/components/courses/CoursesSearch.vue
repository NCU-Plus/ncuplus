<template>
  <form class="w-full flex flex-col items-center">
    <div class="flex my-6 justify-center">
      <input
        v-model="searchOptions.query"
        placeholder="課名/課號/老師"
        class="rounded-md pl-4 w-56 h-8"
        @keypress.enter.prevent
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
      v-show="searchOptions.advanceSearch"
      id="searchOptions"
      class="flex my-6 space-x-2"
    >
      <div class="w-2/5 md:w-32 h-10">
        <select
          v-model="searchOptions.semester"
          class="pl-4 pr-9 py-0 w-full h-full"
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
          v-model="searchOptions.department"
          class="pl-4 pr-9 py-0 w-full h-full"
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
import { getQuerys } from "~~/helpers/QueryUtils";
import { SearchOptions } from "./CoursesSearchOptions";

const route = useRoute();
const querys = getQuerys(route.query);
const props = defineProps<{
  coursesData: Course[];
}>();
const emits = defineEmits<{
  (e: "update:searchOptions", options: SearchOptions): void;
}>();

const searchOptions = ref<SearchOptions>({
  advanceSearch: false,
  query: querys.query ?? "",
  semester: querys.semester ?? "",
  department: querys.department ?? "",
});

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

async function update() {
  await navigateTo({
    query: {
      ...route.query,
      query: searchOptions.value.query,
      semester: searchOptions.value.semester,
      department: searchOptions.value.department,
    },
  });
  emits("update:searchOptions", searchOptions.value);
}

watch(() => searchOptions.value.department, update);
watch(() => searchOptions.value.semester, update);
watch(() => searchOptions.value.query, update);

defineExpose({
  searchOptions,
});
</script>
