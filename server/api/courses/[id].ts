import { Course } from "~/types/Course";
import { APIResponse } from "~/types/APIResponse";
import { APICollege } from "~/types/APICollege";
import { APICourse } from "~/types/APICourse";
import { APIDepartment } from "~/types/APIDepartment";

export default defineEventHandler(async (event): Promise<Course> => {
  const courses = await $fetch("/api/courses");
  const course = courses.find(
    (course: Course) => course.id === parseInt(event.context.params.id)
  );
  if (!course)
    throw new Error(`No course found with id ${event.context.params.id}`);
  return course as Course;
});
