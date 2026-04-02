import { usePlayer } from '../../context/PlayerContext';
import { useApp } from '../../context/AppContext';
import { useFormatTime } from '../../hooks/useFormatTime';
import styles from './Player.module.css';

export default function Player() {
  const {
    currentProject, playing, progress, elapsed,
    volume, setVolume,
    shuffle, setShuffle, repeat, setRepeat,
    liked, toggleLike,
    togglePlay, nextProject, prevProject, seekTo,
  } = usePlayer();
  const { setPanelOpen, openProject } = useApp();
  const formatTime = useFormatTime();

  const isLiked = currentProject && liked.has(currentProject.id);
  const total = currentProject?.duration ?? 0;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seekTo(((e.clientX - rect.left) / rect.width) * 100);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setVolume(Math.round(((e.clientX - rect.left) / rect.width) * 100));
  };

  return (
    <footer className={styles.player}>
      {/* Left: current track info */}
      <div className={styles.left}>
        <div
          className={styles.art}
          style={currentProject ? { background: currentProject.color } : { background: 'var(--bg3)' }}
          onClick={() => currentProject && openProject(currentProject.id)}
          style2={{ cursor: currentProject ? 'pointer' : 'default' }}
        >
          {currentProject ? currentProject.emoji : '🎵'}
        </div>
        <div className={styles.info} onClick={() => currentProject && openProject(currentProject.id)}>
          <div className={styles.trackTitle}>
            {currentProject ? currentProject.title : 'Selecciona un proyecto'}
          </div>
          <div className={styles.trackSub}>
            {currentProject ? currentProject.tech.slice(0, 3).join(' · ') : '—'}
          </div>
        </div>
        <button
          className={`${styles.iconBtn} ${isLiked ? styles.liked : ''}`}
          onClick={() => currentProject && toggleLike(currentProject.id)}
          aria-label="Me gusta"
        >
          {isLiked ? '♥' : '♡'}
        </button>
      </div>

      {/* Center: controls + progress */}
      <div className={styles.center}>
        <div className={styles.controls}>
          <button
            className={`${styles.ctrlBtn} ${shuffle ? styles.active : ''}`}
            onClick={() => setShuffle((v) => !v)}
            aria-label="Aleatorio"
            title="Aleatorio"
          >⇄</button>

          <button className={styles.ctrlBtn} onClick={prevProject} aria-label="Anterior">⏮</button>

          <button className={styles.playBtn} onClick={() => togglePlay()} aria-label={playing ? 'Pausar' : 'Reproducir'}>
            {playing ? '⏸' : '▶'}
          </button>

          <button className={styles.ctrlBtn} onClick={nextProject} aria-label="Siguiente">⏭</button>

          <button
            className={`${styles.ctrlBtn} ${repeat ? styles.active : ''}`}
            onClick={() => setRepeat((v) => !v)}
            aria-label="Repetir"
            title="Repetir"
          >↻</button>
        </div>

        <div className={styles.progressWrap}>
          <span className={styles.time}>{formatTime(elapsed)}</span>
          <div className={styles.progressBar} onClick={handleProgressClick} role="slider" aria-label="Progreso">
            <div className={styles.progressFill} style={{ width: `${progress}%` }}>
              <div className={styles.progressDot} />
            </div>
          </div>
          <span className={styles.time}>{formatTime(total)}</span>
        </div>
      </div>

      {/* Right: volume + queue */}
      <div className={styles.right}>
        <button
          className={styles.ctrlBtn}
          onClick={() => setPanelOpen((v) => !v)}
          title="Detalles del proyecto"
          aria-label="Panel de detalles"
        >
          &#9776;
        </button>
        <div className={styles.volWrap}>
          <span className={styles.volIcon}>🔊</span>
          <div className={styles.volBar} onClick={handleVolumeClick} role="slider" aria-label="Volumen">
            <div className={styles.volFill} style={{ width: `${volume}%` }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
