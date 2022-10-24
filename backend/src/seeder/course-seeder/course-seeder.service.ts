import { Injectable } from '@nestjs/common';
import { Course } from '../../course/course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CourseSeederService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async seedCourse() {
    await this.courseRepository.clear();
    const course1 = this.courseRepository.create({
      year: 110,
      semester: 1,
      serialNo: 1001,
      classNo: 'PE1022A',
      title: '大一體育',
      credit: 0,
      passwordCard: 'OPTIONAL',
      teachers: '["沈淑鳳"]',
      classTimes: '["1-3", "1-4"]',
      limitCnt: 0,
      admitCnt: 0,
      waitCnt: 47,
      collegeId: 'collegeI0',
      departmentId: 'deptI0I1I0',
      courseType: 'REQUIRED',
    });
    await this.courseRepository.save(course1);

    const course2 = this.courseRepository.create({
      year: 110,
      semester: 1,
      serialNo: 1002,
      classNo: 'CL0126*',
      title: '國文（A）經典閱讀：傳統節氣作品選讀',
      credit: 3,
      passwordCard: 'OPTIONAL',
      teachers: '["李宜學"]',
      classTimes: '["3-3, 3-4, 1-5"]',
      limitCnt: 58,
      admitCnt: 0,
      waitCnt: 155,
      collegeId: 'collegeI1',
      departmentId: 'deptI1I1001I0',
      courseType: 'REQUIRED',
    });
    await this.courseRepository.save(course2);

    const course3 = this.courseRepository.create({
      year: 110,
      semester: 1,
      serialNo: 1003,
      classNo: 'CE2004A',
      title: '程式語言',
      credit: 3,
      passwordCard: 'OPTIONAL',
      teachers: '["許富皓"]',
      classTimes: '["2-6", "2-7", "2-8"]',
      limitCnt: 60,
      admitCnt: 0,
      waitCnt: 140,
      collegeId: 'collegeI5',
      departmentId: 'deptI1I5002I0',
      courseType: 'REQUIRED',
    });
    await this.courseRepository.save(course3);

    const course4 = this.courseRepository.create({
      year: 111,
      semester: 0,
      serialNo: 1004,
      classNo: 'PE1011B',
      title: '大一體育',
      credit: 0,
      passwordCard: 'OPTIONAL',
      teachers: '["姚承義"]',
      classTimes: '["1-5", "1-6"]',
      limitCnt: 0,
      admitCnt: 0,
      waitCnt: 0,
      collegeId: 'collegeI0',
      departmentId: 'deptI0I1I0',
      courseType: 'REQUIRED',
    });
    await this.courseRepository.save(course4);

    const course = new Course();
    course.year = 111;
    course.semester = 0;
    course.serialNo = 1001;
    course.classNo = 'SE6030*';
    course.title = '軟體工程實務';
    course.credit = 1;
    course.passwordCard = 'passwordCard';
    course.teachers = '["梁德容", "王尉任", "鄭永斌"]';
    course.classTimes = '["1-2", "1-3", "1-4"]';
    course.limitCnt = 456;
    course.admitCnt = 789;
    course.waitCnt = 1011;
    course.collegeId = 'collegeId';
    course.departmentId = 'csie';
    await this.courseRepository.save(course);

    for (let i = 0; i < 50; i++) {
      const course5 = this.courseRepository.create({
        year: 111,
        semester: 0,
        serialNo: 1005,
        classNo: 'EG1007*',
        title: '普通化學',
        credit: 3,
        passwordCard: 'OPTIONAL',
        teachers: '["劉奕宏"]',
        classTimes: '["2-6", "2-7", "4-2"]',
        limitCnt: 0,
        admitCnt: 0,
        waitCnt: 63,
        collegeId: 'collegeI3',
        departmentId: 'deptI1I3000I0',
        courseType: 'REQUIRED',
      });
      await this.courseRepository.save(course5);
    }
  }
}
