import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [view, setView] = useState('home'); // 'home' | 'category' | 'about'
  const [selectedId, setSelectedId] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const openProject = (id) => {
    setSelectedId(id);
    setPanelOpen(true);
  };

  const closePanel = () => setPanelOpen(false);

  const navigateTo = (v, category = null) => {
    setView(v);
    setCurrentCategory(category);
    setSearchQuery('');
  };

  return (
    <AppContext.Provider
      value={{
        view, navigateTo,
        selectedId, openProject,
        currentCategory,
        searchQuery, setSearchQuery,
        panelOpen, setPanelOpen, closePanel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
