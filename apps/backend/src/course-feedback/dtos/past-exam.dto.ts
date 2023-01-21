import { ApiProperty } from '@nestjs/swagger';

export class PastExamDto {
  @ApiProperty({
    description: 'The id of the past exam.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The year of past exam.',
  })
  year: string;

  @ApiProperty({
    description: 'The file description.',
  })
  description: string;

  @ApiProperty({
    description: 'The file name.',
  })
  originFilename: string;

  @ApiProperty({
    description: 'The file size.',
  })
  size: number;

  @ApiProperty({
    description: 'The file download count.',
  })
  downloadCount: number;

  @ApiProperty({
    description: 'The file uploader id.',
  })
  uploaderId: number;

  @ApiProperty({
    type: Date,
  })
  createdAt: string;

  @ApiProperty({
    type: Date,
  })
  updatedAt: string;
}
