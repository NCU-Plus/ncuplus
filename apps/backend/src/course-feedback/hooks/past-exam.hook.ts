import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { CourseFeedbackService } from '../course-feedback.service';
import { PastExam } from '../past-exam.entity';

@Injectable()
export class PastExamHook
  implements SubjectBeforeFilterHook<PastExam, Request>
{
  constructor(private readonly courseFeedbackService: CourseFeedbackService) {}

  async run(req: Request) {
    return await this.courseFeedbackService.findOnePastExam(req.params.id);
  }
}
