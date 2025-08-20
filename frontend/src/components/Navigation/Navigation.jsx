import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import styles from './Navigation.module.scss'
import lupaIcon from '../../assets/icons/lupaIcon.svg'
import adminIcon from '../../assets/icons/adminIcon.svg'

const Navigation = () => {
  return (
<nav className={styles.navbarContainer}>
  <div className={styles.navbarContent}>
    <NavLink to='/' className={styles.logo}>Elegante</NavLink>

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

export default Navigation