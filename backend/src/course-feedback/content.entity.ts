import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CourseFeedback } from './course-feedback.entity';
import { Reaction } from './reaction.entity';

abstract class Content {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('Reviews')
export class Review extends Content {
  @Column('text')
  content: string;

  @OneToMany(() => Reaction, (reaction) => reaction.review, { eager: true })
  reactions: Reaction[];
}

@Entity('Comments')
export class Comment extends Content {
  @Column()
  content: string;

  @OneToMany(() => Reaction, (reaction) => reaction.comment, { eager: true })
  reactions: Reaction[];
}
