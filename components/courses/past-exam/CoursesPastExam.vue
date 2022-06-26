<template>
  <tr class="border-t-[1px] border-slate-300">
    <td class="py-2 text-center">{{ pastExam.downloadCount }}</td>
    <td
      class="py-2 text-center text-sky-600 hover:text-sky-800 cursor-pointer"
      @click="emits('download', { id: pastExam.id })"
    >
      {{ pastExam.originFilename }}
    </td>
    <td class="py-2 text-center">{{ pastExam.year }}</td>
    <td class="py-2 text-center">{{ pastExam.description }}</td>
    <td class="py-2 text-center">
      {{ formatFilesize(pastExam.size) }}
    </td>
    <td class="py-2 text-center">
      {{ uploader?.profile.name ?? "此使用者不存在" }}
    </td>
    <td class="py-2 text-center">
      {{ toDatetimeString(pastExam.createdAt) }}
    </td>
    <td class="py-2 text-center flex space-x-2 justify-center">
      <button @click="emits('delete', { id: pastExam.id })" class="button">
        刪除
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { APIPastExam } from "~/types/APIPastExam";
import { toDatetimeString } from "~/helpers/time";
import { UserManager } from "~/managers/UserManager";
import { formatFilesize } from "~/helpers/file";

const props = defineProps<{ pastExam: APIPastExam }>();
const emits = defineEmits<{
  (event: "download", data: { id: number }): void;
  (event: "delete", data: { id: number }): void;
}>();
const uploader = ref(
  await UserManager.getInstance().fetch(props.pastExam.uploaderId)
);
</script>
