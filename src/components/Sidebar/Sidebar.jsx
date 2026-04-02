import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/projects';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { id: 'home',   label: 'Inicio',    icon: '' },
  { id: 'search', label: 'Explorar',  icon: '' },
  { id: 'about',  label: 'Sobre mí',  icon: '' },
];

export default function Sidebar() {
  const { view, navigateTo, currentCategory } = useApp();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logoIcon}></div>
        <span className={styles.logo}>Spotify</span>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${view === item.id ? styles.active : ''}`}
            onClick={() => navigateTo(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.sectionTitle}>Colecciones</div>

      <div className={styles.playlists}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            className={`${styles.playlistItem} ${currentCategory === cat.name ? styles.playlistActive : ''}`}
            onClick={() => navigateTo('category', cat.name)}
          >
            <div className={styles.playlistThumb}>{cat.emoji}</div>
            <div className={styles.playlistInfo}>
              <div className={styles.playlistName}>{cat.name}</div>
              <div className={styles.playlistCount}>{cat.projectIds.length} proyectos</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
