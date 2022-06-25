<template>
  <div class="md:container mx-auto min-h-screen">
    <div class="w-3/4 h-full mx-auto mt-12 mb-12 flex flex-col space-y-10">
      <!--Title-->
      <section class="mt-10">
        <h1 class="text-3xl">{{ course.title }} - {{ course.teachers }}</h1>
      </section>
      <!--info-->
      <CoursesInfo :course="course" />
      <!--comment-->
      <CoursesCommentList
        :commentsData="courseFeedback.comments"
        @add="
          add(
            courseFeedback.comments,
            createComment(course.classNo, $event.content)
          )
        "
        @reaction="add(courseFeedback.comments.find((e) => e.id === $event.id)!.reactions, createReaction('comment', $event.operation, $event.id))"
        @completeEdit="
          edit(courseFeedback.comments.find((e) => e.id === $event.id)! , editComment($event.id, $event.content))
        "
        @delete="
          del(courseFeedback.comments, $event.id, deleteComment($event.id))
        "
      />
      <!--review-->
      <CoursesReviewList
        :reviewsData="courseFeedback.reviews"
        @add="
          add(
            courseFeedback.reviews,
            createReview(course.classNo, $event.content)
          )
        "
        @reaction="add(courseFeedback.reviews.find((e) => e.id === $event.id)!.reactions, createReaction('review', $event.operation, $event.id))"
        @completeEdit="
          edit(courseFeedback.reviews.find((e) => e.id === $event.id)!, editReview($event.id, $event.content))
        "
        @delete="
          del(courseFeedback.reviews, $event.id, deleteReview($event.id))
        "
      />
      <!--past exams-->
      <CoursesPastExams
        :pastExamsData="courseFeedback.pastExams"
        @upload="
          add(courseFeedback.pastExams, createPastExam(course.classNo, $event))
        "
        @download="downloadPastExam($event.id)"
        @delete="deletePastExam($event.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Course } from "~/types/Course";
import { reactive, ref } from "vue";
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
} from "~/helpers/course-feedback";
import { APICourseFeedback } from "~~/types/APICourseFeedback";
import { APIComment } from "~~/types/APIComment";
import { APIReview } from "~~/types/APIReview";

const route = useRoute();

const { data: course } = await useFetch<Course>(
  `/api/courses/${route.params.id}`
);
const { data: courseFeedback } = await useFetch<APICourseFeedback>(
  `/api/course-feedbacks/${(course.value as unknown as Course).classNo}`
);

async function add<T>(target: T[], newEntryPromise: Promise<T | null>) {
  const newEntry = await newEntryPromise;
  if (newEntry) target.push(newEntry);
}

async function edit(
  target: APIComment | APIReview,
  editedEntryPromise: Promise<APIComment | APIReview | null>
) {
  const editedEntry = await editedEntryPromise;
  if (editedEntry) {
    target.content = editedEntry.content;
    target.updatedAt = editedEntry.updatedAt;
  }
}

async function del(
  target: APIComment[] | APIReview[],
  entryId: number,
  successPromise: Promise<boolean>
) {
  if (await successPromise)
    target.splice(
      target.findIndex((e) => e.id === entryId),
      1
    );
}
</script>
