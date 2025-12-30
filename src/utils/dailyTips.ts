import type { Topic } from '../types';

export interface DailyTip {
  id: string;
  title: string;
  content: string;
  category: Topic | 'general' | 'seasonal';
  emoji: string;
  season?: 'spring' | 'summer' | 'fall' | 'winter';
  actionText?: string;
  actionTopic?: Topic;
}

export const DAILY_TIPS: DailyTip[] = [
  // Home Repairs Tips
  {
    id: 'home-1',
    title: 'Check Your Smoke Detectors',
    content: "When was the last time you tested your smoke detectors? Take 5 minutes today to test them and replace batteries if needed. Your family's safety is worth it!",
    category: 'home-repairs',
    emoji: '🚨',
    actionText: 'Learn how to maintain smoke detectors',
    actionTopic: 'home-repairs',
  },
  {
    id: 'home-2',
    title: 'Clean Your Gutters',
    content: "Clogged gutters can cause water damage to your home. Check your gutters for leaves and debris, especially before rainy season. A little prevention saves big repairs!",
    category: 'home-repairs',
    emoji: '🏠',
    actionText: 'Ask about gutter maintenance',
    actionTopic: 'home-repairs',
  },
  {
    id: 'home-3',
    title: 'HVAC Filter Reminder',
    content: "Your HVAC filter should be changed every 1-3 months. A dirty filter makes your system work harder and costs more. Check it today!",
    category: 'home-repairs',
    emoji: '❄️',
    actionText: 'Learn about HVAC maintenance',
    actionTopic: 'home-repairs',
  },
  {
    id: 'home-4',
    title: 'Test Your GFCI Outlets',
    content: "GFCI outlets (with test/reset buttons) protect you from electrical shocks. Test them monthly by pressing the 'test' button. If they don't trip, call an electrician!",
    category: 'home-repairs',
    emoji: '⚡',
    actionText: 'Ask about electrical safety',
    actionTopic: 'home-repairs',
  },

  // Car Maintenance Tips
  {
    id: 'car-1',
    title: 'Check Your Tire Pressure',
    content: "Low tire pressure reduces fuel efficiency and tire life. Check your pressure monthly when tires are cold. The correct PSI is on a sticker inside your driver's door!",
    category: 'cars',
    emoji: '🚗',
    actionText: 'Learn about tire maintenance',
    actionTopic: 'cars',
  },
  {
    id: 'car-2',
    title: "Don't Ignore Dashboard Lights",
    content: "That check engine light isn't just for decoration! Address warning lights promptly - small issues become big (expensive) problems when ignored.",
    category: 'cars',
    emoji: '⚠️',
    actionText: 'Ask about dashboard warnings',
    actionTopic: 'cars',
  },
  {
    id: 'car-3',
    title: 'Windshield Wiper Check',
    content: "Can you see clearly in the rain? Replace wiper blades every 6-12 months. Don't wait until you can't see - that's dangerous!",
    category: 'cars',
    emoji: '🌧️',
    actionText: 'Learn about wiper replacement',
    actionTopic: 'cars',
  },
  {
    id: 'car-4',
    title: 'Oil Change Schedule',
    content: "Modern cars can go 5,000-7,500 miles between oil changes. Check your owner's manual and keep track! Clean oil keeps your engine happy.",
    category: 'cars',
    emoji: '🛢️',
    actionText: 'Ask about oil changes',
    actionTopic: 'cars',
  },

  // Technology Tips
  {
    id: 'tech-1',
    title: 'Back Up Your Data',
    content: "When's the last time you backed up your phone and computer? Do it today! Use cloud storage or an external drive. Don't lose those memories!",
    category: 'technology',
    emoji: '💾',
    actionText: 'Learn about backing up data',
    actionTopic: 'technology',
  },
  {
    id: 'tech-2',
    title: 'Update Your Passwords',
    content: "Using the same password everywhere? Time to change that! Use unique passwords for important accounts and consider a password manager.",
    category: 'technology',
    emoji: '🔒',
    actionText: 'Ask about password security',
    actionTopic: 'technology',
  },
  {
    id: 'tech-3',
    title: 'Software Updates Matter',
    content: "Those update notifications aren't just annoying - they fix security holes! Update your phone, computer, and apps regularly.",
    category: 'technology',
    emoji: '🔄',
    actionText: 'Learn about software updates',
    actionTopic: 'technology',
  },
  {
    id: 'tech-4',
    title: 'Clean Your Screen',
    content: "Your phone and computer screens collect germs and smudges. Wipe them down with a microfiber cloth - you'll be amazed at the difference!",
    category: 'technology',
    emoji: '📱',
    actionText: 'Ask about device maintenance',
    actionTopic: 'technology',
  },

  // Relationship Tips
  {
    id: 'rel-1',
    title: 'Check In With Loved Ones',
    content: "When did you last really talk to someone you care about? Not just texting - actually talking. Make that call or plan that coffee date today.",
    category: 'relationships',
    emoji: '❤️',
    actionText: 'Talk about maintaining relationships',
    actionTopic: 'relationships',
  },
  {
    id: 'rel-2',
    title: 'Say Thank You',
    content: "Gratitude goes a long way. Tell someone you appreciate them today - be specific about what they did. Watch how their face lights up!",
    category: 'relationships',
    emoji: '🙏',
    actionText: 'Discuss expressing gratitude',
    actionTopic: 'relationships',
  },
  {
    id: 'rel-3',
    title: 'Listen More Than You Talk',
    content: "The best gift you can give someone is your full attention. Put down your phone, make eye contact, and really listen. People need to be heard.",
    category: 'relationships',
    emoji: '👂',
    actionText: 'Learn about active listening',
    actionTopic: 'relationships',
  },
  {
    id: 'rel-4',
    title: 'Quality Time Matters',
    content: "It's not about quantity of time, it's about quality. Put away distractions and be fully present with the people you love.",
    category: 'relationships',
    emoji: '⏰',
    actionText: 'Talk about quality time',
    actionTopic: 'relationships',
  },

  // Life Advice Tips
  {
    id: 'life-1',
    title: 'Take a Break',
    content: "Feeling overwhelmed? You're not a machine. Take a real break - walk outside, stretch, or just breathe. You'll come back stronger.",
    category: 'life-advice',
    emoji: '🌟',
    actionText: 'Discuss self-care strategies',
    actionTopic: 'life-advice',
  },
  {
    id: 'life-2',
    title: 'Celebrate Small Wins',
    content: "You don't need to wait for big achievements. Did you make your bed? Finish a task? That counts! Acknowledge your progress, no matter how small.",
    category: 'life-advice',
    emoji: '🎉',
    actionText: 'Talk about building confidence',
    actionTopic: 'life-advice',
  },
  {
    id: 'life-3',
    title: 'Get Some Sunlight',
    content: "Spending all day indoors? Get 15 minutes of sunlight today. It boosts your mood, helps you sleep better, and gives you vitamin D!",
    category: 'life-advice',
    emoji: '☀️',
    actionText: 'Learn about healthy habits',
    actionTopic: 'life-advice',
  },
  {
    id: 'life-4',
    title: "It's Okay to Ask for Help",
    content: "Strong people ask for help when they need it. You don't have to figure everything out alone. Reach out - people want to help you!",
    category: 'life-advice',
    emoji: '🤝',
    actionText: 'Talk about asking for support',
    actionTopic: 'life-advice',
  },

  // Seasonal Tips - Spring
  {
    id: 'season-spring-1',
    title: 'Spring Cleaning Time',
    content: "Spring is here! Time to open windows, clean out gutters, check your AC before summer, and tackle that garage. Fresh start, fresh space!",
    category: 'seasonal',
    season: 'spring',
    emoji: '🌸',
    actionText: 'Get spring cleaning tips',
    actionTopic: 'home-repairs',
  },

  // Seasonal Tips - Summer
  {
    id: 'season-summer-1',
    title: 'Keep Your Car Cool',
    content: "Summer heat is hard on your car. Check coolant levels, inspect hoses, and park in shade when possible. Don't let your car overheat!",
    category: 'seasonal',
    season: 'summer',
    emoji: '☀️',
    actionText: 'Ask about summer car care',
    actionTopic: 'cars',
  },

  // Seasonal Tips - Fall
  {
    id: 'season-fall-1',
    title: 'Winterize Your Home',
    content: "Fall is prep time! Check weather stripping, clean gutters, test your heating system, and reverse ceiling fans. Be ready for winter!",
    category: 'seasonal',
    season: 'fall',
    emoji: '🍂',
    actionText: 'Learn about winter prep',
    actionTopic: 'home-repairs',
  },

  // Seasonal Tips - Winter
  {
    id: 'season-winter-1',
    title: 'Winter Car Emergency Kit',
    content: "Got ice scraper, blanket, flashlight, and jumper cables in your car? Winter emergencies happen. Be prepared before you're stuck!",
    category: 'seasonal',
    season: 'winter',
    emoji: '❄️',
    actionText: 'Build an emergency kit',
    actionTopic: 'cars',
  },

  // General Tips
  {
    id: 'general-1',
    title: 'Stay Hydrated',
    content: "When did you last drink water? Your body needs it! Grab a glass right now. Your brain and body will thank you.",
    category: 'general',
    emoji: '💧',
  },
  {
    id: 'general-2',
    title: 'Learn Something New',
    content: "Your brain loves learning! Pick up a new skill, watch a tutorial, or read about something interesting. Growth happens outside your comfort zone.",
    category: 'general',
    emoji: '📚',
  },
];

