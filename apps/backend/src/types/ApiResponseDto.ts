import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({
    description: 'The status code of the response.',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'The message of the response.',
    example: 'OK',
  })
  message: string;

  data: T;
}
