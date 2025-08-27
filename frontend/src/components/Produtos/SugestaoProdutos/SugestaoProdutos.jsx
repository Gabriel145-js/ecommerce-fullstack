import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
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
                const resProdutos = await fetch(`${API_URL}/api/categorias/${sorteada.id}/produtos`);

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
            <div className={styles.tituloSubtitulo}>
                <h1>Você também pode gostar</h1>
                <p>Produtos selecionados especialmente para você</p>
            </div>
            {carregando && <p className={styles.loading}>Carregando produtos...</p>}
            {erro && <p className={styles.erro}>{erro}</p>}

            {!carregando && produtos.length === 0 && !erro && (
                <p className={styles.vazio}>Nenhum produto encontrado para esta categoria.</p>
            )}

            <div className={styles.swiperContainer}>
                <Swiper
                    modules={[Navigation]}
                    navigation={true}
                    spaceBetween={10}
                    slidesPerView={5}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    className={styles.swiperWrapper}
                >
                    {produtos.map((produto, index) => (
                        <SwiperSlide key={index} className={styles.containerCards}>
                            <div className={styles.cardProduto}>
                                <img className={styles.imagenProduto} src={produto.imagem_principal} alt={produto.nome} />
                                <h2 className={styles.produtoNome}>{produto.nome}</h2>

                                <p className={styles.preco}>
                                    {produto.preco_original && (
                                        <span className={styles.precoOriginal}>R$ {produto.preco_original}</span>
                                    )}
                                    <span className={styles.precoPromocional}>R$ {produto.preco}</span>
                                </p>

                                <div className={styles.containerBtnCarrinho}>
                                    <button className={styles.btnAdicionarCarrinho}>Adicionar ao Carrinho</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={styles.btnTdsProdutos}>
                <a className={styles.tdsProdutos}>Ver todos os produtos</a>
            </div>
        </div>
    );
};

export default SugestaoProdutos;