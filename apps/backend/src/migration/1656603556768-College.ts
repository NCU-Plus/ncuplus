import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class College1656603556768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Colleges',
        columns: [
          {
            name: 'collegeId',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'collegeName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Colleges');
  }
}
