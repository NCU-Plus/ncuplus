<template>
  <div
    class="h-full w-full bg-local bg-center bg-cover"
    :style="{
      'background-image': 'url(' + backgroundImages[backgroundIndex] + ')',
      opacity: backgroundOpacity,
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TWEEN from "@tweenjs/tween.js";
import { DurationOptions } from "./DurationOptions";

const props = defineProps<{
  backgroundImages: string[];
  duration: DurationOptions;
}>();

const emit = defineEmits(["change"]);

const backgroundIndex = ref(0);
const backgroundOpacity = ref(1);

const tween = new TWEEN.Tween({ opacity: 0 })
  .to({ opacity: 1 }, props.duration.enter)
  .onUpdate(({ opacity }) => {
    backgroundOpacity.value = opacity;
  })
  .onComplete(() => {
    setTimeout(() => {
      tweenBack.start();
    }, props.duration.stay);
  });

const tweenBack = new TWEEN.Tween({ opacity: 1 })
  .to({ opacity: 0 }, props.duration.leave)
  .onUpdate(({ opacity }) => {
    backgroundOpacity.value = opacity;
  })
  .onComplete(() => {
    backgroundIndex.value =
      (backgroundIndex.value + 1) % props.backgroundImages.length;
    emit("change", backgroundIndex.value);
    setTimeout(() => {
      tween.start();
    }, props.duration.transfer);
  });

tween.start();

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}

animate();
</script>
