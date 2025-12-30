import React, { useEffect, useState } from 'react';
import type { DadMood } from '../types';

interface DadAvatarProps {
  mood: DadMood;
  position: 'left' | 'right';
  avatarEmoji?: string; // Custom avatar emoji
}

const DadAvatar: React.FC<DadAvatarProps> = ({ mood, position, avatarEmoji = '👨🏽' }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger entrance animation when mood changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [mood]);

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
      case 'idle':
      default: return avatarEmoji; // Use custom avatar for idle state
    }
  };

  const getMoodAnimation = (): string => {
    switch (mood) {
      case 'idle': return 'animate-avatar-idle';
      case 'listening': return 'animate-avatar-listening';
      case 'thinking': return 'animate-avatar-thinking';
      case 'explaining': return 'animate-avatar-explaining';
      case 'laughing': return 'animate-avatar-laughing';
      case 'concerned': return 'animate-avatar-concerned';
      case 'proud': return 'animate-avatar-proud';
      case 'silly': return 'animate-avatar-silly';
      case 'surprised': return isAnimating ? 'animate-avatar-surprised' : 'animate-avatar-idle';
      case 'encouraging': return 'animate-avatar-encouraging';
      default: return 'animate-avatar-idle';
    }
  };

  const getRingAnimation = (): string => {
    if (mood === 'concerned') return 'animate-ring-concerned';
    if (mood !== 'idle') return 'animate-ring-pulse';
    return '';
  };

  const getRingColor = (): string => {
    switch (mood) {
      case 'concerned': return 'border-dad-accent-red';
      case 'laughing':
      case 'proud':
      case 'encouraging': return 'border-dad-green';
      case 'silly': return 'border-dad-accent-orange';
      default: return 'border-dad-blue';
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
          transition-all duration-500 ease-out
          transform-gpu
        `}
      >
        {/* Emoji container with smooth transitions */}
        <div 
          className={`
            text-5xl md:text-6xl
            transition-all duration-300 ease-out
            ${mood === 'surprised' && isAnimating ? 'scale-110' : 'scale-100'}
            ${mood === 'laughing' ? 'animate-avatar-gesture' : ''}
          `}
        >
          {getMoodEmoji()}
        </div>
        
        {/* Enhanced mood indicator ring */}
        <div
          className={`
            absolute inset-0
            rounded-full
            border-4
            ${getRingColor()}
            ${mood !== 'idle' ? getRingAnimation() : 'opacity-0'}
            transition-all duration-500
            ${mood !== 'idle' ? 'opacity-100' : 'opacity-0'}
          `}
        />
        
        {/* Additional glow effect for active moods */}
        {mood !== 'idle' && mood !== 'concerned' && (
          <div
            className={`
              absolute inset-0
              rounded-full
              ${mood === 'laughing' || mood === 'proud' || mood === 'encouraging' 
                ? 'bg-dad-green' 
                : 'bg-dad-blue'
              }
              opacity-20
              ${getRingAnimation()}
              blur-xl
              -z-10
            `}
          />
        )}
      </div>

      {/* Dad label with smooth transitions */}
      <div className="mt-2 text-center">
        <p className="font-display font-bold text-dad-wood-dark text-lg transition-all duration-300">
          Dad
        </p>
        {mood !== 'idle' && (
          <p 
            className={`
              text-xs text-gray-500 capitalize
              transition-all duration-300 ease-out
              ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
            `}
          >
            {mood === 'thinking' ? 'Thinking...' : 
             mood === 'listening' ? 'Listening...' :
             mood === 'explaining' ? 'Explaining...' :
             mood === 'encouraging' ? 'You\'ve got this!' :
             mood}
          </p>
        )}
      </div>
    </div>
  );
};

export default DadAvatar;

