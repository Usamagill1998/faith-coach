export type ScreenName = 
  | 'onboarding' 
  | 'character-select' 
  | 'dashboard' 
  | 'chat' 
  | 'modules' 
  | 'journal' 
  | 'profile';

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  traits: string[];
}

export interface FaithModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  completed: number; // percentage
}

export interface JournalEntry {
  id: string;
  date: string;
  preview: string;
  tags: string[];
  imageUrl?: string;
}
