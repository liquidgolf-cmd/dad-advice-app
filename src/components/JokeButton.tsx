import React from 'react';

interface JokeButtonProps {
  onClick: () => void;
  variant?: 'floating' | 'inline';
}

const JokeButton: React.FC<JokeButtonProps> = ({ onClick, variant = 'inline' }) => {
  if (variant === 'floating') {
    return (
      <button
        onClick={onClick}
        className="
          fixed bottom-6 right-6
          w-16 h-16
          bg-gradient-to-br from-dad-accent-orange to-dad-accent-red
          text-white text-2xl
          rounded-full
          shadow-2xl
          hover:scale-110
          active:scale-95
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-dad-accent-orange
          z-40
          animate-bounce-gentle
        "
        title="Tell me a dad joke!"
      >
        😄
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="
        px-6 py-3
        min-h-[48px]
        bg-gradient-to-r from-dad-accent-orange to-dad-accent-red
        text-white
        font-display font-bold
        rounded-full
        shadow-lg
        hover:shadow-xl
        hover:scale-105
        active:scale-95
        transition-all duration-300
        focus:outline-none focus:ring-4 focus:ring-dad-accent-orange
        flex items-center gap-2
        touch-manipulation
      "
    >
      <span className="text-xl">😄</span>
      <span>Tell me a joke, Dad!</span>
    </button>
  );
};

export default JokeButton;

