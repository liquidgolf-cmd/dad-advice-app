import React, { useState, useEffect, useRef } from 'react';
import type { Topic, Message, DadMood } from '../types';
import { TOPICS, TOPIC_SAFETY_CONTEXT } from '../utils/constants';
import { DAD_GREETING } from '../utils/dadPersonality';
import { sendMessageToDad } from '../services/claudeService';
import { getCachedAudio } from '../services/ttsService';
import { searchYouTubeVideos, type YouTubeVideo } from '../services/videoService';
import { storageService } from '../services/storageService';
import { handleAPIError, isRetryableError } from '../utils/errorHandler';
import { retry } from '../utils/retry';
import { useSwipeGesture } from '../utils/swipeGestures';
import { JokeService, type DadJoke } from '../utils/dadJokes';
import DadAvatar from './DadAvatar';
import SpeechBubble from './SpeechBubble';
import MediaCapture from './MediaCapture';
import VideoSuggestion from './VideoSuggestion';
import ProfessionalReferral from './ProfessionalReferral';
import ErrorMessage from './ErrorMessage';
import LoadingSkeleton from './LoadingSkeleton';
import DadJokeModal from './DadJokeModal';

interface WorkshopEnvironmentProps {
  topic: Topic;
  onChangeTopic: () => void;
  avatarEmoji?: string;
}

