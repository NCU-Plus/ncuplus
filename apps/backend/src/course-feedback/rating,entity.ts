import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CourseFeedback } from './course-feedback.entity';

export enum RatingType {
  DIFFICULTY = 0,
  SCORE = 1,
  RECOMMEND = 2,
}

@Entity('Ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column({ nullable: true })
  courseFeedbackClassNo: string;

  @ManyToOne(
    () => CourseFeedback,
    (courseFeedback) => courseFeedback.comments,
    {
      onDelete: 'CASCADE',
    },
  )
  courseFeedback: CourseFeedback;

  @Column('tinyint')
  @Index()
  type: RatingType;

  @Column('tinyint')
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
