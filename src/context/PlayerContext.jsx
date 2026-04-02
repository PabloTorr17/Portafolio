import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { PROJECTS } from '../data/projects';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentId, setCurrentId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(70);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [liked, setLiked] = useState(new Set());

  const intervalRef = useRef(null);
  const currentProject = PROJECTS.find((p) => p.id === currentId) || null;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const startTimer = useCallback(
    (project, startElapsed = 0) => {
      clearTimer();
      let el = startElapsed;
      intervalRef.current = setInterval(() => {
        el += 1;
        if (el >= project.duration) {
          if (repeat) {
            el = 0;
          } else {
            clearTimer();
            setPlaying(false);
            setElapsed(0);
            setProgress(0);
            return;
          }
        }
        setElapsed(el);
        setProgress((el / project.duration) * 100);
      }, 1000);
    },
    [clearTimer, repeat]
  );

  const playProject = useCallback(
    (id) => {
      const project = PROJECTS.find((p) => p.id === id);
      if (!project) return;
      clearTimer();
      if (id !== currentId) {
        setCurrentId(id);
        setElapsed(0);
        setProgress(0);
        setPlaying(true);
        startTimer(project, 0);
      } else {
        setPlaying(true);
        startTimer(project, elapsed);
      }
    },
    [currentId, elapsed, clearTimer, startTimer]
  );

  const pauseProject = useCallback(() => {
    clearTimer();
    setPlaying(false);
  }, [clearTimer]);

  const togglePlay = useCallback(
    (id) => {
      if (id && id !== currentId) { playProject(id); return; }
      if (playing) { pauseProject(); }
      else if (currentProject) {
        setPlaying(true);
        startTimer(currentProject, elapsed);
      }
    },
    [playing, currentId, currentProject, elapsed, playProject, pauseProject, startTimer]
  );

  const nextProject = useCallback(() => {
    const ids = shuffle
      ? [...PROJECTS].sort(() => Math.random() - 0.5).map((p) => p.id)
      : PROJECTS.map((p) => p.id);
    const idx = ids.indexOf(currentId);
    playProject(ids[(idx + 1) % ids.length]);
  }, [currentId, shuffle, playProject]);

  const prevProject = useCallback(() => {
    const ids = PROJECTS.map((p) => p.id);
    const idx = ids.indexOf(currentId);
    playProject(ids[(idx - 1 + ids.length) % ids.length]);
  }, [currentId, playProject]);

  const seekTo = useCallback(
    (pct) => {
      if (!currentProject) return;
      const newElapsed = Math.floor((pct / 100) * currentProject.duration);
      setProgress(pct);
      setElapsed(newElapsed);
      if (playing) {
        clearTimer();
        startTimer(currentProject, newElapsed);
      }
    },
    [currentProject, playing, clearTimer, startTimer]
  );

  const toggleLike = useCallback((id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return (
    <PlayerContext.Provider
      value={{
        currentId, currentProject, playing, progress, elapsed,
        volume, setVolume, shuffle, setShuffle, repeat, setRepeat,
        liked, toggleLike, playProject, pauseProject, togglePlay,
        nextProject, prevProject, seekTo,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be inside PlayerProvider');
  return ctx;
}
