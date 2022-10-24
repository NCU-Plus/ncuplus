import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DepartmentModule } from './department/department.module';
import { CollegeModule } from './college/college.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CourseFeedbackModule } from './course-feedback/course-feedback.module';
import { CaslModule } from 'nest-casl';
import { UserRole } from './user/user.entity';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        ({
          ...config.get('db'),
          autoLoadEntities: true,
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
    CollegeModule,
    DepartmentModule,
    CourseModule,
    AuthModule,
    UserModule,
    ReportModule,
    CourseFeedbackModule,
    CaslModule.forRoot<UserRole>({
      superuserRole: UserRole.ADMIN,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
