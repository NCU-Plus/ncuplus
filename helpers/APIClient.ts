import { RuntimeConfig } from "@nuxt/schema";
import { NitroFetchRequest } from "nitropack";
import { FetchError, FetchOptions, FetchResponse } from "ohmyfetch";
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
    const token = await this.getToken();
    this._token = token;
    localStorage.setItem("token", token);
  }

  public async fetch<T = unknown>(
    request: NitroFetchRequest,
    opts?: FetchOptions | undefined
  ): Promise<T> {
    return (await this._fetch<T>($fetch, request, opts)) as T;
  }

  public async fetchRaw<T = unknown>(
    request: NitroFetchRequest,
    opts?: FetchOptions | undefined
  ): Promise<FetchResponse<T>> {
    return (await this._fetch<T>(
      $fetch.raw,
      request,
      opts
    )) as FetchResponse<T>;
  }

  private async _fetch<T = unknown>(
    fetchFn: typeof $fetch | typeof $fetch.raw,
    request: NitroFetchRequest,
    opts?: FetchOptions | undefined
  ): Promise<FetchResponse<T> | T | unknown> {
    try {
      return await fetchFn(request, {
        ...opts,
        headers: { ...opts?.headers, Authorization: `Bearer ${this._token}` },
      });
    } catch (e) {
      if ((e as FetchError).response?.status === 401) {
        await this.refreshToken();
        return await this._fetch<T>(fetchFn, request, opts);
      }

      return (e as FetchError).data;
    }
  }
}
