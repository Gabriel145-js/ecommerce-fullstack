import React from 'react'
import styles from './InfosPessoais.module.scss'
import userIcon from '../../../assets/icons/userIcon.svg'

const InfosPessoais = () => {
    return (
        <section className={styles.containerInfosPessoais}>
            <div className={styles.cardInfosPessoais}>
                <header className={styles.tituloInfosPessoais}>
                    <h1> <img src={userIcon} alt="" /> Informações Pessoais</h1>
                </header>

                <div className={styles.inputInfosPessoais}>
                    <div className={styles.nomeSobrenome}>
                        <label className={styles.labelInputsInfos}>
                            Nome
                            <input type="text" placeholder="Nome" />
                        </label>
                        <label className={styles.labelInputsInfos}>
                            Sobrenome
                            <input type="text" placeholder="Sobrenome" />
                        </label>
                    </div>
                    <label className={styles.labelInputsInfos}>
                        Email
                        <input type="text" placeholder="Email" />
                    </label>
                    <label className={styles.labelInputsInfos}>
                        Telefone
                        <input type="text" placeholder="(11) 99999-9999" />
                    </label>
                </div>


            </div>

        </section>
    )
}

export default InfosPessoais