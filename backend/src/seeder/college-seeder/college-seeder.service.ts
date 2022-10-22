import { Injectable } from '@nestjs/common';
import { College } from '../../college/college.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CollegeSeederService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
  ) {}

  async seedCollege() {
    // placeholder
  }
}
