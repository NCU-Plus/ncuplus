import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from '../../course/course.entity';
import { Repository } from 'typeorm';
import { CourseSeederService } from './course-seeder.service';

describe('CourseSeederService', () => {
  let service: CourseSeederService;
  let courseRepository: Repository<Course>;

  const COURSE_REPOSITORY_TOKEN = getRepositoryToken(Course);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseSeederService,
        {
          provide: COURSE_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CourseSeederService>(CourseSeederService);
    courseRepository = module.get<Repository<Course>>(COURSE_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(courseRepository).toBeDefined();
  });
});
