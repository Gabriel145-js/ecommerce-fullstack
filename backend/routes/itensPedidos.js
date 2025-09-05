const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.post('/itens-pedido', async (req, res) => {
  const { pedido_id, produto_id, quantidade, preco_unitario } = req.body;

  try {
    const novoItem = await db`
      INSERT INTO itens_pedido (
        pedido_id,
        produto_id,
        quantidade,
        preco_unitario
      ) VALUES (
        ${pedido_id},
        ${produto_id},
        ${quantidade},
        ${preco_unitario}
      )
      RETURNING *;
    `;

    res.status(201).json(novoItem);
  } catch (error) {
    console.error('Erro ao inserir item do pedido:', error);
    res.status(500).json({ error: 'Erro ao inserir item do pedido' });
  }
});
