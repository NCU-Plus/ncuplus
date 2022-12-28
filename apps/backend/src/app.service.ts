import { Injectable } from '@nestjs/common';
import { CourseService } from './course/course.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private sitemap: string;
  constructor(
    private readonly _courseService: CourseService,
    private readonly _configService: ConfigService,
  ) {}

  public async generateSitemap(): Promise<string> {
    if (this.sitemap) {
      return this.sitemap;
    }
    const webRootUrl = this._configService.get('webRootUrl');
    if (!webRootUrl) {
      throw new Error('webRootUrl is not defined');
    }
    const links = [
      `${webRootUrl}/`,
      `${webRootUrl}/courses`,
      `${webRootUrl}/reviews`,
      `${webRootUrl}/courses/simulation`,
      `${webRootUrl}/login`,
    ];
    const courses = await this._courseService.getCourses();
    for (const course of courses) {
      links.push(`${webRootUrl}/courses/${course.id}`);
    }
    return links.join('\n');
  }
}
