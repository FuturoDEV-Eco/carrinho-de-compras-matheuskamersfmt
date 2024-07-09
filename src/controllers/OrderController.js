import { connection } from '../database/connection.js';

class OrderController {
    async create(req, res) {
        try {
            const { client_id, address, observations, products, total } = req.body;

            if (!client_id || !address || !products || !total) {
                return res.status(400).json({ error: 'Campos obrigatórios não preenchidos!' });
            }

            const order = await connection.query(`
                INSERT INTO orders (client_id, address, observations, total)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `, [client_id, address, observations, total]);

            for (const item of products) {
                const product = await connection.query(`
                    SELECT amount, price FROM products
                    WHERE id = $1
                `, [item.product_id]);

                if (product.rows.length === 0) {
                    return res.status(400).json({ 
                        error: true, 
                        message: `Produto com id ${item.product_id} não encontrado.`
                    });
                }

                const availableAmount = product.rows[0].amount;
                const productPrice = product.rows[0].price;

                if (availableAmount < item.amount) {
                    return res.status(400).json({ 
                        error: true,
                        message: `Quantidade solicitada do produto ${item.product_id} não disponível. Disponível: ${availableAmount}` });
                }

                const newAmount = availableAmount - item.amount;

                await connection.query(`
                    UPDATE products
                    SET amount = $1
                    WHERE id = $2
                `, [newAmount, item.product_id]);

                await connection.query(`
                    INSERT INTO orders_items (order_id, product_id, amount, price)
                    VALUES ($1, $2, $3, $4)
                `, [order.rows[0].id, item.product_id, item.amount, productPrice]);

            }

            return res.status(201).json({ 
                order: order.rows[0],
                id: order.rows[0].id, 
                message: 'Pedido criado com sucesso!' 
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ 
                error: true,
                message: 'Não foi possível criar o pedido!',
                err: err.message
            });
        }
    }
}

export default OrderController;
