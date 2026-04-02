import { useApp } from '../../context/AppContext';
import { usePlayer } from '../../context/PlayerContext';
import { PROJECTS } from '../../data/projects';
import { useFormatTime } from '../../hooks/useFormatTime';
import styles from './RightPanel.module.css';

export default function RightPanel() {
  const { panelOpen, closePanel, selectedId } = useApp();
  const { currentId, playing, togglePlay, liked, toggleLike } = usePlayer();
  const formatTime = useFormatTime();

  const project = PROJECTS.find((p) => p.id === selectedId) || null;
  const isActive = project && currentId === project.id;
  const isPlaying = isActive && playing;
  const isLiked = project && liked.has(project.id);

  return (
    <aside className={`${styles.panel} ${panelOpen ? styles.open : ''}`}>
      {project && (
        <div className={styles.content}>
          {/* Art */}
          <div className={styles.artWrap}>
            <button className={styles.closeBtn} onClick={closePanel} aria-label="Cerrar panel">✕</button>
            <div className={styles.art} style={{ background: project.color }}>
              {project.emoji}
            </div>
          </div>

          {/* Info */}
          <div className={styles.titleArea}>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.meta}>{project.category} · {project.year} · {formatTime(project.duration)}</p>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <button
              className={styles.playBtn}
              onClick={() => togglePlay(project.id)}
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              className={`${styles.ctrlBtn} ${isLiked ? styles.liked : ''}`}
              onClick={() => toggleLike(project.id)}
              aria-label={isLiked ? 'Quitar me gusta' : 'Me gusta'}
            >
              {isLiked ? '♥' : '♡'}
            </button>
            <button className={styles.ctrlBtn} style={{ marginLeft: 'auto' }}>⋯</button>
          </div>

          {/* Description */}
          <div className={styles.desc}>{project.description}</div>

          {/* Tech */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Stack tecnológico</div>
            <div className={styles.techStack}>
              {project.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Etiquetas</div>
            <div>
              {project.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className={styles.links}>
            <a href={project.github} target="_blank" rel="noreferrer" className={styles.link}>
              ⌥ GitHub
            </a>
            <a href={project.demo} target="_blank" rel="noreferrer" className={styles.link}>
              ↗ Ver Demo
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}
