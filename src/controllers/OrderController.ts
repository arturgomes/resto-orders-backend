import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import { OrdersRepository } from '../repositories/OrdersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import ordersView from '../views/orders_view';
import Order from '../models/Order';

class OrderController {
    async show(request: Request, response: Response) {
        const { order_id } = request.params;
        const orderRepository = getCustomRepository(OrdersRepository);
        const order = await orderRepository.find({ id: order_id });
        if (order) {
            return response.status(200).json({ order });
        }
        return response.status(400).json({ message: 'order not found' });
    }
    async index(request: Request, response: Response) {
        const orderRepository = getCustomRepository(OrdersRepository);
        const orders = await orderRepository.find({ relations: ['recipe'] });
        console.log(orders);
        if (orders) {
            return response
                .status(200)
                .json({
                    orders: orders.map((order) =>
                        ordersView.renderOrder(order)
                    ),
                });
        }
        return response.status(400).json({ message: 'no order found' });
    }
    async create(request: Request, response: Response) {
        const { recipe_id } = request.body;

        const schema = yup.object().shape({
            recipe_id: yup.string().required(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppError(err);
        }

        const orderRepository = getCustomRepository(OrdersRepository);

        const order = orderRepository.create({ recipe: recipe_id });

        await orderRepository.save(order);

        return response.status(201).json(order);
    }
}

export { OrderController };
