export type Topic = 
  | 'home-repairs'
  | 'cars'
  | 'technology'
  | 'relationships'
  | 'life-advice'
  | 'general';

export interface TopicConfig {
  id: Topic;
  title: string;
  emoji: string;
  description: string;
  environment: string;
  dadPosition: 'left' | 'right';
}

export interface Message {
  id: string;
  role: 'user' | 'dad';
  content: string;
  timestamp: number;
  audioUrl?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  needsProfessional?: boolean;
  professionalType?: string;
  videoSuggestion?: string;
}

export interface DadResponse {
  message: string;
  audioText: string;
  needsProfessional: boolean;
  professionalType?: string;
  safetyLevel: 'safe_diy' | 'caution' | 'professional_required';
  videoSuggestion?: string;
  mood?: DadMood;
}

export type DadMood = 
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'explaining'
  | 'laughing'
  | 'concerned'
  | 'proud'
  | 'silly'
  | 'surprised'
  | 'encouraging';

export interface ConversationSession {
  topic: Topic;
  messages: Message[];
  startTime: number;
  lastActivity: number;
}

