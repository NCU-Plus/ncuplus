<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'signal']" size="lg" />
      <strong class="text-2xl">課程評分</strong>
    </h3>
    <div class="flex space-x-4">
      <div class="w-80">
        <CoursesRatingChart
          v-if="difficultyRating.length !== 0"
          title="課程難度"
          :rating="difficultyRating"
        />
        <div v-else class="h-full flex justify-center items-center">
          <span class="text-2xl">尚無資料</span>
        </div>
      </div>
      <div class="w-80">
        <CoursesRatingChart
          v-if="scoreRating.length !== 0"
          title="分數甜度"
          :rating="scoreRating"
        />
        <div v-else class="h-full flex justify-center items-center">
          <span class="text-2xl">尚無資料</span>
        </div>
      </div>
      <div class="w-80">
        <CoursesRatingChart
          v-if="recommendRating.length !== 0"
          title="推薦程度"
          :rating="recommendRating"
        />
        <div v-else class="h-full flex justify-center items-center">
          <span class="text-2xl">尚無資料</span>
        </div>
      </div>
    </div>
    <DialogFrame ref="uploadRatingDialog" class="w-96">
      <form class="w-full h-full flex flex-col space-y-2" method="dialog">
        <div class="flex">
          <h3 class="text-2xl font-bold">新增課程評分</h3>
        </div>
        <div class="flex flex-col">
          <label class="text-lg">類型</label>
          <select v-model="uploadRating.type">
            <option :value="RatingType.DIFFICULTY">課程難度</option>
            <option :value="RatingType.SCORE">分數甜度</option>
            <option :value="RatingType.RECOMMEND">推薦程度</option>
          </select>
          <label class="text-lg">評分</label>
          <select v-model="uploadRating.value">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
            <option :value="5">5</option>
            <option :value="6">6</option>
            <option :value="7">7</option>
            <option :value="8">8</option>
            <option :value="9">9</option>
            <option :value="10">10</option>
          </select>
        </div>
        <div class="flex justify-between">
          <button class="button">取消</button>
          <button class="button" @click="submit()">送出</button>
        </div>
      </form>
    </DialogFrame>
    <div class="w-full flex flex-col mb-4 space-y-2 justify-end items-end">
      <button class="button w-24" @click="uploadRatingDialog?.show()">
        我要評分
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { APIRating } from "~~/types/APIRating";
import { RatingType } from "~~/types/RatingType";
import DialogFrame from "~/components/DialogFrame.vue";
import { createRating } from "~~/helpers/course-feedback";

const props = defineProps<{ classNo: string; ratings: APIRating[] }>();
const emits = defineEmits<{
  (e: "update:ratings", ratings: APIRating[]): void;
}>();
const difficultyRating = computed(() =>
  props.ratings.filter((e) => e.type === RatingType.DIFFICULTY),
);
const scoreRating = computed(() =>
  props.ratings.filter((e) => e.type === RatingType.SCORE),
);
const recommendRating = computed(() =>
  props.ratings.filter((e) => e.type === RatingType.RECOMMEND),
);
const uploadRatingDialog = ref<InstanceType<typeof DialogFrame> | null>(null);
const uploadRating = ref({
  type: RatingType.DIFFICULTY,
  value: 5,
});

async function submit() {
  const rating = await createRating(props.classNo, uploadRating.value);
  if (rating) emits("update:ratings", [...props.ratings, rating]);
}
</script>
