import { useRef, useState } from "react";

export default function useStateRef<T>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const stateRef = useRef<T>(state);
  const setStateAndRef = (newState: T | ((prev: T) => T)) => {
    setState((prev) => {
      const updated = typeof newState === 'function' ? (newState as (prev: T) => T)(prev) : newState;
      stateRef.current = updated;
      return updated;
    });
  };
  return [state, stateRef, setStateAndRef] as const;
}