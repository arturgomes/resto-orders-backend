import { Router } from 'express';
import cors from 'cors';
import { RecipeController } from './controllers/RecipeController';
import { OrderController } from './controllers/OrderController';

const router = Router();
router.all('*', cors());

const recipeController = new RecipeController();

router.post('/recipes', recipeController.create);
router.get('/recipes', recipeController.index);
router.get('/recipes/:name_found', recipeController.show);

const orderController = new OrderController();

router.post('/orders', orderController.create);
router.get('/orders', orderController.index);
router.get('/orders/:order_id', orderController.show);

export { router };
