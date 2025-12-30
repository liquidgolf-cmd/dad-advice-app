import React, { useState, useEffect } from 'react';
import type { DadJoke } from '../utils/dadJokes';

interface DadJokeModalProps {
  joke: DadJoke;
  onClose: () => void;
  autoReveal?: boolean;
}

const DadJokeModal: React.FC<DadJokeModalProps> = ({ joke, onClose, autoReveal = false }) => {
  const [showPunchline, setShowPunchline] = useState(autoReveal);

  useEffect(() => {
    if (autoReveal) {
      const timer = setTimeout(() => setShowPunchline(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [autoReveal]);

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
            onClick={onClose}
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
                className="text-4xl hover:scale-125 transition-transform"
                onClick={() => {}}
                title="That's funny!"
              >
                😂
              </button>
              <button 
                className="text-4xl hover:scale-125 transition-transform"
                onClick={() => {}}
                title="Good one, Dad!"
              >
                👍
              </button>
              <button 
                className="text-4xl hover:scale-125 transition-transform"
                onClick={() => {}}
                title="Oh Dad..."
              >
                🙄
              </button>
              <button 
                className="text-4xl hover:scale-125 transition-transform"
                onClick={() => {}}
                title="That's terrible!"
              >
                🤦
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="
                w-full
                px-6 py-3
                bg-dad-tan text-dad-text
                font-medium
                rounded-xl
                hover:bg-dad-tan-dark
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-dad-blue
              "
            >
              Thanks, Dad! 😄
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

