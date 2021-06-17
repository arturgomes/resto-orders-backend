import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Recipe } from './Recipe';

@Entity('Orders')
export default class Order {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.id)
    @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
    recipe: Recipe;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Order };
