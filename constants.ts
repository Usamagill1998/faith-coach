import { Character, FaithModule, JournalEntry } from './types';

// Curated Unsplash images - highly reliable IDs
const IMAGES = {
  // Portraits
  jesus: "https://images.unsplash.com/photo-1506755855567-92ff770e8d00?auto=format&fit=crop&w=800&q=80", 
  paul: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  david: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80", 
  esther: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", 
  moses: "https://images.unsplash.com/photo-1555700163-9976735c05d7?auto=format&fit=crop&w=800&q=80", 
  mary: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80", 
  peter: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", 
  ruth: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80", 
  
  // Scenery / Mood
  onboarding1: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80", // Light/Cloud
  onboarding2: "https://images.unsplash.com/photo-1511632765486-a01980968a0c?auto=format&fit=crop&w=800&q=80", // Community
  onboarding3: "https://images.unsplash.com/photo-1507692049790-de58293a469d?auto=format&fit=crop&w=800&q=80", // Path
  
  module1: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80", // Zen/Yoga/Nature
  module2: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&w=600&q=80", // Water
  module3: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80", // Hands
  module4: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=600&q=80", // Moody
  
  journal1: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=600&q=80", // Field
  journal2: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80", // Book
};

export const CHARACTERS: Character[] = [
  {
    id: '1',
    name: 'Jesus',
    role: 'The Savior',
    description: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    imageUrl: IMAGES.jesus,
    traits: ['Compassionate', 'Wise', 'Loving']
  },
  {
    id: '2',
    name: 'Paul',
    role: 'The Apostle',
    description: 'Guidance on spreading faith and overcoming hardship with endurance.',
    imageUrl: IMAGES.paul,
    traits: ['Bold', 'Theological', 'Determined']
  },
  {
    id: '4',
    name: 'Esther',
    role: 'The Queen',
    description: 'Find courage to stand for what is right in difficult times.',
    imageUrl: IMAGES.esther,
    traits: ['Courageous', 'Strategic', 'Faithful']
  },
  {
    id: '3',
    name: 'David',
    role: 'The King',
    description: 'Explore worship, repentance, and leading with a heart for God.',
    imageUrl: IMAGES.david,
    traits: ['Passionate', 'Musical', 'Leader']
  },
  {
    id: '6',
    name: 'Mary',
    role: 'The Mother',
    description: 'Lessons on devotion, patience, and trusting God\'s plan fully.',
    imageUrl: IMAGES.mary,
    traits: ['Devoted', 'Gentle', 'Trusting']
  },
  {
    id: '5',
    name: 'Moses',
    role: 'The Lawgiver',
    description: 'Leadership through uncertainty and walking in obedience.',
    imageUrl: IMAGES.moses,
    traits: ['Humble', 'Leader', 'Obedient']
  },
  {
    id: '7',
    name: 'Peter',
    role: 'The Rock',
    description: 'Overcoming failure and building a faith that stands firm.',
    imageUrl: IMAGES.peter,
    traits: ['Bold', 'Impulsive', 'Redeemed']
  },
  {
    id: '8',
    name: 'Ruth',
    role: 'The Loyal',
    description: 'Finding hope through loyalty, family, and redemption.',
    imageUrl: IMAGES.ruth,
    traits: ['Loyal', 'Hardworking', 'Faithful']
  },
];

export const MODULES: FaithModule[] = [
  {
    id: 'm1',
    title: 'Finding Your Purpose',
    category: 'Growth',
    duration: '10 mins',
    imageUrl: IMAGES.module1,
    completed: 45
  },
  {
    id: 'm2',
    title: 'Peace in Anxiety',
    category: 'Healing',
    duration: '15 mins',
    imageUrl: IMAGES.module2,
    completed: 10
  },
  {
    id: 'm3',
    title: 'The Gift of Forgiveness',
    category: 'Relationships',
    duration: '12 mins',
    imageUrl: IMAGES.module3,
    completed: 0
  },
  {
    id: 'm4',
    title: 'Servant Leadership',
    category: 'Leadership',
    duration: '20 mins',
    imageUrl: IMAGES.module4,
    completed: 80
  }
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j1',
    date: 'Today, 8:30 AM',
    preview: 'The sunrise this morning reminded me of God\'s new mercies. Reflecting on Psalm 23...',
    tags: ['Gratitude', 'Peace'],
    imageUrl: IMAGES.journal1
  },
  {
    id: 'j2',
    date: 'Yesterday, 9:15 PM',
    preview: 'Struggled with patience today at work. I need to pause and breathe before reacting.',
    tags: ['Growth', 'Patience'],
    imageUrl: IMAGES.journal2
  }
];

export const ONBOARDING_SLIDES = [
  {
    title: "Walk by Faith",
    description: "Your personal spiritual guide, bringing biblical wisdom into your daily life.",
    image: IMAGES.onboarding1
  },
  {
    title: "Meet Your Mentors",
    description: "Real-time voice and video conversations with 16 biblical figures.",
    image: IMAGES.onboarding2
  },
  {
    title: "Grow Together",
    description: "Daily devotions, prayer journals, and personalized faith modules.",
    image: IMAGES.onboarding3
  }
];
