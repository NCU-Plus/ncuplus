import { Controller, Get, Header } from '@nestjs/common';
import { ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../types/ApiResponseDto';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dtos/department.dto';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOkResponse({
    description: 'Get department list.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(DepartmentDto) },
            },
          },
        },
      ],
    },
  })
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getDepartments() {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.departmentService.getDepartments(),
    };
  }
}
