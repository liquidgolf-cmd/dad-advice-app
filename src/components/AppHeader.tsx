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
            alt="Advice from Dad when dad isn't available Logo" 
            className="h-10 w-auto"
          />
          <span className="text-lg md:text-xl font-display font-bold text-dad-wood-dark">
            Advice from Dad when dad isn't available
          </span>
        </button>

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
    </header>
  );
};

export default AppHeader;

