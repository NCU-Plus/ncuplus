import { Injectable } from '@nestjs/common';
import { CollegeSeederService } from './college-seeder/college-seeder.service';
import { CourseSeederService } from './course-seeder/course-seeder.service';
import { DepartmentSeederService } from './department-seeder/department-seeder.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly collegeSeederService: CollegeSeederService,
    private readonly courseSeederService: CourseSeederService,
    private readonly departmentSeederService: DepartmentSeederService,
  ) {}
  async seedCollege() {
    await this.collegeSeederService.seedCollege();
  }
  async seedCourse() {
    await this.courseSeederService.seedCourse();
  }
  async seedDepartment() {
    await this.departmentSeederService.seedDepartment();
  }
}
