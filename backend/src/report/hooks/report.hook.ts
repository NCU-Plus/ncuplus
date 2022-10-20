import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { Report } from '../report.entity';
import { ReportService } from '../report.service';

@Injectable()
export class ReportHook implements SubjectBeforeFilterHook<Report, Request> {
  constructor(private readonly reportService: ReportService) {}

  async run(req: Request) {
    return await this.reportService.findOne(req.params.id);
  }
}
