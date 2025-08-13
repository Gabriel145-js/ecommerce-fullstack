const express = require('express');
const db = require('../db/db');

const router = express.Router();

router.post('/', async (req, res) => {
  const {
    nome,
    descricao,
    preco,
    estoque,
    imagem_principal,
    imagens_adicionais,
    tamanho_p,
    tamanho_m,
    tamanho_g,
    categorias_id
  } = req.body;

  try {
    const imagensArray = `{${imagens_adicionais.join(',')}}`;

    const criarProduto = await db`
    INSERT INTO produtos (
    nome, descricao, preco, estoque,
    imagem_principal, imagens_adicionais,
    tamanho_p, tamanho_m, tamanho_g,
    categorias_id
  ) VALUES (
    ${nome}, ${descricao}, ${preco}, ${estoque},
    ${imagem_principal}, ${imagensArray},
    ${tamanho_p}, ${tamanho_m}, ${tamanho_g},
    ${categorias_id}
  )
  RETURNING *;
`;

    res.status(201).json(criarProduto);
  } catch (error) {
    console.error('Erro ao criar produto:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;