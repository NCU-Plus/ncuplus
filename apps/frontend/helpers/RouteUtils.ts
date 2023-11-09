import type { LocationQuery, RouteParams } from "vue-router";

export function getQuerys(query: LocationQuery): {
  [x: string]: string | undefined;
} {
  const map: Record<string, string> = {};
  for (const key in query) {
    if (query[key] === null || query[key] === undefined) map[key] = "";
    else if (typeof query[key] === "string") map[key] = query[key] as string;
    else map[key] = (query[key] as string[])[0];
  }
  return map;
}

export function getParams(params: RouteParams): {
  [x: string]: string | undefined;
} {
  const map: Record<string, string> = {};
  for (const key in params) {
    if (params[key] === null || params[key] === undefined) map[key] = "";
    else if (typeof params[key] === "string") map[key] = params[key] as string;
    else map[key] = (params[key] as string[])[0];
  }
  return map;
}
