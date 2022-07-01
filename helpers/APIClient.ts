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

  public async init() {
    if (!useCookie("X-CSRF-TOKEN").value) {
      // prevent csrf token was not initialized
      try {
        await this.getToken({ autoNagvigate: false });
      } catch (e) {}
    }
    const resp = await this.getToken({
      autoNagvigate: false,
    });
    this.token = resp;
  }

  public get token(): string | null {
    return this._token;
  }

  public set token(token: string | null) {
    this._token = token;
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
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
        await $fetch(`${this._config.public.apiBaseUrl}/auth/token`, {
          headers: { "csrf-token": useCookie("X-CSRF-TOKEN").value },
        })
      );
      return resp.data!.token;
    } catch (e) {
      if ((e as FetchError).response?.status === 403 && opts.autoNagvigate)
        navigateTo("/login");
      throw e;
    }
  }
  public async refreshToken() {
    this.token = await this.getToken();
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
        headers: {
          ...opts?.headers,
          Authorization: `Bearer ${this._token}`,
          "csrf-token": useCookie("X-CSRF-TOKEN").value,
        },
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
