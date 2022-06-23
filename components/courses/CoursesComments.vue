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
        <div
          class="flex justify-between items-center w-full"
          v-for="commentData of commentsData"
        >
          <div class="flex flex-col w-full">
            <div class="flex justify-between w-full">
              <textarea
                v-if="editing === commentData.id"
                class="ml-8 mt-4 w-full outline outline-gray-200 rounded-sm resize-none"
                maxlength="255"
                v-model="editingContent"
                @keypress.shift.enter="
                  emits('completeEdit', {
                    id: commentData.id,
                    content: editingContent,
                  })
                "
                @keydown.esc="emits('cancelEdit')"
              ></textarea>
              <div
                v-else
                class="flex space-x-2 justify-center mx-2 md:mx-8 mt-4 my-auto"
              >
                <a class="text-sky-600">{{
                  getUsernameById(commentData.authorId)
                }}</a>
                <pre class="align-middle text-left whitespace-pre-wrap">{{
                  commentData.content
                }}</pre>
              </div>
            </div>
            <div
              class="flex mx-8 text-sm text-gray-600"
              v-if="editing === commentData.id"
            >
              按Shift+Enter送出，或按Esc取消
            </div>
            <div
              v-else
              class="flex justify-between md:justify-start space-x-2 items-center mx-2 md:mx-8 text-gray-600"
            >
              <p v-if="commentData.createdAt === commentData.updatedAt">
                {{ toDatetimeString(new Date(commentData.createdAt)) }}
              </p>
              <p v-else>
                {{ toDatetimeString(new Date(commentData.updatedAt)) }} 編輯
              </p>
              <div
                class="cursor-pointer flex items-center"
                @click="
                  emits('reaction', {
                    operation: ReactionType.LIKE,
                    id: commentData.id,
                  })
                "
              >
                <font-awesome-icon :icon="['fas', 'thumbs-up']" class="mr-1" />
                {{
                  commentData.reactions.filter(
                    (e) => e.type === ReactionType.LIKE
                  ).length
                }}
              </div>
              <div
                class="cursor-pointer flex items-center"
                @click="
                  emits('reaction', {
                    operation: ReactionType.DISLIKE,
                    id: commentData.id,
                  })
                "
              >
                <font-awesome-icon
                  :icon="['fas', 'thumbs-down']"
                  class="mr-1"
                />
                {{
                  commentData.reactions.filter(
                    (e) => e.type === ReactionType.DISLIKE
                  ).length
                }}
              </div>
            </div>
          </div>
          <CoursesOpenDropdownMenuButton
            @openDropdownMenu="openDropdownMenu(commentData.id, $event)"
            @closeDropdownMenu="emits('closeDropdownMenu')"
          />
        </div>
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
import { ref, watch } from "vue";
import { DropdownMenuOptions } from "./CoursesDropdownMenuOptions";
import { getUsernameById } from "@/helpers/user";
import { toDatetimeString } from "@/helpers/time";
import { APIComment } from "~~/types/APIComment";
import { ReactionType } from "~/types/ReactionType";

const props = defineProps<{ commentsData: APIComment[]; editing: number }>();
const emits = defineEmits<{
  (event: "openDropdownMenu", data: DropdownMenuOptions): void;
  (event: "closeDropdownMenu"): void;
  (event: "add", data: { content: string }): void;
  (event: "reaction", data: { operation: ReactionType; id: number }): void;
  (
    event: "completeEdit",
    data: {
      id: number;
      content: string;
    }
  ): void;
  (event: "cancelEdit"): void;
}>();

const content = ref("");
const editingContent = ref("");

function openDropdownMenu(id: number, event: MouseEvent) {
  emits("openDropdownMenu", {
    type: "comment",
    show: true,
    id: id,
    isAuthor: true, // TODO: check user is a author
    position: {
      x: event.pageX,
      y: event.pageY,
    },
  });
}

function createComment() {
  emits("add", { content: content.value });
  content.value = "";
}

watch(
  () => props.editing,
  (newValue, oldValue) => {
    if (oldValue === 0 && newValue !== 0) {
      editingContent.value = props.commentsData.find(
        (commentData) => commentData.id === newValue
      )!.content;
    }
  }
);
</script>
