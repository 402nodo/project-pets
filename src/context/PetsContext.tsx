import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pet } from '../types/pet';
import { fetchAllPets, addPetToGallery } from '../services/supabase';

interface PetsContextType {
  pets: Pet[];
  addPet: (pet: Pet) => Promise<void>;
  getPet: (id: string) => Pet | undefined;
  updatePet: (id: string, updates: Partial<Pet>) => void;
  isLoading: boolean;
  refreshPets: () => Promise<void>;
}

const PetsContext = createContext<PetsContextType | null>(null);

export function PetsProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load pets from Supabase (shared gallery) on mount
  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    setIsLoading(true);
    try {
      const allPets = await fetchAllPets();
      setPets(allPets);
    } catch (error) {
      console.error('Failed to load pets:', error);
      setPets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addPet = async (pet: Pet) => {
    try {
      // Add to Supabase (shared gallery)
      await addPetToGallery(pet);
      // Update local state
      setPets(prev => [pet, ...prev]);
    } catch (error) {
      console.error('Failed to add pet:', error);
      // Still add to local state for immediate feedback
      setPets(prev => [pet, ...prev]);
    }
  };

  const getPet = (id: string) => {
    return pets.find(p => p.id === id);
  };

  const updatePet = (id: string, updates: Partial<Pet>) => {
    setPets(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ));
  };

  const refreshPets = async () => {
    await loadPets();
  };

  return (
    <PetsContext.Provider value={{ pets, addPet, getPet, updatePet, isLoading, refreshPets }}>
      {children}
    </PetsContext.Provider>
  );
}

export function usePets() {
  const context = useContext(PetsContext);
  if (!context) {
    throw new Error('usePets must be used within PetsProvider');
  }
  return context;
}




