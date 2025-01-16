'use client';

import { createContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/db/firebase'; // adjust path if needed

export interface Cloud {
  id: string;
  A?: string;
  B?: string;
  C?: string;
  D?: string;
  D_?: string;
}

type CloudsContextType = {
  clouds: Cloud[];
  createCloud: () => Cloud;
  updateCloud: (id: string, newValues: Partial<Cloud>) => void;
};

function hasAnyContent(cloud: Cloud) {
  const { A, B, C, D, D_ } = cloud;
  return [A, B, C, D, D_].some((val) => val && val.trim() !== '');
}

const CloudsContext = createContext<CloudsContextType | undefined>(undefined);

export const CloudsProvider = ({ children }: { children: ReactNode }) => {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  /**
   * Fetch existing clouds from the Next.js route and store in local state.
   */
  useEffect(() => {
    const loadClouds = async () => {
      console.log('Loading clouds from Next.js route...');
      try {
        const res = await fetch('/api/clouds?user=1');
        if (!res.ok) {
          throw new Error(`Fetch failed with status: ${res.status}`);
        }
        const data = (await res.json()) as Cloud[];
        setClouds(data);
      } catch (error) {
        console.error('Error loading clouds from Next.js route:', error);
      }
    };

    loadClouds();
  }, []);

  /**
   * Create a new Cloud in local state only (for now).
   * We'll leave it to updateCloud to persist once it has any content.
   */
  const createCloud = useCallback(() => {
    const newCloud: Cloud = {
      id: uuidv4(),
      A: '',
      B: '',
      C: '',
      D: '',
      D_: '',
    };
    setClouds((prev) => [...prev, newCloud]);
    return newCloud;
  }, []);

  /**
   * Merge partial updates into the targeted Cloud,
   * then persist to Firestore if it has any content.
   */
  const updateCloud = useCallback((id: string, newValues: Partial<Cloud>) => {
    setClouds((prevClouds) => {
      return prevClouds.map((cloud) => {
        if (cloud.id === id) {
          const updated = { ...cloud, ...newValues };
          if (hasAnyContent(updated)) {
            const ref = doc(db, 'clouds', id);
            setDoc(ref, updated).catch((err) => {
              console.error('Error saving cloud to Firestore:', err);
            });
          }
          return updated;
        }
        return cloud;
      });
    });
  }, []);

  return (
    <CloudsContext.Provider value={{ clouds, createCloud, updateCloud }}>
      {children}
    </CloudsContext.Provider>
  );
};

export default CloudsContext;
