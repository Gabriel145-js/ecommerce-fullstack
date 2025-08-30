import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import styles from './GerenciarCategorias.module.scss'
import lixoIcon from '../../../../../assets/icons/lixoIcon.svg'
import editIcon from '../../../../../assets/icons/editIcon.svg'
import fecharIcon from '../../../../../assets/icons/fecharIcon.svg'
import boxIcon from '../../../../../assets/icons/boxIcon.svg'
import folderIcon from '../../../../../assets/icons/folderIcon.svg'

const GerenciarCategorias = () => {
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [editandoCategoria, setEditandoCategoria] = useState(null)
    const [nomeEditado, setNomeEditado] = useState('')
    const [descricaoCategoria, setDescricaoCategoria] = useState('')
    const [modalAberto, setModalAberto] = useState(false)
    const [quantidadeProdutos, setQuantidadeProdutos] = useState([])


    const API_URL = import.meta.env.VITE_API_URL;
    const urlCategorias = useMemo(() => `${API_URL}/api/categorias`, [API_URL]);

    useEffect(() => {
        const exibirCategorias = async () => {
            try {
                setLoading(true)
                const res = await fetch(urlCategorias, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (res.ok) {
                    const data = await res.json()
                    setCategorias(data)
                } else {
                    console.error('Erro ao buscar categorias:', res.status)
                }

            } catch (error) {
                console.error('Houve um erro ao buscar categorias:', error)
            } finally {
                setLoading(false)
            }
        }

        exibirCategorias()
    }, [urlCategorias])

    useEffect(() => {
        const produtosQuantidade = async () => {
            try {
                const res = await fetch(urlCategorias + '/com-produtos', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
                setQuantidadeProdutos(data)

            } catch (error) {
                console.error("erro ao exibir quantidade de produtos", error.message)
            }

        }
        produtosQuantidade()
    }, [])

    const handleDeleteCategoria = useCallback(async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            return
        }

        try {

            const res = await fetch(`${urlCategorias}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })


            if (res.ok) {
                const responseData = await res.json()
                setCategorias(prev => prev.filter(c => c.id !== id))
                alert('Categoria excluída com sucesso!')
            } else {
                const errorData = await res.json().catch(() => ({ error: 'Erro desconhecido' }))
                console.error('Erro ao excluir categoria:', errorData)
                alert('Erro ao excluir categoria: ' + (errorData.error || 'Erro desconhecido'))
            }
        } catch (error) {
            console.error('Erro ao excluir:', error.message)
            alert('Erro de conexão ao excluir categoria')
        }
    }, [urlCategorias])

    const abrirModalEdicao = useCallback((categoria) => {
        setEditandoCategoria(categoria)
        setNomeEditado(categoria.nome)
        setDescricaoCategoria(categoria.descricaoCategoria || '')
        setModalAberto(true)
    }, [])

    const fecharModal = useCallback(() => {
        setModalAberto(false)
        setEditandoCategoria(null)
        setNomeEditado('')
        setDescricaoCategoria('')
    }, [])

    const handleOverlayClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            fecharModal()
        }
    }, [fecharModal])

    const handleUpdateCategoria = useCallback(async () => {
        if (!nomeEditado.trim()) {
            alert('Por favor, digite o nome da categoria')
            return
        }

        try {
            const requestBody = {
                nome: nomeEditado.trim(),
                descricaoCategoria: descricaoCategoria.trim()
            }


            const res = await fetch(`${urlCategorias}/${editandoCategoria.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })

            // Tenta ler a resposta como texto primeiro para ver o que está sendo retornado
            const responseText = await res.text()


            if (res.ok) {
                let responseData
                try {
                    responseData = JSON.parse(responseText)

                } catch (parseError) {
                    console.warn('Response não é JSON válido:', parseError)
                    responseData = { message: 'Categoria atualizada' }
                }

                // Atualiza a categoria na lista local
                setCategorias(prev => prev.map(c =>
                    c.id === editandoCategoria.id
                        ? { ...c, nome: nomeEditado.trim(), descricaoCategoria: descricaoCategoria.trim() }
                        : c
                ))
                fecharModal()
                alert('Categoria atualizada com sucesso!')
            } else {
                let errorData
                try {
                    errorData = JSON.parse(responseText)
                } catch (parseError) {
                    errorData = { error: `Erro ${res.status}: ${responseText || 'Erro desconhecido'}` }
                }
                console.error('Erro ao atualizar categoria:', errorData)
                alert('Erro ao atualizar categoria: ' + (errorData.error || 'Erro desconhecido'))
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error.message)
            alert('Erro de conexão ao atualizar categoria')
        }
    }, [editandoCategoria, nomeEditado, descricaoCategoria, urlCategorias, fecharModal])

    // Componente do Modal de Edição isolado
    const ModalEdicao = useMemo(() => {
        if (!modalAberto || !editandoCategoria) return null;

        return (
            <div className={styles.modalOverlay} onClick={handleOverlayClick}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h3>Editar Categoria</h3>
                        <button className={styles.closeButton} onClick={fecharModal}><img src={fecharIcon} alt="" /></button>
                    </div>

                    <div className={styles.modalForm}>
                        <div className={styles.modalLabel}>
                            <span>Nome da Categoria</span>
                            <input
                                type="text"
                                placeholder='Digite o novo nome da categoria'
                                value={nomeEditado}
                                onChange={e => setNomeEditado(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleUpdateCategoria();
                                    }
                                }}
                                className={styles.modalInput}
                                autoFocus
                            />
                        </div>

                        <div className={styles.modalLabel}>
                            <span>Descrição da categoria</span>
                            <input
                                type="text"
                                placeholder='Breve descrição da categoria'
                                value={descricaoCategoria}
                                onChange={e => setDescricaoCategoria(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleUpdateCategoria();
                                    }
                                }}
                                className={styles.modalInput}
                            />
                        </div>

                        <div className={styles.modalActions}>
                            <button type='button' onClick={fecharModal} className={styles.cancelButton}>
                                Cancelar
                            </button>
                            <button type='button' onClick={handleUpdateCategoria} className={styles.createButton}>
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [modalAberto, editandoCategoria, nomeEditado, descricaoCategoria, handleOverlayClick, fecharModal, handleUpdateCategoria])

    if (loading) {
        return (
            <div className={styles.containerPageCategorias}>
                <div className={styles.titESubtitulo}>
                    <h1>Gerenciar Categorias</h1>
                    <p>Edite, exclua e veja as suas categorias com seus produtos.</p>
                </div>
                <div className={styles.containerCategorias}>
                    <p>Carregando categorias...</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.containerPageCategorias}>
            <div className={styles.titESubtitulo}>
                <h1>Gerenciar Categorias</h1>
                <p>Edite, exclua e veja as suas categorias com seus produtos.</p>
            </div>

            <div className={styles.containerCategorias}>
                <div className={styles.headerCategorias}>
                    <h2 className={styles.tituloCategs}><img src={folderIcon} alt="titulo categorias existentes" />Categorias Existentes</h2>
                    <span className={styles.qtdCategorias}>{categorias.length} Categorias</span>
                </div>
                {Array.isArray(categorias) && categorias.length > 0 ? (
                    <ul className={styles.listaCategoriaWrapper}>
                        {categorias.map(categ => {
                            // Encontra a quantidade de produtos para a categoria atual
                            const qtdProdutos = quantidadeProdutos.find(q => q.id === categ.id)?.total_produtos || 0;

                            return (
                                <li key={categ.id} className={styles.categoriasFundo}>
                                    <div className={styles.listaCategorias}>
                                        <span className={styles.nomeCategoria}>{categ.nome}</span>
                                        <p className={styles.descricaoCategoria}>{categ.descricaocategoria}</p>


                                        <div className={styles.iconesEdit}>
                                            <p className={styles.qtdProdutos} > <img src={boxIcon} alt="" />{qtdProdutos} Produtos</p>
                                            <div>
                                                <img
                                                    className={styles.editCategoria}
                                                    src={editIcon}
                                                    alt="Editar categoria"
                                                    onClick={() => abrirModalEdicao(categ)}
                                                    title="Editar categoria"
                                                /> 
                                                <img
                                                    className={styles.deleteCategoria}
                                                    src={lixoIcon}
                                                    alt="Excluir categoria"
                                                    onClick={() => handleDeleteCategoria(categ.id)}
                                                    title="Excluir categoria"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className={styles.categoriasVazias}>
                        <p>Nenhuma categoria encontrada</p>
                        <p>Crie sua primeira categoria para começar!</p>
                    </div>
                )}
            </div>


            {/* Modal renderizado via portal */}
            {modalAberto && editandoCategoria && createPortal(ModalEdicao, document.body)}
        </div>
    )
}

export default GerenciarCategorias