import React, { useState, useEffect } from 'react'
import styles from './IndexPage.module.scss'

const IndexPage = () => {
  const [produtos, setProdutos] = useState([])

  const urlProdutos = 'http://localhost:5000/api/produtos'

  useEffect(() => {
    const exibirProdutos = async () => {
      try {
        const res = await fetch(urlProdutos, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }

        })

        const data = await res.json()
        setProdutos(data)

      } catch (error) {
        console.error('erro ao exibir produtos', error.message)


      }
    }
    exibirProdutos()
  }, [])

  return (
    <div>


      <ul className={styles.cardProduto}>
        {produtos.map(prod => (
          <li key={prod.id} className={styles.produtoCard}>
            <div className={styles.labels}>
              {prod.novo && <span className={styles.labelNovo}>Novo</span>}
              {prod.promocao && <span className={styles.labelPromocao}>Promoção</span>}
            </div>

            {prod.imagem_principal && (
              <img src={prod.imagem_principal} alt={prod.nome} className={styles.produtoImagem} />
            )}

            <h2 className={styles.produtoNome}>{prod.nome}</h2>

            {prod.avaliacao && (
              <p className={styles.avaliacao}>
                ⭐ {prod.avaliacao} ({prod.reviews} avaliações)
              </p>
            )}

            <p className={styles.preco}>
              {prod.preco_original && (
                <span className={styles.precoOriginal}>R$ {prod.preco_original}</span>
              )}
              <span className={styles.precoPromocional}>R$ {prod.preco}</span>
            </p>

            <p>Estoque: {prod.estoque}</p>

            <p>Tamanhos disponíveis:</p>
            <ul className={styles.tamanhos}>
              {prod.tamanho_p && <li>P</li>}
              {prod.tamanho_m && <li>M</li>}
              {prod.tamanho_g && <li>G</li>}
            </ul>
          </li>
        ))}
      </ul>


    </div>
  )
}

export default IndexPage