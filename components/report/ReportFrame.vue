<template>
  <DialogFrame ref="dialog" class="w-96 h-64">
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
  </DialogFrame>
</template>

<script setup lang="ts">
import { ReportType } from "~~/types/APIReport";
import { formatReportType } from "~~/helpers/report";
import DialogFrame from "~~/components/DialogFrame.vue";

const dialog = ref<InstanceType<typeof DialogFrame> | null>(null);
const emits = defineEmits<{
  (
    event: "submit",
    data: {
      type: ReportType;
      description: string;
    },
  ): void;
}>();

const report = ref({
  type: ReportType.OTHER,
  description: "",
});

function show() {
  dialog.value?.show();
}

function close() {
  dialog.value?.close();
}

defineExpose({
  show,
  close,
});
</script>
