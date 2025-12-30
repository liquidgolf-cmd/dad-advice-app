import { useState, useEffect } from 'react';
import type { Topic, ConversationSession } from './types';
import SplashScreen from './components/SplashScreen';
import AvatarSelectionScreen from './components/AvatarSelectionScreen';
import MainHub from './components/MainHub';
import AppHeader from './components/AppHeader';
import WorkshopEnvironment from './components/WorkshopEnvironment';
import DailyTipModal from './components/DailyTipModal';
import { storageService } from './services/storageService';
import { DEFAULT_AVATAR, getAvatarEmoji } from './utils/avatarOptions';
import { DailyTipService, type DailyTip } from './utils/dailyTips';

type AppView = 'splash' | 'avatar-selection' | 'hub' | 'workshop';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('splash');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(DEFAULT_AVATAR.id);
  const [currentTip, setCurrentTip] = useState<DailyTip | null>(null);

  useEffect(() => {
    // Check if splash has been shown before
    const hasSeenSplash = localStorage.getItem('dad-advice-has-seen-splash') === 'true';
    const savedAvatar = storageService.getSelectedAvatar();
    
    if (savedAvatar) {
      setSelectedAvatarId(savedAvatar);
    }
    
    if (hasSeenSplash && savedAvatar) {
      // Skip splash and avatar selection if both have been completed
      setCurrentView('hub');
      
      // Check if we should show a daily tip (after splash/avatar selection)
      setTimeout(() => {
        if (DailyTipService.shouldShowTip()) {
          const tip = DailyTipService.getRandomTip();
          setCurrentTip(tip);
        }
      }, 1500); // Small delay so user sees hub first
    } else if (hasSeenSplash && !savedAvatar) {
      // Skip splash but show avatar selection
      setCurrentView('avatar-selection');
    }
  }, []);

  const handleEnterFromSplash = () => {
    localStorage.setItem('dad-advice-has-seen-splash', 'true');
    // Check if avatar has been selected
    if (storageService.hasSelectedAvatar()) {
      setCurrentView('hub');
    } else {
      setCurrentView('avatar-selection');
    }
  };

  const handleAvatarSelected = (avatarId: string) => {
    setSelectedAvatarId(avatarId);
    storageService.setSelectedAvatar(avatarId);
    setCurrentView('hub');
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('workshop');
  };

  const handleSelectRecentSession = (session: ConversationSession) => {
    setSelectedTopic(session.topic);
    setCurrentView('workshop');
  };

  const handleGoHome = () => {
    setSelectedTopic(null);
    setCurrentView('hub');
  };

  const handleChangeTopic = () => {
    setSelectedTopic(null);
    setCurrentView('hub');
  };

  const handleTipAction = (topic: Topic) => {
    // User clicked action button in tip - go to that topic
    setSelectedTopic(topic);
    setCurrentView('workshop');
  };

  return (
    <div className="App">
      {currentView === 'splash' && (
        <SplashScreen onEnter={handleEnterFromSplash} />
      )}

      {currentView === 'avatar-selection' && (
        <AvatarSelectionScreen onComplete={handleAvatarSelected} />
      )}
      
      {currentView === 'hub' && (
        <>
          <AppHeader 
            onHomeClick={handleGoHome} 
            showHomeButton={false}
            selectedAvatarId={selectedAvatarId}
            onAvatarChange={handleAvatarSelected}
          />
          <MainHub
            onSelectTopic={handleSelectTopic}
            onSelectRecentSession={handleSelectRecentSession}
          />
        </>
      )}
      
      {currentView === 'workshop' && selectedTopic && (
        <>
          <AppHeader 
            onHomeClick={handleGoHome} 
            showHomeButton={true}
            selectedAvatarId={selectedAvatarId}
            onAvatarChange={handleAvatarSelected}
          />
          <WorkshopEnvironment
            topic={selectedTopic}
            onChangeTopic={handleChangeTopic}
            avatarEmoji={getAvatarEmoji(selectedAvatarId)}
          />
        </>
      )}

      {/* Daily Tip Modal - shown after 24h */}
      {currentTip && (
        <DailyTipModal
          tip={currentTip}
          onClose={() => setCurrentTip(null)}
          onTakeAction={handleTipAction}
        />
      )}
    </div>
  );
}

export default App;
