<template>
  <div
    @mouseenter="showOpenDropdownMenuButton = true"
    @mouseleave="
      showOpenDropdownMenuButton = false;
      showDropdownMenu = false;
    "
    class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"
  >
    <div class="flex flex-col space-y-2 text-gray-600 mb-6">
      <a class="text-sky-600">{{ getUsernameById(review.authorId) }}</a>
      <p v-if="review.createdAt === review.updatedAt">
        {{ toDatetimeString(new Date(review.createdAt)) }}
      </p>
      <p v-else>{{ toDatetimeString(new Date(review.updatedAt)) }} 編輯</p>
    </div>
    <textarea
      v-if="editing"
      v-model="editingContent"
      class="px-5 py-1 h-60 outline outline-gray-200 rounded-sm resize-none"
      maxlength="100000"
    >
    </textarea>
    <pre v-else class="whitespace-pre-wrap">{{ review.content }}</pre>
    <div class="flex justify-between space-x-2 pr-5 py-2 text-gray-600">
      <div class="flex space-x-2">
        <div
          class="cursor-pointer"
          @click="
            emits('reaction', {
              operation: ReactionType.LIKE,
              id: review.id,
            })
          "
        >
          <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          {{
            review.reactions.filter((e) => e.type === ReactionType.LIKE).length
          }}
        </div>
        <div
          class="cursor-pointer"
          @click="
            emits('reaction', {
              operation: ReactionType.DISLIKE,
              id: review.id,
            })
          "
        >
          <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          {{
            review.reactions.filter((e) => e.type === ReactionType.DISLIKE)
              .length
          }}
        </div>
      </div>
      <div class="flex space-x-2" v-if="editing">
        <button @click="editing = false" class="button">取消</button>
        <button @click="completeEdit()" class="button">送出</button>
      </div>
      <CoursesOpenDropdownMenuButton
        v-show="!editing && showOpenDropdownMenuButton"
        @openDropdownMenu="showDropdownMenu = true"
        @closeDropdownMenu="showDropdownMenu = false"
        ref="openDropdownMenuButton"
      />
      <CoursesDropdownMenu
        v-if="!editing && showOpenDropdownMenuButton && showDropdownMenu"
        :items="[
          {
            label: '編輯',
            action: () => {
              editing = true;
              editingContent = review.content;
            },
          },
          {
            label: '刪除',
            action: () => {
              emits('delete', { id: review.id });
            },
          },
        ]"
        :position="{ x: (openDropdownMenuButton?.$el as HTMLElement).offsetLeft, y: (openDropdownMenuButton?.$el as HTMLElement).offsetTop + (openDropdownMenuButton?.$el as HTMLElement).offsetHeight}"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { APIReview } from "~/types/APIReview";
import { ReactionType } from "~/types/ReactionType";
import { getUsernameById } from "@/helpers/user";
import { toDatetimeString } from "@/helpers/time";
import CoursesOpenDropdownMenuButton from "~/components/courses/CoursesOpenDropdownMenuButton.vue";
const props = defineProps<{
  review: APIReview;
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
const openDropdownMenuButton = ref<InstanceType<
  typeof CoursesOpenDropdownMenuButton
> | null>(null);
const showOpenDropdownMenuButton = ref(false);

function completeEdit() {
  editing.value = false;
  emits("completeEdit", {
    id: props.review.id,
    content: editingContent.value,
  });
}
</script>
