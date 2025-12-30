import React, { useState, useEffect, useRef } from 'react';
import type { DadJoke } from '../utils/dadJokes';

interface DadJokeModalProps {
  joke: DadJoke;
  onClose: () => void;
  autoReveal?: boolean;
}

const DadJokeModal: React.FC<DadJokeModalProps> = ({ joke, onClose, autoReveal = false }) => {
  const [showPunchline, setShowPunchline] = useState(autoReveal);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoReveal) {
      const timer = setTimeout(() => setShowPunchline(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [autoReveal]);

  useEffect(() => {
    // Cleanup auto-close timer on unmount
    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, []);

  const handleReaction = (reactionType: string) => {
    setSelectedReaction(reactionType);
    
    // Store reaction in localStorage for future analytics
    try {
      const reactions = JSON.parse(localStorage.getItem('joke-reactions') || '{}');
      reactions[joke.id] = reactionType;
      localStorage.setItem('joke-reactions', JSON.stringify(reactions));
    } catch (error) {
      console.error('Failed to save reaction:', error);
    }
    
    // Auto-close after 6 seconds
    autoCloseTimerRef.current = setTimeout(() => {
      onClose();
    }, 6000);
  };

  const handleClose = () => {
    // Clear any pending auto-close timer
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    onClose();
  };

  const handleReveal = () => {
    setShowPunchline(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-dad-tan-light via-white to-dad-beige rounded-3xl shadow-2xl p-8 max-w-lg w-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{joke.emoji}</span>
            <h2 className="text-2xl font-display font-bold text-dad-text">
              Dad Joke Time!
            </h2>
          </div>
          <button
            onClick={handleClose}
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

        {/* Setup */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <p className="text-xl font-medium text-dad-text leading-relaxed">
              {joke.setup}
            </p>
          </div>
        </div>

        {/* Punchline */}
        {!showPunchline ? (
          <button
            onClick={handleReveal}
            className="
              w-full
              px-8 py-4
              bg-dad-blue text-white
              text-lg font-display font-bold
              rounded-2xl
              shadow-lg
              hover:bg-dad-blue-dark
              hover:shadow-xl
              hover:scale-105
              active:scale-[0.98]
              transition-all duration-300
              focus:outline-none focus:ring-4 focus:ring-dad-blue
              animate-pulse-gentle
            "
          >
            Show me the punchline! 🥁
          </button>
        ) : (
          <div className="animate-slide-up">
            <div className="bg-dad-blue rounded-2xl p-6 shadow-lg mb-6">
              <p className="text-xl font-bold text-white leading-relaxed">
                {joke.punchline}
              </p>
            </div>

            {/* Reaction buttons */}
            <div className="flex gap-3 justify-center mb-4">
              <button 
                className={`
                  text-4xl hover:scale-125 transition-transform duration-200
                  ${selectedReaction === 'funny' ? 'scale-150 drop-shadow-lg' : ''}
                `}
                onClick={() => handleReaction('funny')}
                title="That's funny!"
              >
                😂
              </button>
              <button 
                className={`
                  text-4xl hover:scale-125 transition-transform duration-200
                  ${selectedReaction === 'good' ? 'scale-150 drop-shadow-lg' : ''}
                `}
                onClick={() => handleReaction('good')}
                title="Good one, Dad!"
              >
                👍
              </button>
              <button 
                className={`
                  text-4xl hover:scale-125 transition-transform duration-200
                  ${selectedReaction === 'groan' ? 'scale-150 drop-shadow-lg' : ''}
                `}
                onClick={() => handleReaction('groan')}
                title="Oh Dad..."
              >
                🙄
              </button>
              <button 
                className={`
                  text-4xl hover:scale-125 transition-transform duration-200
                  ${selectedReaction === 'terrible' ? 'scale-150 drop-shadow-lg' : ''}
                `}
                onClick={() => handleReaction('terrible')}
                title="That's terrible!"
              >
                🤦
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className={`
                w-full
                px-6 py-3
                font-medium
                rounded-xl
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-dad-blue
                ${selectedReaction 
                  ? 'bg-dad-green text-white hover:bg-green-600' 
                  : 'bg-dad-tan text-dad-text hover:bg-dad-tan-dark'
                }
              `}
            >
              {selectedReaction ? (
                <span className="flex items-center justify-center gap-2 animate-pulse">
                  <span>✨</span>
                  <span>Got it! (Closing...)</span>
                </span>
              ) : (
                'Thanks, Dad! 😄'
              )}
            </button>
          </div>
        )}

        {/* Footer hint */}
        {!showPunchline && (
          <p className="mt-4 text-center text-sm text-dad-text-subtle">
            Click to reveal the punchline
          </p>
        )}
      </div>
    </div>
  );
};

export default DadJokeModal;

