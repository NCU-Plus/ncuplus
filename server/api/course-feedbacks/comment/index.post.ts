export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  await $fetch(`${config.public.apiBaseUrl}/course-feedbacks/comment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${event.context.token}`,
    },
  });
});
