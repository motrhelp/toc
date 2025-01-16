'use client';

import { createContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

  // Load existing clouds from /api/clouds
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
   * Create a new Cloud in local state only.
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
   * Update a Cloud in local state, then PATCH it to /api/clouds if it has any content.
   */
  const updateCloud = useCallback((id: string, newValues: Partial<Cloud>) => {
    setClouds((prevClouds) => {
      return prevClouds.map((cloud) => {
        if (cloud.id === id) {
          const updated = { ...cloud, ...newValues };

          if (hasAnyContent(updated)) {
            fetch('/api/clouds', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updated),
            }).catch((err) => {
              console.error('Error PATCHing cloud to Next.js route:', err);
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