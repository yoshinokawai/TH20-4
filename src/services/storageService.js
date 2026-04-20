import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: 'user_session',
  CART: 'cart_items',
  FAVOURITES: 'favourite_items',
  ORDERS: 'order_history',
};

const storageService = {
  // --- USER AUTH ---
  saveUser: async (userData) => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem(KEYS.USER, jsonValue);
    } catch (e) {
      console.error('Error saving user:', e);
    }
  },

  getUser: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.USER);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error getting user:', e);
      return null;
    }
  },

  removeUser: async () => {
    try {
      await AsyncStorage.removeItem(KEYS.USER);
    } catch (e) {
      console.error('Error removing user:', e);
    }
  },

  // --- CART ---
  saveCart: async (cartItems) => {
    try {
      const jsonValue = JSON.stringify(cartItems);
      await AsyncStorage.setItem(KEYS.CART, jsonValue);
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  },

  getCart: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.CART);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error getting cart:', e);
      return [];
    }
  },

  // --- FAVOURITES ---
  saveFavourites: async (favItems) => {
    try {
      const jsonValue = JSON.stringify(favItems);
      await AsyncStorage.setItem(KEYS.FAVOURITES, jsonValue);
    } catch (e) {
      console.error('Error saving favourites:', e);
    }
  },

  getFavourites: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.FAVOURITES);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error getting favourites:', e);
      return [];
    }
  },

  // --- ORDERS ---
  saveOrders: async (orders) => {
    try {
      const jsonValue = JSON.stringify(orders);
      await AsyncStorage.setItem(KEYS.ORDERS, jsonValue);
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  },

  getOrders: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.ORDERS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error getting orders:', e);
      return [];
    }
  },

  addOrder: async (newOrder) => {
    try {
      const orders = await storageService.getOrders();
      const updatedOrders = [newOrder, ...orders];
      await storageService.saveOrders(updatedOrders);
      return updatedOrders;
    } catch (e) {
      console.error('Error adding order:', e);
      return [];
    }
  },

  // --- GENERAL ---
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  },
};

export default storageService;
