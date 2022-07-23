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
      <CoursesInfo :course="course" />
      <!--comment-->
      <CoursesCommentList
        :comments-data="courseFeedback.comments"
        @add="
          add(
            courseFeedback.comments,
            createComment(course.classNo, $event.content),
          )
        "
        @reaction="
          add(
            courseFeedback.comments.find((e) => e.id === $event.id)!.reactions,
            createReaction('comment', $event.operation, $event.id),
          )
        "
        @complete-edit="
          edit(
            courseFeedback.comments.find((e) => e.id === $event.id)!,
            editComment($event.id, $event.content),
          )
        "
        @delete="
          del(courseFeedback.comments, $event.id, deleteComment($event.id))
        "
      />
      <!--review-->
      <CoursesReviewList
        :reviews-data="courseFeedback.reviews"
        @add="
          add(
            courseFeedback.reviews,
            createReview(course.classNo, $event.content),
          )
        "
        @reaction="
          add(
            courseFeedback.reviews.find((e) => e.id === $event.id)!.reactions,
            createReaction('review', $event.operation, $event.id),
          )
        "
        @complete-edit="
          edit(
            courseFeedback.reviews.find((e) => e.id === $event.id)!,
            editReview($event.id, $event.content),
          )
        "
        @delete="
          del(courseFeedback.reviews, $event.id, deleteReview($event.id))
        "
      />
      <!--past exams-->
      <CoursesPastExamList
        :past-exams-data="courseFeedback.pastExams"
        @upload="
          add(courseFeedback.pastExams, createPastExam(course.classNo, $event))
        "
        @download="download($event.id, downloadPastExam($event.id))"
        @delete="
          del(courseFeedback.pastExams, $event.id, deletePastExam($event.id))
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Course } from "~/types/Course";
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
import { APICourseFeedback } from "~~/types/APICourseFeedback";
import { APIPastExam } from "~~/types/APIPastExam";
import { MetaBuilder } from "~~/helpers/MetaBuilder";

const route = useRoute();

const { data: course } = await useFetch<Course>(
  `/api/courses/${route.params.id}`,
);
const { data: courseFeedback } = await useFetch<APICourseFeedback>(
  `/api/course-feedbacks/${(course.value as unknown as Course).classNo}`,
);

async function download(entryId: number, successPromise: Promise<boolean>) {
  if (await successPromise)
    (
      courseFeedback.value.pastExams.find(
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
