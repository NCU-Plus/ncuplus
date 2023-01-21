import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ReportType, TargetType } from '../report.entity';

export class CreateReportDto {
  @ApiProperty({
    description: 'The report type.',
    enum: ReportType,
  })
  @IsEnum(ReportType)
  type: ReportType;

  @ApiProperty({
    description: 'The target type.',
    enum: TargetType,
  })
  @IsEnum(TargetType)
  targetType: TargetType;

  @ApiProperty({
    description: 'The target id.',
  })
  @IsInt()
  @IsPositive()
  targetId: number;

  @ApiProperty({
    description: 'The description of the report.',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  description: string;
}
