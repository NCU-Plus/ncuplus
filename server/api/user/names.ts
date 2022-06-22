import { APIUser } from "~/types/APIUser";
import { APIResponse } from "~/types/APIResponse";

export default defineEventHandler(async (event): Promise<APIUser[]> => {
  const config = useRuntimeConfig();
  const { data: users } = <APIResponse<APIUser[]>>(
    await $fetch(`${config.public.apiBaseUrl}/user/names`)
  );
  if (!users) throw new Error(`Can't get users infomations`);
  return users;
});
