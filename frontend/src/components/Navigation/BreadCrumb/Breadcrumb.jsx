import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from '../../../hooks/useBreadcrumbs';
import styles from './Breadcrumb.module.scss';

const Breadcrumb = () => {
  const caminho = useBreadcrumbs();

  // Não renderiza nada se estiver na página inicial ou se não houver caminho
  if (!caminho || caminho.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbNav}>
      <ol className={styles.breadcrumbList}>
        {caminho.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {/* O último item da lista não é um link */}
            {index < caminho.length - 1 ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span className={styles.activeCrumb}>{item.label}</span>
            )}
            {index < caminho.length - 1 && <span className={styles.separator}>&gt;</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
