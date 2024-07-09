import { connection } from "../database/connection.js";

class ProductController {
    async create(req, res) {
        try {
            const { name, amount, color, voltage, description, category_id } = req.body;

            if (!name || !category_id) {
                return res
                    .status(400)
                    .json({ error: "Os campos name e category_id são obrigatórios!" });
            }

            if (voltage && voltage !== '110' && voltage !== '220') {
                return res
                    .status(400)
                    .json({ error: "O campo voltage deve ser '110' ou '220'!" });
            }

            const product = await connection.query(
                `INSERT INTO products (name, amount, color, voltage, description, category_id) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [name, amount, color, voltage, description, category_id]
            );

            return res.status(201).json({
                product: product.rows[0],
                message: "Produto cadastrado com sucesso!",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: true,
                message: "Não foi possível cadastrar o produto!",
                err: error?.message
            });
        }
    }
}

export default ProductController;