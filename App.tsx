import React, { useState } from 'react';
import { AppView } from './types';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Clubhouse from './pages/Clubhouse';
import Assistant from './pages/Assistant';
import Profile from './pages/Profile';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Home onChangeView={setCurrentView} />;
      case AppView.SHOP:
        return <Shop />;
      case AppView.CLUBHOUSE:
        return <Clubhouse />;
      case AppView.ASSISTANT:
        return <Assistant />;
      case AppView.PROFILE:
        return <Profile />;
      default:
        return <Home onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar />
      
      <main className="flex-1 relative">
        {renderContent()}
      </main>

      <BottomNav currentView={currentView} onChangeView={setCurrentView} />
    </div>
  );
}

export default App;