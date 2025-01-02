import { useContext } from 'react';
import CloudsContext from './CloudsContext';

const useCloudsContext = () => {
  const context = useContext(CloudsContext);
  if (!context) {
    throw new Error('useCloudsContext must be used within a CloudsProvider');
  }
  return context;
};

export default useCloudsContext;
