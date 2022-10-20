import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}
  async getDepartments(): Promise<Department[]> {
    return await this.departmentRepository.find({
      select: ['departmentId', 'departmentName', 'collegeId'],
    });
  }
}
