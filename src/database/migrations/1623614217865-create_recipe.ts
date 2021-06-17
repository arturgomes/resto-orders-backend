import { MigrationInterface, QueryRunner, Table } from 'typeorm';
// {
//     id: '5',
//     name: 'Bobó de Lagosta',
//     description:
//         'De origem indígena com toques cearenses. Esta moqueca de lagosta é feita com verduras refogadas acrescidas de leite de coco, azeite de dendê e coentro. Acompanha arroz branco, pirão de camarão e farofa de dendê',
//     ingredients: ,
//     required_time: '50 minutos',
//     steps: ,
//   }
export class createRecipe1623614217865 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'recipes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'tag',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'ingredients',
                        type: 'varchar',
                    },
                    {
                        name: 'requiredTime',
                        type: 'varchar',
                    },
                    {
                        name: 'steps',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('recipes');
    }
}
