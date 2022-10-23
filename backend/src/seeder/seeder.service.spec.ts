import { Test, TestingModule } from '@nestjs/testing';
import { CollegeSeederService } from './college-seeder/college-seeder.service';
import { CourseSeederService } from './course-seeder/course-seeder.service';
import { DepartmentSeederService } from './department-seeder/department-seeder.service';
import { SeederService } from './seeder.service';

describe('SeederService', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederService,
        {
          provide: CollegeSeederService,
          useValue: {},
        },
        {
          provide: CourseSeederService,
          useValue: {},
        },
        {
          provide: DepartmentSeederService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
