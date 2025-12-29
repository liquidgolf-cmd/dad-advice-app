import React from 'react';

interface ProfessionalReferralProps {
  professionalType: string;
}

const ProfessionalReferral: React.FC<ProfessionalReferralProps> = ({ professionalType }) => {
  const getProfessionalInfo = () => {
    const professionals: Record<string, { emoji: string; title: string; tip: string }> = {
      electrician: {
        emoji: '⚡',
        title: 'Licensed Electrician',
        tip: 'Look for licensed professionals with good reviews. Safety first!',
      },
      plumber: {
        emoji: '🔧',
        title: 'Licensed Plumber',
        tip: 'Check for proper licensing and insurance. Get quotes from 2-3 pros.',
      },
      mechanic: {
        emoji: '🚗',
        title: 'Certified Mechanic',
        tip: 'ASE certified mechanics are a good bet. Ask about warranties on work.',
      },
      therapist: {
        emoji: '💙',
        title: 'Licensed Therapist/Counselor',
        tip: 'Finding the right therapist may take time. It\'s worth it.',
      },
      lawyer: {
        emoji: '⚖️',
        title: 'Attorney',
        tip: 'Many offer free consultations. State bar associations can help you find one.',
      },
      default: {
        emoji: '👨‍⚕️',
        title: 'Licensed Professional',
        tip: 'Make sure they\'re licensed and insured for your peace of mind.',
      },
    };

    return professionals[professionalType] || professionals.default;
  };

  const info = getProfessionalInfo();

  return (
    <div className="my-4 animate-slide-up">
      <div className="bg-dad-accent-red bg-opacity-10 border-2 border-dad-accent-red rounded-2xl p-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0">
            {info.emoji}
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-dad-wood-dark text-xl mb-2">
              Time to Call in a Pro
            </h3>
            <p className="text-gray-700 mb-3">
              Dad recommends finding a <strong>{info.title}</strong>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              💡 {info.tip}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/search?q=find+${professionalType}+near+me`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-4 py-2
                  bg-dad-blue text-white
                  rounded-full
                  hover:bg-dad-blue-dark
                  transition-colors
                  text-sm font-medium
                  inline-flex items-center gap-2
                "
              >
                <span>🔍</span>
                <span>Find Local {info.title}s</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalReferral;

