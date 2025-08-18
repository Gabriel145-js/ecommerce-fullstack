import React, { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import styles from '../AddProduto.module.scss'
import fecharIcon from '../../../../assets/icons/fecharIcon.svg'

const SelecionaCategoria = ({ categorias, setCategorias, selecionaCategoria, setSelecionaCategoria }) => {
    const [novaCategoria, setNovaCategoria] = useState('')
    const [descricaoCategoria, setDescricaoCategoria] = useState('')
    const [modalAberto, setModalAberto] = useState(false)

    // Refs para os inputs, pois dava erro no modal
    const nomeInputRef = useRef(null)
    const descricaoInputRef = useRef(null)

    const API_URL = import.meta.env.VITE_API_URL;
    const urlCategorias = useMemo(() => `${API_URL}/api/categorias`, [API_URL]);

    // Função verifica se event existe antes de chamar preventDefault, evita erro do input modal
    const handleCriarCategoria = async (e) => {
        // Verifica se o evento existe antes de chamar preventDefault, evita erro do input modal
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        if (!novaCategoria.trim()) {
            alert('Por favor, digite o nome da categoria');
            return;
        }

        console.log('Dados sendo enviados:', {
            nome: novaCategoria,
            descricaoCategoria: descricaoCategoria
        }); // Debug temporario

        try {
            const res = await fetch(urlCategorias, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: novaCategoria,
                    descricaoCategoria: descricaoCategoria || null 
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Resposta do servidor:', data); // Debug temporario
            
            // Verifica se a resposta contém os dados corretos
            const novaCategoriaCriada = Array.isArray(data) ? data[0] : data;
            
            setNovaCategoria('');
            setDescricaoCategoria('');
            setModalAberto(false);
            
            // Adiciona a nova categoria à lista
            setCategorias(prev => [...prev, novaCategoriaCriada]);

        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            alert('Erro ao criar categoria. Tente novamente.');
        }
    };

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setNovaCategoria('');
        setDescricaoCategoria('');
    };

    // Função para fechar modal apenas quando clicado no overlay
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            fecharModal();
        }
    };

    
    //Função para enviar via ENTER
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCriarCategoria();
        }
    };

    useEffect(() => {
        const selectCategorias = async () => {
            try {
                const res = await fetch(urlCategorias, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const data = await res.json()
                console.log('Categorias carregadas:', data); // Debug temporario
                setCategorias(data)
            } catch (error) {
                console.error('Erro ao carregar categorias:', error)
            }
        }
        selectCategorias()
    }, [urlCategorias, setCategorias])

    // Componente do Modal esta isolado para evitar re-renders, pois da erro no input do modal
    const ModalCategoria = useMemo(() => {
        if (!modalAberto) return null;

        return (
            <div className={styles.modalOverlay} onClick={handleOverlayClick}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h3>Nova Categoria</h3>
                        <button className={styles.closeButton} onClick={fecharModal}>
                            <img src={fecharIcon} alt="Fechar" />
                        </button>
                    </div>

                    <div className={styles.modalForm}>
                        <div className={styles.modalLabel}>
                            <span>Nome da Categoria *</span>
                            <input
                                ref={nomeInputRef}
                                type="text"
                                placeholder="Digite o nome da categoria"
                                value={novaCategoria}
                                onChange={e => setNovaCategoria(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className={styles.modalInput}
                                autoComplete='off'
                                required
                                autoFocus
                            />
                        </div>

                        <div className={styles.modalLabel}>
                            <span>Descrição da categoria</span>
                            <input
                                ref={descricaoInputRef}
                                type="text"
                                placeholder="Breve descrição "
                                value={descricaoCategoria}
                                onChange={e => setDescricaoCategoria(e.target.value)}
                                onKeyDown={handleKeyDown} 
                                className={styles.modalInput}
                                autoComplete='off'
                                required
                            />
                        </div>

                        <div className={styles.modalActions}>
                            <button type='button' onClick={fecharModal} className={styles.cancelButton}>
                                Cancelar
                            </button>
                            <button type='button' onClick={() => handleCriarCategoria()} className={styles.createButton}>
                                Criar Categoria
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [modalAberto, novaCategoria, descricaoCategoria]); 

    return (
        <div>
            <div className={styles.categoriaWrapper}>
                <label className={styles.labelInput}>
                    <span>Categoria</span>
                    <select
                        className={styles.selecaoCategoria}
                        name="categoria"
                        value={selecionaCategoria || ''}
                        onChange={e => setSelecionaCategoria(e.target.value)}
                    >
                        <option key="placeholder" value="" disabled hidden>Adicione a categoria...</option>
                        {Array.isArray(categorias) ? (
                            categorias.map((tag, index) => (
                                <option key={tag.id || `categoria-${index}`} value={tag.id}>
                                    {tag.nome} {tag.descricaoCategoria ? `- ${tag.descricaoCategoria}` : ''}
                                </option>
                            ))
                        ) : (
                            <option key="no-categories" disabled value="">
                                Nenhuma categoria disponível
                            </option>
                        )}
                    </select>
                    <button type='button' className={styles.btnNovaCategoria} onClick={abrirModal}>
                        Nova categoria
                    </button>
                </label>
            </div>

            {/* Modal renderizado via portal - fora da DOM  */}
            {modalAberto && createPortal(ModalCategoria, document.body)}
        </div>
    )
}

export default SelecionaCategoria