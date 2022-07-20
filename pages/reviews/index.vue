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
    </div>
  </div>
</template>

<script setup lang="ts">
import { MetaBuilder } from "~~/helpers/MetaBuilder";
import { UserManager } from "~~/managers/UserManager";
import { ReactionType } from "~~/types/ReactionType";
import { toDatetimeString } from "~~/helpers/time";

const { data: reviews } = await useFetch("/api/reviews");
const page = useReviewPage();
const mappedReviews = ref(
  await Promise.all(
    reviews.value.map(async (element) => {
      return {
        columns: {
          courseFeedbackClassNo: element.courseFeedbackClassNo,
          author:
            (await UserManager.getInstance().fetch(element.authorId))?.profile
              .name ?? "未知使用者",
          likes: element.reactions
            .filter((e) => e.type === ReactionType.LIKE)
            .length.toString(),
          time: toDatetimeString(element.updatedAt),
        },
        onClick: () => {},
      };
    }),
  ),
);

const pageReviews = computed(() =>
  mappedReviews.value.slice((page.value - 1) * 25, page.value * 25),
);

const title = "心得列表";

useHead({
  title,
  meta: new MetaBuilder()
    .addTitle(title)
    .addDescription("瀏覽本站現有的所有課程心得。")
    .build(),
});
</script>
