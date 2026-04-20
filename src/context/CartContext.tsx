import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data';

import storageService from '../services/storageService';

interface CartItem {
  id: string;
  name: string;
  volume: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  favouriteItems: any[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  toggleFavourite: (product: any) => void;
  isFavourite: (id: string) => boolean;
  addAllToCart: (items: any[]) => void;
  checkout: () => Promise<void>;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favouriteItems, setFavouriteItems] = useState<any[]>([]);
  const isLoaded = React.useRef(false);

  // Load stored data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedCart = await storageService.getCart();
        const storedFavs = await storageService.getFavourites();
        if (storedCart && storedCart.length > 0) setCartItems(storedCart);
        if (storedFavs && storedFavs.length > 0) setFavouriteItems(storedFavs);
      } catch (error) {
        console.error("Failed to load stored data:", error);
      } finally {
        isLoaded.current = true;
      }
    };
    loadData();
  }, []);

  // Sync cart to storage whenever it changes
  useEffect(() => {
    if (isLoaded.current) {
      storageService.saveCart(cartItems);
    }
  }, [cartItems]);

  // Sync favourites to storage whenever they change
  useEffect(() => {
    if (isLoaded.current) {
      storageService.saveFavourites(favouriteItems);
    }
  }, [favouriteItems]);

  // Function to add a product to cart
  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Function to remove from cart
  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Update quantity in cart
  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // Toggle favourite status
  const toggleFavourite = (product: any) => {
    setFavouriteItems(prev => {
      const isFav = prev.find(item => item.id === product.id);
      if (isFav) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Check if item is favourite
  const isFavourite = (id: string) => {
    return favouriteItems.some(item => item.id === id);
  };

  // Add all items from a list to cart (e.g., from Favourite page)
  const addAllToCart = (items: any[]) => {
    setCartItems(prev => {
      let newCart = [...prev];
      items.forEach(item => {
        const existing = newCart.find(i => i.id === item.id);
        if (existing) {
          newCart = newCart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
        } else {
          newCart.push({ ...item, quantity: 1 });
        }
      });
      return newCart;
    });
  };

  // Checkout function
  const checkout = async () => {
    if (cartItems.length === 0) return;

    const newOrder = {
      id: 'ORD-' + Date.now(),
      items: [...cartItems],
      total: totalPrice,
      timestamp: new Date().toLocaleString(),
    };

    await storageService.addOrder(newOrder);
    setCartItems([]); // Clear cart after checkout
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      favouriteItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      toggleFavourite, 
      isFavourite,
      addAllToCart,
      checkout,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
