import React, { useState, useEffect } from 'react'
import styles from '../AddProduto.module.scss'

const SelecionaCategoria = ({ categorias,setCategorias, selecionaCategoria, setSelecionaCategoria }) => {
    const [novaCategoria, setNovaCategoria] = useState('')
  
    const [modalAberto, setModalAberto] = useState(false)

    const urlCategorias = 'http://localhost:5000/api/categorias'

    const handleCriarCategoria = async (e) => {
        e.preventDefault();

        if (!novaCategoria.trim()) {
            alert('Por favor, digite o nome da categoria');
            return;
        }

        try {
            const res = await fetch(urlCategorias, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: novaCategoria }) // envia como objeto
            });

            const data = await res.json();
            console.log('Categoria criada:', data);
            setNovaCategoria(''); // limpa o input
            setModalAberto(false); // fecha o modal

            setCategorias([...categorias, data]); //atualizar a lista de categorias
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setNovaCategoria(''); // limpa o input ao fechar
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

                const data = await res.json()
                setCategorias(data)

            } catch (error) {
                console.error(error)
            }
        }
        selectCategorias()


    }, [])

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
                                    {tag.nome}
                                </option>
                            ))
                        ) : (
                            <option key="no-categories" disabled value="">
                                Nenhuma categoria disponível
                            </option>
                        )}
                    </select>
                </label>


            </div>

            {/* Modal para criar categoria */}
            {modalAberto && (
                <div className={styles.modalOverlay} onClick={fecharModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Nova Categoria</h3>
                            <button className={styles.closeButton} onClick={fecharModal}>×</button>
                        </div>

                        <form onSubmit={handleCriarCategoria} className={styles.modalForm}>
                            <label className={styles.modalLabel}>
                                <span>Nome da Categoria</span>
                                <input
                                    type="text"
                                    placeholder='Digite o nome da categoria'
                                    value={novaCategoria}
                                    onChange={e => setNovaCategoria(e.target.value)}
                                    className={styles.modalInput}
                                    autoFocus
                                />
                            </label>

                            <div className={styles.modalActions}>
                                <button type='button' onClick={fecharModal} className={styles.cancelButton}>
                                    Cancelar
                                </button>
                                <button type='submit' className={styles.createButton}>
                                    Criar Categoria
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelecionaCategoria