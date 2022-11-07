import {
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ReportType, TargetType } from '../report.entity';

export class CreateReportDto {
  @IsEnum(ReportType)
  type: ReportType;

  @IsEnum(TargetType)
  targetType: TargetType;

  @IsInt()
  @IsPositive()
  targetId: number;

  @IsString()
  @MaxLength(255)
  description: string;
}
