<template>
  <FullpageHeader
    ><div
      class="h-full w-full bg-local bg-center bg-cover blur absolute"
      :style="{ 'background-image': `url(${loginBg})` }"
    ></div>
    <div
      class="w-11/12 md:w-1/2 h-1/2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-around items-center bg-white rounded-xl"
    >
      <div>
        <h1 class="font-black text-6xl text-center">NCU+</h1>
        <h6 class="text-sm mt-8">中央大學學生請使用Portal的單一簽入</h6>
      </div>
      <button class="w-60 h-10 bg-sky-400 text-white rounded-md">
        中大Portal單一簽入
      </button>
    </div></FullpageHeader
  >
</template>

<script setup lang="ts">
// @ts-ignore
import loginBg from "~/assets/background/操場.jpg";
</script>
