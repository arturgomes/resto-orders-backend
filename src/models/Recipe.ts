import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('recipes')
export default class Recipe {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    tag: string;

    @Column()
    description: string;

    @Column()
    ingredients: string;

    @Column()
    requiredTime: string;

    @Column()
    steps: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Recipe };
