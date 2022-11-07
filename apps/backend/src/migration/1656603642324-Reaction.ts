import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Reaction1656603642324 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Reactions',
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
            name: 'reviewId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'commentId',
            type: 'int',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['reviewId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Reviews',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['commentId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Comments',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Reactions');
  }
}
