<template>
  <dialog
    ref="dialog"
    class="dialog w-96 h-64 m-0 p-0 rounded-md"
    @click="onClick"
  >
    <div class="w-full h-full p-6">
      <form class="w-full h-full flex flex-col space-y-2" method="dialog">
        <div class="flex">
          <h3 class="text-2xl font-bold">檢舉</h3>
        </div>
        <div class="flex space-x-2 items-center">
          <label class="text-lg">檢舉類別</label>
          <select v-model="report.type" class="">
            <option
              v-for="reportType of ReportType"
              :key="reportType"
              :value="reportType"
            >
              {{ formatReportType(reportType) }}
            </option>
          </select>
        </div>
        <textarea
          v-model="report.description"
          class="outline outline-gray-200 rounded-sm resize-none"
          placeholder="請輸入檢舉原由或其他描述，若無可填空"
          maxlength="255"
        />
        <div class="flex justify-between">
          <button class="button">取消</button>
          <button class="button" @click="emits('submit', report)">送出</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { ReportType } from "~~/types/APIReport";
import { formatReportType } from "~~/helpers/report";

const dialog = ref<HTMLDialogElement | null>(null);
const emits = defineEmits<{
  (event: "close"): void;
  (
    event: "submit",
    data: {
      type: ReportType;
      description: string;
    },
  ): void;
}>();

const report: Ref<{
  type: ReportType;
  description: string;
}> = ref({
  type: ReportType.OTHER,
  description: "",
});

function onClick(event: MouseEvent) {
  if (event.target === dialog.value) emits("close");
}

function show() {
  dialog.value?.showModal();
}

function close() {
  dialog.value?.close();
}

defineExpose({
  show,
  close,
});
</script>
