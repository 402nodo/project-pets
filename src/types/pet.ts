export type PetType = 
  | 'dog' 
  | 'cat' 
  | 'hamster' 
  | 'parrot' 
  | 'fish' 
  | 'rabbit' 
  | 'turtle' 
  | 'rat';

export interface PetAppearance {
  type: PetType;
  bodyColor: string;
  eyeColor: string;
  accessory: string | null;
  glasses: string | null;
  hat: string | null;
  background: string;
}

export interface PetPersonality {
  name: string;
  temperament: 'friendly' | 'shy' | 'aggressive' | 'calm';
  lovesHumans: boolean;
  activityLevel: number; // 0-100 (0 = lazy, 100 = energetic)
  favoriteFood: string;
  playful: boolean;
  noiseLevel: number; // 0-100 (0 = quiet, 100 = loud)
  quirks: string[];
  bio: string;
}

// Pet stats - как у singularity.game
export interface PetStats {
  hunger: number;      // 0-100 (100 = сытый)
  happiness: number;   // 0-100 (100 = счастливый)
  energy: number;      // 0-100 (100 = энергичный)
  bond: number;        // 0-100 (100 = максимальная привязанность)
}

export type PetStatus = 'online' | 'sleeping' | 'playing' | 'eating' | 'idle';

export interface Pet {
  id: string;
  appearance: PetAppearance;
  personality: PetPersonality;
  stats: PetStats;
  status: PetStatus;
  location: string;
  imageData: string;
  tokenAddress?: string;
  createdAt: number;
  lastInteraction: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'pet';
  content: string;
  timestamp: number;
}

// Generate random stats for new pets
export function generateRandomStats(): PetStats {
  return {
    hunger: Math.floor(Math.random() * 31) + 70,      // 70-100
    happiness: Math.floor(Math.random() * 31) + 70,   // 70-100
    energy: Math.floor(Math.random() * 41) + 60,      // 60-100
    bond: Math.floor(Math.random() * 51) + 30,        // 30-80
  };
}

// Default stats for backward compatibility
export const DEFAULT_STATS: PetStats = generateRandomStats();

// Locations for pets
export const PET_LOCATIONS = [
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Garden',
  'Balcony',
  'Pet Bed',
  'Couch',
  'Window Sill',
];

// Pixel art colors
export const BODY_COLORS = [
  { name: 'White', value: '#f5f5f5' },
  { name: 'Cream', value: '#fff8e7' },
  { name: 'Orange', value: '#ffb347' },
  { name: 'Brown', value: '#a67c52' },
  { name: 'Black', value: '#3d3d3d' },
  { name: 'Gray', value: '#9e9e9e' },
  { name: 'Golden', value: '#daa520' },
  { name: 'Ginger', value: '#d2691e' },
];

export const EYE_COLORS = [
  { name: 'Brown', value: '#5d4037' },
  { name: 'Green', value: '#4caf50' },
  { name: 'Blue', value: '#2196f3' },
  { name: 'Amber', value: '#ff8f00' },
  { name: 'Gray', value: '#607d8b' },
  { name: 'Black', value: '#212121' },
];

export const ACCESSORIES = [
  { name: 'None', value: null },
  { name: 'Red Collar', value: 'collar-red' },
  { name: 'Blue Collar', value: 'collar-blue' },
  { name: 'Pink Bow', value: 'bow-pink' },
  { name: 'Gold Chain', value: 'chain-gold' },
  { name: 'Bell', value: 'bell' },
];

export const GLASSES = [
  { name: 'None', value: null },
  { name: 'Round', value: 'round' },
  { name: 'Square', value: 'square' },
  { name: 'Sunglasses', value: 'sunglasses' },
  { name: 'Heart', value: 'heart' },
];

export const HATS = [
  { name: 'None', value: null },
  { name: 'Top Hat', value: 'tophat' },
  { name: 'Crown', value: 'crown' },
  { name: 'Bow', value: 'bow' },
  { name: 'Beret', value: 'beret' },
  { name: 'Wizard', value: 'wizard' },
];

export const BACKGROUNDS = [
  { name: 'None', value: 'none', color: 'transparent' },
  { name: 'Sky', value: 'sky', color: '#87CEEB' },
  { name: 'Sunset', value: 'sunset', color: '#FFB366' },
  { name: 'Forest', value: 'forest', color: '#90EE90' },
  { name: 'Ocean', value: 'ocean', color: '#4FC3F7' },
  { name: 'Night', value: 'night', color: '#2C3E50' },
  { name: 'Pink', value: 'pink', color: '#FFB6C1' },
  { name: 'Lavender', value: 'lavender', color: '#E6E6FA' },
  { name: 'Mint', value: 'mint', color: '#B2F2BB' },
  { name: 'Peach', value: 'peach', color: '#FFDAB9' },
];

export const FAVORITE_FOODS = [
  'Fish',
  'Chicken',
  'Beef',
  'Vegetables',
  'Treats',
  'Seeds',
  'Fruits',
  'Everything',
];

export const QUIRKS = [
  'Loves belly rubs',
  'Scared of vacuum',
  'Sleeps all day',
  'Chases tail',
  'Steals food',
  'Hides under furniture',
  'Loves water',
  'Talks a lot',
  'Very protective',
  'Cuddle monster',
];

// Helper function to get status text
export const getStatusText = (status: PetStatus): string => {
  switch (status) {
    case 'online': return 'Active';
    case 'sleeping': return 'Sleeping';
    case 'playing': return 'Playing';
    case 'eating': return 'Eating';
    case 'idle': return 'Resting';
    default: return 'Unknown';
  }
};

// Helper function to get activity level text
export const getActivityText = (level: number): string => {
  if (level <= 25) return 'Lazy';
  if (level <= 50) return 'Chill';
  if (level <= 75) return 'Active';
  return 'Energetic';
};

// Helper function to get noise level text
export const getNoiseText = (level: number): string => {
  if (level <= 25) return 'Quiet';
  if (level <= 50) return 'Moderate';
  if (level <= 75) return 'Chatty';
  return 'Loud';
};

// Helper function to get random location
export const getRandomLocation = (): string => {
  return PET_LOCATIONS[Math.floor(Math.random() * PET_LOCATIONS.length)];
};
