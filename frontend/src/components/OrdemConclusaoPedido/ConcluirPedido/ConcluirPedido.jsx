import React from 'react';
import styles from './ConcluirPedido.module.scss';
import userIcon from '../../../assets/icons/userIcon.svg';
import localIcon from '../../../assets/icons/pingLocalIcon.svg';

const ConcluirPedido = ({
    nomeCliente,
    sobrenomeCliente,
    emailCliente,
    telefoneCliente,
    cep,
    rua,
    bairro,
    numResidencia,
    cidade,
    estado,
    complemento,
}) => {
    return (
        <>
            <section className={styles.dadosPessoaisSection}>
                <div className={styles.headerDados}>
                    <img src={userIcon} alt="Ícone usuário" className={styles.iconUser} />
                    <h2>Dados Pessoais</h2>
                </div>
                <div className={styles.cardDados}>
                    <div className={styles.colunaLeft}>
                        <div className={styles.campoInfo}>
                            <span className={styles.label}>Nome Completo</span>
                            <span className={styles.valor}>{nomeCliente} {sobrenomeCliente}</span>
                        </div>
                        <div className={styles.campoInfo}>
                            <span className={styles.label}>Telefone</span>
                            <span className={styles.valor}>{telefoneCliente}</span>
                        </div>
                        <div className={styles.campoInfo}>
                            <span className={styles.label}>E-mail</span>
                            <span className={styles.valor}>{emailCliente}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.dadosEndereço}>
                <div className={styles.headerDados}>
                    <img src={localIcon} alt="Ícone usuário" className={styles.iconUser} />
                    <h2>Endereço de Entrega</h2>
                </div>
                <div className={styles.cardDados}>
                    <div className={styles.colunaLeft}>
                        <div className={styles.campoInfo}>
                            <span className={styles.label}>Endereço</span>
                            <span className={styles.valor}>{rua}, {numResidencia} - {complemento}</span>
                            <span className={styles.valor}>{cidade} - {bairro} - {estado}</span>
                            <span className={styles.valor}> CEP: {cep}</span>
                        </div>
                    </div>
                </div>


            </section>
        </>
    );
};

export default ConcluirPedido;