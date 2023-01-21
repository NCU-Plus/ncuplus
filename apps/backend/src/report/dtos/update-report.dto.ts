import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateReportDto {
  @ApiProperty({
    description: 'The resolved status of the report.',
  })
  @IsBoolean()
  resolved: boolean;
}
