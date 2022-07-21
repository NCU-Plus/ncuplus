<template>
  <div
    class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"
    @mouseenter="showDropdownMenu = true"
    @mouseleave="showDropdownMenu = false"
  >
    <div class="flex flex-col space-y-2 text-gray-600 mb-6">
      <a class="text-sky-600">{{ author?.profile.name ?? "此使用者不存在" }}</a>
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
    />
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
      <div v-if="editing" class="flex space-x-2">
        <button class="button" @click="editing = false">取消</button>
        <button class="button" @click="completeEdit()">送出</button>
      </div>
      <CoursesDropdownMenu
        v-show="!editing && showDropdownMenu"
        :items="[
          {
            label: '編輯',
            show:
              loggedInUser?.id === review.authorId ||
              (loggedInUser?.roles.includes(UserRole.ADMIN) ?? false),
            action: () => {
              editing = true;
              editingContent = review.content;
            },
          },
          {
            label: '刪除',
            show:
              loggedInUser?.id === review.authorId ||
              (loggedInUser?.roles.includes(UserRole.ADMIN) ?? false),
            action: () => {
              emits('delete', { id: review.id });
            },
          },
          {
            label: '檢舉',
            show: true,
            action: () => report?.show(),
          },
        ]"
      />
      <ReportFrame
        ref="report"
        @submit="
          createReport(
            $event.type,
            TargetType.REVIEW,
            review.id,
            $event.description,
          )
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { APIReview } from "~/types/APIReview";
import { ReactionType } from "~/types/ReactionType";
import { UserManager } from "~/managers/UserManager";
import { toDatetimeString } from "@/helpers/time";
import { UserRole } from "~~/types/UserRole";
import ReportFrame from "~~/components/report/ReportFrame.vue";
import { TargetType } from "~~/types/APIReport";
import { createReport } from "~~/helpers/report";

const props = defineProps<{
  review: APIReview;
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

const editingContent = ref("");
const editing = ref(false);
const showDropdownMenu = ref(false);
const author = ref(
  await UserManager.getInstance().fetch(props.review.authorId),
);
const loggedInUser = useLoggedInUser();
const report = ref<InstanceType<typeof ReportFrame> | null>(null);

function completeEdit() {
  editing.value = false;
  emits("complete-edit", {
    id: props.review.id,
    content: editingContent.value,
  });
}
</script>
