<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'clipboard-list']" size="lg" />
      <strong class="text-2xl">考古題</strong>
    </h3>
    <table class="w-full bg-gray-50 rounded-t mb-4">
      <thead>
        <tr>
          <th class="py-2">下載次數</th>
          <th class="py-2">檔名</th>
          <th class="py-2">年度</th>
          <th class="py-2">檔案說明</th>
          <th class="py-2">大小</th>
          <th class="py-2">上傳者</th>
          <th class="py-2">上傳時間</th>
          <th class="py-2">動作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="pastExamsData.length === 0"
          class="text-center border-t-[1px] border-slate-300"
        >
          <td colspan="8">
            <h4 class="py-2 w-full">尚無檔案</h4>
          </td>
        </tr>
        <tr
          class="border-t-[1px] border-slate-300"
          v-for="pastExamData of pastExamsData"
        >
          <td class="py-2 text-center">{{ pastExamData.downloadCount }}</td>
          <td
            class="py-2 text-center text-sky-600 hover:text-sky-800 cursor-pointer"
            @click="emits('download', { id: pastExamData.id })"
          >
            {{ pastExamData.originFilename }}
          </td>
          <td class="py-2 text-center">{{ pastExamData.year }}</td>
          <td class="py-2 text-center">{{ pastExamData.description }}</td>
          <td class="py-2 text-center">
            {{ formatFilesize(pastExamData.size) }}
          </td>
          <td class="py-2 text-center">
            {{ getUsernameById(pastExamData.uploaderId) }}
          </td>
          <td class="py-2 text-center">
            {{ toDatetimeString(pastExamData.createdAt) }}
          </td>
          <td class="py-2 text-center flex space-x-2 justify-center">
            <button
              @click="emits('delete', { id: pastExamData.id })"
              class="p-1 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="w-full flex flex-col md:flex-row mb-4 space-y-2 justify-end">
      <transition name="form-fade">
        <div
          v-show="uploading"
          class="flex flex-col md:flex-row space-y-2 md:space-x-4 items-center mx-4"
        >
          <input
            v-model="uploadData.year"
            class="pl-2 rounded-sm"
            placeholder="考古年度"
            required
          />
          <input
            v-model="uploadData.description"
            class="pl-2 rounded-sm"
            placeholder="檔案說明"
            required
          />
          <input @change="setUploadFile" type="file" required />
          <button
            @click="upload"
            class="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
          >
            送出
          </button>
        </div></transition
      >
      <button
        @click="uploading = !uploading"
        class="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
      >
        我要上傳
      </button>
    </div>
    <div class="w-full flex flex-col mb-14">
      <div class="p-2 bg-gray-300 rounded-t-md">
        <h2>檔案上傳注意事項</h2>
      </div>
      <div class="p-2 bg-white rounded-b-md">
        <p>本區只開放上傳考古題及作業，若上傳檔案不符或是被檢舉將會被移除。</p>
        <p>檔案請根據年度寫上對應敘述，方便同學查找。</p>
        <p>支援檔案格式: doc(x)/ppt(x)/pdf/jp(e)g/png/zip/7z/rar</p>
        <p>每個檔案的大小限制為15MB</p>
        <br />
        <p>請先登入後才能上傳檔案</p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { toDatetimeString } from "@/helpers/time";
import { getUsernameById } from "@/helpers/user";
import { formatFilesize } from "@/helpers/file";

const props = defineProps<{ pastExamsData: any[] }>();
const emits = defineEmits<{
  (
    event: "upload",
    data: { year: string; description: string; file: File }
  ): void;
  (event: "download", data: { id: number }): void;
  (event: "delete", data: { id: number }): void;
}>();

const uploading = ref(false);
const uploadData = reactive(
  {} as { year: string; description: string; file: File }
);

function setUploadFile(event: any) {
  uploadData.file = event.target.files[0];
}

async function upload() {
  emits("upload", uploadData);
  uploadData.year = "";
  uploadData.description = "";
  uploading.value = !uploading.value;
}
</script>
<style scoped>
.form-fade-enter-active {
  transition: all 0.3s ease-out;
}

.form-fade-leave-active {
  transition: all 0.3s ease-out;
}

.form-fade-enter-from,
.form-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
