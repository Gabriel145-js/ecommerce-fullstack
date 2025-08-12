import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import styles from './NavBar.module.scss'
import lupaIcon from '../../assets/icons/lupaIcon.svg'
import adminIcon from '../../assets/icons/adminIcon.svg'

const NavBar = () => {
  return (
<nav className={styles.navbarContainer}>
  <div className={styles.navbarContent}>
    <h1 className={styles.logo}>Elegante</h1>

    <div className={styles.navbarLinks}>
      <NavLink>Novidades</NavLink>
      <NavLink>Blusas</NavLink>
      <NavLink>Calças</NavLink>
      <NavLink>Todos os produtos</NavLink>
    </div>

    <div className={styles.navbarIcons}>

      <NavLink >
        <img src={lupaIcon} alt="Icone Busca"  />
      </NavLink>

      <NavLink to='/DashboardAdmin'>
        <img  src={adminIcon} alt="Icone Admin" />
      </NavLink>
    </div>
  </div>
</nav>
  )
}

export default NavBar