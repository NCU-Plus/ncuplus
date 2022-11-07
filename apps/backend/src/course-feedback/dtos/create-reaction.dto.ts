import { IsEnum } from 'class-validator';
import { ReactionType } from '../reaction.entity';

export class CreateReactionDto {
  @IsEnum(ReactionType)
  type: ReactionType;
}
