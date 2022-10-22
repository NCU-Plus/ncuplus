import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { College } from '../../college/college.entity';
import { CollegeSeederService } from './college-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([College])],
  providers: [CollegeSeederService],
  exports: [CollegeSeederService],
})
export class CollegeSeederModule {}
