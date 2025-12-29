import { TopicConfig } from '../types';

export const TOPICS: TopicConfig[] = [
  {
    id: 'home-repairs',
    title: "Home Repairs",
    emoji: "🔧",
    description: "Fix stuff around the house",
    environment: "workshop",
    dadPosition: 'left',
  },
  {
    id: 'cars',
    title: "Cars & Vehicles",
    emoji: "🚗",
    description: "Car troubles? Let's look under the hood",
    environment: "garage",
    dadPosition: 'right',
  },
  {
    id: 'technology',
    title: "Technology",
    emoji: "💻",
    description: "Tech support from your tech-savvy dad",
    environment: "study",
    dadPosition: 'left',
  },
  {
    id: 'relationships',
    title: "Relationships",
    emoji: "❤️",
    description: "Life's toughest puzzles",
    environment: "living-room",
    dadPosition: 'right',
  },
  {
    id: 'life-advice',
    title: "Life Advice",
    emoji: "💼",
    description: "Wisdom from years of experience",
    environment: "patio",
    dadPosition: 'left',
  },
  {
    id: 'general',
    title: "General Questions",
    emoji: "🎯",
    description: "Anything else on your mind",
    environment: "office",
    dadPosition: 'left',
  },
];

export const TOPIC_SAFETY_CONTEXT: Record<string, string> = {
  'home-repairs': 'Remember: Turn off power at breaker for electrical work. When in doubt, call a pro.',
  'cars': 'Safety first: Use jack stands, never just a jack. Brakes and steering are pro territory.',
  'technology': 'Backup your data before making changes. Some repairs void warranties.',
  'relationships': 'Mental health matters. Professional counseling is a sign of strength, not weakness.',
  'life-advice': 'Some problems need professional help - and that\'s okay!',
  'general': 'Your safety and wellbeing always come first!',
};

