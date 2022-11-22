import { LocationQuery } from "vue-router";

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
