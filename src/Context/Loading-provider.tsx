import { createContext, useContext, useEffect, useState } from "react";

type LoadingProviderState = {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
};

const initialState: LoadingProviderState = {
  isLoading: false,
  setIsLoading: () => null,
};

const LoadingProviderContext =
  createContext<LoadingProviderState>(initialState);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingProviderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingProviderContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingProviderContext);

  if (context === undefined)
    throw new Error("useLoading must be used within a LoadingProvider");

  return context;
};
