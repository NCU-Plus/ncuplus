import { acceptHMRUpdate, defineStore } from "pinia";
import { Colleges } from "~~/structures/Colleges";
import { Courses } from "~~/structures/Courses";
import { Departments } from "~~/structures/Departments";
import { APICollege } from "~~/types/APICollege";
import { APICourse } from "~~/types/APICourse";
import { APIDepartment } from "~~/types/APIDepartment";
import { APIResponse } from "~~/types/APIResponse";

export interface AppCache {
  courses: Courses;
  colleges: Colleges;
  departments: Departments;
}

async function init() {
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
  const t1 = new Colleges(colleges);
  const t2 = new Departments(departments);
  return {
    courses: new Courses(courses, t1, t2),
    colleges: t1,
    departments: t2,
  };
}

export const useCache = defineStore("cache", {
  state: () => ({
    cache: init(),
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCache, import.meta.hot));
}
