import { ApiProperty } from '@nestjs/swagger';
import { ReactionType } from '../reaction.entity';

export class ReactionDto {
  @ApiProperty({
    description: 'The reaction id.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The author id.',
    example: 1,
  })
  authorId: number;

  @ApiProperty({
    description: 'The type of the reaction.',
    enum: [ReactionType.LIKE, ReactionType.DISLIKE],
    example: ReactionType.LIKE,
  })
  type: ReactionType;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;
}
