import { RuntimeConfig } from "@nuxt/schema";
import { NitroFetchRequest } from "nitropack";
import { FetchOptions, FetchResponse } from "ohmyfetch";
import { APIResponse } from "~~/types/APIResponse";

export class APIClient {
  private static instance: APIClient;
  private _token: string | null;
  private _config: RuntimeConfig;
  private constructor() {
    this._token = localStorage.getItem("token");
    this._config = useRuntimeConfig();
  }
  public static getInstance() {
    if (!this.instance) {
      this.instance = new APIClient();
    }
    return this.instance;
  }
  public async getToken(): Promise<string> {
    const resp = <APIResponse<{ token: string }>>(
      await $fetch(`${this._config.public.apiBaseUrl}/auth/token`).catch(
        (e) => e.data
      )
    );
    if (resp.statusCode === 403) navigateTo("/login");
    if (resp.statusCode !== 200) throw new Error("Get token failed");
    return resp.data!.token;
  }
  public async refreshToken() {
    this._token = await this.getToken();
  }

  public async fetch(
    request: NitroFetchRequest,
    opts?: FetchOptions | undefined
  ): Promise<unknown> {
    const resp = <APIResponse<any>>await $fetch(request, {
      ...opts,
      headers: { Authorization: `Bearer ${this._token}` },
    }).catch((e) => e.data);
    if (resp.statusCode === 401) {
      await this.refreshToken();
      return await this.fetch(request, opts);
    }
    return resp;
  }

  public async fetchRaw(
    request: NitroFetchRequest,
    opts?: FetchOptions | undefined
  ): Promise<FetchResponse<unknown>> {
    const resp = <FetchResponse<any>>await $fetch
      .raw(request, {
        ...opts,
        headers: { Authorization: `Bearer ${this._token}` },
      })
      .catch((e) => e.data);
    if (resp.status === 401) {
      await this.refreshToken();
      return await this.fetchRaw(request, opts);
    }
    return resp;
  }
}
