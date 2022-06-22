<template>
  <div class="md:container mx-auto min-h-screen">
    <div class="w-3/4 h-full mx-auto mt-12 mb-12 flex flex-col space-y-10">
      <!--Title-->
      <section class="mt-10">
        <h1 class="text-3xl">{{ course.title }} - {{ course.teachers }}</h1>
      </section>
      <!--info-->
      <section>
        <h3 class="flex space-x-3 items-center mb-10">
          <font-awesome-icon :icon="['fa', 'book']" size="lg" />
          <strong class="text-2xl">課程資訊</strong>
        </h3>
        <table class="w-full md:w-1/3 h-24">
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
                @click="showPastCourses"
                class="text-slate-800 cursor-pointer"
              >
                查看歷年相同課程<font-awesome-icon
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
              <td class="p-2">系所</td>
              <td class="p-2">編號</td>
              <td class="p-2">選別</td>
              <td class="p-2">修課上限</td>
              <td class="p-2">時間</td>
              <td class="p-2">密碼卡</td>
            </tr>
            <tr class="border-t-[1px] border-slate-300">
              <td class="p-2">
                {{ course.year }}-{{ formatSemester(course.semester) }}
              </td>
              <td class="p-2">{{ course.departmentName }}</td>
              <td class="p-2">{{ course.serialNo }}</td>
              <td class="p-2">{{ formatCourseType(course.courseType) }}</td>
              <td class="p-2">{{ course.limitCnt }}</td>
              <td class="p-2">{{ course.classTimes }}</td>
              <td class="p-2">
                {{ formatPasswordCard(course.passwordCard) }}
              </td>
            </tr>
            <tr
              v-show="showingPastCourses"
              v-for="pastCourseData of pastCoursesData"
              class="border-t-[1px] border-slate-300"
            >
              <td class="p-2">
                {{ pastCourseData.year }}-{{
                  formatSemester(pastCourseData.semester)
                }}
              </td>
              <td class="p-2">{{ pastCourseData.departmentName }}</td>
              <td class="p-2">{{ pastCourseData.serialNo }}</td>
              <td class="p-2">
                {{ formatCourseType(pastCourseData.courseType) }}
              </td>
              <td class="p-2">{{ pastCourseData.limitCnt }}</td>
              <td class="p-2">{{ pastCourseData.classTimes }}</td>
              <td class="p-2">
                {{ formatPasswordCard(pastCourseData.passwordCard) }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <!--comment-->
      <CoursesComments
        :commentsData="courseFeedback.comments"
        :editing="editingComment"
        @openDropdownMenu="openDropdownMenu"
        @closeDropdownMenu="dropdownMenuOptions.show = false"
        @add="createComment(course.classNo, $event.content)"
        @reaction="createReaction('comment', $event.operation, $event.id)"
        @completeEdit="
          editComment($event.id, $event.content);
          editingComment = 0;
        "
        @cancelEdit="editingComment = 0"
      />
      <!--review-->
      <CoursesReviews
        :reviewsData="courseFeedback.reviews"
        :editing="editingReview"
        @openDropdownMenu="openDropdownMenu"
        @closeDropdownMenu="dropdownMenuOptions.show = false"
        @add="createReview(course.classNo, $event.content)"
        @reaction="createReaction('review', $event.operation, $event.id)"
        @completeEdit="
          editReview($event.id, $event.content);
          editingReview = 0;
        "
        @cancelEdit="editingReview = 0"
      />
      <!--past exams-->
      <CoursesPastExams
        :pastExamsData="courseFeedback.pastExams"
        @upload="createPastExam(course.classNo, $event)"
        @download="downloadPastExam($event.id)"
        @delete="deletePastExam($event.id)"
      />
    </div>
    <CoursesDropdownMenu
      :dropdownMenuOptions="dropdownMenuOptions"
      @edit="setEditing()"
      @delete="dele()"
    />
  </div>
</template>

<script setup lang="ts">
import { Course } from "~/types/Course";
import { reactive, ref } from "vue";
import {
  formatCourseType,
  formatSemester,
  formatPasswordCard,
} from "~/helpers/course";
import {
  createComment,
  createReaction,
  createPastExam,
  createReview,
  editComment,
  editReview,
  deletePastExam,
  downloadPastExam,
} from "~/helpers/course-feedback";
import { DropdownMenuOptions } from "~/components/courses/CoursesDropdownMenuOptions";
import { AsyncData } from "#app";

const dropdownMenuOptions = reactive({
  type: "",
} as DropdownMenuOptions);
const editingComment = ref(0);
const editingReview = ref(0);
const showingPastCourses = ref(false);
const pastCourses = [] as any[];
const pastCoursesData = reactive([] as any[]);

const route = useRoute();

const { data: course } = (await useFetch(
  `/api/courses/${route.params.id}`
)) as unknown as AsyncData<Course, Error>;
const { data: courseFeedback } = await useFetch(
  `/api/course-feedback/${(course.value as unknown as Course).classNo}`
);

function openDropdownMenu(data: DropdownMenuOptions) {
  dropdownMenuOptions.show = data.show;
  dropdownMenuOptions.type = data.type;
  dropdownMenuOptions.id = data.id;
  dropdownMenuOptions.isAuthor = data.isAuthor;
  dropdownMenuOptions.position = data.position;
}

function setEditing() {
  if (dropdownMenuOptions.type === "comment") {
    editingComment.value = dropdownMenuOptions.id;
  } else {
    editingReview.value = dropdownMenuOptions.id;
  }
}

function dele() {
  // if (dropdownMenuOptions.type === "comment")
  //   del(dropdownMenuOptions.type, dropdownMenuOptions.id, commentsData);
  // else del(dropdownMenuOptions.type, dropdownMenuOptions.id, reviewsData);
}

async function showPastCourses() {
  showingPastCourses.value = !showingPastCourses.value;
  if (showingPastCourses.value && pastCoursesData.length === 0) {
    const tasks: Promise<any>[] = [];
    for (const pastCourse of pastCourses) {
      if (pastCourse.courseId != route.params.id)
        tasks.push(
          useFetch("/api/courses/:id", {
            params: {
              id: pastCourse.courseId,
            },
          })
        );
    }
    for (const { data: course } of await Promise.all(tasks)) {
      pastCoursesData.push(course);
    }
  }
}
</script>
