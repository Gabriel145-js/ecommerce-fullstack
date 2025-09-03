import React from 'react'
import styles from './HomeAdmin.module.scss'
import sacolaIcon from '../../../assets/icons/sacolaIcon.svg'
import estoqueIcon from '../../../assets/icons/estoqueIcon.svg'
import analyticsIcon from '../../../assets/icons/analyticsIcon.svg'
import saleIcon from '../../../assets/icons/saleIcon.svg'

const HomeAdmin = () => {
    return (
        <div>
            <section className={styles.containerBannerDashboard}>
                <header className={styles.hero} role="banner" aria-label="Resumo do painel">


                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Bem-vindo ao Admin Dashboard
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Gerencie seus produtos, monitore vendas e controle seu estoque com nossa
                            plataforma completa de administração. <br /> Tudo em um só lugar, de forma simples
                            e eficiente.
                        </p>


                    </div>
                </header>

                {/* CARDS DE FUNCIONALIDADES */}
                <section className={styles.funcionalidades} aria-label="Atalhos do painel">
                    <article className={styles.funcionalidadesCard} role="button" tabIndex={0}>
                        <div className={styles.funcionalidadesIcon}><img src={sacolaIcon} alt="" /></div>
                        <div className={styles.funcionalidadesInfos}>
                            <h3 className={styles.funcionalidadesTitle}>Gerenciar Produtos</h3>
                            <p className={styles.funcionalidadesDesc}>
                                Adicione, edite e organize seus produtos com facilidade
                            </p>
                        </div>
                    </article>

                    <article className={styles.funcionalidadesCard} role="button" tabIndex={0}>
                        <div className={styles.funcionalidadesIcon}><img src={estoqueIcon} alt="" /></div>
                        <div className={styles.funcionalidadesInfos}>
                            <h3 className={styles.funcionalidadesTitle}>Controle de Estoque</h3>
                            <p className={styles.funcionalidadesDesc}>
                                Monitore níveis de estoque e receba alertas automáticos
                            </p>
                        </div>
                    </article>

                    <article className={styles.funcionalidadesCard} role="button" tabIndex={0}>
                        <div className={styles.funcionalidadesIcon}><img src={analyticsIcon} alt="" /></div>
                        <div className={styles.funcionalidadesInfos}>
                            <h3 className={styles.funcionalidadesTitle}>Analises</h3>
                            <p className={styles.funcionalidadesDesc}>
                                Visualize métricas importantes e relatórios detalhados
                            </p>
                        </div>
                    </article>

                    <article className={styles.funcionalidadesCard} role="button" tabIndex={0}>
                        <div className={styles.funcionalidadesIcon}><img src={saleIcon} alt="" /></div>
                        <div className={styles.funcionalidadesInfos}>
                            <h3 className={styles.funcionalidadesTitle}>Promoções</h3>
                            <p className={styles.funcionalidadesDesc}>
                                Configure ofertas e descontos especiais
                            </p>
                        </div>
                    </article>
                </section>


            </section>
        </div>
    )
}

export default HomeAdmin