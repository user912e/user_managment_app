import { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key) || "";
      return item ? JSON.parse(item) : undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
