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

    const course = new Course();
    course.year = 111;
    course.semester = 0;
    course.serialNo = 1001;
    course.classNo = 'SE6030*';
    course.title = '軟體工程實務';
    course.credit = 1;
    course.passwordCard = 'passwordCard';
    course.teachers = ['["梁德容", "王尉任", "鄭永斌"]'];
    course.classTimes = ['["1-2", "1-3", "1-4"]'];
    course.limitCnt = 456;
    course.admitCnt = 789;
    course.waitCnt = 1011;
    course.collegeId = 'collegeId';
    course.departmentId = 'csie';

    await this.courseRepository.save(course);
  }
}
