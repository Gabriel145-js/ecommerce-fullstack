import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navbar.module.scss'
import lupaIcon from '../../assets/icons/lupaIcon.svg'

const Navbar = () => {
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

      <img src={lupaIcon} alt="Search"  />
    </div>
  </div>
</nav>
  )
}

export default Navbar