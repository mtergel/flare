import localforage from "localforage";
import { useEffect, useState } from "react";

function useLocalForage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => Promise<void>, () => Promise<void>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const getUser = async () => {
      const value = await localforage.getItem<T>(key);
      if (value) {
        setStoredValue(value);
      }
    };

    getUser();
  }, [initialValue, key]);

  const setValue = async (value: T) => {
    await localforage.setItem(key, value);
    setStoredValue(value);
  };

  const removeValue = async () => {
    await localforage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setValue, removeValue];
}

export default useLocalForage;
