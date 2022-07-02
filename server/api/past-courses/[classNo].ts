import { Course } from "~/types/Course";

export default defineEventHandler(async (event): Promise<Course[]> => {
  const courses = await $fetch("/api/courses");
  return courses.filter(
    (courses) => courses.classNo === event.context.params.classNo,
  );
});
