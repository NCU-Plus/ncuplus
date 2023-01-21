import { ApiProperty } from '@nestjs/swagger';
import { ReactionDto } from './reaction.dto';

export class CommentDto {
  @ApiProperty({
    description: 'The comment id.',
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
    type: Date,
  })
  createdAt: string;

  @ApiProperty({
    type: Date,
  })
  updatedAt: string;

  @ApiProperty({
    description: 'The content of the comment.',
  })
  content: string;

  @ApiProperty({
    description: 'The reactions of the comment.',
    example: [],
  })
  reactions: ReactionDto[];
}
