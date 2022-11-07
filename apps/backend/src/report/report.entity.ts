import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ReportType {
  SPAM = 'spam',
  ABUSE = 'abuse',
  NSFW = 'nsfw',
  OTHER = 'other',
}

export enum TargetType {
  COMMENT = 'comment',
  REVIEW = 'review',
  PAST_EXAM = 'past_exam',
}

@Entity('Reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: ReportType;

  @Column()
  targetType: TargetType;

  @Column()
  targetId: number;

  @Column('boolean')
  resolved = false;

  @Column()
  description: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  reporter: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
