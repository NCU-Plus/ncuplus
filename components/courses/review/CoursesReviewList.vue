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
      <MarkdownEditor ref="mdEditor" placeholder="我要發文..." />
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
import MarkdownEditor from "~~/components/markdown/MarkdownEditor.vue";

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
const mdEditor = ref<InstanceType<typeof MarkdownEditor> | null>(null);

function createReview() {
  const content = mdEditor.value?.getMdeInstance().value();
  if (content === undefined) throw new Error("editor is not ready");
  emits("add", { content });
  mdEditor.value?.getMdeInstance().value("");
}

function insertTemplate() {
  const content = mdEditor.value?.getMdeInstance().value();
  if (content === undefined) throw new Error("editor is not ready");
  mdEditor.value?.getMdeInstance().value(content + courseReviewTemplate);
}
</script>
