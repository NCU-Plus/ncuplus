import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import { RuntimeConfig } from "@nuxt/schema";
import { NitroFetchRequest } from "nitropack";
import { FetchError, FetchOptions, FetchResponse } from "ohmyfetch";
import { APIResponse } from "~~/types/APIResponse";

export class APIClient {
  private static instance: APIClient;
  private _token: string | null;
  private _config: RuntimeConfig;
  private constructor() {
    this._token = null;
    this._config = useRuntimeConfig();
  }
  public static getInstance() {
    if (!this.instance) {
      this.instance = new APIClient();
    }
    return this.instance;
  }
  public async getToken(
    opts: {
      autoNagvigate: boolean;
    } = {
      autoNagvigate: true,
    }
  ): Promise<string> {
    try {
      const resp = <APIResponse<{ token: string }>>(
        await $fetch(`${this._config.public.apiBaseUrl}/auth/token`)
      );
      return resp.data!.token;
    } catch (e) {
      if ((e as FetchError).response?.status === 403 && opts.autoNagvigate)
        navigateTo("/login");
      throw e;
    }
  }
  public async refreshToken() {
    const token = await this.getToken();
    this._token = token;
    localStorage.setItem("token", token);
  }

  public resetToken() {
    this._token = null;
    localStorage.removeItem("token");
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
