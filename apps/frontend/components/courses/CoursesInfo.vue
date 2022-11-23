<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'book']" size="lg" />
      <strong class="text-2xl">課程資訊</strong>
    </h3>
    <table class="w-full h-24">
      <tbody>
        <tr>
          <td>
            課號: <strong>{{ course.classNo }}</strong>
          </td>
          <td>
            學分: <strong>{{ course.credit }}</strong>
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              class="text-sky-600 hover:text-sky-800"
              :href="`https://cis.ncu.edu.tw/Course/main/query/byKeywords?serialNo=${
                course.serialNo
              }&outline=${course.serialNo}&semester=${course.year}${
                course.semester + 1
              }`"
              >課程綱要</a
            >
          </td>
          <td
            class="text-slate-800 cursor-pointer"
            @click="showingPastCourses = !showingPastCourses"
          >
            查看歷年相同課程
            <font-awesome-icon
              v-if="!showingPastCourses"
              class="ml-2"
              :icon="['fas', 'caret-down']"
            />
            <font-awesome-icon
              v-else
              class="ml-2"
              :icon="['fas', 'caret-up']"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <table class="w-full md:w-3/4 h-fit text-center">
      <tbody>
        <tr class="border-t-[1px] border-slate-300">
          <td class="p-2">學期</td>
          <td class="p-2">開課單位</td>
          <td class="p-2">編號</td>
          <td class="p-2">選別</td>
          <td class="p-2">修課上限</td>
          <td class="p-2">時間</td>
          <td class="p-2">密碼卡</td>
        </tr>
        <tr
          v-for="pastCourse of courses"
          :key="pastCourse.id"
          class="border-t-[1px] border-slate-300"
        >
          <td class="p-2">
            {{ pastCourse.year }}-{{ formatSemester(pastCourse.semester) }}
          </td>
          <td class="p-2">
            {{ pastCourse.departmentName }}
          </td>
          <td class="p-2">
            {{ pastCourse.serialNo }}
          </td>
          <td class="p-2">
            {{ formatCourseType(pastCourse.courseType) }}
          </td>
          <td class="p-2">
            {{ pastCourse.limitCnt }}
          </td>
          <td class="p-2">
            {{ pastCourse.classTimes }}
          </td>
          <td class="p-2">
            {{ formatPasswordCard(pastCourse.passwordCard) }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { Course } from "types/Course";
import {
  formatCourseType,
  formatSemester,
  formatPasswordCard,
} from "~/helpers/course";

const props = defineProps<{ course: Course }>();
const showingPastCourses = ref(false);
const cache = await useCache();
const courses = computed(() => {
  if (showingPastCourses.value)
    return (
      cache.courses.courses.filter(
        (e) => e.classNo === props.course.classNo,
      ) ?? [props.course]
    );
  else return [props.course];
});
</script>
