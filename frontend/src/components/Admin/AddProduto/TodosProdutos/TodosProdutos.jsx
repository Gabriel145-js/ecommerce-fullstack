import React, { useEffect, useState } from 'react'
import styles from './TodosProdutos.module.scss'
import Acoes from './Acoes'

const TodosProdutos = () => {
    const [produtos, setProdutos] = useState([])
    const [categorias, setCategorias] = useState([])

    const API_URL = import.meta.env.VITE_API_URL;
    const urlProdutos = `${API_URL}/api/produtos`;
    const urlCategorias = `${API_URL}/api/categorias`

    useEffect(() => {
        const exibirProdutos = async () => {
            try {
                const res = await fetch(urlProdutos, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await res.json()
                setProdutos(data)
            } catch (error) {
                console.error('Erro ao exibir produtos', error.message)
            }
        }
        exibirProdutos()
    }, [])

    useEffect(() => {
        const exibirCategorias = async () => {
            try {
                const res = await fetch(urlCategorias, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await res.json()
                setCategorias(data)
            } catch (error) {
                console.error('Erro ao exibir categorias', error.message)
            }
        }
        exibirCategorias()
    }, [])

    return (
        <div className={styles.containerTdsProdutos}>
            <header className={styles.titESubtitulo}>
                <h1>Gerencie seus Produtos</h1>
                <p>Edite, apague e veja seus detalhes em um único lugar.</p>
            </header>

            <table className={styles.containerTabela}>
                <thead className={styles.titColunaTable}>
                    <tr className={styles.linhaTitulos}>
                        <th className={styles.titulos}>Nome</th>
                        <th className={styles.titulos}>Categoria</th>
                        <th className={styles.titulos}>Preço</th>
                        <th className={styles.titulos}>Estoque</th>
                        <th className={styles.titulos}>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {produtos.map((dados, index) => {
                        const categoria = categorias.find(c => c.id === dados.categorias_id);
                        return (
                            <tr className={styles.linhaDados} key={dados.id || index}>
                                <td className={styles.celula}>{dados.nome}</td>
                                <td className={styles.celula}>{categoria?.nome || "Sem categoria"}</td>
                                <td className={styles.celula}>R$ {dados.preco}</td>
                                <td className={styles.celula}>{dados.estoque}</td>
                                <td><Acoes
                                    produto={dados}
                                /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TodosProdutos
