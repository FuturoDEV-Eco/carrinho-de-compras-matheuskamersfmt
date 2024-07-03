import express from 'express';

const app = express();

app.use(express.json());

app.use();

app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});