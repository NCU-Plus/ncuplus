import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}
  async getCourses(): Promise<Course[]> {
    return await this.courseRepository.find({
      select: [
        'id',
        'year',
        'semester',
        'serialNo',
        'classNo',
        'title',
        'credit',
        'passwordCard',
        'teachers',
        'classTimes',
        'limitCnt',
        'admitCnt',
        'waitCnt',
        'collegeId',
        'departmentId',
        'courseType',
      ],
    });
  }
  async getCourse(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      select: [
        'id',
        'year',
        'semester',
        'serialNo',
        'classNo',
        'title',
        'credit',
        'passwordCard',
        'teachers',
        'classTimes',
        'limitCnt',
        'admitCnt',
        'waitCnt',
        'collegeId',
        'departmentId',
        'courseType',
      ],
    });
    if (!course) throw new NotFoundException(`Course with ID ${id} not found`);
    return course;
  }
  async getCoursesByClassNo(classNo: string): Promise<Course[]> {
    const course = await this.courseRepository.find({
      where: { classNo: classNo },
    });
    if (!course)
      throw new NotFoundException(`Courses with classNo ${classNo} not found`);
    return course;
  }
}
