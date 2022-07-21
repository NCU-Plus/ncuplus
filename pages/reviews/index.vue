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
        <ReviewFrame ref="reviewFrame" :review="viewingReview" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MetaBuilder } from "~~/helpers/MetaBuilder";
import { UserManager } from "~~/managers/UserManager";
import { ReactionType } from "~~/types/ReactionType";
import { toDatetimeString } from "~~/helpers/time";
import ReviewFrame from "~~/components/review/ReviewFrame.vue";

const { data: reviews } = await useFetch("/api/reviews");
const page = useReviewPage();
const reviewFrame = ref<InstanceType<typeof ReviewFrame> | null>(null);
const viewingReviewId = ref(reviews.value[0].id);
const mappedReviews = ref(
  await Promise.all(
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
  ),
);

const pageReviews = computed(() =>
  mappedReviews.value.slice((page.value - 1) * 25, page.value * 25),
);
const viewingReview = computed(() => {
  const review = reviews.value.find((e) => e.id === viewingReviewId.value);
  if (review) return review;
  throw new Error("Review not found");
});

const title = "心得列表";

useHead({
  title,
  meta: new MetaBuilder()
    .addTitle(title)
    .addDescription("瀏覽本站現有的所有課程心得。")
    .build(),
});
</script>
