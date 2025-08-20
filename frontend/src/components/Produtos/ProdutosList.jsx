import React, { useEffect, useState } from 'react'
import styles from './ProdutosList.module.scss'

const ProdutosList = () => {
    const [produtos, setProdutos] = useState([])

    const API_URL = import.meta.env.VITE_API_URL;
    const urlProdutos = `${API_URL}/api/produtos`;

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

            <div className={styles.tituloSubtitulo}>
                <h1>Produtos em Destaque</h1>
                <p>Peças cuidadosamente selecionadas para compor um guarda-roupa moderno e versátil</p>
            </div>
            <ul className={styles.cardProduto}>
                {produtos.map(prod => (
                    <li key={prod.id} className={styles.produtoCard}>

                        {prod.imagem_principal && (
                            <img src={prod.imagem_principal} alt={prod.nome} className={styles.produtoImagem} />
                        )}

                        <h2 className={styles.produtoNome}>{prod.nome}</h2>

                        <p className={styles.preco}>
                            {prod.preco_original && (
                                <span className={styles.precoOriginal}>R$ {prod.preco_original}</span>
                            )}
                            <span className={styles.precoPromocional}>R$ {prod.preco}</span>
                        </p>

                        <div className={styles.containerBtnCarrinho}>
                            <button className={styles.btnAdicionarCarrinho}>Adicionar ao Carrinho</button>
                        </div>

                    </li>
                ))}
            </ul>

            <div className={styles.btnTdsProdutos}>
                <a className={styles.tdsProdutos}>Ver todos os produtos</a>
            </div>

        </div>
    )
}

export default ProdutosList