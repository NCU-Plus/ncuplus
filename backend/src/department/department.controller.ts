import { Controller, Get, Header } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
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
