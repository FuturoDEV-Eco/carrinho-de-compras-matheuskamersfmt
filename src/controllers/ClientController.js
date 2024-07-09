import { connection } from "../database/connection.js";

class ClientController {
  async create(req, res) {
    try {
      const { name, email, cpf, contact } = req.body;

      if (!name || !email || !cpf || !contact) {
        return res
          .status(400)
          .json({ error: "Todos os campos (name, email, cpf e contact) são obrigatórios!" });
      }

      const client = await connection.query(
        `INSERT INTO clients (name, email, cpf, contact) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, email, cpf, contact]
      );

      return res.status(201).json({
        client: client.rows[0],
        message: "Cliente cadastrado com sucesso!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ 
        error: true,
        message: "Não foi possível cadastrar o cliente!", 
        err: err?.message
    });
    }
  }
}

export default ClientController;
