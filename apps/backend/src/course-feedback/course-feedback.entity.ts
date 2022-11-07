import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PastExam } from './past-exam.entity';
import { Comment, Review } from './content.entity';

@Entity('CourseFeedbacks')
export class CourseFeedback {
  @PrimaryColumn()
  classNo: string;

  @OneToMany(() => Comment, (comment) => comment.courseFeedback, {
    eager: true,
  })
  comments: Comment[];

  @OneToMany(() => Review, (review) => review.courseFeedback, { eager: true })
  reviews: Review[];

  @OneToMany(() => PastExam, (pastExam) => pastExam.courseFeedback)
  pastExams: PastExam[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
