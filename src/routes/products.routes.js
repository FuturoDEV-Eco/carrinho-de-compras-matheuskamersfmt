import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productRoutes = Router();

const productController = new ProductController();

productRoutes.post('/product', productController.create);
productRoutes.get('/product', productController.getProducts);
productRoutes.get('/product/:id', productController.getProductDetails);


export default productRoutes;