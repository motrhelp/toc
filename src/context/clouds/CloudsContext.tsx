'use client'

import { createContext, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Cloud {
    id: string;
}

type CloudsContextType = {
    clouds: Cloud[];
    createCloud: () => Cloud;
};

const CloudsContext = createContext<CloudsContextType | undefined>(undefined);

export const CloudsProvider = ({ children }: { children: ReactNode }) => {
    const [clouds, setClouds] = useState<Cloud[]>([]);
    const createCloud = () => {
        const newCloud = { id:  uuidv4() };
        setClouds([...clouds, newCloud]);
        return newCloud;
    };

  return (
    <CloudsContext.Provider value={{ clouds, createCloud }}>
      {children}
    </CloudsContext.Provider>
  );
};

export default CloudsContext;