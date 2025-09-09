import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import styles from './ProdutosList.module.scss'
import { useNavigate } from 'react-router-dom';


const ProdutosList = () => {
    const navigate = useNavigate()
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

            <div className={styles.swiperContainer}>
            <Swiper
                modules={[Navigation]}
                navigation={true}
                spaceBetween={40}
                slidesPerView={5}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 5 },
                    1980: { slidesPerView: 6 },
                }}
                className={styles.cardProduto}>
                    
                {produtos.map(prod => (
                    <SwiperSlide key={prod.id} className={styles.produtoCard} onClick={() => navigate(`/Detalhes-Produto/${prod.id}/${prod.nome}`)}>

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
                            <button
                                className={styles.btnAdicionarCarrinho}
                                onClick={e => {
                                    e.stopPropagation();
                                    navigate(`/Detalhes-Produto/${prod.id}/${prod.nome}`);
                                }}
                            >
                                Ver Detalhes
                            </button>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>
            </div>


            <div className={styles.btnTdsProdutos}>
                <a className={styles.tdsProdutos}>Ver todos os produtos</a>
            </div>

        </div>
    )
}

export default ProdutosList