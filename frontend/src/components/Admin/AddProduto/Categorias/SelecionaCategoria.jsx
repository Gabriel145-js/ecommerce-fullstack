import React, { useState, useEffect } from 'react'
import styles from '../AddProduto.module.scss'

const SelecionaCategoria = () => {
    const [novaCategoria, setNovaCategoria] = useState('')
    const [categorias, setCategorias] = useState([])
    const [selecionaCategoria, setSelecionaCategoria] = useState('')

    const urlCategorias = 'http://localhost:5000/api/categorias'

    const handleCriarCategoria = async (e) => {


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
         
            setCategorias([...categorias, data]); //atualizar a lista de categorias
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
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



            <label>
                <span>criar categoria</span>
                <input type="text" placeholder='criar categoria' value={novaCategoria} onChange={e => setNovaCategoria(e.target.value)} />
                <button type='button' onClick={handleCriarCategoria}> Criar categoria</button>
            </label>



            <label className={styles.labelInput}>
                <span>Categorias</span>

                <select name="categoria" value={selecionaCategoria || ''}
                    onChange={e => setSelecionaCategoria(e.target.value)} >

                    <option key="placeholder" value="" disabled hidden>Adicione a categoria...</option>
                  // Usar índice como fallback para key:
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
    )
}

export default SelecionaCategoria