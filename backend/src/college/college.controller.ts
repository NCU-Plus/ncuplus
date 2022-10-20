import { Controller, Get, Header } from '@nestjs/common';
import { CollegeService } from './college.service';

@Controller('colleges')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getCourses() {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.collegeService.getColleges(),
    };
  }
}
