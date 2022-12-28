import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sitemap.txt')
  @Header('Content-Type', 'text/plain; charset=utf-8')
  async sitemap(): Promise<string> {
    return await this.appService.generateSitemap();
  }
}
