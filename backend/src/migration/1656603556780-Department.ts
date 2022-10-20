import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Department1656603556780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Departments',
        columns: [
          {
            name: 'departmentId',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'departmentName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'collegeId',
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
    await queryRunner.dropTable('Departments');
  }
}
