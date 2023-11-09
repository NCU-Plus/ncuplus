import type { APIDepartment } from "~~/types/APIDepartment";

export class Departments {
  public readonly departments: APIDepartment[];
  public readonly departmentMap: Map<string, string>;

  constructor(departments: APIDepartment[]) {
    this.departments = departments;
    this.departmentMap = new Map();
    for (const department of departments)
      this.departmentMap.set(
        department.departmentId,
        department.departmentName,
      );
  }

  public getDepartmentName(departmentId: string): string {
    return this.departmentMap.get(departmentId) ?? "未知系所";
  }
}
