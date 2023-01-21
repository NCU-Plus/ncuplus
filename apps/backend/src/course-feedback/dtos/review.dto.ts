import { ApiProperty } from '@nestjs/swagger';
import { ReactionDto } from './reaction.dto';

export class ReviewDto {
  @ApiProperty({
    description: 'The review id.',
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

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({
    description: 'The content of the review.',
  })
  content: string;

  @ApiProperty({
    description: 'The reactions of the review.',
    example: [],
  })
  reactions: ReactionDto[];
}
