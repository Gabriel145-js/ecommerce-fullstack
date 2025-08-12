import React, { useEffect, useState } from 'react'
import styles from './AddProduto.module.scss'
import SelecionaCategoria from './Categorias/SelecionaCategoria'
import ImagensProodutos from './ImagensProdutos/ImagensProodutos'

const AddProduto = () => {

  const [nomeProduto, setNomeProduto] = useState('')
  const [estoque, setEstoque] = useState('')
  const [preco, setPreco] = useState('')
  const [descricao, setDescricao] = useState('')


  const urlProdutos = 'http://localhost:5000/api/produtos'



  const handleSubmit = (e) => {
    e.preventDefault()

    const criarProduto = async () => {
      try {
        const res = await fetch(urlProdutos, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome: nomeProduto, descricao: descricao, preco: preco, estoque: estoque })
        })

        const data = await res.json()
        console.log('criado', data)
        setNomeProduto('')
        setDescricao('')
        setPreco('')
        setEstoque('')


      } catch (error) {
        console.error(error)

      }
    }
    criarProduto()
  }

  return (
    <div className={styles.containerAddProduto}>
      <header className={styles.titESubtitulo}>
        <h1>Administração de Produtos</h1>
        <p>Crie, edite e gerencie os produtos do catálogo.</p>
      </header>

      <section className={styles.quadroAdicionarProduto}>
        <form className={styles.formProduto} onSubmit={handleSubmit}>
          <label className={styles.labelInput}>
            <span>Nome</span>
            <input type="text" placeholder='Nome do produto' value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} />
          </label>

          <label className={styles.labelInput}>
            <span>Descrição</span>
            <input type="text" placeholder='Descrição' value={descricao} onChange={e => setDescricao(e.target.value)} />
          </label>

          <label className={styles.labelInput}>
            <span>Preço</span>
            <input type="number" placeholder='Preço' value={preco} onChange={e => setPreco(e.target.value)} />
          </label>

          <label className={styles.labelInput}>
            <span>Estoque</span>
            <input type="number" placeholder='Quantidade em estoque' value={estoque} onChange={e => setEstoque(e.target.value)} />
          </label>



          <SelecionaCategoria />
          <ImagensProodutos />
          <button type="submit">Criar produto</button>
        </form>
      </section>


    </div>
  )
}

export default AddProduto