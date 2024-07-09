import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const ordersRoutes = Router();

const orderController = new OrderController();

ordersRoutes.post('/order', orderController.create);

export default ordersRoutes;