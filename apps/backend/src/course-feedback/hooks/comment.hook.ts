import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { Comment } from '../content.entity';
import { CourseFeedbackService } from '../course-feedback.service';

@Injectable()
export class CommentHook implements SubjectBeforeFilterHook<Comment, Request> {
  constructor(private readonly courseFeedbackService: CourseFeedbackService) {}

  async run(req: Request) {
    return await this.courseFeedbackService.findOneComment(req.params.id);
  }
}
