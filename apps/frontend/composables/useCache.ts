import { Colleges } from "~/structures/Colleges";
import { Courses } from "~~/structures/Courses";
import { Departments } from "~~/structures/Departments";
import type { APICollege } from "~~/types/APICollege";
import type { APICourse } from "~~/types/APICourse";
import type { APIDepartment } from "~~/types/APIDepartment";
import type { APIResponse } from "~~/types/APIResponse";
import type { HydrationCache } from "~~/types/HydrationCache";
import { AppCache } from "~~/structures/AppCache";

let cache: AppCache | null = null;

async function fetchData(): Promise<HydrationCache> {
  const config = useRuntimeConfig();
  const [{ data: courses }, { data: colleges }, { data: departments }] =
    await Promise.all([
      $fetch<APIResponse<APICourse[]>>(`${config.public.apiBaseUrl}/courses`),
      $fetch<APIResponse<APICollege[]>>(`${config.public.apiBaseUrl}/colleges`),
      $fetch<APIResponse<APIDepartment[]>>(
        `${config.public.apiBaseUrl}/departments`,
      ),
    ]);
  if (!courses)
    throw createError({
      statusCode: 503,
      message:
        "Course data is not available, please contact the website owner.",
    });
  if (!colleges)
    throw createError({
      statusCode: 503,
      message:
        "College data is not available, please contact the website owner.",
    });
  if (!departments)
    throw createError({
      statusCode: 503,
      message:
        "Departments data is not available, please contact the website owner.",
    });
  return { courses, colleges, departments };
}

export const useCache = async (): Promise<AppCache> => {
  const nuxtApp = useNuxtApp();
  if (process.server) {
    // nuxt can only pass POJOs to client
    // so we cache POJOs instead of the actual objects
    // and contruct the object and pass it as the output
    const hydrationCache = await fetchData();
    nuxtApp.payload["cache"] = hydrationCache;
    const colleges = new Colleges(hydrationCache.colleges);
    const departments = new Departments(hydrationCache.departments);
    return new AppCache(
      new Courses(hydrationCache.courses, colleges, departments),
      colleges,
      departments,
    );
  }
  if (process.client) {
    if (cache) return cache;
    if (!nuxtApp.payload["cache"]) nuxtApp.payload["cache"] = await fetchData();
    const hydrationCache = nuxtApp.payload["cache"] as HydrationCache;
    const colleges = new Colleges(hydrationCache.colleges);
    const departments = new Departments(hydrationCache.departments);
    cache = new AppCache(
      new Courses(hydrationCache.courses, colleges, departments),
      colleges,
      departments,
    );
    return cache;
  }
  throw new Error("This should never happen.");
};
