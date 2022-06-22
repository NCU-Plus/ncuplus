import { APIUser } from "~/types/APIUser";
import { APIResponse } from "~/types/APIResponse";

export default defineEventHandler(async (event): Promise<APIUser> => {
  const config = useRuntimeConfig();
  const { data: user } = <APIResponse<APIUser>>(
    await $fetch(`${config.public.apiBaseUrl}/user/name/${event.context.id}`)
  );
  if (!user) throw new Error(`Can't get user infomation`);
  return user;
});
