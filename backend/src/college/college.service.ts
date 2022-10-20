import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from './college.entity';
@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College)
    private collegeRepository: Repository<College>,
  ) {}
  async getColleges(): Promise<College[]> {
    return await this.collegeRepository.find({
      select: ['collegeId', 'collegeName'],
    });
  }
}
