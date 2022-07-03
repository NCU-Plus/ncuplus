<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'comments']" size="lg" />
      <strong class="text-2xl">課程心得 / 討論</strong>
    </h3>
    <CoursesReview
      v-for="review of reviewsData"
      :key="review.id"
      :review="review"
      @reaction="emits('reaction', $event)"
      @complete-edit="emits('complete-edit', $event)"
      @delete="emits('delete', $event)"
    />
    <div class="flex flex-col pl-5 mb-4 border-l-4 border-green-400 space-y-2">
      <div class="flex justify-end">
        <button class="button" @click="insertTemplate()">
          插入樣板課程心得
        </button>
      </div>
      <textarea
        v-model="content"
        class="px-5 py-1 h-60 outline outline-gray-200 rounded-sm resize-none"
        placeholder="我要發文..."
        maxlength="100000"
      />
      <div class="flex justify-end">
        <button class="button" @click="createReview()">送出</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ReactionType } from "~~/types/ReactionType";
import { APIReview } from "~~/types/APIReview";
import { courseReviewTemplate } from "~/assets/course-review-template";

const emits = defineEmits<{
  (event: "add", data: { content: string }): void;
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
defineProps<{ reviewsData: APIReview[] }>();
const content = ref("");

function createReview() {
  emits("add", { content: content.value });
  content.value = "";
}

function insertTemplate() {
  content.value += courseReviewTemplate;
}
</script>
