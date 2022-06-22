import { Course } from "~/types/Course";
import { APIResponse } from "~/types/APIResponse";
import { APICollege } from "~/types/APICollege";
import { APICourse } from "~/types/APICourse";
import { APIDepartment } from "~/types/APIDepartment";
import { APICourseFeedback } from "~~/types/APICourseFeedback";

export default defineEventHandler(async (event): Promise<APICourseFeedback> => {
  const config = useRuntimeConfig();
  const { data: courseFeedback } = <APIResponse<APICourseFeedback>>(
    await $fetch(
      `${config.public.apiBaseUrl}/course-feedback/${event.context.params.classNo}`
    )
  );
  if (!courseFeedback)
    throw new Error(
      `No course feedback found with classNo ${event.context.params.classNo}`
    );
  return courseFeedback;
});
