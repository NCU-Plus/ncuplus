import { Injectable } from '@nestjs/common';
import { Department } from '../../department/department.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartmentSeederService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async seedDepartment() {
    await this.departmentRepository.clear();

    const department = new Department();
    department.departmentId = 'csie';
    department.departmentName = '資訊工程學系';
    department.collegeId = 'ncu';

    await this.departmentRepository.save(department);
  }
}
