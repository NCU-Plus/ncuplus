import type { APICourse } from "~~/types/APICourse";
import { Colleges } from "./Colleges";
import { Course } from "./Course";
import { Departments } from "./Departments";

export class Courses {
  private _courses: Course[] | undefined;
  public readonly apiCourses: APICourse[];
  public readonly colleges: Colleges;
  public readonly departments: Departments;

  constructor(
    courses: APICourse[],
    colleges: Colleges,
    departments: Departments,
  ) {
    this.apiCourses = courses;
    this.colleges = colleges;
    this.departments = departments;
  }

  public get courses(): Course[] {
    if (this._courses) {
      return this._courses;
    }
    this._courses = this.apiCourses.map(
      (course) =>
        new Course(
          course,
          this.colleges.getCollegeName(course.collegeId),
          this.departments.getDepartmentName(course.departmentId),
        ),
    );
    return this._courses;
  }
}
