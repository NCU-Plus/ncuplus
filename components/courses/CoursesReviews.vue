<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'comments']" size="lg" />
      <strong class="text-2xl">課程心得 / 討論</strong>
    </h3>
    <div
      class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"
      v-for="reviewData of reviewsData"
    >
      <div class="flex flex-col space-y-2 text-gray-600 mb-6">
        <a class="text-sky-600">{{ getUsernameById(reviewData.authorId) }}</a>
        <p v-if="reviewData.createdAt === reviewData.updatedAt">
          {{ toDatetimeString(new Date(reviewData.createdAt)) }}
        </p>
        <p v-else>
          {{ toDatetimeString(new Date(reviewData.updatedAt)) }} 編輯
        </p>
      </div>
      <textarea
        v-if="editing === reviewData.id"
        v-model="editingContent"
        class="px-5 py-1 h-60 outline outline-gray-200 rounded-sm resize-none"
        maxlength="100000"
      >
      </textarea>
      <pre v-else class="whitespace-pre-wrap">{{ reviewData.content }}</pre>
      <div class="flex justify-between space-x-2 pr-5 py-2 text-gray-600">
        <div class="flex space-x-2">
          <div
            class="cursor-pointer"
            @click="
              emits('reaction', {
                operation: ReactionType.LIKE,
                id: reviewData.id,
              })
            "
          >
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
            {{
              reviewData.reactions.filter((e) => e.type === ReactionType.LIKE)
                .length
            }}
          </div>
          <div
            class="cursor-pointer"
            @click="
              emits('reaction', {
                operation: ReactionType.DISLIKE,
                id: reviewData.id,
              })
            "
          >
            <font-awesome-icon :icon="['fas', 'thumbs-down']" />
            {{
              reviewData.reactions.filter(
                (e) => e.type === ReactionType.DISLIKE
              ).length
            }}
          </div>
        </div>
        <div class="flex space-x-2" v-if="editing === reviewData.id">
          <button
            @click="emits('cancelEdit')"
            class="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
          >
            取消
          </button>
          <button
            @click="
              emits('completeEdit', {
                id: reviewData.id,
                content: editingContent,
              })
            "
            class="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
          >
            送出
          </button>
        </div>
        <CoursesOpenDropdownMenuButton
          v-else
          @openDropdownMenu="openDropdownMenu(reviewData.id, $event)"
          @closeDropdownMenu="emits('closeDropdownMenu')"
        />
      </div>
    </div>
    <div class="flex flex-col pl-5 mb-4 border-l-4 border-green-400 space-y-2">
      <textarea
        class="px-5 py-1 h-60 outline outline-gray-200 rounded-sm resize-none"
        placeholder="我要發文..."
        v-model="content"
        maxlength="100000"
      >
      </textarea>
      <div class="flex justify-end">
        <button
          @click="createReview()"
          class="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
        >
          送出
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { DropdownMenuOptions } from "./CoursesDropdownMenuOptions";
import { getUsernameById } from "@/helpers/user";
import { toDatetimeString } from "@/helpers/time";
import { ReactionType } from "~~/types/ReactionType";
import { APIReview } from "~~/types/APIReview";

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
const props = defineProps<{ reviewsData: APIReview[]; editing: number }>();
const content = ref("");
const editingContent = ref("");

function openDropdownMenu(id: number, event: MouseEvent) {
  emits("openDropdownMenu", {
    type: "review",
    show: true,
    id: id,
    isAuthor: true, // TODO: check user is a author
    position: {
      x: event.pageX,
      y: event.pageY,
    },
  });
}

function createReview() {
  emits("add", { content: content.value });
  content.value = "";
}

watch(
  () => props.editing,
  (newValue, oldValue) => {
    if (oldValue === 0 && newValue !== 0) {
      editingContent.value = props.reviewsData.find(
        (reviewData) => reviewData.id === newValue
      )!.content;
    }
  }
);
</script>
