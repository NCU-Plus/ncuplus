import { Controller, Get, Header, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/types/ApiResponseDto';
import { CourseService } from './course.service';
import { CourseDto } from './dtos/course.dto';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOkResponse({
    description: 'Get course list.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(CourseDto) },
            },
          },
        },
      ],
    },
  })
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getCourses() {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.courseService.getCourses(),
    };
  }

  @ApiOkResponse({
    description: 'Get course.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(CourseDto),
            },
          },
        },
      ],
    },
  })
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
