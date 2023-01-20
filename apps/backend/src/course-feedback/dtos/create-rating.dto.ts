import { IsEnum, IsInt, IsPositive, Max, Min } from 'class-validator';
import { RatingType } from '../rating,entity';

export class CreateRatingDto {
  @IsEnum(RatingType)
  type: RatingType;

  @IsInt()
  @Max(10)
  @Min(1)
  value: number;
}
