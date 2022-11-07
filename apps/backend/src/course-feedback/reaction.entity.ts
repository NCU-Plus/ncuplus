import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment, Review } from './content.entity';

export enum ReactionType {
  LIKE = 0,
  DISLIKE = 1,
}

@Entity('Reactions')
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column('tinyint')
  type: ReactionType;

  @ManyToOne(() => Comment, (comment) => comment.reactions, {
    onDelete: 'CASCADE',
  })
  comment: Comment;

  @ManyToOne(() => Review, (review) => review.reactions, {
    onDelete: 'CASCADE',
  })
  review: Review;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
