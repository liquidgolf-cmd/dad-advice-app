import React from 'react';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="text-center max-w-2xl animate-slide-up">
        {/* App Logo/Title */}
        <div className="mb-8">
          <div className="flex flex-col items-center mb-6">
            <img 
              src="/logo.png" 
              alt="Advice from Dad when dad isn't available Logo" 
              className="h-32 md:h-40 w-auto mb-4 animate-fade-in drop-shadow-2xl"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-teal-300 leading-tight">
              Advice from Dad when dad isn't available
            </h1>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-12 space-y-4">
          <p className="text-2xl md:text-3xl font-display text-teal-200 mb-4">
            Hey there! 👋
          </p>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            I'm Dad, and I'm here to help with whatever you need.
          </p>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
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
                min-h-[56px]
                bg-gradient-to-r from-orange-500 to-orange-600 text-white
                text-xl font-display font-bold
                rounded-full
                shadow-xl shadow-orange-500/30
                hover:from-orange-600 hover:to-orange-700
                hover:shadow-2xl hover:shadow-orange-500/40
                hover:scale-105
                active:scale-[0.98]
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-orange-400
                animate-pulse-gentle
                touch-manipulation
              "
            >
          Enter the Workshop
        </button>

        {/* Subtle tagline */}
        <p className="mt-8 text-sm text-slate-500">
          Because sometimes you just need Dad's help
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;

