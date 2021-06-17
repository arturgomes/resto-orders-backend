import Order from '../models/Order';
import Recipe from '../models/Recipe';
import ordersView from './orders_view';

export default {
    renderOrder(order: Order) {
        const { id, created_at, recipe } = order;
        const ordered = ordersView.renderRecipeSimple(recipe);
        return { id, created_at, ordered };
    },
    renderRecipeSimple(recipe: Recipe) {
        const { id, name, description, tag, created_at } = recipe;
        return { id, name, description, tag, created_at };
    },
};
