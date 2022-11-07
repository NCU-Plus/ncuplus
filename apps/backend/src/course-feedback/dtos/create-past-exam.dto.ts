import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePastExamDto {
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  year: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  description: string;
}
