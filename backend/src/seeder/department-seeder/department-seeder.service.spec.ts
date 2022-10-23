import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Department } from '../../department/department.entity';
import { Repository } from 'typeorm';
import { DepartmentSeederService } from './department-seeder.service';

describe('DepartmentSeederService', () => {
  let service: DepartmentSeederService;
  let departmentRepository: Repository<Department>;

  const DEPARTMENT_REPOSITORY_TOKEN = getRepositoryToken(Department);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentSeederService,
        {
          provide: DEPARTMENT_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DepartmentSeederService>(DepartmentSeederService);
    departmentRepository = module.get<Repository<Department>>(
      DEPARTMENT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(departmentRepository).toBeDefined();
  });
});
