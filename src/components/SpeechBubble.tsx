import React, { useEffect, useRef, useState } from 'react';

interface SpeechBubbleProps {
  message: string;
  audioUrl?: string;
  autoPlay?: boolean;
  onAudioPlay?: () => void;
  onAudioEnd?: () => void;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  message,
  audioUrl,
  autoPlay = false,
  onAudioPlay,
  onAudioEnd,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl && autoPlay && !hasPlayed) {
      playAudio();
      setHasPlayed(true);
    }
  }, [audioUrl, autoPlay, hasPlayed]);

  const playAudio = () => {
    if (!audioRef.current || !audioUrl) return;

    audioRef.current.play();
    setIsPlaying(true);
    onAudioPlay?.();
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    onAudioEnd?.();
  };

  return (
    <div className="speech-bubble animate-slide-up max-w-xl">
      <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
        {message}
      </div>

      {audioUrl && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={isPlaying ? pauseAudio : playAudio}
            className="
              flex items-center gap-2
              px-4 py-2
              bg-dad-blue text-white
              rounded-full
              hover:bg-dad-blue-dark
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-dad-blue
            "
            aria-label={isPlaying ? 'Pause' : 'Play audio'}
          >
            {isPlaying ? (
              <>
                <span className="text-xl">⏸️</span>
                <span className="text-sm font-medium">Pause</span>
              </>
            ) : (
              <>
                <span className="text-xl">🔊</span>
                <span className="text-sm font-medium">
                  {hasPlayed ? 'Replay' : 'Listen'}
                </span>
              </>
            )}
          </button>

          {isPlaying && (
            <div className="flex gap-1 items-center">
              <div className="w-1 h-3 bg-dad-blue animate-thinking rounded"></div>
              <div className="w-1 h-4 bg-dad-blue animate-thinking rounded" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-3 bg-dad-blue animate-thinking rounded" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
        </div>
      )}

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnd}
          preload="auto"
        />
      )}
    </div>
  );
};

export default SpeechBubble;

