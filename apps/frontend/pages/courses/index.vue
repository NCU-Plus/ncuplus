<template>
  <div class="page-wrapper">
    <div class="page items-center">
      <CoursesSearch
        ref="search"
        v-model:search-options="searchOptions"
        :courses-data="coursesData ?? []"
      />
      <List
        :labels="{
          heading: '學期',
          title: '課名',
          description: '開課單位',
          other: '時間',
        }"
        :data="listData"
      />
      <Pagenator ref="pagenator" v-model:page="page" :max-page="maxPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Course } from "types/Course";
import { formatSemester } from "~/helpers/course";
import { MetaBuilder } from "~~/helpers/MetaBuilder";
import Pagenator from "~~/components/Pagenator.vue";
import CoursesSearch from "~~/components/courses/CoursesSearch.vue";
import { SearchOptions } from "~~/components/courses/CoursesSearchOptions";
import { getQuerys } from "~~/helpers/RouteUtils";

const route = useRoute();
const querys = getQuerys(route.query);
const { data: coursesData } = await useFetch<Course[]>(`/api/courses`);
const searchOptions = ref<SearchOptions>({
  advanceSearch: false,
  query: querys.query ?? "",
  semester: querys.semester ?? "",
  department: querys.department ?? "",
});
const filteredCoursesData = computed(() => {
  if (!coursesData.value) {
    return [] as Course[];
  }
  return coursesData.value
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
    });
});
const maxPage = computed(() =>
  Math.floor(filteredCoursesData.value.length / 15 + 1),
);
const page = ref(querys.page ? parseInt(querys.page) : 1);
if (page.value <= 0) page.value = 1;
else if (page.value > maxPage.value) page.value = maxPage.value;
const pagenator = ref<InstanceType<typeof Pagenator> | null>(null);
const search = ref<InstanceType<typeof CoursesSearch> | null>(null);

const pageCoursesData = computed(() =>
  filteredCoursesData.value.slice((page.value - 1) * 15, page.value * 15),
);

const listData = computed(() =>
  pageCoursesData.value.map((e) => ({
    heading: `${e.year}-${formatSemester(e.semester)}`,
    title: e.title,
    subtitle: e.teachers,
    description: e.departmentName,
    other: e.classTimes,
    link: `/courses/${e.id}`,
  })),
);

watch(
  () => filteredCoursesData.value,
  () => pagenator.value?.setPage(1),
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
