import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { RatingType } from '../rating,entity';

export class CreateRatingDto {
  @ApiProperty({
    description: 'The rating type. 0: difficulty, 1: score, 2: recommend',
    enum: [RatingType.DIFFICULTY, RatingType.SCORE, RatingType.RECOMMEND],
  })
  @IsEnum(RatingType)
  type: RatingType;

  @ApiProperty({
    description: 'The rating value.',
    minimum: 1,
    maximum: 10,
  })
  @IsInt()
  @Max(10)
  @Min(1)
  value: number;
}
