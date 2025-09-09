const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { randomUUID } = require('crypto');

router.post('/', async (req, res) => {
    const { cliente, itens, valor_total } = req.body;

    if (!cliente || !itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ error: 'Dados do cliente e itens do pedido são obrigatórios.' });
    }

    

    try {
      //Gera os UUIDs randomicamente
        const dadosClienteId = randomUUID();
        const pedidoId = randomUUID();

        //Monta todas as queries na transação
        const queries = [];

        // Query para inserir o cliente
        queries.push(db`
            INSERT INTO clientes (
                dados_cliente_id, nome_cliente, sobrenome_cliente, email_cliente, telefone_cliente,
                cep, estado, cidade, bairro, rua, numero, complemento
            ) VALUES (
                ${dadosClienteId}, ${cliente.nome_cliente}, ${cliente.sobrenome_cliente}, ${cliente.email_cliente},
                ${cliente.telefone_cliente}, ${cliente.cep}, ${cliente.estado}, ${cliente.cidade},
                ${cliente.bairro}, ${cliente.rua}, ${cliente.numero}, ${cliente.complemento}
            )
        `);

        // Insere no pedido
        queries.push(db`
            INSERT INTO pedido (id_pedido, dados_cliente_id, valor_total)
            VALUES (${pedidoId}, ${dadosClienteId}, ${valor_total})
        `);

        // Insere cada item no pedido
        for (const item of itens) {
            queries.push(db`
                INSERT INTO itens_pedido (
                    pedido_id, produto_id, quantidade, preco_unitario
                ) VALUES (
                    ${pedidoId}, ${item.produto_id}, ${item.quantidade}, ${item.preco_unitario}
                )
            `);
        }

        //Executa todas as queries juntas
        await db.transaction(queries);

        res.status(201).json({ 
            message: 'Pedido criado com sucesso!', 
            pedido_id: pedidoId, 
            cliente_id: dadosClienteId 
        });

    } catch (error) {
        console.error('Erro ao processar transação do pedido:', error);
        res.status(500).json({ 
            error: 'Não foi possível processar o pedido devido a um erro interno.',
            details: error.message
        });
    }
});

module.exports = router;