import { createContext, ReactNode, useState } from 'react';

type CloudsContextType = {
  state: any;
  setState: (value: any) => void;
};

const CloudsContext = createContext<CloudsContextType | undefined>(undefined);

export const CloudsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(null);

  return (
    <CloudsContext.Provider value={{ state, setState }}>
      {children}
    </CloudsContext.Provider>
  );
};

export default CloudsContext;