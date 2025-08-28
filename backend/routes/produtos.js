const express = require('express');
const db = require('../db/db');
const router = express.Router();

//Metodo GET dos produtos
router.get('/', async (req, res) => {
  try {
    const response = await db`SELECT * FROM produtos`
    res.json(response)

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Houve um erro ao buscar produtos' })
  }
})

//Metodo GET dos produtos pelo ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await db`SELECT * FROM produtos WHERE id = ${id}`;

    if (response.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(response[0]); // retorna só o produto, não um array
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro ao buscar produto por ID' });
  }
});

//Metodo GET para exibir os produtos da categoria
router.get('/:id/produtos', async (req, res) => {
  const { id } = req.params;

  try {
    const produtosPorCategoria = await db`SELECT * FROM produtos WHERE categorias_id = ${id}`;
    res.json({ produtos: produtosPorCategoria });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro ao buscar produtos por categoria" });
  }
});


//Metodo POST de produtos
router.post('/', async (req, res) => {
  const {
    nome,
    descricao,
    preco,
    estoque,
    cor,
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
    nome, descricao, preco, estoque, cor,
    imagem_principal, imagens_adicionais,
    tamanho_p, tamanho_m, tamanho_g,
    categorias_id
  ) VALUES (
    ${nome}, ${descricao}, ${preco}, ${estoque}, ${cor},
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

router.patch('/:id', async (req, res) => {
  const produtoId = parseInt(req.params.id)

  const nomeFormatar = req.body.nome?.trim() || null
  const precoFormatar = req.body.preco?.toString().trim() || null
  const estoqueFormatar = req.body.estoque?.toString().trim() || null
  const corFormatar = req.body.cor?.trim() || null

  try {
    const atualizaProdutos = await db`
      UPDATE produtos 
      SET nome = ${nomeFormatar}, preco = ${precoFormatar}, estoque = ${estoqueFormatar}, cor = ${corFormatar}
      WHERE id = ${produtoId}
      RETURNING *`

    console.log('Produto atualizado:', atualizaProdutos[0])

    return res.status(200).json({
      message: 'Produto atualizado com sucesso',
      produto: atualizaProdutos[0]
    })
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.message)
    return res.status(500).json({ error: 'Erro ao atualizar produto' })
  }
})

router.delete('/:id', async (req, res) => {
  const produtoId = parseInt(req.params.id)

  try {
    const deletaProduto = await db`DELETE FROM produtos WHERE id = ${produtoId}`

    return res.json({
      message: 'Produto deletado com sucesso',
      id: produtoId,
      details: deletaProduto

    })


  } catch (error) {
    console.log('Erro interno no servidor', error.message)
    res.status(500).json({ error: 'Erro interno no servidor' })

  }

})

module.exports = router;