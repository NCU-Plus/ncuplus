import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MaxLength(16)
  @MinLength(1)
  name: string;
}
