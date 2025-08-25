import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DetalhesProdutos.module.scss';
import ProdutosList from '../ProdutosList';
import SugestaoProdutos from '../SugestaoProdutos/SugestaoProdutos';

const DetalhesProdutos = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [imagemSelecionada, setImagemSelecionada] = useState(null);
    const [imagensAdicionais, setImagensAdicionais] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;
    const urlProduto = `${API_URL}/api/produtos/${id}/`;

    useEffect(() => {
        const buscarProduto = async () => {
            try {
                const res = await fetch(urlProduto, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const data = await res.json();
                setProduto(data);
                setImagemSelecionada(data.imagem_principal);
                setImagensAdicionais(data.imagens_adicionais || []);
            } catch (error) {
                console.error('Erro ao buscar produto:', error.message);
            }
        };

        buscarProduto();
    }, [id]);

    const [fade, setFade] = useState(false);

    const trocarImagemComFade = (novaImagem) => {
        setFade(true); // inicia fade-out

        setTimeout(() => {
            setImagensAdicionais(prev => {
                const atualPrincipal = imagemSelecionada;
                const novaGaleria = prev.filter(img => img !== novaImagem);
                return [...novaGaleria, atualPrincipal];
            });
            setImagemSelecionada(novaImagem); // troca imagem
            setFade(false); // remove fade
        }, 300); // tempo menor que o transition
    };

    if (!produto) return <p>Carregando detalhes...</p>;

    const tamanhos = [];
    if (produto.tamanho_p) tamanhos.push('P');
    if (produto.tamanho_m) tamanhos.push('M');
    if (produto.tamanho_g) tamanhos.push('G');

    return (
        <>
            <section className={styles.sectionDetalhesProdutos}>
                <div className={styles.detalhesContainer}>
                    <div className={styles.imgsProduto}>
                        <img src={imagemSelecionada} alt={produto.nome} className={`${styles.imagemProduto} ${fade ? styles.fadeOut : ''}`} />
                        {imagensAdicionais.length > 0 && (
                            <div className={styles.imagensAdicionais}>
                                <div className={styles.galeria}>
                                    {imagensAdicionais.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`Foto adicional ${index + 1}`}
                                            className={styles.fotoAdicional}
                                            onClick={() => trocarImagemComFade(url)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.detalhesProduto}>
                        <h1>{produto.nome}</h1>
                        <p className={styles.preco}>R$ {produto.preco}</p>
                        <div className={styles.tamanhos}>
                            <strong>Tamanho</strong>
                            <div className={styles.opcoes}>
                                {tamanhos.map((tamanho, index) => (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            id={`tamanho-${tamanho}`}
                                            className={styles.checkbox}
                                        />
                                        <label htmlFor={`tamanho-${tamanho}`} className={styles.tamanho}>
                                            {tamanho}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className={styles.btnComprarEstoque}>
                            <button className={styles.btnComprar}>Comprar agora</button>
                            <p>{produto.estoque} em estoque</p>
                        </div>
                        <h3>Descrição</h3>
                        <p className={styles.descricao}>{produto.descricao}</p>
                    </div>
                </div>

            </section>

            <section>
                <SugestaoProdutos />
            </section>

        </>


    );
};

export default DetalhesProdutos;
