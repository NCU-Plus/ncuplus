import { APICollege } from "~~/types/APICollege";

export class Colleges {
  public readonly colleges: APICollege[];
  private readonly collegeMap: Map<string, string>;

  constructor(colleges: APICollege[]) {
    this.colleges = colleges;
    this.collegeMap = new Map();
    for (const college of colleges)
      this.collegeMap.set(college.collegeId, college.collegeName);
  }

  public getCollegeName(collegeId: string): string {
    return this.collegeMap.get(collegeId) ?? "未知系所";
  }
}
