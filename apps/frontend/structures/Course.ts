import type { APICourse } from "~~/types/APICourse";
import type { Course as ICourse } from "~~/types/Course";

export class Course implements ICourse {
  public readonly collegeName: string;
  public readonly departmentName: string;
  public readonly id: number;
  public readonly year: number;
  public readonly semester: number;
  public readonly serialNo: number;
  public readonly classNo: string;
  public readonly title: string;
  public readonly credit: number;
  public readonly passwordCard: string;
  public readonly teachers: string;
  public readonly classTimes: string;
  public readonly limitCnt: number;
  public readonly admitCnt: number;
  public readonly waitCnt: number;
  public readonly collegeId: string;
  public readonly departmentId: string;
  public readonly courseType: string;

  constructor(course: APICourse, collegeName: string, departmentName: string) {
    this.collegeName = collegeName;
    this.departmentName = departmentName;
    this.id = course.id;
    this.year = course.year;
    this.semester = course.semester;
    this.serialNo = course.serialNo;
    this.classNo = course.classNo;
    this.title = course.title;
    this.credit = course.credit;
    this.passwordCard = course.passwordCard;
    this.teachers = (JSON.parse(course.teachers) as string[]).join(", ");
    this.classTimes = (JSON.parse(course.classTimes) as string[]).join(", ");
    this.limitCnt = course.limitCnt;
    this.admitCnt = course.admitCnt;
    this.waitCnt = course.waitCnt;
    this.collegeId = course.collegeId;
    this.departmentId = course.departmentId;
    this.courseType = course.courseType;
  }
}
