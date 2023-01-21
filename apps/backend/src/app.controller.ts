import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Sitemap')
  @Get('sitemap.txt')
  @Header('Content-Type', 'text/plain; charset=utf-8')
  async sitemap(): Promise<string> {
    return await this.appService.generateSitemap();
  }
}
