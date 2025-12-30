import React, { useState } from 'react';
import { AVATAR_OPTIONS, DEFAULT_AVATAR, type AvatarOption } from '../utils/avatarOptions';

interface AvatarSelectorProps {
  onSelect: (avatarId: string) => void;
  currentAvatarId?: string;
  showTitle?: boolean;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
  onSelect, 
  currentAvatarId = DEFAULT_AVATAR.id,
  showTitle = true,
}) => {
  const [selectedId, setSelectedId] = useState(currentAvatarId);

  const handleSelect = (avatar: AvatarOption) => {
    setSelectedId(avatar.id);
    onSelect(avatar.id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dad-text mb-3">
            Choose Your Dad
          </h2>
          <p className="text-lg text-dad-text-light">
            Pick the dad that feels right to you
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
        {AVATAR_OPTIONS.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => handleSelect(avatar)}
            className={`
              flex flex-col items-center justify-center
              p-6 rounded-2xl
              min-h-[140px]
              transition-all duration-300
              touch-manipulation
              ${
                selectedId === avatar.id
                  ? 'bg-dad-blue text-white shadow-xl scale-105 ring-4 ring-dad-blue ring-offset-2'
                  : 'bg-white text-dad-text hover:bg-dad-tan-light hover:shadow-lg hover:scale-105'
              }
            `}
          >
            <div className="text-6xl mb-3 transition-transform duration-300">
              {avatar.emoji}
            </div>
            <p className={`
              text-sm font-medium text-center leading-tight
              ${selectedId === avatar.id ? 'text-white' : 'text-dad-text'}
            `}>
              {avatar.label}
            </p>
            {selectedId === avatar.id && (
              <div className="mt-2 text-xl">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;

