import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';
import { PastExamDto } from './past-exam.dto';
import { RatingDto } from './rating.dto';
import { ReviewDto } from './review.dto';

export class CourseFeedbackDto {
  @ApiProperty({
    description: 'The class number of the course.',
    example: 'PE1022A',
  })
  classNo: string;

  @ApiProperty({
    description: 'The rating of the course.',
    example: [],
  })
  ratings: RatingDto[];

  @ApiProperty({
    description: 'The comments of the course.',
    example: [],
  })
  comments: CommentDto[];

  @ApiProperty({
    description: 'The reviews of the course.',
    example: [],
  })
  reviews: ReviewDto[];

  @ApiProperty({
    description: 'The past exams of the course.',
    example: [],
  })
  pastExams: PastExamDto[];
}
