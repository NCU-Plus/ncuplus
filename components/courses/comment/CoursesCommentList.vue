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
          :comment="commentData"
          @reaction="emits('reaction', $event)"
          @completeEdit="emits('completeEdit', $event)"
          @delete="emits('delete', $event)"
        />
      </div>
      <textarea
        class="mx-8 my-4 w-4/5 outline outline-gray-200 rounded-sm resize-none"
        placeholder="留言... (Shift + Enter來發送訊息)"
        v-model="content"
        @keypress.shift.enter="createComment()"
        maxlength="255"
      ></textarea>
    </div>
  </section>
</template>
<script setup lang="ts">
import { APIComment } from "~~/types/APIComment";
import { ReactionType } from "~/types/ReactionType";

const props = defineProps<{ commentsData: APIComment[] }>();
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

const content = ref("");

function createComment() {
  emits("add", { content: content.value });
  content.value = "";
}
</script>
