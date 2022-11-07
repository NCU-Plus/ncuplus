import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createClient } from 'redis';
import * as connectRedis from 'connect-redis';
import helmet from 'helmet';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { exit } from 'process';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const sessionOptions: session.SessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV === 'production') {
    const redisClient = createClient({
      url: process.env.REDIS_URL,
    });
    try {
      const RedisStore = connectRedis(session);
      sessionOptions.store = new RedisStore({ client: redisClient });
    } catch (e) {
      Logger.error('Unable to connect to Redis');
      exit(1);
    }
  }
  app.use(cookieParser());
  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
