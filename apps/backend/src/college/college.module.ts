import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { College } from './college.entity';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';

@Module({
  imports: [TypeOrmModule.forFeature([College])],
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule {}
