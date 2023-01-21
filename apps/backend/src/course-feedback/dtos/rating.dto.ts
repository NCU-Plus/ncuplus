import { ApiProperty } from '@nestjs/swagger';
import { RatingType } from '../rating,entity';

export class RatingDto {
  @ApiProperty({
    description: 'The id of the rating.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The author id.',
    example: 1,
  })
  authorId: number;

  @ApiProperty({
    description: 'The course feedback class no.',
    example: 'PE1022A',
  })
  courseFeedbackClassNo: string;

  @ApiProperty({
    description: 'The type of the rating.',
    enum: [RatingType.DIFFICULTY, RatingType.SCORE, RatingType.RECOMMEND],
    example: RatingType.DIFFICULTY,
  })
  type: RatingType;

  @ApiProperty({
    description: 'The value of the rating.',
    example: 5,
  })
  value: number;

  @ApiProperty({
    type: Date,
  })
  createdAt: string;

  @ApiProperty({
    type: Date,
  })
  updatedAt: string;
}
