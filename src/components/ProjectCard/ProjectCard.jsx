import { usePlayer } from '../../context/PlayerContext';
import { useApp } from '../../context/AppContext';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
  const { currentId, playing, togglePlay } = usePlayer();
  const { openProject } = useApp();
  const isActive = currentId === project.id;
  const isPlaying = isActive && playing;

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={() => openProject(project.id)}
    >
      <div className={styles.art} style={{ background: project.color }}>
        {isPlaying ? (
          <div className="eq-bars">
            <div className="eq-bar" />
            <div className="eq-bar" />
            <div className="eq-bar" />
          </div>
        ) : (
          <span>{project.emoji}</span>
        )}
        <button
          className={styles.playBtn}
          onClick={(e) => { e.stopPropagation(); togglePlay(project.id); }}
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      <div className={styles.title}>{project.title}</div>
      <div className={styles.sub}>{project.category}</div>
      <div className={styles.tags}>
        {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}
