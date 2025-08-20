import React, { useState, useEffect } from 'react'
import styles from './IndexPage.module.scss'
import ProdutosList from '../../components/Produtos/ProdutosList'

const IndexPage = () => {


  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.content}>
          <span className={styles.subtitulo}>COLEÇÃO PRIMAVERA/VERÃO 2025</span>
          <h1 className={styles.titulo}>Elegância <br /><span>Reinventada</span></h1>
          <p className={styles.descricao}>
            Descubra peças únicas que combinam sofisticação e modernidade. Criadas para mulheres que valorizam estilo e qualidade.
          </p>
          <div className={styles.botoes}>
            <a className={styles.btnPrimario}>Explorar Coleções</a>
            <button className={styles.btnSecundario}>Ver Lookbook</button>
          </div>
          <div className={styles.stats}>
            <div><strong>500+</strong> Peças Exclusivas</div>
            <div><strong>10k+</strong> Clientes Felizes</div>
            <div><strong>24h</strong> Entrega Rápida</div>
          </div>
          <div className={styles.frete}>
            <span className={styles.freteGratis}>✅ Frete Grátis em compras acima de R$ 299</span>
          </div>
        </div>
        <div className={styles.imagem}>
          <img src="imgs/heroWoman.png" alt="Modelo elegante" />
        </div>
      </section>

      <ProdutosList />



    </div>
  )
}

export default IndexPage