import { APIResponse } from "~/types/APIResponse";
import { APICourseFeedback } from "~~/types/APICourseFeedback";

export default defineEventHandler(async (event): Promise<APICourseFeedback> => {
  const config = useRuntimeConfig();
  const { data: courseFeedback } = <APIResponse<APICourseFeedback>>(
    await $fetch(
      `${config.public.apiBaseUrl}/course-feedbacks/${event.context.params.classNo}`,
    )
  );
  if (!courseFeedback)
    throw new Error(
      `No course feedback found with classNo ${event.context.params.classNo}`,
    );
  return courseFeedback;
});
