<template>
  <DialogFrame ref="dialog" class="w-11/12 md:w-3/4 h-3/4">
    <div class="flex flex-col space-y-4 p-4">
      <div>
        <div
          class="text-slate-800 cursor-pointer"
          @click="showingPastCourses = !showingPastCourses"
        >
          歷年課程頁面
          <font-awesome-icon
            v-if="!showingPastCourses"
            class="ml-2"
            :icon="['fas', 'caret-down']"
          />
          <font-awesome-icon v-else class="ml-2" :icon="['fas', 'caret-up']" />
        </div>
        <div v-show="showingPastCourses">
          <span v-show="pending">Loading...</span>
          <ul v-show="!pending">
            <li v-for="pastCourse of pastCourses" :key="pastCourse.id">
              <NuxtLink
                class="text-sky-600 hover:text-sky-800"
                :to="`/courses/${pastCourse.id}`"
              >
                {{
                  `${pastCourse.year}-${formatSemester(pastCourse.semester)} ${
                    pastCourse.title
                  }/${pastCourse.teachers}`
                }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <CoursesReview
        v-if="review"
        :review="review"
        @reaction="emits('reaction', $event)"
        @complete-edit="emits('complete-edit', $event)"
        @delete="emits('delete', $event)"
      />
    </div>
  </DialogFrame>
</template>

<script setup lang="ts">
import DialogFrame from "~~/components/DialogFrame.vue";
import { APIReview } from "types/APIReview";
import { Course } from "types/Course";
import { formatSemester } from "~~/helpers/course";
import { ReactionType } from "types/ReactionType";

const props = defineProps<{
  review?: APIReview;
}>();
const emits = defineEmits<{
  (event: "reaction", data: { operation: ReactionType; id: number }): void;
  (
    event: "complete-edit",
    data: {
      id: number;
      content: string;
    },
  ): void;
  (event: "delete", data: { id: number }): void;
}>();
const apiUrl = computed(
  () => `/api/past-courses/${props.review?.courseFeedbackClassNo}`,
);

const { pending, data: pastCourses } = useLazyFetch<Course[]>(apiUrl);
const dialog = ref<InstanceType<typeof DialogFrame> | null>(null);
const showingPastCourses = ref(true);

function show() {
  dialog.value?.show();
}

function close() {
  dialog.value?.close();
}

defineExpose({
  show,
  close,
});
</script>
