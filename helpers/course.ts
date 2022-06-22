import { CourseData } from "~/components/courses/CourseData";

export function formatSemester(semester: number): string {
  return semester ? "下" : "上";
}

export function formatCourseType(courseType: string): string {
  return courseType === "REQUIRED" ? "必修" : "選修";
}

export function formatPasswordCard(passwordCard: string): string {
  switch (passwordCard) {
    case "ALL":
      return "全部使用";
    case "OPTIONAL":
      return "選用";
    case "NONE":
      return "不使用";
    default:
      return "???";
  }
}
