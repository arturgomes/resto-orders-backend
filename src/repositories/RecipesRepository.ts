import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from '../models/Recipe';

@EntityRepository(Recipe)
class RecipesRepository extends Repository<Recipe> {}

export { RecipesRepository };
