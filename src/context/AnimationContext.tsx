
'use client';

import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface AnimationContextType {
  isAnimationReady: boolean;
  setAnimationReady: (isReady: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: FC<AnimationProviderProps> = ({ children }) => {
  const [isAnimationReady, setAnimationReady] = useState(false);

  return (
    <AnimationContext.Provider value={{ isAnimationReady, setAnimationReady }}>
      {children}
    </AnimationContext.Provider>
  );
};
