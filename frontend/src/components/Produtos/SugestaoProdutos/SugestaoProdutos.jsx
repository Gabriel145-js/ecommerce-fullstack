import React, { useEffect, useState } from 'react';
import styles from './SugestaoProdutos.module.scss';

const SugestaoProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const buscarCategoriaAleatoria = async () => {
            try {
                // Buscar todas as categorias
                const resCategorias = await fetch(`${API_URL}/api/categorias/`);
                const categorias = await resCategorias.json();

                //  Categoria randomica 
                if (!Array.isArray(categorias) || categorias.length === 0) {
                    throw new Error('Nenhuma categoria encontrada');
                }

                const sorteada = categorias[Math.floor(Math.random() * categorias.length)];
                setCategoriaSelecionada(sorteada);

                // Buscar produtos da categoria escolhida no random
                const resProdutos = await fetch(`${API_URL}/api/categorias/${sorteada.id}/`);
                if (!resProdutos.ok) {
                    throw new Error(`Erro ao buscar produtos da categoria ${sorteada.id}`);
                }

                const data = await resProdutos.json();
                setProdutos(data.produtos || []);
            } catch (error) {
                console.error('Erro ao carregar sugestões:', error);
                setErro(error.message);
            } finally {
                setCarregando(false);
            }
        };

        buscarCategoriaAleatoria();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>
                {categoriaSelecionada
                    ? `Sugestões da categoria: ${categoriaSelecionada.nome}`
                    : 'Carregando sugestões...'}
            </h2>

            {carregando && <p className={styles.loading}>Carregando produtos...</p>}
            {erro && <p className={styles.erro}>{erro}</p>}

            {!carregando && produtos.length === 0 && !erro && (
                <p className={styles.vazio}>Nenhum produto encontrado para esta categoria.</p>
            )}

            <ul className={styles.lista}>
                {produtos.map((produto, index) => (
                    <li key={index} className={styles.item}>
                        {produto.nome}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SugestaoProdutos;
