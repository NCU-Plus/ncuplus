import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CaslModule } from 'nest-casl';
import { permissions } from './permissions/report.permissions';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    CaslModule.forFeature({ permissions }),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
