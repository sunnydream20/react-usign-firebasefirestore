import { useEffect, useState } from 'react';

function getStoredData(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) return defaultValue;
  return JSON.parse(storedValue);
}

function setStoredData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('update_portfolio'))
}

function useStoredData(key, defaultValue) {
  const [data, setData] = useState(() => getStoredData(key, defaultValue));

  // listen to changes
  useEffect(() => setStoredData(key, data), [key, data]);

  return [data, setData];
}

export default useStoredData;