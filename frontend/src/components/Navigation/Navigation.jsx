import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Navigation.module.scss'
import lupaIcon from '../../assets/icons/lupaIcon.svg'
import adminIcon from '../../assets/icons/adminIcon.svg'
import carCompras from '../../assets/icons/carCompras.svg'
import CarrinhoCompras from '../CarrinhoCompras/CarrinhoCompras'

const Navigation = () => {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  return (
    <>
      <nav className={styles.containerNavbar}>
        <div className={styles.conteudoNavbar}>
          <NavLink to='/' className={styles.logo}>Elegante</NavLink>

          <div className={styles.linksNavbar}>
            <NavLink>Novidades</NavLink>
            <NavLink>Blusas</NavLink>
            <NavLink>Calças</NavLink>
            <NavLink>Todos os produtos</NavLink>
          </div>

          <div className={styles.iconesNavbar}>

            <button className={styles.botaoIcone}>
              <img src={lupaIcon} alt="Icone Busca" />
            </button>

            <button onClick={() => setCarrinhoAberto(true)} className={styles.botaoIcone}>
              <img src={carCompras} alt="Icone Carrinho" />
            </button>

            <NavLink to='/DashboardAdmin' className={styles.botaoIcone}>
              <img src={adminIcon} alt="Icone Admin" />
            </NavLink>

          </div>
        </div>
      </nav>
      {carrinhoAberto && <CarrinhoCompras onClose={() => setCarrinhoAberto(false)} />}
    </>
  )
}

export default Navigation