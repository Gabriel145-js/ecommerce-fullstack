import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DetalhesProdutos.module.scss';
import SugestaoProdutos from '../SugestaoProdutos/SugestaoProdutos';
import { Player } from '@lottiefiles/react-lottie-player';


const DetalhesProdutos = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [imagemSelecionada, setImagemSelecionada] = useState(null);
    const [imagensAdicionais, setImagensAdicionais] = useState([]);
    const [quantidade, setQuantidade] = useState(1);
    const [fadeOut, setFadeOut] = useState(false);
    const [sucessoPedido, setSucessoPedido] = useState(false);

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

    const trocarImagemComFade = (novaImagem) => {
        setFadeOut(true); // inicia fade-out

        setTimeout(() => {
            setImagensAdicionais(prev => {
                const atualPrincipal = imagemSelecionada;
                const novaGaleria = prev.filter(img => img !== novaImagem);
                return [...novaGaleria, atualPrincipal];
            });
            setImagemSelecionada(novaImagem); // troca imagem
            setFadeOut(false); // remove fade
        }, 300);
    };

    if (!produto) return <p>Carregando detalhes...</p>;

    const tamanhos = [];
    if (produto.tamanho_p) tamanhos.push('P');
    if (produto.tamanho_m) tamanhos.push('M');
    if (produto.tamanho_g) tamanhos.push('G');

    const adicionarAoCarrinho = () => {
        //Pega o carrinho existente do localStorage ou cria um array vazio
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];

        //Verificação se item ja existe
        const itemExistente = carrinhoAtual.find(item => item.id === produto.id);

        let novoCarrinho;

        if (itemExistente) {
            // Se existe, atualiza a quantidade
            novoCarrinho = carrinhoAtual.map(item =>
                item.id === produto.id
                    ? { ...item, quantidade: item.quantidade + quantidade }
                    : item
            );
        } else {
            // Se não existe, adiciona o novo item
            const novoItem = {
                id: produto.id,
                nome: produto.nome,
                preco: parseFloat(produto.preco),
                imagem: imagemSelecionada,
                quantidade: quantidade,

            };
            novoCarrinho = [...carrinhoAtual, novoItem];
        }

        //Salva o carrinho atualizado no localStorage
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));

        setQuantidade(1)
        setSucessoPedido(true);
    };

    return (
        <>
            {sucessoPedido && (
                <div className={styles.animacaoSucessoOverlay}>

                    <Player
                        src="https://lottie.host/e28b09ea-ce40-47b9-8b7c-afa4ebcfe1e5/W0npmgm2Ad.json"
                        className={styles.animacaoSucesso}
                        autoplay
                        onEvent={(event) => {
                            if (event === 'complete') {
                                setTimeout(() => setSucessoPedido(false), 0);
                            }
                        }}
                    />

                </div>
            )}
            <section className={styles.sectionDetalhesProdutos}>

                <div className={styles.detalhesContainer}>
                    <div className={styles.imgsProduto}>
                        <img src={imagemSelecionada} alt={produto.nome} className={`${styles.imagemProduto} ${fadeOut ? styles.fadeOut : ''}`} />
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
                        <div className={styles.tamanhos}>
                            <strong>Cores</strong>
                            <div className={styles.opcoes}>
                                {Array.isArray(produto.cor) ? (
                                    produto.cor.map((cor, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={styles.tamanho}
                                        // Adicione lógica para selecionar cor, se quiser
                                        >
                                            {cor}
                                        </button>
                                    ))
                                ) : (
                                    <button type="button" className={styles.tamanho}>
                                        {produto.cor}
                                    </button>
                                )}
                            </div>
                        </div>


                        <div className={styles.qtdProdutos}>
                            <strong>Quantidade</strong><br />
                            <div className={styles.btnQtd}>
                                <button type="button" onClick={() => setQuantidade(q => Math.max(1, q - 1))}>-</button>
                                <input type="text" name="quantidade" value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} min={1} />
                                <button type="button" onClick={() => setQuantidade(q => q + 1)}>+</button>
                            </div>
                        </div>

                        <div className={styles.btnComprarEstoque}>
                            <button onClick={adicionarAoCarrinho} className={styles.btnComprar}>Adicionar ao carrinho</button>
                            <p>{produto.estoque} em estoque</p>
                        </div>
                        <div className={styles.descricaoProduto}>
                            <h3>Descrição</h3>
                            <p className={styles.descricao}>{produto.descricao}</p>
                        </div>
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
