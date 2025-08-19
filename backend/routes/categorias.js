const express = require('express')
const router = express.Router()
const db = require('../db/db')

// GET - Buscar todas as categorias (sem produtos)
router.get('/', async (req, res) => {
  try {
    const categorias = await db`SELECT * FROM categorias ORDER BY id`
    res.json(categorias)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    res.status(500).json({ error: 'Erro ao buscar categorias' })
  }
})

// GET - Buscar todas as categorias (com total de produtos)
router.get('/com-produtos', async (req, res) => {
  try {
    const categorias = await db`
      SELECT 
        c.id,
        c.nome,
        c.descricaocategoria,
        COUNT(p.id) AS total_produtos
      FROM categorias c
      LEFT JOIN produtos p ON p.categorias_id = c.id
      GROUP BY c.id, c.nome, c.descricaocategoria
      ORDER BY c.id
    `
    res.json(categorias)
  } catch (error) {
    console.error('Erro ao buscar categorias com produtos:', error)
    res.status(500).json({ error: 'Erro ao buscar categorias com produtos' })
  }
})



// POST - Cria uma nova categoria
router.post('/', async (req, res) => {
  const { nome } = req.body;
  const { descricaoCategoria } = req.body;

  try {
    const criarCategoria = await db`
      INSERT INTO categorias (nome,descricaoCategoria) VALUES (${nome},${descricaoCategoria})
      RETURNING *`;

    res.status(201).json(criarCategoria);

  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params

  // Validação do ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'ID da categoria deve ser um número válido' })
  }

  try {
    // Verifica se a categoria existe
    const categoriaExistente = await db`SELECT * FROM categorias WHERE id = ${parseInt(id)}`

    if (categoriaExistente.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }

    // Deleta a categoria
    const deletarCategoria = await db`DELETE FROM categorias WHERE id = ${parseInt(id)}`

    return res.json({
      message: 'Categoria deletada com sucesso',
      id: parseInt(id),
      rowsAffected: deletarCategoria.count
    })

  } catch (error) {
    console.error('Erro ao excluir categoria:', error.message)
    return res.status(500).json({ error: 'Erro interno do servidor ao excluir categoria' })
  }
})


//PATCH - Atualiza os dados da categoria pelo ID
router.patch('/:id', async (req, res) => {
  const categoriaId = parseInt(req.params.id)

  // Pega os valores atuais do body, se não existir usa string vazia ou null
  const nomeFormatado = req.body.nome?.trim() || ''
  const descricaoFormatada = req.body.descricaoCategoria?.trim() || null

  console.log('PATCH recebido:', {
    categoriaId,
    nomeFormatado,
    descricaoFormatada,
    body: req.body
  }) // Debug temporario temporario

  // Validações 
  if (isNaN(categoriaId)) {
    return res.status(400).json({ error: 'ID da categoria deve ser um número válido' })
  }

  if (!nomeFormatado) {
    return res.status(400).json({ error: 'Nome da categoria é obrigatório' })
  }

  try {
    // Verifica se a categoria existe
    const categoriaExistente = await db`SELECT * FROM categorias WHERE id = ${categoriaId}`

    if (categoriaExistente.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }

    console.log('Categoria antes da atualização:', categoriaExistente[0]) // Debug temporario
    console.log('Novos valores:', { nome: nomeFormatado, descricao: descricaoFormatada }) // Debug temporario

    // Atualiza sempre ambos os campos - mais simples e confiável
    const atualizaCategoria = await db`
      UPDATE categorias 
      SET nome = ${nomeFormatado}, descricaocategoria = ${descricaoFormatada}
      WHERE id = ${categoriaId}
      RETURNING *
    `

    console.log('Categoria após atualização:', atualizaCategoria[0]) // Debug temporario

    if (atualizaCategoria.length === 0) {
      return res.status(404).json({ error: 'Falha na atualização - categoria não encontrada' })
    }

    return res.status(200).json({
      message: 'Categoria atualizada com sucesso',
      categoria: atualizaCategoria[0]
    })

  } catch (error) {
    console.error("Erro detalhado ao atualizar categoria:")
    console.error("- Mensagem:", error.message)
    console.error("- Stack:", error.stack)
    console.error("- Dados enviados:", { categoriaId, nomeFormatado, descricaoFormatada })

    return res.status(500).json({
      error: 'Erro interno do servidor ao atualizar categoria',
      details: error.message
    })
  }
})

module.exports = router