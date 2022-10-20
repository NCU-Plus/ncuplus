import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1656603566900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'portalId',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'identifier',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'studentId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'roles',
            type: 'json',
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
    await queryRunner.dropTable('Users');
  }
}
