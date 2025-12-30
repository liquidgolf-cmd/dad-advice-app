import React from 'react';
import type { DailyTip } from '../utils/dailyTips';
import type { Topic } from '../types';

interface DailyTipModalProps {
  tip: DailyTip;
  onClose: () => void;
  onTakeAction?: (topic: Topic) => void;
}

const DailyTipModal: React.FC<DailyTipModalProps> = ({ tip, onClose, onTakeAction }) => {
  const handleActionClick = () => {
    if (tip.actionTopic && onTakeAction) {
      onTakeAction(tip.actionTopic);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-dad-warm-light via-white to-dad-beige rounded-3xl shadow-2xl p-8 max-w-lg w-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{tip.emoji}</span>
            <div>
              <p className="text-sm font-medium text-dad-text-subtle uppercase tracking-wide">
                Dad's Daily Tip
              </p>
              <h2 className="text-2xl font-display font-bold text-dad-text">
                {tip.title}
              </h2>
            </div>
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
              flex-shrink-0
            "
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <p className="text-lg text-dad-text leading-relaxed">
              {tip.content}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {tip.actionText && tip.actionTopic && (
            <button
              onClick={handleActionClick}
              className="
                w-full
                px-6 py-4
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
              "
            >
              {tip.actionText} →
            </button>
          )}

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
            Got it, thanks Dad! 👍
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-4 text-center text-sm text-dad-text-subtle">
          💡 I'll share another tip tomorrow!
        </p>
      </div>
    </div>
  );
};

export default DailyTipModal;

