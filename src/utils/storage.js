import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItems = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in AsyncStorage: ${error}`);
  }
};

export const getItems = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.error(`Error getting item from AsyncStorage: ${error}`);
    return null;
  }
};

export const removeItems = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from AsyncStorage: ${error}`);
  }
};