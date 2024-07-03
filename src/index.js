import express from 'express';
import clientRoutes from './routes/clients.routes.js';

const app = express();

app.use(express.json());

app.use(clientRoutes);

app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});