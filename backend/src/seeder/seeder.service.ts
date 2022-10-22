import { Injectable } from '@nestjs/common';
import { CollegeSeederService } from './college-seeder/college-seeder.service';

@Injectable()
export class SeederService {
  constructor(private readonly collegeSeederService: CollegeSeederService) {}
  async seedCollege() {
    await this.collegeSeederService.seedCollege();
  }
}
