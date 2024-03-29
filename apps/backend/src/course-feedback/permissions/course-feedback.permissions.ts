import { Actions, Permissions } from 'nest-casl';
import { InferSubjects } from '@casl/ability';
import { UserRole } from 'src/user/user.entity';
import { CourseFeedback } from '../course-feedback.entity';
import { PastExam } from '../past-exam.entity';
import { Reaction } from '../reaction.entity';
import { Comment, Review } from '../content.entity';
import { Rating } from '../rating,entity';

export type Subjects = InferSubjects<
  | typeof CourseFeedback
  | typeof Comment
  | typeof Review
  | typeof PastExam
  | typeof Reaction
  | typeof Rating
>;

export const permissions: Permissions<UserRole, Subjects, Actions> = {
  every({ user, can, cannot }) {
    can(Actions.create, [Comment, Review, PastExam, Rating]);
    can(Actions.create, Reaction);
    cannot(Actions.create, Reaction, {
      comment: {
        authorId: user.id as unknown as number,
      },
    });
    cannot(Actions.create, Reaction, {
      review: {
        authorId: user.id as unknown as number,
      },
    });

    can(Actions.read, [Comment, Review, PastExam, Reaction, Rating]);

    can([Actions.update, Actions.delete], [Comment, Review, Reaction, Rating], {
      authorId: user.id as unknown as number,
    });
    can([Actions.update, Actions.delete], PastExam, {
      uploaderId: user.id as unknown as number,
    });
  },
};
