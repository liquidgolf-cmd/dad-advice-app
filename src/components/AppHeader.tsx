import React, { useState } from 'react';
import AvatarSelector from './AvatarSelector';
import { getAvatarEmoji } from '../utils/avatarOptions';

interface AppHeaderProps {
  onHomeClick: () => void;
  showHomeButton?: boolean;
  selectedAvatarId?: string;
  onAvatarChange?: (avatarId: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  onHomeClick, 
  showHomeButton = true,
  selectedAvatarId,
  onAvatarChange,
}) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleAvatarSelect = (avatarId: string) => {
    onAvatarChange?.(avatarId);
    setShowAvatarModal(false);
  };

  return (
    <>
      <header className="w-full bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo/Title */}
          <button
            onClick={onHomeClick}
            className="
              flex items-center gap-3
              focus:outline-none focus:ring-2 focus:ring-dad-blue rounded-lg
              transition-opacity hover:opacity-80
            "
          >
            <img 
              src="/logo.png" 
              alt="Advice from Dad when dad isn't available Logo" 
              className="h-10 w-auto"
            />
            <span className="text-lg md:text-xl font-display font-bold text-dad-wood-dark">
              Advice from Dad when dad isn't available
            </span>
          </button>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Settings button with avatar preview */}
            {selectedAvatarId && (
              <button
                onClick={() => setShowAvatarModal(true)}
                className="
                  px-3 py-2
                  min-h-[44px]
                  flex items-center gap-2
                  text-dad-blue
                  font-medium
                  rounded-lg
                  hover:bg-dad-blue-light
                  active:bg-dad-blue-light
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-dad-blue
                  touch-manipulation
                "
                title="Change Dad Avatar"
              >
                <span className="text-2xl">{getAvatarEmoji(selectedAvatarId)}</span>
                <span className="hidden sm:inline">⚙️</span>
              </button>
            )}

            {/* Home Button (optional, shown when not on home) */}
            {showHomeButton && (
              <button
                onClick={onHomeClick}
                className="
                  px-4 py-2
                  min-h-[44px]
                  min-w-[80px]
                  text-dad-blue
                  font-medium
                  rounded-lg
                  hover:bg-dad-blue-light
                  active:bg-dad-blue-light
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-dad-blue
                  touch-manipulation
                "
              >
                Home
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-dad-text">
                Change Your Dad
              </h2>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="
                  w-10 h-10 rounded-full
                  bg-gray-200 text-gray-600
                  hover:bg-gray-300
                  transition-colors
                  text-xl font-bold
                  focus:outline-none focus:ring-2 focus:ring-dad-blue
                "
              >
                ✕
              </button>
            </div>

            <AvatarSelector 
              onSelect={handleAvatarSelect}
              currentAvatarId={selectedAvatarId}
              showTitle={false}
            />

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAvatarModal(false)}
                className="
                  px-8 py-3
                  min-h-[48px]
                  bg-dad-blue text-white
                  rounded-full
                  font-medium
                  hover:bg-dad-blue-dark
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-dad-blue
                "
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;

