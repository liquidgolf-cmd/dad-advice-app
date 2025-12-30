import React, { useEffect, useState } from 'react';
import type { Topic, ConversationSession } from '../types';
import { TOPICS } from '../utils/constants';
import { storageService } from '../services/storageService';
import { JokeService, type DadJoke } from '../utils/dadJokes';
import DadJokeModal from './DadJokeModal';

interface MainHubProps {
  onSelectTopic: (topic: Topic) => void;
  onSelectRecentSession?: (session: ConversationSession) => void;
}

const MainHub: React.FC<MainHubProps> = ({ onSelectTopic, onSelectRecentSession }) => {
  const [recentSessions, setRecentSessions] = useState<ConversationSession[]>([]);
  const [hoveredTopic, setHoveredTopic] = useState<Topic | null>(null);
  const [showRecentMenu, setShowRecentMenu] = useState(false);
  const [currentJoke, setCurrentJoke] = useState<DadJoke | null>(null);

  useEffect(() => {
    loadRecentSessions();
    
    // Show a random joke occasionally (20% chance) when hub loads
    if (Math.random() < 0.2) {
      setTimeout(() => {
        showRandomJoke();
      }, 1500);
    }
  }, []);

  const showRandomJoke = () => {
    const joke = JokeService.getRandomJoke();
    setCurrentJoke(joke);
  };

  const loadRecentSessions = async () => {
    try {
      const sessions = await storageService.getAllSessions();
      // Limit to 5 most recent
      setRecentSessions(sessions.slice(0, 5));
    } catch (error) {
      console.error('Failed to load recent sessions:', error);
    }
  };

  const getTopicTitle = (topicId: Topic): string => {
    return TOPICS.find(t => t.id === topicId)?.title || topicId;
  };

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-dad-warm-light/30">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section - Minimal */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-xl md:text-2xl font-display font-semibold text-dad-wood-dark">
            What can I help you with?
          </h1>
        </div>

        {/* Recent Conversations Menu Button */}
        {recentSessions.length > 0 && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => setShowRecentMenu(!showRecentMenu)}
              className="
                px-5 py-2.5
                min-h-[44px]
                bg-white text-gray-700
                rounded-lg shadow-sm
                hover:shadow-md hover:bg-gray-50
                active:scale-[0.98]
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-dad-blue
                flex items-center gap-2
                font-medium text-sm
                touch-manipulation
              "
            >
              <span>Recent ({recentSessions.length})</span>
              <span className={`transition-transform duration-200 text-xs ${showRecentMenu ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          </div>
        )}

        {/* Recent Conversations Dropdown Menu */}
        {showRecentMenu && recentSessions.length > 0 && (
          <div className="mb-6 max-w-2xl mx-auto animate-slide-up">
            <div className="bg-white rounded-xl shadow-lg p-4 space-y-2">
              {recentSessions.map((session) => {
                const topicConfig = TOPICS.find(t => t.id === session.topic);
                return (
                  <button
                    key={session.startTime}
                    onClick={() => {
                      onSelectRecentSession?.(session);
                      setShowRecentMenu(false);
                    }}
                    className="
                      w-full
                      min-h-[56px]
                      bg-gray-50 rounded-lg
                      p-3 text-left
                      hover:bg-dad-blue-light/30 hover:shadow-sm
                      active:bg-dad-blue-light/30 active:scale-[0.98]
                      transition-all duration-150
                      focus:outline-none focus:ring-2 focus:ring-dad-blue
                      flex items-center gap-3
                      touch-manipulation
                    "
                  >
                    <div className="text-2xl">
                      {topicConfig?.emoji || '💬'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-dad-wood-dark text-sm mb-0.5">
                        {topicConfig?.title || getTopicTitle(session.topic)}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {session.messages.length} messages • {formatTimeAgo(session.lastActivity)}
                      </p>
                    </div>
                    <span className="text-gray-300 text-sm">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Topic Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              onMouseEnter={() => setHoveredTopic(topic.id)}
              onMouseLeave={() => setHoveredTopic(null)}
              className={`
                relative overflow-hidden
                bg-white rounded-xl shadow-sm
                p-5 text-left
                transition-all duration-200 ease-out
                hover:shadow-md hover:scale-[1.02]
                active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-dad-blue
                touch-manipulation
                min-h-[120px]
                ${hoveredTopic === topic.id ? 'transform scale-[1.02]' : ''}
              `}
            >
              <div className="text-3xl mb-3 transition-transform duration-300 ease-out hover:-translate-y-2">
                {topic.emoji}
              </div>
              <h3 className="text-lg font-display font-semibold text-dad-wood-dark mb-1.5">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-600 leading-snug">
                {topic.description}
              </p>
              
              {/* Subtle hover accent */}
              <div 
                className={`
                  absolute bottom-0 left-0 right-0 h-0.5
                  bg-gradient-to-r from-dad-blue to-dad-green
                  transition-all duration-200
                  ${hoveredTopic === topic.id ? 'opacity-100' : 'opacity-0'}
                `}
              />
            </button>
          ))}
        </div>

        {/* Minimal Safety Note */}
        <div className="mt-8 text-center text-xs text-gray-400 max-w-xl mx-auto">
          <p>
            I'll always let you know when something needs a professional. Your safety comes first.
          </p>
        </div>
      </div>

      {/* Dad Joke Modal */}
      {currentJoke && (
        <DadJokeModal 
          joke={currentJoke}
          onClose={() => setCurrentJoke(null)}
          autoReveal={false}
        />
      )}
    </div>
  );
};

export default MainHub;

