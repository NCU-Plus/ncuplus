<template>
  <div class="page-wrapper">
    <div class="page">
      <!--Title-->
      <section>
        <h1 class="text-3xl">
          {{ title }}
        </h1>
      </section>
      <!--info-->
      <CoursesInfo :course="(course as Course)" />
      <!--comment-->
      <CoursesCommentList
        :comments-data="(courseFeedback as APICourseFeedback).comments"
        @add="
          add(
            (courseFeedback as APICourseFeedback).comments,
            createComment((course as Course).classNo, $event.content),
          )
        "
        @reaction="
          add(
            (courseFeedback as APICourseFeedback).comments.find(
              (e) => e.id === $event.id,
            )!.reactions,
            createReaction('comment', $event.operation, $event.id),
          )
        "
        @complete-edit="
          edit(
            (courseFeedback as APICourseFeedback).comments.find(
              (e) => e.id === $event.id,
            )!,
            editComment($event.id, $event.content),
          )
        "
        @delete="
          del(
            (courseFeedback as APICourseFeedback).comments,
            $event.id,
            deleteComment($event.id),
          )
        "
      />
      <!--review-->
      <CoursesReviewList
        :reviews-data="(courseFeedback as APICourseFeedback).reviews"
        @add="
          add(
            (courseFeedback as APICourseFeedback).reviews,
            createReview((course as Course).classNo, $event.content),
          )
        "
        @reaction="
          add(
            (courseFeedback as APICourseFeedback).reviews.find(
              (e) => e.id === $event.id,
            )!.reactions,
            createReaction('review', $event.operation, $event.id),
          )
        "
        @complete-edit="
          edit(
            (courseFeedback as APICourseFeedback).reviews.find(
              (e) => e.id === $event.id,
            )!,
            editReview($event.id, $event.content),
          )
        "
        @delete="
          del(
            (courseFeedback as APICourseFeedback).reviews,
            $event.id,
            deleteReview($event.id),
          )
        "
      />
      <!--past exams-->
      <CoursesPastExamList
        :past-exams-data="(courseFeedback as APICourseFeedback).pastExams"
        @upload="
          add(
            (courseFeedback as APICourseFeedback).pastExams,
            createPastExam((course as Course).classNo, $event),
          )
        "
        @download="download($event.id, downloadPastExam($event.id))"
        @delete="
          del(
            (courseFeedback as APICourseFeedback).pastExams,
            $event.id,
            deletePastExam($event.id),
          )
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Course } from "~~/structures/Course";
import {
  createComment,
  createReaction,
  createPastExam,
  createReview,
  editComment,
  editReview,
  deleteComment,
  deleteReview,
  deletePastExam,
  downloadPastExam,
  add,
  del,
  edit,
} from "~/helpers/course-feedback";
import { APICourseFeedback } from "types/APICourseFeedback";
import { MetaBuilder } from "~~/helpers/MetaBuilder";
import { getParams } from "~~/helpers/RouteUtils";
import { APIResponse } from "~~/types/APIResponse";

definePageMeta({
  validate: async (route) => {
    const params = getParams(route.params);
    return /^[1-9][0-9]*$/.test(params.id ?? "");
  },
});
const config = useRuntimeConfig();
const route = useRoute();
const params = getParams(route.params);
const courses = (await useCache()).courses;
const t = courses.courses.find(
  (courses) => courses.id.toString() === params.id ?? "",
);
if (!t)
  throw createError({
    statusCode: 404,
    statusMessage: `Page Not Found: ${route.path}`,
  });
const course = ref(t);
const { data: courseFeedbackRes } = await useFetch<
  APIResponse<APICourseFeedback>
>(
  () => `${config.public.apiBaseUrl}/course-feedbacks/${course.value.classNo}`,
  {
    key: `${config.public.apiBaseUrl}/course-feedbacks/${course.value.classNo}`,
  },
);
if (!courseFeedbackRes.value || !courseFeedbackRes.value.data)
  throw createError({
    statusCode: 503,
    message:
      "Course feedback data is not available, please contact the website owner.",
  });
const courseFeedback = ref(courseFeedbackRes.value.data);

async function download(entryId: number, successPromise: Promise<boolean>) {
  if (await successPromise) {
    const t = courseFeedback.value.pastExams.find((e) => e.id === entryId);
    if (t) t.downloadCount += 1;
  }
}

const title = `${course.value.title}${
  course.value.teachers === "" ? "" : ` - ${course.value.teachers}`
}`;

useHead({
  title,
  meta: new MetaBuilder().addTitle(title).build(),
});
</script>
