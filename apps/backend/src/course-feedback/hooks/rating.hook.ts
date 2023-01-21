import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { CourseFeedbackService } from '../course-feedback.service';
import { Rating } from '../rating,entity';

@Injectable()
export class RatingHook implements SubjectBeforeFilterHook<Rating, Request> {
  constructor(private readonly courseFeedbackService: CourseFeedbackService) {}

  async run(req: Request) {
    return await this.courseFeedbackService.findOneRating(req.params.id);
  }
}
