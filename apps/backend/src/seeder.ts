import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

function execSeed(type: string, seederService: SeederService) {
  switch (type) {
    case 'college':
      return seederService.seedCollege();
    case 'college:clear':
      return seederService.clearCollege();
    case 'course':
      return seederService.seedCourse();
    case 'course:clear':
      return seederService.clearCourse();
    case 'department':
      return seederService.seedDepartment();
    case 'department:clear':
      return seederService.clearDepartment();
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
  await execSeed(type, seederService);
  console.log(`Finished running seed for ${type}`);
  await app.close();
}
bootstrap();
