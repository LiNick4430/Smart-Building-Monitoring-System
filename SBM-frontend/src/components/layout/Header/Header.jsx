import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1>🏢 智慧建築監控系統</h1>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          設備總覽
        </NavLink>
        <NavLink
          to="/alarms"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          警報紀錄
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;