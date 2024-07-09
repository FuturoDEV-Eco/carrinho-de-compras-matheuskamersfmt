import express from 'express';
import clientsRoutes from './routes/clients.routes.js';
import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';

const app = express();

app.use(express.json());

app.use(clientsRoutes);
app.use(productsRoutes);
app.use(ordersRoutes);

app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});