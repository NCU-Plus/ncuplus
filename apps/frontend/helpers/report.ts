import { ToastType, useToast } from "~~/stores/toast";
import { APIReport, ReportType, TargetType } from "types/APIReport";
import { APIResponse } from "types/APIResponse";
import { APIClient } from "./APIClient";

export function formatReportType(reportType: ReportType) {
  switch (reportType) {
    case ReportType.SPAM:
      return "垃圾訊息";
    case ReportType.ABUSE:
      return "語言騷擾謾罵";
    case ReportType.NSFW:
      return "限制級";
    case ReportType.OTHER:
      return "其他";
  }
}

export async function createReport(
  type: ReportType,
  targetType: TargetType,
  targetId: number,
  description: string,
): Promise<APIReport | null> {
  const config = useRuntimeConfig();
  const toast = useToast();
  const response = await APIClient.getInstance().fetch<APIResponse<APIReport>>(
    `${config.public.apiBaseUrl}/reports`,
    {
      method: "POST",
      body: { type, targetType, targetId, description },
    },
  );

  if (!response.data) {
    const message = "未知錯誤";
    toast.pushToast({
      type: ToastType.ERROR,
      message: message,
    });
    return null;
  }

  toast.pushToast({
    type: ToastType.SUCCESS,
    message: "操作成功",
  });
  return response.data;
}
