<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'clipboard-list']" size="lg" />
      <strong class="text-2xl">考古題</strong>
    </h3>
    <div class="w-full overflow-x-scroll scrollbar-hide">
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
          <CoursesPastExam
            v-for="pastExam of pastExamsData"
            :key="pastExam.id"
            :past-exam="pastExam"
            @download="emits('download', $event)"
            @delete="emits('delete', $event)"
          />
        </tbody>
      </table>
    </div>
    <div class="w-full flex flex-col mb-4 space-y-2 justify-end">
      <transition name="form-fade">
        <div
          v-show="uploading"
          class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 md:items-center"
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
          <input type="file" required @change="setUploadFile" />
          <button class="button" @click="upload">送出</button>
        </div>
      </transition>
      <button
        id="upload-pastexam-btn"
        class="button"
        @click="uploading = !uploading"
      >
        我要上傳
      </button>
    </div>
    <CoursesPastExamDescription />
  </section>
</template>
<script setup lang="ts">
defineProps<{ pastExamsData: any[] }>();
const emits = defineEmits<{
  (
    event: "upload",
    data: { year: string; description: string; file: File },
  ): void;
  (event: "download", data: { id: number }): void;
  (event: "delete", data: { id: number }): void;
}>();

const uploading = ref(false);
const uploadData = reactive(
  {} as { year: string; description: string; file: File },
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
