<template>
  <div class="page-wrapper">
    <div class="page items-center">
      <TableList
        :titles="['課程', '作者', '讚數', '時間']"
        :rows="pageReviews"
      />
      <Pagenator
        :get-state="useReviewPage"
        :max-page="Math.floor(reviews.length / 25 + 1)"
      />
      <ClientOnly>
        <ReviewFrame
          ref="reviewFrame"
          :review="viewingReview"
          @reaction="
            add(
              reviews.find((e) => e.id === $event.id)!.reactions,
              createReaction('review', $event.operation, $event.id),
            ).then(() => mapReviews())
          "
          @complete-edit="
            edit(
              reviews.find((e) => e.id === $event.id)!,
              editReview($event.id, $event.content),
            ).then(() => mapReviews())
          "
          @delete="
            reviewFrame?.close();
            viewingReviewId = null;
            del(reviews, $event.id, deleteReview($event.id)).then(() =>
              mapReviews(),
            );
          "
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MetaBuilder } from "~~/helpers/MetaBuilder";
import { UserManager } from "~~/managers/UserManager";
import { ReactionType } from "~~/types/ReactionType";
import { toDatetimeString } from "~~/helpers/time";
import {
  createReaction,
  editReview,
  deleteReview,
  add,
  del,
  edit,
} from "~/helpers/course-feedback";
import ReviewFrame from "~~/components/review/ReviewFrame.vue";

const { data: reviews } = await useFetch("/api/reviews");
const page = useReviewPage();
const reviewFrame = ref<InstanceType<typeof ReviewFrame> | null>(null);
const viewingReviewId = ref<number | null>(null);
const mappedReviews = ref(await getMappedReviews());

const pageReviews = computed(() =>
  mappedReviews.value.slice((page.value - 1) * 25, page.value * 25),
);
const viewingReview = computed(() =>
  reviews.value.find((e) => e.id === viewingReviewId.value),
);

async function getMappedReviews() {
  return await Promise.all(
    reviews.value
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .map(async (element) => {
        return {
          columns: {
            courseFeedbackClassNo: element.courseFeedbackClassNo,
            author:
              (await UserManager.getInstance().fetch(element.authorId))?.profile
                .name ?? "未知使用者",
            likes: element.reactions
              .filter((e) => e.type === ReactionType.LIKE)
              .length.toString(),
            time: toDatetimeString(element.createdAt),
          },
          onClick: () => {
            viewingReviewId.value = element.id;
            reviewFrame.value?.show();
          },
        };
      }),
  );
}

async function mapReviews() {
  mappedReviews.value = await getMappedReviews();
}

const title = "心得列表";

useHead({
  title,
  meta: new MetaBuilder()
    .addTitle(title)
    .addDescription("瀏覽本站現有的所有課程心得。")
    .build(),
});
</script>
