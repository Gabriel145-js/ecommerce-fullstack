const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
    const { cliente, item } = req.body;

    if (!cliente || !item) {
        return res.status(400).json({ error: 'Os campos não podem estar vazios' });
    }

    try {
        // Transação para o DB
        await db.begin(async sql => {
            // Inserir dados do cliente
            const [dadosCliente] = await sql`
                INSERT INTO clientes (
                    nome_cliente,
                    sobrenome_cliente,
                    email_cliente,
                    telefone_cliente,
                    cep,
                    estado,
                    cidade,
                    bairro,
                    rua,
                    numero,
                    complemento
                ) VALUES (
                    ${cliente.nome_cliente},
                    ${cliente.sobrenome_cliente},
                    ${cliente.email_cliente},
                    ${cliente.telefone_cliente},
                    ${cliente.cep},
                    ${cliente.estado},
                    ${cliente.cidade},
                    ${cliente.bairro},
                    ${cliente.rua},
                    ${cliente.numero},
                    ${cliente.complemento}
                ) RETURNING *`;

            // Inserir dados do item do pedido
            const [dadosItem] = await sql`
                INSERT INTO itens_pedido (
                    produto_id,
                    quantidade,
                    preco_unitario
                ) VALUES (
                    ${item.produto.id},
                    ${item.quantidade},
                    ${item.preco_unitario}
                ) RETURNING *`;

            // Retornar os dados inseridos
            res.status(201).json({ cliente: dadosCliente, item: dadosItem });
        });
    } catch (error) {
        console.error('Erro ao processar pedido:', error.message);
        res.status(500).json({ error: 'Erro ao processar pedido' });
    }
});

module.exports = router;
