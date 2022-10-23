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
    const department1 = this.departmentRepository.create({
      departmentId: 'deptI0I1I0',
      departmentName: '體育室',
      collegeId: 'collegeI0',
    });
    await this.departmentRepository.save(department1);

    const department2 = this.departmentRepository.create({
      departmentId: 'deptI1I1001I0',
      departmentName: '中國文學系',
      collegeId: 'collegeI1',
    });
    await this.departmentRepository.save(department2);

    const department3 = this.departmentRepository.create({
      departmentId: 'deptI1I3000I0',
      departmentName: '工學院',
      collegeId: 'collegeI3',
    });
    await this.departmentRepository.save(department3);

    const department4 = this.departmentRepository.create({
      departmentId: 'deptI1I5002I0',
      departmentName: '資電學院',
      collegeId: 'collegeI5',
    });
    await this.departmentRepository.save(department4);

    const department = new Department();
    department.departmentId = 'csie';
    department.departmentName = '資訊工程學系';
    department.collegeId = 'ncu';

    await this.departmentRepository.save(department);
  }
}
