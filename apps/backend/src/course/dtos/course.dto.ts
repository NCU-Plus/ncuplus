import { ApiProperty } from '@nestjs/swagger';
import { Semester } from '../course.entity';

export class CourseDto {
  @ApiProperty({
    description: 'The id of the course.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The ROC year of the course.',
    example: 110,
  })
  year: number;

  @ApiProperty({
    description: 'The semester of the course.',
    example: 1,
    enum: [0, 1],
  })
  semester: Semester;

  @ApiProperty({
    description: 'The serial number of the course.',
    example: 1001,
  })
  serialNo: number;

  @ApiProperty({
    description: 'The class number of the course.',
    example: 'PE1022A',
  })
  classNo: string;

  @ApiProperty({
    description: 'The title of the course.',
    example: '大一體育',
  })
  title: string;

  @ApiProperty({
    description: 'The credit of the course.',
    example: 0,
  })
  credit: number;

  @ApiProperty({
    description: 'Allow to use password cards',
    enum: ['ALL', 'NONE', 'OPTIONAL'],
    example: 'OPTIONAL',
  })
  passwordCard: string;

  @ApiProperty({
    description: 'The teachers of the course.',
    example: '["沈淑鳳"]',
  })
  teachers: string;

  @ApiProperty({
    description: 'The class times of the course.',
    example: '["1-3","1-4"]',
  })
  classTimes: string;

  @ApiProperty({
    example: 0,
  })
  limitCnt: number;

  @ApiProperty({
    example: 0,
  })
  admitCnt: number;

  @ApiProperty({
    example: 0,
  })
  waitCnt: number;

  @ApiProperty({
    description: 'The college id of the course.',
    example: 'collegeI0',
  })
  collegeId: string;

  @ApiProperty({
    description: 'The department id of the course.',
    example: 'deptI0I1I0',
  })
  departmentId: string;

  @ApiProperty({
    description: 'The course type of the course.',
    enum: ['REQUIRED', 'ELECTIVE'],
    example: 'REQUIRED',
  })
  courseType: string;
}
