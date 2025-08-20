import React from 'react'
import styles from './Footer.module.scss'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Coluna 1: Elegante */}
                <div className={styles.coluna}>
                    <NavLink className={styles.logoFooter}>Elegante</NavLink>
                    <p>
                        Criamos peças únicas para mulheres que valorizam elegância, qualidade e estilo atemporal.
                    </p>
                    <div className={styles.social}>

                    </div>
                </div>

                {/* Coluna 2: Produtos */}
                <div className={styles.coluna}>
                    <h4>Produtos</h4>
                    <ul>
                        <li>Novidades</li>
                        <li>Vestidos</li>
                        <li>Blusas & Tops</li>
                        <li>Calças & Saias</li>
                        <li>Acessórios</li>
                    </ul>
                </div>

                {/* Coluna 3: Suporte */}
                <div className={styles.coluna}>
                    <h4>Suporte</h4>
                    <ul>
                        <li>Central de Ajuda</li>
                        <li>Guia de Tamanhos</li>
                        <li>Trocas e Devoluções</li>
                        <li>Frete e Entrega</li>
                        <li>Contato</li>
                    </ul>
                </div>

                {/* Coluna 4: Contato */}
                <div className={styles.coluna}>
                    <h4>Contato</h4>
                    <ul>
                        <li>📧 contato@ficticio.com.br</li>
                        <li>📞 (11) 99999-9999</li>
                        <li>📍 Rua do Dev, 000</li>
                    </ul>
                </div>
            </div>
            <div className={styles.footerFinal}>
                <p>© 2024 DEVGabriel. Todos os direitos reservados.</p>
                <p>E-commerce fictício para portfólio.</p>
            </div>

        </footer>
    )
}

export default Footer