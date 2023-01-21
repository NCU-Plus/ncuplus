import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDto {
  @ApiProperty({
    description: 'The department id.',
    example: 'deptI0I10I0',
  })
  departmentId: string;

  @ApiProperty({
    description: 'The department name.',
    example: '語言中心',
  })
  departmentName: string;

  @ApiProperty({
    description: 'The college id.',
    example: 'collegeI0',
  })
  collegeId: string;
}
