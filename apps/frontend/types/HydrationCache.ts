import { APICollege } from "./APICollege";
import { APICourse } from "./APICourse";
import { APIDepartment } from "./APIDepartment";

export interface HydrationCache {
  courses: APICourse[];
  colleges: APICollege[];
  departments: APIDepartment[];
}
