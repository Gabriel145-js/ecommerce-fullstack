import React from 'react';
import styles from './ItemCarrinho.module.scss';
import lixoIcon from '../../assets/icons/lixoIcon.svg';

const ItemCarrinho = ({ item, onRemover, onAtualizarQuantidade }) => {
    const handleIncremento = () => {
        onAtualizarQuantidade(item.id, item.quantidade + 1);
    };

    const handleDecremento = () => {
        onAtualizarQuantidade(item.id, item.quantidade - 1);
    };

    const precoFormatado = item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className={styles.containerItem}>
            <img src={item.imagem} alt={item.nome} className={styles.imagemProduto} />
            <div className={styles.detalhesItem}>
                <p className={styles.nomeProduto}>{item.nome}</p>
                <p className={styles.precoProduto}>{precoFormatado}</p>
                <div className={styles.controleQuantidade}>
                    <button onClick={handleDecremento} aria-label="Diminuir quantidade">-</button>
                    <span>{item.quantidade}</span>
                    <button onClick={handleIncremento} aria-label="Aumentar quantidade">+</button>
                </div>
            </div>
            <button onClick={() => onRemover(item.id)} className={styles.botaoRemover} aria-label="Remover item">
                <img src={lixoIcon} alt="Remover Item" />
            </button>
        </div>
    );
};

export default ItemCarrinho;