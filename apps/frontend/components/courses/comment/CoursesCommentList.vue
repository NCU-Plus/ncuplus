<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'comment']" size="lg" />
      <strong class="text-2xl">留言板</strong>
    </h3>
    <div class="bg-gray-300 h-fit min-h-full rounded-xl text-center">
      <div v-if="commentsData.length === 0" class="p-8">
        <strong v-if="commentsData.length === 0">尚無留言</strong>
      </div>
      <div v-else>
        <CoursesComment
          v-for="commentData of commentsData"
          :key="commentData.id"
          :comment="commentData"
          @reaction="emits('reaction', $event)"
          @complete-edit="emits('complete-edit', $event)"
          @delete="emits('delete', $event)"
        />
      </div>
      <textarea
        v-model="content"
        class="mx-8 my-4 w-4/5 outline outline-gray-200 rounded-sm resize-none"
        placeholder="留言... (Shift + Enter來發送訊息)"
        maxlength="255"
        @keypress.shift.enter="createComment()"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import type { APIComment } from "types/APIComment";
import { ReactionType } from "types/ReactionType";

defineProps<{ commentsData: APIComment[] }>();
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

const content = ref("");

function createComment() {
  emits("add", { content: content.value });
  content.value = "";
}
</script>
