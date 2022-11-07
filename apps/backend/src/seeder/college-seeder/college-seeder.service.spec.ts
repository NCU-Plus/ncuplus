import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { College } from '../../college/college.entity';
import { Repository } from 'typeorm';
import { CollegeSeederService } from './college-seeder.service';

describe('CollegeSeederService', () => {
  let service: CollegeSeederService;
  let collegeRepository: Repository<College>;

  const COLLEGE_REPOSITORY_TOKEN = getRepositoryToken(College);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollegeSeederService,
        {
          provide: COLLEGE_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CollegeSeederService>(CollegeSeederService);
    collegeRepository = module.get<Repository<College>>(
      COLLEGE_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(collegeRepository).toBeDefined();
  });
});
