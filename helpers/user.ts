import { useStore } from "@/plugins/store";
import { APIResponse } from "~~/types/APIResponse";
import { APIUser } from "~~/types/APIUser";

export async function initUsernameMap() {
  const config = useRuntimeConfig();
  const store = useStore();
  const { data: users } = <APIResponse<APIUser[]>>(
    await $fetch(`${config.public.apiBaseUrl}/users`)
  );
  if (!users) throw new Error(`Can't get users infomations`);
  for (const user of users)
    store.commit("setUsernameMap", { userId: user.id, username: user.name });
}

export function getUsernameById(id: number) {
  const config = useRuntimeConfig();
  const store = useStore();
  const username = store.state.usernameMap.get(id);
  if (username) return username;
  (
    $fetch(`${config.public.apiBaseUrl}/users/${id}`) as Promise<
      APIResponse<APIUser>
    >
  ).then(({ data: user }) => {
    if (user)
      store.commit("setUsernameMap", {
        userId: id,
        username: user.name,
      });
  });
  return "未知使用者";
}
