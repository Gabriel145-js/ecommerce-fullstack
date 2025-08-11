import React, { useEffect, useState } from 'react'
import styles from './AddProduto.module.scss'
import SelecionaCategoria from './Categorias/SelecionaCategoria'

const AddProduto = () => {

const handleSubmit = (e) => {
  e.preventDefault()
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
            <input type="text" placeholder='Nome do produto' />
          </label>

          <label className={styles.labelInput}>
            <span>Descrição</span>
            <input type="text" placeholder='Descrição' />
          </label>

          <label className={styles.labelInput}>
            <span>Preço</span>
            <input type="number" placeholder='Preço' />
          </label>

         <SelecionaCategoria/>

          <label className={styles.labelInput}>
            <span>Imagem pricipal</span>
            <input type="file" id="foto" name="foto" accept="image/*" required />
          </label>

          <label className={styles.labelInput}>
            <span>Imagens adicionais</span>
            <input type="file" id="foto" name="foto" accept="image/*" required />
          </label>

          <label className={styles.labelInput}>
            <span>Estoque</span>
            <input type="number" placeholder='Quantidade em estoque' />
          </label>

          <button type="submit">Criar produto</button>

        </form>

      </section>


    </div>
  )
}

export default AddProduto