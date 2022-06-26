<template>
  <div
    @mouseenter="showDropdownMenu = true"
    @mouseleave="showDropdownMenu = false"
    class="flex justify-between items-center w-full"
  >
    <div class="flex flex-col w-full">
      <div class="flex justify-between w-full">
        <textarea
          v-if="editing"
          class="mx-8 mt-4 w-full outline outline-gray-200 rounded-sm resize-none"
          maxlength="255"
          v-model="editingContent"
          @keypress.shift.enter="completeEdit()"
          @keydown.esc="editing = false"
        ></textarea>
        <div
          v-else
          class="flex space-x-2 justify-center mx-2 md:mx-8 mt-4 my-auto"
        >
          <a class="text-sky-600">{{
            author?.profile.name ?? "此使用者不存在"
          }}</a>
          <pre class="align-middle text-left whitespace-pre-wrap">{{
            comment.content
          }}</pre>
        </div>
      </div>
      <div class="flex mx-8 text-sm text-gray-600" v-if="editing">
        按Shift+Enter送出，或按Esc取消
      </div>
      <div
        v-else
        class="flex justify-start space-x-2 items-center mx-2 md:mx-8 text-gray-600"
      >
        <p v-if="comment.createdAt === comment.updatedAt">
          {{ toDatetimeString(new Date(comment.createdAt)) }}
        </p>
        <p v-else>{{ toDatetimeString(new Date(comment.updatedAt)) }} 編輯</p>
        <div
          class="cursor-pointer flex items-center"
          @click="
            emits('reaction', {
              operation: ReactionType.LIKE,
              id: comment.id,
            })
          "
        >
          <font-awesome-icon :icon="['fas', 'thumbs-up']" class="mr-1" />
          {{
            comment.reactions.filter((e) => e.type === ReactionType.LIKE).length
          }}
        </div>
        <div
          class="cursor-pointer flex items-center"
          @click="
            emits('reaction', {
              operation: ReactionType.DISLIKE,
              id: comment.id,
            })
          "
        >
          <font-awesome-icon :icon="['fas', 'thumbs-down']" class="mr-1" />
          {{
            comment.reactions.filter((e) => e.type === ReactionType.DISLIKE)
              .length
          }}
        </div>
      </div>
    </div>
    <CoursesDropdownMenu
      v-show="showDropdownMenu && !editing"
      :items="[
        {
          label: '編輯',
          show:
            loggedInUser?.id === comment.authorId ||
            loggedInUser?.role === UserRole.ADMIN,
          action: () => {
            editing = true;
            editingContent = comment.content;
          },
        },
        {
          label: '刪除',
          show:
            loggedInUser?.id === comment.authorId ||
            loggedInUser?.role === UserRole.ADMIN,
          action: () => {
            emits('delete', { id: comment.id });
          },
        },
        {
          label: '檢舉',
          show: true,
          action: () => {},
        },
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { APIComment } from "~~/types/APIComment";
import { ReactionType } from "~~/types/ReactionType";
import { UserManager } from "~/managers/UserManager";
import { toDatetimeString } from "~/helpers/time";
import { UserRole } from "~~/types/UserRole";

const props = defineProps<{
  comment: APIComment;
}>();
const emits = defineEmits<{
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

const editingContent = ref("");
const editing = ref(false);
const showDropdownMenu = ref(false);
const author = ref(
  await UserManager.getInstance().fetch(props.comment.authorId)
);
const loggedInUser = useLoggedInUser();

function completeEdit() {
  editing.value = false;
  emits("completeEdit", {
    id: props.comment.id,
    content: editingContent.value,
  });
}
</script>