// Helper to get current season
function getCurrentSeason(): 'spring' | 'summer' | 'fall' | 'winter' {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

// Daily Tip Service
export class DailyTipService {
  private static readonly LAST_TIP_KEY = 'dad-advice-last-tip-date';
  private static readonly SHOWN_TIPS_KEY = 'dad-advice-shown-tips';

  static shouldShowTip(): boolean {
    const lastTipDate = localStorage.getItem(this.LAST_TIP_KEY);
    if (!lastTipDate) return true;

    const lastDate = new Date(lastTipDate);
    const now = new Date();
    const hoursSince = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60);

    return hoursSince >= 24;
  }

  static getShownTips(): string[] {
    const shown = localStorage.getItem(this.SHOWN_TIPS_KEY);
    return shown ? JSON.parse(shown) : [];
  }

  static markTipAsShown(tipId: string): void {
    const shown = this.getShownTips();
    if (!shown.includes(tipId)) {
      shown.push(tipId);
      localStorage.setItem(this.SHOWN_TIPS_KEY, JSON.stringify(shown));
    }
    localStorage.setItem(this.LAST_TIP_KEY, new Date().toISOString());
  }

  static getRandomTip(preferredCategory?: Topic | 'general'): DailyTip {
    const shownTips = this.getShownTips();
    const currentSeason = getCurrentSeason();

    // Prioritize seasonal tips for current season
    const seasonalTips = DAILY_TIPS.filter(
      t => t.season === currentSeason && !shownTips.includes(t.id)
    );
    if (seasonalTips.length > 0 && Math.random() < 0.3) {
      const tip = seasonalTips[Math.floor(Math.random() * seasonalTips.length)];
      this.markTipAsShown(tip.id);
      return tip;
    }

    // Filter by category if provided
    let availableTips = preferredCategory
      ? DAILY_TIPS.filter(t => t.category === preferredCategory)
      : DAILY_TIPS;

    // Filter out already shown tips
    const unseenTips = availableTips.filter(t => !shownTips.includes(t.id));

    // If all tips have been shown, reset
    if (unseenTips.length === 0) {
      localStorage.removeItem(this.SHOWN_TIPS_KEY);
      return this.getRandomTip(preferredCategory);
    }

    // Get random tip
    const tip = unseenTips[Math.floor(Math.random() * unseenTips.length)];
    this.markTipAsShown(tip.id);
    return tip;
  }

  static resetTipTimer(): void {
    localStorage.setItem(this.LAST_TIP_KEY, new Date().toISOString());
  }
}

