import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productRoutes = Router();

const productController = new ProductController();

productRoutes.post('/product', productController.create);


export default productRoutes;