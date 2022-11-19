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
import { Course } from "types/Course";
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
import { APIPastExam } from "types/APIPastExam";
import { MetaBuilder } from "~~/helpers/MetaBuilder";

const route = useRoute();

const { data: course } = await useFetch<Course>(
  () => `/api/courses/${route.params.id}`,
  { key: `/api/courses/${route.params.id}` },
);
if (!course.value) throw new Error(`Course ${route.params.id} not found.`);
const { data: courseFeedback } = await useFetch<APICourseFeedback>(
  () => `/api/course-feedbacks/${(course.value as Course).classNo}`,
  { key: `/api/course-feedbacks/${(course.value as Course).classNo}` },
);
if (!courseFeedback.value)
  throw new Error(
    `Course feedback ${(course.value as Course).classNo} not found.`,
  );

async function download(entryId: number, successPromise: Promise<boolean>) {
  if (await successPromise)
    (
      (courseFeedback.value as APICourseFeedback).pastExams.find(
        (e) => e.id === entryId,
      ) as APIPastExam
    ).downloadCount += 1;
}

const title = `${course.value.title}${
  course.value.teachers === "" ? "" : ` - ${course.value.teachers}`
}`;

useHead({
  title,
  meta: new MetaBuilder().addTitle(title).build(),
});
</script>
