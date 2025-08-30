import React, { useState, useRef } from 'react'
import styles from './ImagensProdutos.module.scss'
import uploadIcon from '../../../../assets/icons/uploadIcon.svg'

const ImagensProodutos = ({ imagemPrincipal, setImagemPrincipal, imagensAdicionais, setImagensAdicionais }) => {
    const fileInputPrincipalRef = useRef(null);
    const fileInputAdicionaisRef = useRef(null);

    const handleImagemPrincipalChange = (e) => {
        const file = e.target.files[0];
        setImagemPrincipal(file);
    };

    const handleImagensAdicionaisChange = (e) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            const files = Array.from(fileList);
            setImagensAdicionais(prevFiles => [...prevFiles, ...files]);
        }
    };

    const removeImagemAdicional = (index) => {
        setImagensAdicionais(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const triggerFileInputPrincipal = () => {
        fileInputPrincipalRef.current?.click();
    };

    const triggerFileInputAdicionais = () => {
        fileInputAdicionaisRef.current?.click();
    };



    return (
        <>
            <section className={styles.sectionImagensProdutos}>
                <div className={styles.labelInput} style={{ width: '100%' }}>
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

                <div className={styles.labelInput} style={{ width: '100%' }}>
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
                </section>

                </>
                )
}

                export default ImagensProodutos