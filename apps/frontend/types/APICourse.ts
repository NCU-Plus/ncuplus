export interface APICourse {
  id: number;
  year: number;
  semester: number;
  serialNo: number;
  classNo: string;
  title: string;
  credit: number;
  passwordCard: string;
  teachers: string;
  classTimes: string;
  limitCnt: number;
  admitCnt: number;
  waitCnt: number;
  collegeId: string;
  departmentId: string;
  courseType: string;
}
