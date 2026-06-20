import { useState, useCallback } from "react";

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
       if (typeof window === "undefined") {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: string | ((val: string) => string)) => {
      try {
        setStoredValue((prevState) => {
          const valueToStore =
            value instanceof Function ? value(prevState) : value;
          if (valueToStore === "") {
            window.localStorage.removeItem(key);
          } else {
            window.localStorage.setItem(key, valueToStore);
          }
          return valueToStore;
        });
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key],
  );

  return [storedValue, setValue] as const;
}
