import { MigrationInterface, QueryRunner } from 'typeorm';

export class ncuplus1656603556500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER DATABASE ncuplus CHARACTER SET utf8mb4');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('ncuplus');
  }
}
