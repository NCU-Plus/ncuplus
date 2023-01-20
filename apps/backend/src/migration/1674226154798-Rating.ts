import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Rating1674226154798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Ratings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'authorId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'tinyint',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'tinyint',
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
          {
            name: 'courseFeedbackClassNo',
            type: 'varchar',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['courseFeedbackClassNo'],
            referencedTableName: 'CourseFeedbacks',
            referencedColumnNames: ['classNo'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
    await queryRunner.createIndex(
      'Ratings',
      new TableIndex({
        columnNames: ['type'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Ratings');
  }
}
