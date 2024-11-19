import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo a tipagem para o pet
export interface Pet {
  petId: string;
  nome: string;
  imagemUrl: string;
}

// Tipagem para o contexto
interface PetContextType {
  pet: Pet | null;
  setPet: React.Dispatch<React.SetStateAction<Pet | null>>;
}

// Criando o contexto
const PetContext = createContext<PetContextType | undefined>(undefined);

// Provedor de contexto
export const PetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pet, setPet] = useState<Pet | null>(null);

  return (
    <PetContext.Provider value={{ pet, setPet }}>
      {children}
    </PetContext.Provider>
  );
};

// Hook para acessar o contexto
export const usePetContext = (): PetContextType => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
};
