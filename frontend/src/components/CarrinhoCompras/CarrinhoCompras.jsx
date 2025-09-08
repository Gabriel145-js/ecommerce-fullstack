
import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './CarrinhoCompras.module.scss';
import fecharIcon from '../../assets/icons/fecharIcon.svg';
import ItemCarrinho from './ItemCarrinho';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CarrinhoCompras = ({ onClose }) => {
    const { carrinhoItens, removerDoCarrinho, addAoCarrinho, limparCarrinho, totalPedido } = useContext(CartContext);
    const navigate = useNavigate();

    // Atualiza quantidade de um item
    const atualizarQuantidade = (idDoItem, novaQuantidade) => {
        const item = carrinhoItens.find(item => item.id === idDoItem);
        if (!item) return;
        if (novaQuantidade < 1) {
            removerDoCarrinho(idDoItem);
        } else {
            // Remove e adiciona novamente com a nova quantidade
            removerDoCarrinho(idDoItem);
            for (let i = 0; i < novaQuantidade; i++) {
                addAoCarrinho(item);
            }
        }
    };

    // Fechar com a tecla Esc
    useEffect(() => {
        const handleEsc = (evento) => {
            if (evento.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Travar o scroll com do body com modal aberto 
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Handler para o botão "Finalizar Compra"
    const handleFinalizarCompra = () => {
        onClose();
        navigate('/ConcluirPedido');
    };

    const conteudoModal = (
        <div className={styles.sobreposicaoModal} onClick={onClose}>
            <div className={styles.conteudoModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.cabecalhoModal}>
                    <h2>Carrinho de Compras</h2>
                    <button onClick={onClose} className={styles.botaoFechar}>
                        <img src={fecharIcon} alt="Fechar" />
                    </button>
                </div>
                <div className={styles.corpoModal}>
                    {carrinhoItens.length === 0 ? (
                        <p className={styles.carrinhoVazio}>Seu carrinho está vazio.</p>
                    ) : (
                        <div className={styles.listaItens}>
                            {carrinhoItens.map(item => (
                                <ItemCarrinho
                                    key={item.id}
                                    item={item}
                                    onRemover={removerDoCarrinho}
                                    onAtualizarQuantidade={atualizarQuantidade}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {carrinhoItens.length > 0 && (
                    <div className={styles.rodapeModal}>
                        <div className={styles.total}>
                            <span>Total</span>
                            <span>{totalPedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                        <button onClick={handleFinalizarCompra} className={styles.botaoFinalizar}>
                            Finalizar Compra
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(conteudoModal, document.body);
};

export default CarrinhoCompras;