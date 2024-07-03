import { Router } from "express";
import ClientController from "../controllers/ClientController.js";

const clientRoutes = Router();

const clientController = new ClientController();

clientRoutes.post('/client', clientController.create);

export default clientRoutes;