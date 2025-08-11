const express = require('express')
const router = express.Router()
const db = require('../db/db')

// GET - Buscar todas as categorias
router.get('/', async (req, res) => {
    try {
        const categorias = await db`SELECT * FROM categorias ORDER BY id`
        res.json(categorias)
    } catch (error) {
        console.error('Erro ao buscar categorias:', error)
        res.status(500).json({ error: 'Erro ao buscar categorias' })
    }
})

// POST - Cria uma nova categoria
router.post('/', async (req, res) => {
  const { nome } = req.body;

  try {
    const criarCategoria = await db`
      INSERT INTO categorias (nome) VALUES (${nome})
      RETURNING *`;

    res.status(201).json(criarCategoria);

  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});




module.exports = router