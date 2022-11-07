import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CaslModule } from 'nest-casl';
import { Repository } from 'typeorm';
import { permissions } from './permissions/report.permissions';
import { Report } from './report.entity';
import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService;
  let reportRepository: Repository<Report>;

  const REPORT_REPOSITORY_TOKEN = getRepositoryToken(Report);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CaslModule.forFeature({ permissions })],
      providers: [
        ReportService,
        {
          provide: REPORT_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<ReportService>(ReportService);
    reportRepository = module.get<Repository<Report>>(REPORT_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(reportRepository).toBeDefined();
  });
});