const WorkshopEnvironment: React.FC<WorkshopEnvironmentProps> = ({ topic, onChangeTopic, avatarEmoji = '👨🏽' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dadMood, setDadMood] = useState<DadMood>('idle');
  const [currentMediaUrl, setCurrentMediaUrl] = useState<string | null>(null);
  const [videoSuggestions, setVideoSuggestions] = useState<YouTubeVideo[]>([]);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [error, setError] = useState<{ message: string; retryable: boolean } | null>(null);
  const [currentJoke, setCurrentJoke] = useState<DadJoke | null>(null);
  const [taskCompletedCount, setTaskCompletedCount] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const topicConfig = TOPICS.find((t) => t.id === topic)!;

  // Swipe gesture for going back (swipe right)
  const swipeHandlers = useSwipeGesture({
    onSwipeRight: () => {
      onChangeTopic();
    },
    threshold: 100, // Require 100px swipe
  });
  
  // Clear error when starting new message
  useEffect(() => {
    if (inputText || currentMediaUrl) {
      setError(null);
    }
  }, [inputText, currentMediaUrl]);

  useEffect(() => {
    // Load existing session or create greeting
    loadSession();
  }, [topic]);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Save session on messages change
    if (messages.length > 0) {
      storageService.saveSession({
        topic,
        messages,
        startTime: Date.now(),
        lastActivity: Date.now(),
      });
    }
  }, [messages, topic]);

  const loadSession = async () => {
    const session = await storageService.getCurrentSession();
    if (session && session.topic === topic) {
      setMessages(session.messages);
      setShowDisclaimer(false);
    } else {
      // Start with dad's greeting
      const greeting: Message = {
        id: Date.now().toString(),
        role: 'dad',
        content: DAD_GREETING(topic),
        timestamp: Date.now(),
      };
      setMessages([greeting]);
      
      // Generate audio for greeting (optional - fails gracefully)
      try {
        const audioUrl = await getCachedAudio(greeting.content);
        if (audioUrl) {
          setMessages([{ ...greeting, audioUrl }]);
        }
      } catch (error) {
        console.log('TTS not available (expected in local dev)');
        // Continue without audio - that's fine!
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !currentMediaUrl) return;

    setIsLoading(true);
    setError(null);
    setDadMood('listening');
    setVideoSuggestions([]);

    // Store values before clearing state
    const messageText = inputText;
    const mediaUrl = currentMediaUrl;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText || '(sent a photo)',
      timestamp: Date.now(),
      mediaUrl: mediaUrl || undefined,
      mediaType: mediaUrl ? 'image' : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setCurrentMediaUrl(null);

    try {
      setDadMood('thinking');

      // Get response from Dad with retry
      const response = await retry(
        () => sendMessageToDad(
          [...messages, userMessage],
          topic,
          mediaUrl || undefined
        ),
        {
          maxAttempts: 3,
          delay: 1000,
          backoff: 'exponential',
          onRetry: (attempt: number) => {
            console.log(`Retrying API call (attempt ${attempt})`);
          },
        }
      );
      setDadMood(response.mood || 'explaining');

      // Generate audio (optional, don't fail if this errors)
      let audioUrl: string | undefined;
      try {
        audioUrl = await getCachedAudio(response.audioText);
      } catch (error) {
        console.log('TTS not available:', error);
        // Audio is optional, continue without it
      }

      // Search for videos if suggested (optional, don't fail if this errors)
      if (response.videoSuggestion) {
        try {
          const videos = await searchYouTubeVideos(
            response.videoSuggestion,
            messageText
          );
          setVideoSuggestions(videos);
        } catch (error) {
          console.error('Video search failed:', error);
          // Video suggestions are optional
        }
      }

      // Add dad's response
      const dadMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'dad',
        content: response.message,
        timestamp: Date.now(),
        ...(audioUrl ? { audioUrl } : {}), // Only include audioUrl if it exists
        needsProfessional: response.needsProfessional,
        professionalType: response.professionalType,
      };

      setMessages((prev) => [...prev, dadMessage]);
      
      // Show a dad joke after every 3 successful task completions
      const newTaskCount = taskCompletedCount + 1;
      setTaskCompletedCount(newTaskCount);
      
      if (newTaskCount % 3 === 0) {
        // Show joke after a short delay
        setTimeout(() => {
          const joke = JokeService.getRandomJoke(topic);
          setCurrentJoke(joke);
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to get response:', error);
      
      const appError = handleAPIError(error);
      setError({
        message: appError.message,
        retryable: isRetryableError(error),
      });
      
      setDadMood('concerned');
      
      // Also add a friendly error message to the chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'dad',
        content: `${appError.message} *adjusts glasses* Want to try again?`,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setDadMood('idle'), 2000);
    }
  };


  const handleMediaCaptured = (dataUrl: string, type: 'image' | 'video') => {
    setCurrentMediaUrl(dataUrl);
    // Store in IndexedDB
    storageService.saveMedia(Date.now().toString(), dataUrl, type);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get background class name for current environment
  const getBackgroundClass = () => {
    const envMap: Record<string, string> = {
      'workshop': 'bg-workshop',
      'garage': 'bg-garage',
      'study': 'bg-study',
      'living-room': 'bg-living-room',
      'patio': 'bg-patio',
      'office': 'bg-office',
    };
    return envMap[topicConfig.environment] || 'bg-office';
  };

  return (
    <>
      {/* Themed Background Image - Outside main container to avoid z-index issues */}
      <div 
        className={`environment-background ${getBackgroundClass()}`}
        role="img"
        aria-label={`${topicConfig.title} background`}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-dad-warm-light/10 to-dad-warm/10 flex flex-col relative">
        {/* Header */}
      <div className="bg-dad-wood text-white px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{topicConfig.emoji}</span>
            <div>
              <h2 className="font-display font-bold text-xl">
                {topicConfig.title}
              </h2>
              <p className="text-sm text-dad-warm-light">
                {TOPIC_SAFETY_CONTEXT[topic]}
              </p>
            </div>
          </div>
          <button
            onClick={onChangeTopic}
            className="
              px-4 py-2
              min-h-[44px]
              min-w-[80px]
              bg-dad-wood-light text-dad-wood-dark
              rounded-full
              hover:bg-dad-warm
              active:bg-dad-warm
              touch-manipulation
              transition-colors
              text-sm font-medium
              focus:outline-none focus:ring-2 focus:ring-white
            "
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      {showDisclaimer && (
        <div className="bg-dad-blue-light px-4 py-3 shadow-md animate-slide-up">
          <div className="max-w-4xl mx-auto flex items-start gap-3">
            <span className="text-2xl">👋</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <strong>Hey there!</strong> I'm here to help with common problems and tough decisions, 
                but I'm just a dad - not a licensed professional. I'll always let you know when 
                something needs an expert. Your safety and wellbeing come first!
              </p>
            </div>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto px-4 py-6"
        ref={messagesContainerRef}
        {...swipeHandlers}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div key={message.id}>
              {message.role === 'dad' ? (
                <div className="flex flex-col items-start">
                  <DadAvatar mood={dadMood} position={topicConfig.dadPosition} avatarEmoji={avatarEmoji} />
                  <SpeechBubble
                    message={message.content}
                    audioUrl={message.audioUrl}
                    autoPlay={index === messages.length - 1 && message.role === 'dad'}
                    onAudioPlay={() => setDadMood('explaining')}
                    onAudioEnd={() => setDadMood('idle')}
                  />
                  {message.needsProfessional && message.professionalType && (
                    <ProfessionalReferral professionalType={message.professionalType} />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-end">
                  {message.mediaUrl && (
                    <img
                      src={message.mediaUrl}
                      alt="User uploaded"
                      className="max-w-sm rounded-2xl shadow-md mb-2"
                    />
                  )}
                  <div className="bg-dad-blue text-white rounded-2xl px-6 py-4 max-w-xl shadow-md">
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          ))}

          {videoSuggestions.length > 0 && (
            <VideoSuggestion videos={videoSuggestions} />
          )}

          {isLoading && (
            <div className="flex flex-col items-start">
              <DadAvatar mood={dadMood} position={topicConfig.dadPosition} avatarEmoji={avatarEmoji} />
              <LoadingSkeleton type="bubble" />
            </div>
          )}

          {error && (
            <div className="flex flex-col items-start">
              <ErrorMessage
                message={error.message}
                retryable={false}
                className="max-w-xl"
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom on mobile */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 shadow-lg safe-area-bottom">
        <div className="max-w-4xl mx-auto">
          {currentMediaUrl && (
            <div className="mb-3 relative inline-block">
              <img
                src={currentMediaUrl}
                alt="Preview"
                className="h-20 rounded-lg shadow-md"
              />
              <button
                onClick={() => setCurrentMediaUrl(null)}
                className="
                  absolute -top-2 -right-2
                  w-8 h-8 rounded-full
                  bg-red-500 text-white
                  flex items-center justify-center
                  text-sm font-bold
                  hover:bg-red-600 active:bg-red-700
                  shadow-md
                  touch-manipulation
                "
                aria-label="Remove image"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex gap-3 items-end">
            <MediaCapture
              onMediaCaptured={handleMediaCaptured}
              disabled={isLoading}
            />

            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isLoading ? 'Dad is thinking...' : 'Ask Dad anything...'}
                disabled={isLoading}
                rows={1}
                className="
                  w-full px-4 py-3
                  min-h-[44px]
                  border-2 border-gray-300
                  rounded-2xl
                  focus:outline-none focus:border-dad-blue
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                  resize-none
                  font-sans
                  text-base
                  leading-relaxed
                "
                style={{ fontSize: '16px' }} // Prevent zoom on iOS
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={isLoading || (!inputText.trim() && !currentMediaUrl)}
              className="
                px-6 py-3
                min-h-[44px]
                min-w-[80px]
                bg-dad-blue text-white
                rounded-full
                hover:bg-dad-blue-dark
                active:bg-dad-blue-dark
                disabled:bg-gray-300 disabled:cursor-not-allowed
                transition-colors
                font-medium
                shadow-md hover:shadow-lg
                touch-manipulation
                flex items-center justify-center
              "
              aria-label="Send message"
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>

      {/* Dad Joke Modal - shown after task completions */}
      {currentJoke && (
        <DadJokeModal 
          joke={currentJoke}
          onClose={() => setCurrentJoke(null)}
          autoReveal={true}
        />
      )}
      </div>
    </>
  );
};

export default WorkshopEnvironment;

