import { APICourse } from "./APICourse";

export interface Course extends APICourse {
  collegeName: string;
  departmentName: string;
}
