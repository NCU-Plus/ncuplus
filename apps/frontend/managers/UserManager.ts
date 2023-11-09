import { User } from "~/structures/User";
import type { APIUser } from "types/APIUser";
import type { APIResponse } from "~~/types/APIResponse";

export class UserManager {
  private static _instance: UserManager;
  public cache: Map<number, User> = new Map();
  private constructor() {}
  public static getInstance() {
    if (!this._instance) this._instance = new UserManager();
    return UserManager._instance;
  }

  public async refreshCache(id: number | undefined = undefined) {
    const config = useRuntimeConfig();
    if (id) {
      const { data: user } = await $fetch<APIResponse<APIUser>>(
        `${config.public.apiBaseUrl}/users/${id}`,
      );
      if (user) this.cache.set(id, new User(user));
    } else {
      const { data: users } = await $fetch<APIResponse<APIUser[]>>(
        `${config.public.apiBaseUrl}/users`,
      );
      if (users)
        for (const user of users) this.cache.set(user.id, new User(user));
    }
  }

  public async fetch(id: number): Promise<User | null> {
    const cachedUser = this.cache.get(id);
    if (cachedUser) return cachedUser;
    const config = useRuntimeConfig();
    const { data: apiUser } = await $fetch<APIResponse<APIUser>>(
      `${config.public.apiBaseUrl}/users/${id}`,
    );
    if (!apiUser) return null;
    const user = new User(apiUser);
    this.cache.set(id, user);
    return user;
  }
}
