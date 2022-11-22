<template>
  <div class="page-wrapper">
    <div class="page items-center">
      <List
        :labels="{
          heading: '課程',
          title: '標題',
          description: '讚數',
          other: '時間',
        }"
        :data="pageReviews"
      />
      <Pagenator ref="pagenator" v-model:page="page" :max-page="maxPage" />
      <ClientOnly>
        <ReviewFrame
          ref="reviewFrame"
          :review="viewingReview"
          @reaction="
            add(
              (reviews ?? []).find((e) => e.id === $event.id)!.reactions,
              createReaction('review', $event.operation, $event.id),
            ).then(() => mapReviews())
          "
          @complete-edit="
            edit(
              (reviews ?? []).find((e) => e.id === $event.id)!,
              editReview($event.id, $event.content),
            ).then(() => mapReviews())
          "
          @delete="
            reviewFrame?.close();
            viewingReviewId = null;
            del(reviews ?? [], $event.id, deleteReview($event.id)).then(() =>
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
import { ReactionType } from "types/ReactionType";
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
import Pagenator from "~~/components/Pagenator.vue";
import { getQuerys } from "~~/helpers/RouteUtils";
import { APIReview } from "~~/types/APIReview";

const route = useRoute();
const querys = getQuerys(route.query);
const { data: reviews } = await useFetch("/api/reviews");
if (reviews.value === null) {
  reviews.value = [];
}
const maxPage = computed(() =>
  Math.floor((reviews.value as APIReview[]).length / 15 + 1),
);
const page = ref(querys.page ? parseInt(querys.page) : 1);
if (page.value <= 0) page.value = 1;
else if (page.value > maxPage.value) page.value = maxPage.value;
const pagenator = ref<InstanceType<typeof Pagenator> | null>(null);
const reviewFrame = ref<InstanceType<typeof ReviewFrame> | null>(null);
const viewingReviewId = ref<number | null>(null);
const mappedReviews = ref(await getMappedReviews());

const pageReviews = computed(() =>
  mappedReviews.value.slice((page.value - 1) * 15, page.value * 15),
);
const viewingReview = computed(() =>
  (reviews.value as APIReview[]).find((e) => e.id === viewingReviewId.value),
);

async function getMappedReviews() {
  return await Promise.all(
    (reviews.value as APIReview[])
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .map(async (e) => {
        const result = e.content.match(/# (.*)\n/);
        const title = result === null ? e.content : result[1];
        return {
          heading: e.courseFeedbackClassNo,
          title: title,
          subtitle:
            (await UserManager.getInstance().fetch(e.authorId))?.profile.name ??
            "未知使用者",
          description: e.reactions
            .filter((e) => e.type === ReactionType.LIKE)
            .length.toString(),
          other: toDatetimeString(e.createdAt),
          onClick: () => {
            viewingReviewId.value = e.id;
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
