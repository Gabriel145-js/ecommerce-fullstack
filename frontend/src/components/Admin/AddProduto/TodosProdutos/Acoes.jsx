import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import styles from './TodosProdutos.module.scss'
import fecharIcon from '../../../../assets/icons/fecharIcon.svg'
import { createPortal } from 'react-dom'

const Acoes = ({ produto }) => {
    const [tipoModal, setTipoModal] = useState(null);

    const [nomeProduto, setNomeProduto] = useState('');
    const [precoProduto, setPrecoProduto] = useState('');
    const [estoqueProduto, setEstoqueProduto] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;
    const urlProdutos = `${API_URL}/api/produtos`;

    const requestProdutos = {
        nome: nomeProduto,
        preco: precoProduto,
        estoque: estoqueProduto,
        id: produto.id
    };

    const handleAtualizaProdutos = async () => {
        try {
            const res = await fetch(`${urlProdutos}/${produto.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestProdutos)
            });

            console.log('Produto atualizado com sucesso');
            setTipoModal(null);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error.message);
        }
    };

    const handleApagarProduto = async () => {
        try {
            const res = await fetch(`${urlProdutos}/${produto.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });



            console.log('Produto apagado com sucesso');
            setTipoModal(null);
        } catch (error) {
            console.error('Erro ao apagar produto:', error.message);
        }
    };

    const fecharModal = () => setTipoModal(null);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) fecharModal();
    };

    const renderModal = () => {
        if (!tipoModal) return null;

        return (
            <div className={styles.modalOverlay} onClick={handleOverlayClick}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h3>{tipoModal === 'editar' ? 'Editar Produto' : 'Confirmar Exclusão'}</h3>
                        <button className={styles.closeButton} onClick={fecharModal}>
                            <img src={fecharIcon} alt="Fechar" />
                        </button>
                    </div>

                    <div className={styles.modalForm}>
                        {tipoModal === 'editar' ? (
                            <>
                                <div className={styles.modalLabel}>
                                    <span>Nome do Produto</span>
                                    <input
                                        type="text"
                                        value={nomeProduto}
                                        onChange={(e) => setNomeProduto(e.target.value)}
                                        className={styles.modalInput}
                                        autoFocus
                                    />
                                </div>
                                <div className={styles.modalLabel}>
                                    <span>Preço Produto</span>
                                    <input
                                        type="number"
                                        value={precoProduto}
                                        onChange={(e) => setPrecoProduto(e.target.value)}
                                        className={styles.modalInput}
                                    />
                                </div>
                                <div className={styles.modalLabel}>
                                    <span>Estoque Produto</span>
                                    <input
                                        type="number"
                                        value={estoqueProduto}
                                        onChange={(e) => setEstoqueProduto(e.target.value)}
                                        className={styles.modalInput}
                                    />
                                </div>
                            </>
                        ) : (

                            <p style ={{padding: '20px', color: '#282c34', fontFamily: 'Inter'}}> {/* nao esta recebendo estilo via className */} 
                                Tem certeza que deseja apagar o produto <strong>{produto.nome}</strong>? Essa ação não pode ser desfeita.
                            </p>
                        )}

                        <div className={styles.modalActions}>
                            <button type="button" onClick={fecharModal} className={styles.cancelButton}>
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className={styles.createButton}
                                onClick={tipoModal === 'editar' ? handleAtualizaProdutos : handleApagarProduto}
                            >
                                {tipoModal === 'editar' ? 'Salvar Alterações' : 'Apagar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.containerAcoes}>
            <div className={styles.containerAcoes}>
                <button className={styles.btnEditar} onClick={() => setTipoModal('editar')}>Editar</button>
                <Link to={`/Detalhes-Produto/${produto.id}/${produto.nome}` } className={styles.btnEditar} >Detalhes</Link>
                <button className={styles.btnApagar} onClick={() => setTipoModal('apagar')}>Apagar</button>
            </div>


            {tipoModal && createPortal(renderModal(), document.body)}
        </div>
    );
};

export default Acoes