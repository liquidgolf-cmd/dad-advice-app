import React, { useState, useEffect, useRef } from 'react';
import type { Topic, Message, DadMood } from '../types';
import { TOPICS, TOPIC_SAFETY_CONTEXT } from '../utils/constants';
import { DAD_GREETING } from '../utils/dadPersonality';
import { sendMessageToDad } from '../services/claudeService';
import { getCachedAudio } from '../services/ttsService';
import { searchYouTubeVideos, type YouTubeVideo } from '../services/videoService';
import { storageService } from '../services/storageService';
import DadAvatar from './DadAvatar';
import SpeechBubble from './SpeechBubble';
import MediaCapture from './MediaCapture';
import VideoSuggestion from './VideoSuggestion';
import ProfessionalReferral from './ProfessionalReferral';

interface WorkshopEnvironmentProps {
  topic: Topic;
  onChangeTopic: () => void;
}

const WorkshopEnvironment: React.FC<WorkshopEnvironmentProps> = ({ topic, onChangeTopic }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dadMood, setDadMood] = useState<DadMood>('idle');
  const [currentMediaUrl, setCurrentMediaUrl] = useState<string | null>(null);
  const [videoSuggestions, setVideoSuggestions] = useState<YouTubeVideo[]>([]);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const topicConfig = TOPICS.find((t) => t.id === topic)!;

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
        setMessages([{ ...greeting, audioUrl }]);
      } catch (error) {
        console.log('TTS not available (expected in local dev)');
        // Continue without audio - that's fine!
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !currentMediaUrl) return;

    setIsLoading(true);
    setDadMood('listening');
    setVideoSuggestions([]);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText || '(sent a photo)',
      timestamp: Date.now(),
      mediaUrl: currentMediaUrl || undefined,
      mediaType: currentMediaUrl ? 'image' : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setCurrentMediaUrl(null);

    try {
      setDadMood('thinking');

      // Get response from Dad
      const response = await sendMessageToDad(
        [...messages, userMessage],
        topic,
        currentMediaUrl || undefined
      );

      setDadMood(response.mood || 'explaining');

      // Generate audio
      let audioUrl: string | undefined;
      try {
        audioUrl = await getCachedAudio(response.audioText);
      } catch (error) {
        console.log('TTS not available (expected in local dev)');
        // Audio is optional
      }

      // Search for videos if suggested
      if (response.videoSuggestion) {
        try {
          const videos = await searchYouTubeVideos(response.videoSuggestion);
          setVideoSuggestions(videos);
        } catch (error) {
          console.error('Video search failed:', error);
        }
      }

      // Add dad's response
      const dadMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'dad',
        content: response.message,
        timestamp: Date.now(),
        audioUrl,
        needsProfessional: response.needsProfessional,
        professionalType: response.professionalType,
      };

      setMessages((prev) => [...prev, dadMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'dad',
        content: "Oops! Dad's having some technical difficulties. Can you try that again? *adjusts glasses* Technology, am I right?",
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      setDadMood('silly');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-dad-warm-light to-dad-warm flex flex-col">
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
              bg-dad-wood-light text-dad-wood-dark
              rounded-full
              hover:bg-dad-warm
              transition-colors
              text-sm font-medium
            "
          >
            Change Topic
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
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              {message.role === 'dad' ? (
                <div className="flex flex-col items-start">
                  <DadAvatar mood={dadMood} position={topicConfig.dadPosition} />
                  <SpeechBubble
                    message={message.content}
                    audioUrl={message.audioUrl}
                    autoPlay={true}
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
              <DadAvatar mood={dadMood} position={topicConfig.dadPosition} />
              <div className="speech-bubble animate-pulse">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
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
                  w-6 h-6 rounded-full
                  bg-red-500 text-white
                  flex items-center justify-center
                  text-xs
                  hover:bg-red-600
                "
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
                placeholder="Ask Dad anything..."
                disabled={isLoading}
                rows={1}
                className="
                  w-full px-4 py-3
                  border-2 border-gray-300
                  rounded-2xl
                  focus:outline-none focus:border-dad-blue
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                  resize-none
                  font-sans
                "
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={isLoading || (!inputText.trim() && !currentMediaUrl)}
              className="
                px-6 py-3
                bg-dad-blue text-white
                rounded-full
                hover:bg-dad-blue-dark
                disabled:bg-gray-300 disabled:cursor-not-allowed
                transition-colors
                font-medium
                shadow-md hover:shadow-lg
              "
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopEnvironment;

