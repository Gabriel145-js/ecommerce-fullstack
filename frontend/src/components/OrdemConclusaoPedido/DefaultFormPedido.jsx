import React from 'react'
import styles from './DefaultFormPedido.module.scss'

const DefaultFormPedido = ({ titulo, icone, campos }) => {
    return (

        <section className={styles.containerSecao}>
            <div className={styles.cardSecao}>
                <header className={styles.tituloSecao}>
                    <h1>
                        {icone && <img src={icone} alt=''/>}
                        {titulo}
                    </h1>
                </header>

                <div className={styles.inputSecao}>
                    {campos.map((campo, index) => (
                        <label key={index} className={styles.labelCampo}>
                            {campo.label}
                            <input
                                type={campo.tipo || 'text'}
                                placeholder={campo.placeholder}
                                value={campo.value}
                                onChange={e => campo.onChange(e.target.value)}
                            />
                        </label>
                    ))}
                </div>

                
            </div>
        </section>

    )
}

export default DefaultFormPedido