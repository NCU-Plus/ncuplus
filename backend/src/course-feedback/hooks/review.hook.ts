import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { Review } from '../content.entity';
import { CourseFeedbackService } from '../course-feedback.service';

@Injectable()
export class ReviewHook implements SubjectBeforeFilterHook<Review, Request> {
  constructor(private readonly courseFeedbackService: CourseFeedbackService) {}

  async run(req: Request) {
    return await this.courseFeedbackService.findOneReview(req.params.id);
  }
}
