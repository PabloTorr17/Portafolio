import { useApp } from '../../context/AppContext';
import styles from './Header.module.css';

export default function Header() {
  const { searchQuery, setSearchQuery, navigateTo, setPanelOpen, panelOpen } = useApp();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.navBtns}>
          <button className={styles.navBtn} onClick={() => window.history.back()}>&#8592;</button>
          <button className={styles.navBtn} onClick={() => window.history.forward()}>&#8594;</button>
        </div>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>&#128269;</span>
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); navigateTo('home'); }}
          />
        </div>
      </div>

      <div className={styles.right}>
        <button
          className={`${styles.iconBtn} ${panelOpen ? styles.active : ''}`}
          onClick={() => setPanelOpen((v) => !v)}
          title="Panel de detalles"
        >
          &#9776;
        </button>
        <div className={styles.avatar} title="Pablo Torrecillas">PT</div>
      </div>
    </header>
  );
}
