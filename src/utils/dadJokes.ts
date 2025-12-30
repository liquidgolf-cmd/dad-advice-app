import type { Topic } from '../types';

export interface DadJoke {
  id: string;
  setup: string;
  punchline: string;
  category: Topic | 'general';
  emoji: string;
}

export const DAD_JOKES: DadJoke[] = [
  // Home Repairs Jokes
  {
    id: 'home-1',
    setup: "Why don't hammers ever get lonely?",
    punchline: "Because they're always hitting it off with nails!",
    category: 'home-repairs',
    emoji: '🔨',
  },
  {
    id: 'home-2',
    setup: "What did the wall say to the ceiling?",
    punchline: "I'll meet you at the corner!",
    category: 'home-repairs',
    emoji: '🏠',
  },
  {
    id: 'home-3',
    setup: "Why did the plumber break up with his girlfriend?",
    punchline: "Their relationship was going down the drain!",
    category: 'home-repairs',
    emoji: '🔧',
  },
  {
    id: 'home-4',
    setup: "What's a plumber's favorite vegetable?",
    punchline: "A leek!",
    category: 'home-repairs',
    emoji: '🥬',
  },
  {
    id: 'home-5',
    setup: "Why did the light bulb fail school?",
    punchline: "It wasn't very bright!",
    category: 'home-repairs',
    emoji: '💡',
  },
  {
    id: 'home-6',
    setup: "What do you call a fake noodle?",
    punchline: "An impasta! Just like fake wood paneling!",
    category: 'home-repairs',
    emoji: '🍝',
  },

  // Car Jokes
  {
    id: 'car-1',
    setup: "Why did the car get a flat tire?",
    punchline: "Because there was a fork in the road!",
    category: 'cars',
    emoji: '🚗',
  },
  {
    id: 'car-2',
    setup: "What did the traffic light say to the car?",
    punchline: "Don't look, I'm changing!",
    category: 'cars',
    emoji: '🚦',
  },
  {
    id: 'car-3',
    setup: "Why don't cars play soccer?",
    punchline: "They only have one boot!",
    category: 'cars',
    emoji: '⚽',
  },
  {
    id: 'car-4',
    setup: "What do you call a Ford Fiesta that ran out of gas?",
    punchline: "A Ford Siesta!",
    category: 'cars',
    emoji: '😴',
  },
  {
    id: 'car-5',
    setup: "Why did the car apply for a job?",
    punchline: "It wanted to quit being a gas guzzler!",
    category: 'cars',
    emoji: '⛽',
  },
  {
    id: 'car-6',
    setup: "What's a mechanic's favorite type of music?",
    punchline: "Heavy metal!",
    category: 'cars',
    emoji: '🎸',
  },

  // Technology Jokes
  {
    id: 'tech-1',
    setup: "Why was the computer cold?",
    punchline: "It left its Windows open!",
    category: 'technology',
    emoji: '💻',
  },
  {
    id: 'tech-2',
    setup: "What do you call a computer that sings?",
    punchline: "A Dell!",
    category: 'technology',
    emoji: '🎤',
  },
  {
    id: 'tech-3',
    setup: "Why did the PowerPoint presentation cross the road?",
    punchline: "To get to the other slide!",
    category: 'technology',
    emoji: '📊',
  },
  {
    id: 'tech-4',
    setup: "How does a computer get drunk?",
    punchline: "It takes screenshots!",
    category: 'technology',
    emoji: '🍺',
  },
  {
    id: 'tech-5',
    setup: "Why don't keyboards ever sleep?",
    punchline: "Because they have two shifts!",
    category: 'technology',
    emoji: '⌨️',
  },
  {
    id: 'tech-6',
    setup: "What's a computer's favorite snack?",
    punchline: "Microchips!",
    category: 'technology',
    emoji: '🍟',
  },

  // Relationships Jokes
  {
    id: 'rel-1',
    setup: "What's the best way to watch a fishing tournament?",
    punchline: "Live stream! Just like staying connected in relationships!",
    category: 'relationships',
    emoji: '🎣',
  },
  {
    id: 'rel-2',
    setup: "Why did the man fall in love with a calendar?",
    punchline: "He heard it had a lot of dates!",
    category: 'relationships',
    emoji: '📅',
  },
  {
    id: 'rel-3',
    setup: "What did the stamp say to the envelope?",
    punchline: "Stick with me and we'll go places!",
    category: 'relationships',
    emoji: '💌',
  },
  {
    id: 'rel-4',
    setup: "Why did the two antennas get married?",
    punchline: "The ceremony wasn't much, but the reception was excellent!",
    category: 'relationships',
    emoji: '📡',
  },
  {
    id: 'rel-5',
    setup: "What's the most romantic ship?",
    punchline: "A relation-ship!",
    category: 'relationships',
    emoji: '🚢',
  },
  {
    id: 'rel-6',
    setup: "Why do watermelons have fancy weddings?",
    punchline: "Because they cantaloupe!",
    category: 'relationships',
    emoji: '🍉',
  },

  // Life Advice Jokes
  {
    id: 'life-1',
    setup: "Why do we tell actors to break a leg?",
    punchline: "Because every play has a cast!",
    category: 'life-advice',
    emoji: '🎭',
  },
  {
    id: 'life-2',
    setup: "What's the best thing about Switzerland?",
    punchline: "I don't know, but the flag is a big plus!",
    category: 'life-advice',
    emoji: '🇨🇭',
  },
  {
    id: 'life-3',
    setup: "Why don't eggs tell jokes?",
    punchline: "They'd crack each other up!",
    category: 'life-advice',
    emoji: '🥚',
  },
  {
    id: 'life-4',
    setup: "What do you call a fake stone in Ireland?",
    punchline: "A sham rock!",
    category: 'life-advice',
    emoji: '☘️',
  },
  {
    id: 'life-5',
    setup: "Why did the scarecrow win an award?",
    punchline: "He was outstanding in his field!",
    category: 'life-advice',
    emoji: '🌾',
  },
  {
    id: 'life-6',
    setup: "What time did the man go to the dentist?",
    punchline: "Tooth hurty!",
    category: 'life-advice',
    emoji: '🦷',
  },

  // General Dad Jokes
  {
    id: 'gen-1',
    setup: "Why did the bicycle fall over?",
    punchline: "Because it was two tired!",
    category: 'general',
    emoji: '🚲',
  },
  {
    id: 'gen-2',
    setup: "What do you call cheese that isn't yours?",
    punchline: "Nacho cheese!",
    category: 'general',
    emoji: '🧀',
  },
  {
    id: 'gen-3',
    setup: "Why did the math book look so sad?",
    punchline: "Because it had too many problems!",
    category: 'general',
    emoji: '📚',
  },
  {
    id: 'gen-4',
    setup: "What do you call a bear with no teeth?",
    punchline: "A gummy bear!",
    category: 'general',
    emoji: '🐻',
  },
  {
    id: 'gen-5',
    setup: "Why can't you hear a pterodactyl go to the bathroom?",
    punchline: "Because the 'P' is silent!",
    category: 'general',
    emoji: '🦕',
  },
  {
    id: 'gen-6',
    setup: "What did the ocean say to the beach?",
    punchline: "Nothing, it just waved!",
    category: 'general',
    emoji: '🌊',
  },
  {
    id: 'gen-7',
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!",
    category: 'general',
    emoji: '⚛️',
  },
  {
    id: 'gen-8',
    setup: "What do you call a sleeping dinosaur?",
    punchline: "A dino-snore!",
    category: 'general',
    emoji: '🦖',
  },
  {
    id: 'gen-9',
    setup: "Why did the cookie go to the doctor?",
    punchline: "Because it felt crumbly!",
    category: 'general',
    emoji: '🍪',
  },
  {
    id: 'gen-10',
    setup: "What's orange and sounds like a parrot?",
    punchline: "A carrot!",
    category: 'general',
    emoji: '🥕',
  },
  {
    id: 'gen-11',
    setup: "Why did the tomato turn red?",
    punchline: "Because it saw the salad dressing!",
    category: 'general',
    emoji: '🍅',
  },
  {
    id: 'gen-12',
    setup: "What do you call a dog magician?",
    punchline: "A labracadabrador!",
    category: 'general',
    emoji: '🐕',
  },
  {
    id: 'gen-13',
    setup: "Why did the golfer bring two pairs of pants?",
    punchline: "In case he got a hole in one!",
    category: 'general',
    emoji: '⛳',
  },
  {
    id: 'gen-14',
    setup: "What do you call a fish wearing a bowtie?",
    punchline: "Sofishticated!",
    category: 'general',
    emoji: '🐟',
  },
  {
    id: 'gen-15',
    setup: "Why don't skeletons fight each other?",
    punchline: "They don't have the guts!",
    category: 'general',
    emoji: '💀',
  },
  {
    id: 'gen-16',
    setup: "What do you call a snowman with a six-pack?",
    punchline: "An abdominal snowman!",
    category: 'general',
    emoji: '⛄',
  },
  {
    id: 'gen-17',
    setup: "Why did the stadium get hot after the game?",
    punchline: "All the fans left!",
    category: 'general',
    emoji: '🏟️',
  },
  {
    id: 'gen-18',
    setup: "What do you call a pile of cats?",
    punchline: "A meowtain!",
    category: 'general',
    emoji: '🐈',
  },
];

