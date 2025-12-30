import React, { useState } from 'react';
import AvatarSelector from './AvatarSelector';
import { DEFAULT_AVATAR } from '../utils/avatarOptions';

interface AvatarSelectionScreenProps {
  onComplete: (avatarId: string) => void;
}

const AvatarSelectionScreen: React.FC<AvatarSelectionScreenProps> = ({ onComplete }) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState(DEFAULT_AVATAR.id);

  const handleContinue = () => {
    onComplete(selectedAvatarId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dad-tan-light via-dad-beige to-dad-sage flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-5xl animate-slide-up">
        <AvatarSelector 
          onSelect={setSelectedAvatarId}
          currentAvatarId={selectedAvatarId}
          showTitle={true}
        />

        <div className="text-center mt-12">
          <button
            onClick={handleContinue}
            className="
              px-12 py-4
              min-h-[56px]
              bg-dad-blue text-white
              text-xl font-display font-bold
              rounded-full
              shadow-xl
              hover:bg-dad-blue-dark
              hover:shadow-2xl
              hover:scale-105
              active:scale-[0.98]
              transition-all duration-300
              focus:outline-none focus:ring-4 focus:ring-dad-blue
              animate-pulse-gentle
              touch-manipulation
            "
          >
            Continue to Dad's Workshop
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-dad-text-subtle">
          Don't worry, you can change this later in settings
        </p>
      </div>
    </div>
  );
};

export default AvatarSelectionScreen;

