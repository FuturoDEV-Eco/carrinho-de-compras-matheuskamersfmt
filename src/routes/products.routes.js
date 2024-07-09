import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productsRoutes = Router();

const productController = new ProductController();

productsRoutes.post('/product', productController.create);
productsRoutes.get('/product', productController.getProducts);
productsRoutes.get('/product/:id', productController.getProductDetails);


export default productsRoutes;