// Joke management
export class JokeService {
  private static readonly SEEN_JOKES_KEY = 'dad-advice-seen-jokes';

  static getSeenJokes(): string[] {
    const seen = localStorage.getItem(this.SEEN_JOKES_KEY);
    return seen ? JSON.parse(seen) : [];
  }

  static markJokeAsSeen(jokeId: string): void {
    const seen = this.getSeenJokes();
    if (!seen.includes(jokeId)) {
      seen.push(jokeId);
      localStorage.setItem(this.SEEN_JOKES_KEY, JSON.stringify(seen));
    }
  }

  static resetSeenJokes(): void {
    localStorage.removeItem(this.SEEN_JOKES_KEY);
  }

  static getRandomJoke(category?: Topic | 'general'): DadJoke {
    const seenJokes = this.getSeenJokes();
    
    // Filter jokes by category if provided
    let availableJokes = category 
      ? DAD_JOKES.filter(j => j.category === category)
      : DAD_JOKES;
    
    // Filter out seen jokes
    const unseenJokes = availableJokes.filter(j => !seenJokes.includes(j.id));
    
    // If all jokes have been seen, reset and start over
    if (unseenJokes.length === 0) {
      this.resetSeenJokes();
      return this.getRandomJoke(category);
    }
    
    // Get random unseen joke
    const randomIndex = Math.floor(Math.random() * unseenJokes.length);
    const joke = unseenJokes[randomIndex];
    
    // Mark as seen
    this.markJokeAsSeen(joke.id);
    
    return joke;
  }

  static getJokeStats(): { total: number; seen: number; remaining: number } {
    const seenJokes = this.getSeenJokes();
    return {
      total: DAD_JOKES.length,
      seen: seenJokes.length,
      remaining: DAD_JOKES.length - seenJokes.length,
    };
  }
}

