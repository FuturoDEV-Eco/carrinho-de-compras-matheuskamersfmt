import { Router } from "express";
import ClientController from "../controllers/ClientController.js";

const clientsRoutes = Router();

const clientController = new ClientController();

clientsRoutes.post('/client', clientController.create);

export default clientsRoutes;