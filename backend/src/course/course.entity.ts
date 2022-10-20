import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Semester {
  SPRING = 0,
  FALL = 1,
}

@Entity('Courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column('tinyint')
  semester: Semester;

  @Column()
  serialNo: number;

  @Column()
  classNo: string;

  @Column()
  title: string;

  @Column('tinyint')
  credit: number;

  @Column()
  passwordCard: string;

  @Column('json')
  teachers: string[];

  @Column('json')
  classTimes: string[];

  @Column()
  limitCnt: number;

  @Column()
  admitCnt: number;

  @Column()
  waitCnt: number;

  @Column()
  collegeId: string;

  @Column()
  departmentId: string;

  @Column({ nullable: true })
  courseType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
