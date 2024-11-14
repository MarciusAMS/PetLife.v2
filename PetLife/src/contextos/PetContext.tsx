// contexts/PetContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type PetContextType = {
  selectedPetId: string | null;
  setSelectedPetId: (id: string | null) => void;
};

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  return (
    <PetContext.Provider value={{ selectedPetId, setSelectedPetId }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePetContext must be used within a PetProvider");
  }
  return context;
};
