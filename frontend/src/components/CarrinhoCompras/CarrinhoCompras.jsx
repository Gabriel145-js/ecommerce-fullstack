import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './CarrinhoCompras.module.scss'
import fecharIcon from '../../assets/icons/fecharIcon.svg'
import ItemCarrinho from './ItemCarrinho'
import { useNavigate } from 'react-router-dom';

const CarrinhoCompras = ({ onClose }) => {
    const [itens, setItens] = useState([]);
    const navigate = useNavigate(); 

    // Carrega os itens do localStorage quando o modal é aberto
    useEffect(() => {
        const itensSalvos = JSON.parse(localStorage.getItem('carrinho')) || [];
        setItens(itensSalvos);
    }, []);

        //Atualiza localStorage sempre que item mudar
    const atualizarLocalStorage = (novosItens) => {
        localStorage.setItem('carrinho', JSON.stringify(novosItens));
    };

    //Remover o item pelo id
    const removerItem = (idDoItem) => {
        const novosItens = itens.filter(item => item.id !== idDoItem);
        setItens(novosItens);
        atualizarLocalStorage(novosItens);
    };

    //Atualiza quantidade
    const atualizarQuantidade = (idDoItem, novaQuantidade) => {
        // Se a quantidade for menor que 1, remove o item
        if (novaQuantidade < 1) {
            removerItem(idDoItem);
            return;
        }
        const novosItens = itens.map(item =>
            item.id === idDoItem ? { ...item, quantidade: novaQuantidade } : item
        );
        setItens(novosItens);
        atualizarLocalStorage(novosItens);
    };

    //Calcula preço total em BRL
    const calcularTotal = () => {
        const total = itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
        return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
        navigate('/ConcluirPedido'); // Navega para a página de conclusão
     
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
                    {itens.length === 0 ? (
                        <p className={styles.carrinhoVazio}>Seu carrinho está vazio.</p>
                    ) : (
                        <div className={styles.listaItens}>
                            {itens.map(item => (
                                <ItemCarrinho
                                    key={item.id}
                                    item={item}
                                    onRemover={removerItem}
                                    onAtualizarQuantidade={atualizarQuantidade}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {itens.length > 0 && (
                    <div className={styles.rodapeModal}>
                        <div className={styles.total}>
                            <span>Total</span>
                            <span>{calcularTotal()}</span>
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
}

export default CarrinhoCompras