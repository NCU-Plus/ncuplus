import { APIUser } from "~/types/APIUser";
import { APIResponse } from "~/types/APIResponse";

export default defineEventHandler(async (): Promise<APIUser[]> => {
  const config = useRuntimeConfig();
  const { data: users } = await $fetch<APIResponse<APIUser[]>>(
    `${config.public.apiBaseUrl}/users`
  );
  if (!users) throw new Error(`Can't get users infomations`);
  return users;
});
