import { CloudsProvider } from "./CloudsContext";

const CloudsContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <CloudsProvider>{children}</CloudsProvider>;
};

export default CloudsContextProvider;
