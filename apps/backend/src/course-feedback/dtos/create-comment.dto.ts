import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 255,
    description: 'The content of the comment.',
  })
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  content: string;
}
