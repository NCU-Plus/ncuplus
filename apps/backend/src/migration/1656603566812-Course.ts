import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Course1656603566812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Courses',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'year',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'semester',
            type: 'tinyint',
            isNullable: false,
          },
          {
            name: 'serialNo',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'classNo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'credit',
            type: 'tinyint',
            isNullable: false,
          },
          {
            name: 'passwordCard',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'teachers',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'classTimes',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'limitCnt',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'admitCnt',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'waitCnt',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'collegeId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'departmentId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'courseType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Courses');
  }
}
