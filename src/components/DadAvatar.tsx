import React from 'react';
import type { DadMood } from '../types';

interface DadAvatarProps {
  mood: DadMood;
  position: 'left' | 'right';
}

const DadAvatar: React.FC<DadAvatarProps> = ({ mood, position }) => {
  const getMoodEmoji = (): string => {
    switch (mood) {
      case 'listening': return '👂';
      case 'thinking': return '🤔';
      case 'explaining': return '👨‍🏫';
      case 'laughing': return '😄';
      case 'concerned': return '😟';
      case 'proud': return '😊';
      case 'silly': return '🤪';
      case 'surprised': return '😲';
      case 'encouraging': return '💪';
      default: return '👨';
    }
  };

  const getMoodAnimation = (): string => {
    switch (mood) {
      case 'thinking': return 'animate-thinking';
      case 'explaining': return 'animate-bounce-gentle';
      case 'laughing': return 'animate-pulse';
      default: return '';
    }
  };

  return (
    <div
      className={`
        flex flex-col items-center
        ${position === 'left' ? 'mr-auto' : 'ml-auto'}
        mb-4
      `}
    >
      <div
        className={`
          relative
          w-24 h-24 md:w-32 md:h-32
          bg-gradient-to-br from-dad-blue-light to-dad-blue
          rounded-full
          flex items-center justify-center
          shadow-xl
          ${getMoodAnimation()}
          transition-all duration-300
        `}
      >
        <div className="text-5xl md:text-6xl">
          {getMoodEmoji()}
        </div>
        
        {/* Mood indicator ring */}
        <div
          className={`
            absolute inset-0
            rounded-full
            border-4
            ${mood === 'concerned' ? 'border-dad-accent-red' : 'border-dad-green'}
            ${mood !== 'idle' ? 'animate-pulse' : 'opacity-0'}
          `}
        />
      </div>

      {/* Dad label */}
      <div className="mt-2 text-center">
        <p className="font-display font-bold text-dad-wood-dark text-lg">
          Dad
        </p>
        {mood !== 'idle' && (
          <p className="text-xs text-gray-500 capitalize animate-fade-in">
            {mood === 'thinking' ? 'Thinking...' : mood}
          </p>
        )}
      </div>
    </div>
  );
};

export default DadAvatar;

