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

    async getProducts(req, res){

        try{
            const product = await connection.query(`
                select * from products`
            )

            if(product.rowCount === 0){
                return res.status(404).json({
                    message: 'Não há produtos cadastrados!'
                })
            }

            res.json(product.rows)

        }catch(error){
            console.log(error)
            res.status(500).json({
                error: true,
                message: 'Não foi possível listar o produto!',
                err: error.message
            })
        }
    }

    async getProductDetails(req, res) {
        try {
            const id = req.params.id;
            const product = await connection.query(`
                SELECT 
                    p.id AS product_id,
                    p.name AS name,
                    p.amount,
                    p.color,
                    p.voltage,
                    p.description,
                    c.id AS category_id,
                    c.name AS category
                FROM 
                    products p
                INNER JOIN 
                    categories c
                ON 
                    p.category_id = c.id
                WHERE 
                    p.id = $1
            `, [id]);

            if (product.rowCount === 0) {
                return res.status(404).json({ message: 'Nenhum produto encontrado' });
            }

            res.json(product.rows[0]);
        } catch (err) {
            console.log(err)
            res.status(500).json({ 
                error: true,
                message: 'Não foi possível listar o produto',
                err: err.message
            });
        }
    }
    

}

export default ProductController;