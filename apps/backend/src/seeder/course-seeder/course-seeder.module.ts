import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../course/course.entity';
import { CourseSeederService } from './course-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseSeederService],
  exports: [CourseSeederService],
})
export class CourseSeederModule {}
