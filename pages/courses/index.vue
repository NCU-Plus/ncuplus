<template>
  <div class="md:container mx-auto min-h-screen">
    <div
      class="w-11/12 md:w-3/4 h-full mx-auto mt-20 md:mt-12 mb-12 flex flex-col items-center"
    >
      <CoursesSearch :courses-data="coursesData" @search="onSearch" />
      <CoursesList :courses-data="filteredCoursesData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchOptions } from "~/components/courses/CoursesSearchOptions";
import { Course } from "~/types/Course";
import { reactive, Ref, ref, watch } from "vue";

const { data: coursesData } = await useFetch(`/api/courses`);
const filteredCoursesData = ref([] as Course[]);

filteredCoursesData.value = coursesData.value.slice();

const searchOptions = reactive({
  query: "",
  semester: "",
  department: "",
} as SearchOptions);

watch(
  () => ({ ...searchOptions }),
  () => {
    filteredCoursesData.value = coursesData.value
      .filter((course: Course) => {
        if (searchOptions.semester !== "")
          return course.year + "-" + course.semester === searchOptions.semester;
        else return true;
      })
      .filter((course: Course) => {
        if (searchOptions.department !== "")
          return course.departmentName === searchOptions.department;
        else return true;
      })
      .filter((course: Course) => {
        if (searchOptions.query !== "")
          return (
            course.title.includes(searchOptions.query) ||
            course.teachers.includes(searchOptions.query) ||
            course.classNo.includes(searchOptions.query)
          );
        else return true;
      });
  }
);

const onSearch = (options: SearchOptions) => {
  searchOptions.query = options.query;
  searchOptions.department = options.department;
  searchOptions.semester = options.semester;
};
</script>
