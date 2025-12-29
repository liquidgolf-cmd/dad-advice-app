import React from 'react';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dad-warm-light via-dad-blue-light to-dad-green-light flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="text-center max-w-2xl animate-slide-up">
        {/* App Logo/Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-dad-wood-dark mb-4">
            Dad Advice
          </h1>
          <div className="text-7xl md:text-8xl mb-6">
            👨‍🔧
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-12 space-y-4">
          <p className="text-2xl md:text-3xl font-display text-dad-wood-dark mb-4">
            Hey there! 👋
          </p>
          <p className="text-xl md:text-2xl text-dad-wood leading-relaxed">
            I'm Dad, and I'm here to help with whatever you need.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Home repairs, car troubles, tech questions, life advice... 
            <br />
            Let's figure it out together.
          </p>
        </div>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          className="
            px-12 py-4
            bg-dad-blue text-white
            text-xl font-display font-bold
            rounded-full
            shadow-xl
            hover:bg-dad-blue-dark
            hover:shadow-2xl
            hover:scale-105
            transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-dad-blue
            animate-pulse-gentle
          "
        >
          Enter the Workshop
        </button>

        {/* Subtle tagline */}
        <p className="mt-8 text-sm text-gray-500">
          Because sometimes you just need Dad's help
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;

