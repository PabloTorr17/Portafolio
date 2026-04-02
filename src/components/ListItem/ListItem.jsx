import { usePlayer } from '../../context/PlayerContext';
import { useApp } from '../../context/AppContext';
import styles from './ListItem.module.css';

export default function ListItem({ project, index }) {
  const { currentId, playing, togglePlay } = usePlayer();
  const { openProject } = useApp();
  const isActive = currentId === project.id;
  const isPlaying = isActive && playing;

  return (
    <div
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={() => openProject(project.id)}
    >
      <div className={styles.num}>
        {isPlaying ? (
          <div className="eq-bars" style={{ height: 14 }}>
            <div className="eq-bar" />
            <div className="eq-bar" />
            <div className="eq-bar" />
          </div>
        ) : index}
      </div>

      <div className={styles.img} style={{ background: project.color }}>
        {project.emoji}
      </div>

      <div className={styles.info}>
        <div className={styles.title} style={isActive ? { color: 'var(--accent2)' } : {}}>
          {project.title}
        </div>
        <div className={styles.tech}>{project.tech.slice(0, 3).join(' · ')}</div>
      </div>

      <div className={styles.links}>
        <a
          className={styles.link}
          href={project.github}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
        </a>
        <a
          className={styles.link}
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Demo
        </a>
      </div>

      <button
        className={styles.playBtn}
        onClick={(e) => { e.stopPropagation(); togglePlay(project.id); }}
        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
    </div>
  );
}
