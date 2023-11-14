import styles from './Header.module.scss';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { NavLinks, pageData } from 'services/pageData.ts';

type HeaderProps = {
  pageData?: NavLinks[];
}

export const Header: FC<HeaderProps> = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <ul className={styles.list}>

          {pageData.map(({ href, label, src, alt }) => (

            <li key={href} className={styles.listItem}>
              <NavLink to={href} className={({ isActive }) =>
                isActive ? styles.active : ''
              }>
                <img src={src} alt={alt} />
                {label}
              </NavLink>
            </li>
          ))}

        </ul>
      </nav>
    </header>
  );
};