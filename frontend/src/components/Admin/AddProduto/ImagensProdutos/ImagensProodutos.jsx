import React, { useState, useRef } from 'react'
import styles from './ImagensProdutos.module.scss'
import uploadIcon from '../../../../assets/icons/uploadIcon.svg'

const ImagensProodutos = () => {

    const [imagemPrincipal, setImagemPrincipal] = useState(null)
    const [imagensAdicionais, setImagensAdicionais] = useState([])

    const fileInputPrincipalRef = useRef(null)
    const fileInputAdicionaisRef = useRef(null)

    const handleImagemPrincipalChange = (e) => {
        const file = e.target.files[0]
        setImagemPrincipal(file)
    }

    const handleImagensAdicionaisChange = (e) => {
        const fileList = e.target.files
        console.log('Total de arquivos selecionados:', fileList ? fileList.length : 0)

        if (fileList && fileList.length > 0) {
            const files = Array.from(fileList)
            console.log('Arquivos processados:', files.length)

            // Adiciona aos arquivos existentes em vez de substituir
            setImagensAdicionais(prevFiles => {
                const novosArquivos = [...prevFiles, ...files]
                console.log('Total após adicionar:', novosArquivos.length)
                return novosArquivos
            })
        }
    }

    const removeImagemAdicional = (index) => {
        setImagensAdicionais(prevFiles => prevFiles.filter((_, i) => i !== index))
    }

    const limparImagensAdicionais = () => {
        setImagensAdicionais([])
        if (fileInputAdicionaisRef.current) {
            fileInputAdicionaisRef.current.value = ''
        }
    }

    const triggerFileInputPrincipal = () => {
        fileInputPrincipalRef.current?.click()
    }

    const triggerFileInputAdicionais = () => {
        fileInputAdicionaisRef.current?.click()
    }
    return (
        <>
            <div className={styles.labelInput}>
                <span>Imagem principal</span>
                
                <button type="button" className={styles.customFileButton} onClick={triggerFileInputPrincipal}>
                    <img className={styles.uploadIcon} src={uploadIcon} alt="" />
                    {imagemPrincipal ? imagemPrincipal.name : 'Escolher imagem principal'}
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputPrincipalRef}
                    onChange={handleImagemPrincipalChange}
                    style={{ display: 'none' }}
                />
            </div>

            <div className={styles.labelInput}>
                <span>Imagens adicionais </span>
                <button type="button" className={styles.customFileButton} onClick={triggerFileInputAdicionais}>
                    <img className={styles.uploadIcon} src={uploadIcon} alt="" />
                    {imagensAdicionais.length > 0
                        ? `${imagensAdicionais.length} imagem(ns) selecionada(s)`
                        : 'Escolher imagens adicionais'
                    }
                </button>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputAdicionaisRef}
                    onChange={handleImagensAdicionaisChange}
                    style={{ display: 'none' }}
                />
                {imagensAdicionais.length > 0 && (
                    <div className={styles.selectedFiles}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                           
                            <button
                                type="button"
                                onClick={limparImagensAdicionais}
                                className={styles.clearAllButton}
                            >
                                Limpar todos
                            </button>
                        </div>
                        {imagensAdicionais.map((file, index) => (
                            <div key={index} className={styles.fileTag}>
                                <span>{file.name}</span>
                                <button
                                    type="button"
                                    className={styles.removeFileTagButton}
                                    onClick={() => removeImagemAdicional(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            </>
    )
}

export default ImagensProodutos