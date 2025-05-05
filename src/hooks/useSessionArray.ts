import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function useSessionArray<T>(
  key: string,
  defaultValue: T[] = []
): [T[], Dispatch<SetStateAction<T[]>>] {
  const [state, setState] = useState<T[]>(() => {
    try {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to store in sessionStorage", error);
    }
  }, [state]);

  const updateState: Dispatch<SetStateAction<T[]>> = (newState) => {
    const resolvedState =
      typeof newState === "function" ? newState(state) : newState;
    sessionStorage.setItem(key, JSON.stringify(resolvedState));
    setState(resolvedState);
  };

  return [state, updateState];
}
