import { useState, useEffect } from "react";

export const useLocalStorageState = (key: string, defaultValue: any) => {
  const isClient = typeof window !== "undefined";

  const storedValue = isClient
    ? parseStoredValue(localStorage.getItem(key), defaultValue)
    : defaultValue;

  const [value, setValue] = useState(storedValue);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isClient, key, value]);

  return [value, setValue];
};

const parseStoredValue = (storedValue: any, defaultValue: any) => {
  try {
    return JSON.parse(storedValue) || defaultValue;
  } catch (error) {
    console.error("Error parsing stored value:", error);
    return defaultValue;
  }
};
