import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../../department/department.entity';
import { DepartmentSeederService } from './department-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentSeederService],
  exports: [DepartmentSeederService],
})
export class DepartmentSeederModule {}
