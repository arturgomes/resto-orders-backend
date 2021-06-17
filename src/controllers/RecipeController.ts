import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { RecipesRepository } from '../repositories/RecipesRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

interface RecipeType {
    name: string;
    description: string;
    ingredients: string;
    required_time: string;
    steps: string;
}
class RecipeController {
    async show(request: Request, response: Response) {
        const { name_found } = request.params;
        const recipeRepository = getCustomRepository(RecipesRepository);
        const strFind = '%' + name_found + '%';
        const recipe = await recipeRepository.find({
            name: Like(strFind),
        });
        if (recipe) {
            return response.status(200).json({ recipe });
        }
        return response.status(400).json({ message: 'recipe not found' });
    }
    async index(request: Request, response: Response) {
        const recipeRepository = getCustomRepository(RecipesRepository);

        const recipes = await recipeRepository.find();
        if (recipes) {
            return response.status(200).json({ recipes });
        }
        return response.status(400).json({ message: 'no recipe found' });
    }
    async create(request: Request, response: Response) {
        const { name, description, ingredients, tag, required_time, steps } =
            request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            tag: yup.string().required(),
            description: yup.string().required(),
            ingredients: yup.array().of(yup.string()).required(),
            required_time: yup.string().required(),
            steps: yup.array().of(yup.string()).required(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppError(err);
        }

        const recipeRepository = getCustomRepository(RecipesRepository);

        // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        const recipeAlreadyExists = await recipeRepository.findOne({
            name,
        });

        if (recipeAlreadyExists) {
            throw new AppError('Recipe already exists!');
        }
        const ingredientsStr = JSON.stringify(ingredients);
        const stepsStr = JSON.stringify(steps);
        const rec = {
            name,
            tag,
            description,
            ingredients: ingredientsStr,
            requiredTime: required_time,
            steps: stepsStr,
        };
        const recipe = recipeRepository.create(rec);

        await recipeRepository.save(recipe);

        return response.status(201).json(recipe);
    }
}

export { RecipeController };
