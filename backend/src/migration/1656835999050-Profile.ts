import { MigrationInterface, QueryRunner } from 'typeorm';

export class Profile1656835999050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'UPDATE `Profiles` SET `name` = "匿名使用者", `updatedAt` = now()',
    );
    await queryRunner.query(
      'ALTER TABLE `Profiles` CHANGE `name` `name` varchar(16) NOT NULL AFTER `id`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `Profiles` CHANGE `name` `name` varchar(255) NOT NULL AFTER `id`',
    );
  }
}
