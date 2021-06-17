import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOrders1623614223084 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'recipe_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKRecipe',
                        referencedTableName: 'recipes',
                        referencedColumnNames: ['id'],
                        columnNames: ['recipe_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }
}
