import { APIResponse } from "~/types/APIResponse";
import { APIReview } from "~~/types/APIReview";

export default defineEventHandler(async (): Promise<APIReview[]> => {
  const config = useRuntimeConfig();
  const { data: reviews } = <APIResponse<APIReview[]>>(
    await $fetch(`${config.public.apiBaseUrl}/reviews`)
  );
  return reviews ?? [];
});
