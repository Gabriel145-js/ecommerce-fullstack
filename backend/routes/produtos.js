const db = require('../db/db')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const {nome, descricao, preco, estoque} = req.body
    try {
        const criarProduto = await db`INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (${nome}, ${descricao}, ${preco}, ${estoque}) RETURNING *`

        res.status(201).json(criarProduto)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Erro ao criar produto'})

    }
})

module.exports = router