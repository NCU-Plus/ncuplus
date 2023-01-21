import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 65535,
    description: 'The content of the review.',
  })
  @IsString()
  @MaxLength(65535)
  @MinLength(1)
  content: string;
}
