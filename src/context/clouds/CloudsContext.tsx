'use client';

import {
  createContext,
  ReactNode,
  useState,
  useCallback
} from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Cloud {
  id: string;
  A?: string;
  B?: string;
  C?: string;
  D?: string;
  D_?: string;
  ownerId?: string;
}

type CloudsContextType = {
  clouds: Cloud[];
  getCloudsByUser: (
    userId: string,
    options?: { force?: boolean }
  ) => Promise<Cloud[]>;
  getCloudById: (cloudId: string) => Promise<Cloud | null>;
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
  const [fetchedForUser, setFetchedForUser] = useState<string | null>(null);

  // ------------------------------------------
  // Create a new Cloud locally
  // ------------------------------------------
  const createCloud = useCallback(() => {
    const newCloud: Cloud = {
      id: uuidv4(),
      A: '',
      B: '',
      C: '',
      D: '',
      D_: '',
      ownerId: '1', // later current user ID
    };
    setClouds((prev) => [...prev, newCloud]);
    return newCloud;
  }, []);

  // ------------------------------------------
  // Update a Cloud locally
  // ------------------------------------------
  const updateCloud = useCallback((id: string, newValues: Partial<Cloud>) => {
    setClouds((prevClouds) =>
      prevClouds.map((cloud) => {
        if (cloud.id === id) {
          const updated = { ...cloud, ...newValues };

          // If there's any content, persist to /api/clouds
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
      })
    );
  }, []);

  // ------------------------------------------
  // Fetch ALL Clouds for a given user (lazily)
  // ------------------------------------------
  const getCloudsByUser = useCallback(
    async (userId: string, options?: { force?: boolean }): Promise<Cloud[]> => {
      const shouldForce = options?.force ?? false;

      // If we've already fetched for this user (and not forced), skip
      if (!shouldForce && fetchedForUser === userId) {
        console.log(`Skipping fetch for user ${userId}; already loaded.`);
        // Return the currently stored subset for this user
        return clouds.filter((c) => c.ownerId === userId);
      }

      console.log(`Fetching clouds for user ${userId} from Next.js route...`);
      try {
        const res = await fetch(`/api/clouds?user=${userId}`);
        if (!res.ok) {
          throw new Error(`Fetch failed with status: ${res.status}`);
        }
        const data = (await res.json()) as Cloud[];

        // We can either REPLACE the entire array or MERGE.
        // If you want to keep other user’s clouds, you can do a merge:
        setClouds((prev) => {
          // 1) Build a map of existing by ID
          const existingMap = new Map(prev.map((c) => [c.id, c]));
          // 2) Update with newly fetched
          data.forEach((cloud) => existingMap.set(cloud.id, cloud));
          // 3) Return the updated array
          return Array.from(existingMap.values());
        });

        // Mark that we've fetched for this user
        setFetchedForUser(userId);

        return data;
      } catch (error) {
        console.error('Error loading clouds from Next.js route:', error);
        // Return whatever we had in local state
        return clouds.filter((c) => c.ownerId === userId);
      }
    },
    [clouds, fetchedForUser]
  );

  // ------------------------------------------
  // Fetch a single Cloud by ID (lazy)
  // ------------------------------------------
  const getCloudById = useCallback(
    async (cloudId: string): Promise<Cloud | null> => {
      // 1) Check local state first
      const existing = clouds.find((c) => c.id === cloudId);
      if (existing) {
        return existing;
      }

      // 2) Fetch from server route: /api/clouds/[cloudId]
      console.log(`Fetching single cloud ${cloudId}...`);
      try {
        const res = await fetch(`/api/clouds/${cloudId}`);
        if (!res.ok) {
          if (res.status === 404) {
            return null;
          }
          throw new Error(`Fetch single cloud failed: ${res.status}`);
        }
        const fetchedCloud = (await res.json()) as Cloud;

        // 3) Store in local state (merge)
        setClouds((prev) => [...prev, fetchedCloud]);
        return fetchedCloud;
      } catch (error) {
        console.error('Error fetching single cloud:', error);
        return null;
      }
    },
    [clouds]
  );

  const value: CloudsContextType = {
    clouds,
    getCloudsByUser,
    getCloudById,
    createCloud,
    updateCloud,
  };

  return (
    <CloudsContext.Provider value={value}>
      {children}
    </CloudsContext.Provider>
  );
};

export default CloudsContext;
