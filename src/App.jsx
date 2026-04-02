import { PlayerProvider } from './context/PlayerContext';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import RightPanel from './components/RightPanel/RightPanel';
import Player from './components/Player/Player';
import './styles/globals.css';
import styles from './App.module.css';

export default function App() {
  return (
    <PlayerProvider>
      <AppProvider>
        <div className={styles.appShell}>
          <Header />
          <div className={styles.body}>
            <Sidebar />
            <MainContent />
            <RightPanel />
          </div>
          <Player />
        </div>
      </AppProvider>
    </PlayerProvider>
  );
}
