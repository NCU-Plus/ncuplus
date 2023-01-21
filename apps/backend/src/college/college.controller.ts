import { Controller, Get, Header } from '@nestjs/common';
import { ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/types/ApiResponseDto';
import { CollegeService } from './college.service';
import { CollegeDto } from './dtos/college.dto';

@ApiTags('Colleges')
@Controller('colleges')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @ApiOkResponse({
    description: 'Get college list.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(CollegeDto) },
            },
          },
        },
      ],
    },
  })
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getCourses(): Promise<ApiResponseDto<CollegeDto[]>> {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.collegeService.getColleges(),
    };
  }
}
