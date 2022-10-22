import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configuration } from '../config';
import { CollegeSeederModule } from './college-seeder/college-seeder.module';
import { SeederService } from './seeder.service';

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
    CollegeSeederModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
