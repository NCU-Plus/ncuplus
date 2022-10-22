import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

function execSeed(type: string, seederService: SeederService) {
  switch (type) {
    case 'college':
      return seederService.seedCollege();
    default:
      console.error(`No seed found for ${type}`);
  }
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seederService = app.get(SeederService);
  const type = process.argv[2];
  if (!type) console.error('Please provide a type of seed to run.');
  console.log(`Running seed for ${type}`);
  execSeed(type, seederService);
  console.log(`Finished running seed for ${type}`);
  await app.close();
}
bootstrap();
