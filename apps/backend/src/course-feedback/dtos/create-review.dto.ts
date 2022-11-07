import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @MaxLength(65535)
  @MinLength(1)
  content: string;
}
