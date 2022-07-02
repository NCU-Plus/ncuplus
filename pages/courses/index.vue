<template>
  <div class="page-wrapper">
    <div class="page items-center">
      <CoursesSearch :courses-data="coursesData" />
      <CoursesList :courses-data="filteredCoursesData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Course } from "~/types/Course";
import { formatSemester } from "~/helpers/course";
import { MetaBuilder } from "~~/helpers/MetaBuilder";

const { data: coursesData } = await useFetch<Course[]>(`/api/courses`);
const searchOptions = useSearchOptions();

const filteredCoursesData = computed(() =>
  coursesData.value
    .filter((course: Course) => {
      if (searchOptions.value.semester !== "")
        return (
          course.year + "-" + formatSemester(course.semester) ===
          searchOptions.value.semester
        );
      else return true;
    })
    .filter((course: Course) => {
      if (searchOptions.value.department !== "")
        return course.departmentName === searchOptions.value.department;
      else return true;
    })
    .filter((course: Course) => {
      if (searchOptions.value.query !== "")
        return (
          course.title.includes(searchOptions.value.query) ||
          course.teachers.includes(searchOptions.value.query) ||
          course.classNo.includes(searchOptions.value.query)
        );
      else return true;
    }),
);

const title = "課程列表";

useHead({
  title,
  meta: new MetaBuilder()
    .addTitle(title)
    .addDescription("在此搜尋並篩選想觀看的課程心得與考古題。")
    .build(),
});
</script>
