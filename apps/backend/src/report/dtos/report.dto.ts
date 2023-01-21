import { ApiProperty } from '@nestjs/swagger';
import { ReportType, TargetType } from '../report.entity';

export class ReportDto {
  @ApiProperty({
    description: 'The id of the report',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The type of the report',
    enum: ReportType,
    example: ReportType.SPAM,
  })
  type: ReportType;

  @ApiProperty({
    description: 'The type of the target',
    enum: TargetType,
    example: TargetType.COMMENT,
  })
  targetType: TargetType;

  @ApiProperty({
    description: 'The id of the target',
    example: 1,
  })
  targetId: number;

  @ApiProperty({
    description: 'The resolved status of the report',
    example: false,
  })
  resolved: boolean;

  @ApiProperty({
    description: 'The description of the report',
  })
  description: string;

  @ApiProperty({
    description: 'The id of the reporter',
    example: 1,
  })
  reporter: number;

  @ApiProperty({
    type: Date,
  })
  createdAt: string;

  @ApiProperty({
    type: Date,
  })
  updatedAt: string;
}
