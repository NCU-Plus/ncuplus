import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { Request } from 'express';
import { User } from '../user/user.entity';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { Report } from './report.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportHook } from './hooks/report.hook';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.create, Report)
  async create(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true }))
    createReportDto: CreateReportDto,
  ) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.reportService.create(
        (req.user as User).id,
        createReportDto,
      ),
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.read, Report)
  async findAll(@Req() req: Request) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.reportService.findAll(req.user as User),
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.read, Report, ReportHook)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.reportService.findOne(id),
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.update, Report, ReportHook)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.reportService.update(id, updateReportDto),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.delete, Report, ReportHook)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.reportService.remove(id),
    };
  }
}
