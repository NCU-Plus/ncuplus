import { subject } from '@casl/ability';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessService, Actions } from 'nest-casl';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly accessService: AccessService,
  ) {}
  async create(reportId: number, createReportDto: CreateReportDto) {
    const report = this.reportRepository.create({
      ...createReportDto,
      reporter: reportId,
    });
    return await this.reportRepository.save(report);
  }

  async findAll(user: User) {
    const reports = await this.reportRepository.find({ loadRelationIds: true });
    return reports.filter((report) =>
      this.accessService.hasAbility(
        user as any,
        Actions.read,
        // https://casl.js.org/v5/en/guide/subject-type-detection
        subject(report.constructor as any, report),
      ),
    );
  }

  async findOne(id: number) {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) throw new NotFoundException('Report not found');
    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.findOne(id);
    const saved = await this.reportRepository.save({
      ...report,
      ...updateReportDto,
    });
    return saved;
  }

  async remove(id: number) {
    const report = await this.findOne(id);
    await this.reportRepository.remove(report);
    return report;
  }
}
