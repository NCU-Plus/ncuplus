import type { APICollege } from "./APICollege";
import type { APICourse } from "./APICourse";
import type { APIDepartment } from "./APIDepartment";

export interface HydrationCache {
  courses: APICourse[];
  colleges: APICollege[];
  departments: APIDepartment[];
}
