const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.post('/dados-pedido/infos-pessoais', async (req, res) => {
    const { nome_cliente, sobrenome_cliente, email_cliente, telefone_cliente } = req.body

    try {
        if (nome_cliente || sobrenome_cliente || email_cliente || telefone_cliente === '') {
            res.status(400).json({ message: "Todos os campos são obrigatórios" })
        }

        const inserirDadosCliente = await db`INSERT INTO cliente(
    nome_cliente,
    sobrenome_cliente,
    email_cliente,
    telefone_cliente

    ) VALUES(
    ${nome_cliente},
    ${sobrenome_cliente},
    ${email_cliente},
    ${telefone_cliente}
    )
    RETURNING *; 
    `
        res.status(201).json(inserirDadosCliente)
    

    } catch (error) {
        res.status(500).json({error: "Erro ao inserir dados pessoais no pedido"})

    }

})