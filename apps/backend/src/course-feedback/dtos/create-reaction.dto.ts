import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ReactionType } from '../reaction.entity';

export class CreateReactionDto {
  @ApiProperty({
    description: 'The reaction type. 0: like, 1: dislike',
    enum: [ReactionType.LIKE, ReactionType.DISLIKE],
  })
  @IsEnum(ReactionType)
  type: ReactionType;
}
