import { Colleges } from "./Colleges";
import { Courses } from "./Courses";
import { Departments } from "./Departments";

export class AppCache {
  public readonly courses: Courses;
  public readonly colleges: Colleges;
  public readonly departments: Departments;

  constructor(courses: Courses, colleges: Colleges, departments: Departments) {
    this.courses = courses;
    this.colleges = colleges;
    this.departments = departments;
  }
}
