import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: 'The user name.',
    minLength: 1,
    maxLength: 16,
  })
  @IsString()
  @MaxLength(16)
  @MinLength(1)
  name: string;
}
