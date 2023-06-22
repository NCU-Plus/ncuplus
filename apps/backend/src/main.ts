import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import helmet from 'helmet';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { exit } from 'process';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CollegeDto } from './college/dtos/college.dto';
import { ApiResponseDto } from './types/ApiResponseDto';
import { CourseDto } from './course/dtos/course.dto';
import { DepartmentDto } from './department/dtos/department.dto';
import { PastExamDto } from './course-feedback/dtos/past-exam.dto';
import { CommentDto } from './course-feedback/dtos/comment.dto';
import { ReviewDto } from './course-feedback/dtos/review.dto';
import { ReactionDto } from './course-feedback/dtos/reaction.dto';
import { RatingDto } from './course-feedback/dtos/rating.dto';
import { CourseFeedbackDto } from './course-feedback/dtos/course-feedback.dto';
import { CreatePastExamDto } from './course-feedback/dtos/create-past-exam.dto';
import { ReportDto } from './report/dtos/report.dto';
import { UserDto } from './user/dtos/user.dto';
import { ProfileDto } from './user/profile/dtos/profile.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const sessionOptions: session.SessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV === 'production') {
    try {
      const redisClient = createClient({
        url: process.env.REDIS_URL,
      });
      await redisClient.connect();
      const redisStore = new RedisStore({
        client: redisClient,
        prefix: 'session:',
      });
      sessionOptions.store = new RedisStore({ client: redisClient });
    } catch (e) {
      Logger.error('Unable to connect to Redis');
      exit(1);
    }
  } else {
    // swagger config
    const config = new DocumentBuilder()
      .setTitle('NCU+ API')
      .setDescription('NCU+ API description')
      .setVersion('1.0')
      .addOAuth2()
      .addCookieAuth()
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [
        ApiResponseDto,
        CollegeDto,
        CourseDto,
        DepartmentDto,
        CourseFeedbackDto,
        CommentDto,
        ReviewDto,
        ReactionDto,
        PastExamDto,
        RatingDto,
        CreatePastExamDto,
        ReportDto,
        UserDto,
        ProfileDto,
      ],
    });
    SwaggerModule.setup('swagger', app, document);
  }
  app.use(cookieParser());
  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
