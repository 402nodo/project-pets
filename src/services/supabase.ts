import { createClient } from '@supabase/supabase-js';
import { Pet, ChatMessage } from '../types/pet';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Using localStorage fallback.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Get or create user ID (simple localStorage-based for now)
export function getUserId(): string {
  if (typeof window === 'undefined') return 'anonymous';
  
  let userId = localStorage.getItem('project-pets-user-id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('project-pets-user-id', userId);
  }
  return userId;
}

// Pets API (shared gallery)
export async function fetchAllPets(): Promise<Pet[]> {
  if (!supabase) {
    // Fallback to localStorage
    const stored = localStorage.getItem('project-pets-data');
    return stored ? JSON.parse(stored) : [];
  }

  try {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pets:', error);
      return [];
    }

    return (data || []).map((pet: any) => ({
      ...pet,
      imageData: pet.image_data, // Map image_data back to imageData
      tokenAddress: pet.token_address, // Map token_address back to tokenAddress
      createdAt: pet.created_at,
      lastInteraction: pet.last_interaction || pet.created_at,
    }));
  } catch (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
}

export async function addPetToGallery(pet: Pet): Promise<void> {
  if (!supabase) {
    // Fallback to localStorage
    const stored = localStorage.getItem('project-pets-data');
    const pets = stored ? JSON.parse(stored) : [];
    pets.unshift(pet);
    localStorage.setItem('project-pets-data', JSON.stringify(pets));
    return;
  }

  try {
    const { error } = await supabase
      .from('pets')
      .insert({
        id: pet.id,
        appearance: pet.appearance,
        personality: pet.personality,
        stats: pet.stats,
        status: pet.status,
        location: pet.location,
        image_data: pet.imageData,
        token_address: pet.tokenAddress,
        created_at: pet.createdAt,
        last_interaction: pet.lastInteraction,
      });

    if (error) {
      console.error('Error adding pet:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error adding pet:', error);
    throw error;
  }
}

// Chat API (personal chats per user)
export async function fetchChatMessages(petId: string): Promise<ChatMessage[]> {
  if (!supabase) {
    // Fallback to localStorage
    const stored = localStorage.getItem(`project-pets-chat-${petId}`);
    return stored ? JSON.parse(stored) : [];
  }

  const userId = getUserId();

  try {
    const { data, error } = await supabase
      .from('chats')
      .select('messages')
      .eq('pet_id', petId)
      .eq('user_id', userId)
      .maybeSingle(); // Use maybeSingle() instead of single() to avoid 406 error

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching chat:', error);
      return [];
    }

    return data?.messages || [];
  } catch (error) {
    console.error('Error fetching chat:', error);
    return [];
  }
}

export async function saveChatMessages(petId: string, messages: ChatMessage[]): Promise<void> {
  if (!supabase) {
    // Fallback to localStorage
    localStorage.setItem(`project-pets-chat-${petId}`, JSON.stringify(messages));
    return;
  }

  const userId = getUserId();

  try {
    const { error } = await supabase
      .from('chats')
      .upsert({
        pet_id: petId,
        user_id: userId,
        messages: messages,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'pet_id,user_id',
      });

    if (error) {
      console.error('Error saving chat:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error saving chat:', error);
    throw error;
  }
}

