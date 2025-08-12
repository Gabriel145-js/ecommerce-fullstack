import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styles from './DashboardAdmin.module.scss'
import menuHamburguer from '../../assets/icons/menuHamburguerIcon.svg'
import fecharIcon from '../../assets/icons/fecharIcon.svg'
import addProdutoIcon from '../../assets/icons/addProdutoIcon.svg'

const DashboardAdmin = () => {

  const [menuAberto, setMenuAberto] = useState(false);

  const handleMouseEnter = () => {
    setMenuAberto(true);
  };

  const handleMouseLeave = () => {
    setMenuAberto(false);
  };

  return (
    <div className={styles.containerAdminDashboard}>

      <nav
        className={`${styles.containerMenuDashboard} ${menuAberto ? styles.aberto : styles.fechado}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <span className={styles.menuHamburguer} onClick={() => setMenuAberto(!menuAberto)}>
          <img className={styles.menuHamburguerIcon} src={menuHamburguer} alt="Ícone de abrir menu dashboard admin" />
          <img className={styles.fecharIcon} src={fecharIcon} alt="Ícone de fechar menu dashboard admin" />
        </span>

        <div className={styles.containerLinks}>
          <NavLink to='AddProduto' className={styles.linkMenu}>
            <img src={addProdutoIcon} alt="" />Adicionar Produto
          </NavLink>
          
          <NavLink to='gerenciar-produtos' className={styles.linkMenu}>
           <img src={addProdutoIcon} alt="" /> Gerenciar Categorias
          </NavLink>
        </div>

      </nav>

      <main className={styles.conteudoPrincipal}>
        <Outlet />
      </main>

    </div>
  )
}

export default DashboardAdmin