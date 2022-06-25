<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'comments']" size="lg" />
      <strong class="text-2xl">課程心得 / 討論</strong>
    </h3>
    <CoursesReview
      v-for="review of reviewsData"
      :review="review"
      @reaction="emits('reaction', $event)"
      @completeEdit="emits('completeEdit', $event)"
      @delete="emits('delete', $event)"
    />
    <div class="flex flex-col pl-5 mb-4 border-l-4 border-green-400 space-y-2">
      <textarea
        class="px-5 py-1 h-60 outline outline-gray-200 rounded-sm resize-none"
        placeholder="我要發文..."
        v-model="content"
        maxlength="100000"
      >
      </textarea>
      <div class="flex justify-end">
        <button @click="createReview()" class="button">送出</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ReactionType } from "~~/types/ReactionType";
import { APIReview } from "~~/types/APIReview";

const emits = defineEmits<{
  (event: "add", data: { content: string }): void;
  (event: "reaction", data: { operation: ReactionType; id: number }): void;
  (
    event: "completeEdit",
    data: {
      id: number;
      content: string;
    }
  ): void;
  (event: "delete", data: { id: number }): void;
}>();
const props = defineProps<{ reviewsData: APIReview[] }>();
const content = ref("");

function createReview() {
  emits("add", { content: content.value });
  content.value = "";
}
</script>
