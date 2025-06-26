// Set item in localStorage
const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
  }
};

// Get item from localStorage
const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error getting item from localStorage:", error);
    return null;
  }
};

// Remove item from localStorage
const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from localStorage:", error);
  }
};

// *************** Custom storage addition
export const setStorageToken = (token: string) =>
  setLocalStorageItem("accessToken", token);

// *************** Custom storage retrieval
export const getStorageToken = (): string | null =>
  getLocalStorageItem("accessToken");

// *************** Custom storage removal
export const removeStorageToken = () => removeLocalStorageItem("accessToken");

export { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem };
