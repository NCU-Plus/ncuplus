import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePastExamDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 255,
    description: 'The year of the past exam.',
  })
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  year: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 255,
    description: 'The description of the past exam.',
  })
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  description: string;
}
