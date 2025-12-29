import React from 'react';

interface AppHeaderProps {
  onHomeClick: () => void;
  showHomeButton?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onHomeClick, showHomeButton = true }) => {
  return (
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
            alt="Dad Advice Logo" 
            className="h-10 w-auto"
          />
          <span className="text-2xl font-display font-bold text-dad-wood-dark">
            Dad Advice
          </span>
        </button>

        {/* Home Button (optional, shown when not on home) */}
        {showHomeButton && (
          <button
            onClick={onHomeClick}
            className="
              px-4 py-2
              text-dad-blue
              font-medium
              rounded-lg
              hover:bg-dad-blue-light
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-dad-blue
            "
          >
            Home
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;

