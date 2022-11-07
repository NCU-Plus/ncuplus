import { Controller, Get, Header, Param, ParseIntPipe } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getCourses() {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.courseService.getCourses(),
    };
  }
  @Get(':id')
  @Header('Access-Control-Allow-Origin', '*')
  async getCourse(@Param('id', ParseIntPipe) id: number) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.courseService.getCourse(id),
    };
  }
}
