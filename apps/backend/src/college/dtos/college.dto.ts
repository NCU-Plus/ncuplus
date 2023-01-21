import { ApiProperty } from '@nestjs/swagger';

export class CollegeDto {
  @ApiProperty({
    description: 'The college id.',
    example: 'collegeI0',
  })
  collegeId: string;

  @ApiProperty({
    description: 'The college name.',
    example: '中心、處室',
  })
  collegeName: string;
}
